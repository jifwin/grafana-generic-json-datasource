/// <reference path="node_modules/grafana-sdk-mocks/app/headers/common.d.ts" />
System.register(["./core/config_ctrl", "./core/datasource", "./core/query_ctrl", "./jmespath.min.js"], function(exports_1) {
    var config_ctrl_1, datasource_1, query_ctrl_1;
    var GenericJSONQueryOptionsCtrl;
    return {
        setters:[
            function (config_ctrl_1_1) {
                config_ctrl_1 = config_ctrl_1_1;
            },
            function (datasource_1_1) {
                datasource_1 = datasource_1_1;
            },
            function (query_ctrl_1_1) {
                query_ctrl_1 = query_ctrl_1_1;
            },
            function (_1) {}],
        execute: function() {
            GenericJSONQueryOptionsCtrl = (function () {
                function GenericJSONQueryOptionsCtrl() {
                }
                GenericJSONQueryOptionsCtrl.templateUrl = "partials/query.options.html";
                return GenericJSONQueryOptionsCtrl;
            })();
            exports_1("Datasource", datasource_1.GenericJSONDatasource);
            exports_1("QueryCtrl", query_ctrl_1.GenericJSONQueryCtrl);
            exports_1("ConfigCtrl", config_ctrl_1.GenericJSONConfigCtrl);
            exports_1("QueryOptionsCtrl", GenericJSONQueryOptionsCtrl);
        }
    }
});
//# sourceMappingURL=module.js.map