/// <reference path="node_modules/grafana-sdk-mocks/app/headers/common.d.ts" />

import {GenericJSONConfigCtrl} from "./core/config_ctrl";
import {GenericJSONDatasource} from "./core/datasource";
import {GenericJSONQueryCtrl} from "./core/query_ctrl";
import "./jmespath.min.js";

class GenericJSONQueryOptionsCtrl {
    public static templateUrl = "partials/query.options.html";
}

export {
    GenericJSONDatasource as Datasource,
    GenericJSONQueryCtrl as QueryCtrl,
    GenericJSONConfigCtrl as ConfigCtrl,
    GenericJSONQueryOptionsCtrl as QueryOptionsCtrl
};
