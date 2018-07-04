import { TemplatingUtils } from "./templating_utils";
export declare class TargetUnpacker {
    private templatingUtils;
    constructor(templatingUtils: TemplatingUtils);
    unpack(target: any, property: any): any[];
}
