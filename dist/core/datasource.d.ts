export declare class GenericJSONDatasource {
    private type;
    private url;
    private withCredentials;
    private name;
    private basicAuth;
    private backendSrv;
    private templateSrv;
    private jmespath;
    private $q;
    constructor(instanceSettings: any, backendSrv: any, templateSrv: any, $q: any);
    query(options: any): any;
    metricFindQuery(query: string): void;
    private buildRequestKey(request);
    private mapToDataPoints(result);
    private buildEvaluationFunction(expression, regex);
    private matchRegex(value, regex);
}
