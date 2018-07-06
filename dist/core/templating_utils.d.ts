export declare class TemplatingUtils {
    static MULTI_VALUE_SEPARATOR: string;
    private static MULTI_VALUE_REGEX;
    private static MULTI_VALUE_BOUNDARIES;
    private templateSrv;
    private scopedVars;
    constructor(templateSrv: any, scopedVars?: any);
    replaceCartesian(expression: string): string[];
    replaceFlat(expression: string): any[];
    replaceObjectFlat(object: any, properties: string[]): any[];
}
