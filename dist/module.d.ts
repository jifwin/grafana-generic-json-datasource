/// <reference path="node_modules/grafana-sdk-mocks/app/headers/common.d.ts" />
import { GenericJSONConfigCtrl } from "./core/config_ctrl";
import { GenericJSONDatasource } from "./core/datasource";
import { GenericJSONQueryCtrl } from "./core/query_ctrl";
declare class GenericJSONQueryOptionsCtrl {
    static templateUrl: string;
}
export { GenericJSONDatasource as Datasource, GenericJSONQueryCtrl as QueryCtrl, GenericJSONConfigCtrl as ConfigCtrl, GenericJSONQueryOptionsCtrl as QueryOptionsCtrl };
