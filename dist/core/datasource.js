System.register([], function(exports_1) {
    var GenericJSONDatasource;
    return {
        setters:[],
        execute: function() {
            GenericJSONDatasource = (function () {
                function GenericJSONDatasource(instanceSettings, backendSrv, templateSrv) {
                    this.type = instanceSettings.type;
                    this.url = instanceSettings.url;
                    this.name = instanceSettings.name;
                    this.withCredentials = instanceSettings.withCredentials;
                    this.basicAuth = instanceSettings.basicAuth;
                    this.backendSrv = backendSrv;
                    this.templateSrv = templateSrv;
                    this.jmespath = eval("jmespath");
                }
                GenericJSONDatasource.prototype.query = function (options) {
                    var _this = this;
                    if (options.targets.length > 1) {
                        throw new Error("Generic JSON datasource supports only single target");
                    }
                    var query = options.targets[0].query;
                    var request = {
                        method: query.method,
                        url: this.url + query.endpoint,
                        withCredentials: this.withCredentials
                    };
                    return this.backendSrv.datasourceRequest(request)
                        .then(function (response) { return response.data; })
                        .then(function (data) { return _this.jmespath.search(data, query.expression); })
                        .then(function (result) { return query.regex ? result.match(query.regex)[0] : result; })
                        .then(function (result) {
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
                };
                GenericJSONDatasource.prototype.metricFindQuery = function (query) {
                    throw new Error("Not implemented");
                };
                return GenericJSONDatasource;
            })();
            exports_1("GenericJSONDatasource", GenericJSONDatasource);
        }
    }
});
//# sourceMappingURL=datasource.js.map