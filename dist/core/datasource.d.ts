export declare class GenericJSONDatasource {
    private type;
    private url;
    private withCredentials;
    private name;
    private basicAuth;
    private backendSrv;
    private templateSrv;
    private jmespath;
    constructor(instanceSettings: any, backendSrv: any, templateSrv: any);
    query(options: any): any;
    metricFindQuery(query: string): void;
}
