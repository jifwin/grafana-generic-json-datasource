import _ from "lodash";
import {Target} from "../target";
import {TemplatingUtils} from "./templating_utils";

export class GenericJSONDatasource {
    private type: string;
    private url: string;
    private withCredentials: boolean;
    private name: string;
    private basicAuth: string;
    private backendSrv: any;
    private templateSrv: any;
    private jmespath: any;
    private $q: any;

    constructor(instanceSettings, backendSrv, templateSrv, $q) {
        this.type = instanceSettings.type;
        this.url = instanceSettings.url;
        this.name = instanceSettings.name;
        this.withCredentials = instanceSettings.withCredentials;
        this.basicAuth = instanceSettings.basicAuth;
        this.backendSrv = backendSrv;
        this.templateSrv = templateSrv;
        this.jmespath = eval("jmespath");
        this.$q = $q;
    }

    public query(options) {
        const templatingUtils = new TemplatingUtils(this.templateSrv, options.scopedVars);

        const targetsRequests = _.chain(options.targets)
            .map((target) => {
                const query = target.query;
                query.refId = target.refId;
                return query;
            })
            .map((target) => templatingUtils.replaceObjectFlat(target, ["endpoint", "expression", "seriesName"]))
            .flatten()
            .map((query) => {
                const request = {
                    method: query.method,
                    url: this.url + query.endpoint,
                    withCredentials: this.withCredentials
                };

                return {
                    request,
                    seriesName: query.seriesName === Target.REF_ID ? query.refId : query.seriesName,
                    valueEvaluator: this.buildValueEvaluationFunction(query.expression, query.regex)
                };
            })
            .value();

        const inFlightRequests = {};
        targetsRequests.forEach((request) => {
            const datasourceRequest = request.request;
            const requestKey = this.buildRequestKey(datasourceRequest);
            if (!_.has(inFlightRequests, requestKey)) {
                inFlightRequests[requestKey] = this.backendSrv.datasourceRequest(datasourceRequest);
            }
        });

        const runningRequests = _.map(targetsRequests, (request) => {
            const datasourceRequest = request.request;
            const requestKey = this.buildRequestKey(datasourceRequest);
            const runningRequest = inFlightRequests[requestKey];
            return runningRequest
                .then((result) => {
                    return {
                        target: request.seriesName,
                        values: request.valueEvaluator(result)
                    };
                })
                .then((result) => {
                    return this.mapToDataPoints(result);
                });
        });

        return this.$q.all(runningRequests)
            .then((results) => {
                return {
                    data: _.flatten(results)
                };
            });
    }

    public metricFindQuery(query: string) {
        throw new Error("Not implemented");
    }

    private buildRequestKey(request) {
        return JSON.stringify(request.url + request.method);
    }

    private mapToDataPoints(result) {
        const date = new Date().getTime();
        if (_.isArray(result.values)) {
            return {
                datapoints: _.map(result.values, (value) => {
                    return [value, date];
                }),
                target: result.target
            };
        } else {
            return {
                datapoints: [
                    [result.values, date]
                ],
                target: result.target
            };
        }
    }

    private buildValueEvaluationFunction(expression, regex) {
        return (result) => {
            const value = this.jmespath.search(result.data, expression);
            if (_.isArray(value)) {
                return _.map(value, (v) => this.matchRegex(v, regex));
            }
            return this.matchRegex(value, regex);
        };
    }

    private matchRegex(value, regex) {
        if (typeof value === "string") {
            return value.match(regex)[0];
        }
        return value;
    }
}
