import _ from "lodash";

export class TemplatingUtils {
    public static MULTI_VALUE_SEPARATOR: string = ",";
    private static MULTI_VALUE_REGEX: RegExp = /{.*?}/g;
    private static MULTI_VALUE_BOUNDARIES: RegExp = /[{}]/g;
    private templateSrv: any;
    private scopedVars: any;

    constructor(templateSrv: any, scopedVars: any = {}) {
        this.templateSrv = templateSrv;
        this.scopedVars = scopedVars;
    }

    public replaceCartesian(expression: string): string[] {
        const replacedExpression = this.templateSrv.replace(expression, this.scopedVars);
        const matchedMultiValues = replacedExpression.match(TemplatingUtils.MULTI_VALUE_REGEX);

        if (!_.isNil(matchedMultiValues)) {
            let replacedValues = [replacedExpression];
            matchedMultiValues.forEach((multiValue) => {
                const values = multiValue.replace(TemplatingUtils.MULTI_VALUE_BOUNDARIES, "")
                    .split(TemplatingUtils.MULTI_VALUE_SEPARATOR);
                replacedValues = _.flatMap(values, (value) => {
                    return replacedValues.map((replacedValue) => {
                        return replacedValue.replace(multiValue, value);
                    });
                });
            });
            return replacedValues;
        }
        return [replacedExpression];
    }

    public replaceFlat(expression: string) {
        const replacedExpression = this.templateSrv.replace(expression, this.scopedVars);
        const matchedMultiValues = _.uniq(replacedExpression.match(TemplatingUtils.MULTI_VALUE_REGEX));

        if (!_.isNil(matchedMultiValues)) {
            let replacedValues = [replacedExpression];
            matchedMultiValues.forEach((multiValue) => {
                const values = multiValue.replace(TemplatingUtils.MULTI_VALUE_BOUNDARIES, "")
                    .split(TemplatingUtils.MULTI_VALUE_SEPARATOR);
                replacedValues = _.flatMap(values, (value) => {
                    return replacedValues.map((replacedValue) => {
                        return replacedValue.replace(new RegExp(multiValue, "g"), value);
                    });
                });
            });
            return replacedValues;
        }
        return [replacedExpression];
    }

    public replaceObjectFlat(object: any, properties: string[]) {

        const replacedObject = _.cloneDeep(object);
        properties.forEach((property) => {
            replacedObject[property] = this.templateSrv.replace(object[property], this.scopedVars);
        });

        const matchedMultiValues = _.chain(properties)
            .map((property) => replacedObject[property])
            .map((value) => {
                const matched = value.match(TemplatingUtils.MULTI_VALUE_REGEX);
                if (_.isArray(matched)) {
                    return matched[0];
                }
                return matched;
            })
            .filter((value) => {
                return !_.isNil(value);
            })
            .uniq()
            .value();

        let replacedObjects = [replacedObject];
        matchedMultiValues.forEach((multiValue) => {
            const values = multiValue.replace(TemplatingUtils.MULTI_VALUE_BOUNDARIES, "")
                .split(TemplatingUtils.MULTI_VALUE_SEPARATOR);
            replacedObjects = _.flatMap(values, (value) => {
                return replacedObjects.map((currentReplacedObject) => {
                    const replacedObjectCopy = _.cloneDeep(currentReplacedObject);
                    properties.forEach((currentProperty) => {
                        replacedObjectCopy[currentProperty] = currentReplacedObject[currentProperty].replace(multiValue, value);
                    });
                    return replacedObjectCopy;
                });
            });
        });

        return replacedObjects;
    }
}
