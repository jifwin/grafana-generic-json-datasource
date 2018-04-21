export class GenericJSONDatasource {
    private type: string;
    private url: string;
    private withCredentials: boolean;
    private name: string;
    private basicAuth: string;
    private backendSrv: any;
    private templateSrv: any;
    private jmespath: any;

    constructor(instanceSettings, backendSrv, templateSrv) {
        this.type = instanceSettings.type;
        this.url = instanceSettings.url;
        this.name = instanceSettings.name;
        this.withCredentials = instanceSettings.withCredentials;
        this.basicAuth = instanceSettings.basicAuth;
        this.backendSrv = backendSrv;
        this.templateSrv = templateSrv;
        this.jmespath = eval("jmespath");
    }

    public query(options) {
        if (options.targets.length > 1) {
            throw new Error("Generic JSON datasource supports only single target");
        }
        const query = options.targets[0].query;
        const request = {
            method: query.method,
            url: this.url + query.endpoint,
            withCredentials: this.withCredentials
        };
        return this.backendSrv.datasourceRequest(request)
            .then((response) => response.data)
            .then((data) => this.jmespath.search(data, query.expression))
            .then((result) => query.regex ? result.match(query.regex)[0] : result)
            .then((result) => {
                return {
                    data: [
                        {
                            datapoints: [
                                [result, new Date().getTime()]
                            ]
                        }
                    ]
                };
            });
    }

    public metricFindQuery(query: string) {
        throw new Error("Not implemented");
    }
}
