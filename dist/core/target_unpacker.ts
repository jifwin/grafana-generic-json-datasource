import _ from "lodash";
import {TemplatingUtils} from "./templating_utils";

export class TargetUnpacker {
    private templatingUtils: TemplatingUtils;

    constructor(templatingUtils: TemplatingUtils) {
        this.templatingUtils = templatingUtils;
    }

    public unpack(target, property) {
        return this.templatingUtils.replace(target[property])
            .map((value) => {
                const clonedTarget = _.cloneDeep(target);
                clonedTarget[property] = value;
                return clonedTarget;
            });
    }
}
