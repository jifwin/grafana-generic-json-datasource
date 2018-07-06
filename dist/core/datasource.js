System.register(["lodash", "../target", "./templating_utils"], function(exports_1) {
    var lodash_1, target_1, templating_utils_1;
    var GenericJSONDatasource;
    return {
        setters:[
            function (lodash_1_1) {
                lodash_1 = lodash_1_1;
            },
            function (target_1_1) {
                target_1 = target_1_1;
            },
            function (templating_utils_1_1) {
                templating_utils_1 = templating_utils_1_1;
            }],
        execute: function() {
            GenericJSONDatasource = (function () {
                function GenericJSONDatasource(instanceSettings, backendSrv, templateSrv, $q) {
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
                GenericJSONDatasource.prototype.query = function (options) {
                    var _this = this;
                    var templatingUtils = new templating_utils_1.TemplatingUtils(this.templateSrv, options.scopedVars);
                    var targetsRequests = lodash_1.default.chain(options.targets)
                        .map(function (target) {
                        var query = target.query;
                        query.refId = target.refId;
                        return query;
                    })
                        .map(function (target) { return templatingUtils.replaceObjectFlat(target, ["endpoint", "expression", "seriesName"]); })
                        .flatten()
                        .map(function (query) {
                        var request = {
                            method: query.method,
                            url: _this.url + query.endpoint,
                            withCredentials: _this.withCredentials
                        };
                        return {
                            request: request,
                            seriesName: query.seriesName === target_1.Target.REF_ID ? query.refId : query.seriesName,
                            valueEvaluator: _this.buildValueEvaluationFunction(query.expression, query.regex)
                        };
                    })
                        .value();
                    var inFlightRequests = {};
                    targetsRequests.forEach(function (request) {
                        var datasourceRequest = request.request;
                        var requestKey = _this.buildRequestKey(datasourceRequest);
                        if (!lodash_1.default.has(inFlightRequests, requestKey)) {
                            inFlightRequests[requestKey] = _this.backendSrv.datasourceRequest(datasourceRequest);
                        }
                    });
                    var runningRequests = lodash_1.default.map(targetsRequests, function (request) {
                        var datasourceRequest = request.request;
                        var requestKey = _this.buildRequestKey(datasourceRequest);
                        var runningRequest = inFlightRequests[requestKey];
                        return runningRequest
                            .then(function (result) {
                            return {
                                target: request.seriesName,
                                values: request.valueEvaluator(result)
                            };
                        })
                            .then(function (result) {
                            return _this.mapToDataPoints(result);
                        });
                    });
                    return this.$q.all(runningRequests)
                        .then(function (results) {
                        return {
                            data: lodash_1.default.flatten(results)
                        };
                    });
                };
                GenericJSONDatasource.prototype.metricFindQuery = function (query) {
                    throw new Error("Not implemented");
                };
                GenericJSONDatasource.prototype.buildRequestKey = function (request) {
                    return JSON.stringify(request.url + request.method);
                };
                GenericJSONDatasource.prototype.mapToDataPoints = function (result) {
                    var date = new Date().getTime();
                    if (lodash_1.default.isArray(result.values)) {
                        return {
                            datapoints: lodash_1.default.map(result.values, function (value) {
                                return [value, date];
                            }),
                            target: result.target
                        };
                    }
                    else {
                        return {
                            datapoints: [
                                [result.values, date]
                            ],
                            target: result.target
                        };
                    }
                };
                GenericJSONDatasource.prototype.buildValueEvaluationFunction = function (expression, regex) {
                    var _this = this;
                    return function (result) {
                        var value = _this.jmespath.search(result.data, expression);
                        if (lodash_1.default.isArray(value)) {
                            return lodash_1.default.map(value, function (v) { return _this.matchRegex(v, regex); });
                        }
                        return _this.matchRegex(value, regex);
                    };
                };
                GenericJSONDatasource.prototype.matchRegex = function (value, regex) {
                    if (typeof value === "string") {
                        return value.match(regex)[0];
                    }
                    return value;
                };
                return GenericJSONDatasource;
            })();
            exports_1("GenericJSONDatasource", GenericJSONDatasource);
        }
    }
});
//# sourceMappingURL=datasource.js.map