System.register(["lodash"], function(exports_1) {
    var lodash_1;
    var TemplatingUtils;
    return {
        setters:[
            function (lodash_1_1) {
                lodash_1 = lodash_1_1;
            }],
        execute: function() {
            TemplatingUtils = (function () {
                function TemplatingUtils(templateSrv, scopedVars) {
                    if (scopedVars === void 0) { scopedVars = {}; }
                    this.templateSrv = templateSrv;
                    this.scopedVars = scopedVars;
                }
                TemplatingUtils.prototype.replaceCartesian = function (expression) {
                    var replacedExpression = this.templateSrv.replace(expression, this.scopedVars);
                    var matchedMultiValues = replacedExpression.match(TemplatingUtils.MULTI_VALUE_REGEX);
                    if (!lodash_1.default.isNil(matchedMultiValues)) {
                        var replacedValues = [replacedExpression];
                        matchedMultiValues.forEach(function (multiValue) {
                            var values = multiValue.replace(TemplatingUtils.MULTI_VALUE_BOUNDARIES, "")
                                .split(TemplatingUtils.MULTI_VALUE_SEPARATOR);
                            replacedValues = lodash_1.default.flatMap(values, function (value) {
                                return replacedValues.map(function (replacedValue) {
                                    return replacedValue.replace(multiValue, value);
                                });
                            });
                        });
                        return replacedValues;
                    }
                    return [replacedExpression];
                };
                TemplatingUtils.prototype.replaceFlat = function (expression) {
                    var replacedExpression = this.templateSrv.replace(expression, this.scopedVars);
                    var matchedMultiValues = lodash_1.default.uniq(replacedExpression.match(TemplatingUtils.MULTI_VALUE_REGEX));
                    if (!lodash_1.default.isNil(matchedMultiValues)) {
                        var replacedValues = [replacedExpression];
                        matchedMultiValues.forEach(function (multiValue) {
                            var values = multiValue.replace(TemplatingUtils.MULTI_VALUE_BOUNDARIES, "")
                                .split(TemplatingUtils.MULTI_VALUE_SEPARATOR);
                            replacedValues = lodash_1.default.flatMap(values, function (value) {
                                return replacedValues.map(function (replacedValue) {
                                    return replacedValue.replace(new RegExp(multiValue, "g"), value);
                                });
                            });
                        });
                        return replacedValues;
                    }
                    return [replacedExpression];
                };
                TemplatingUtils.prototype.replaceObjectFlat = function (object, properties) {
                    var _this = this;
                    var replacedObject = lodash_1.default.cloneDeep(object);
                    properties.forEach(function (property) {
                        replacedObject[property] = _this.templateSrv.replace(object[property], _this.scopedVars);
                    });
                    var matchedMultiValues = lodash_1.default.chain(properties)
                        .map(function (property) { return replacedObject[property]; })
                        .map(function (value) {
                        var matched = value.match(TemplatingUtils.MULTI_VALUE_REGEX);
                        if (lodash_1.default.isArray(matched)) {
                            return matched[0];
                        }
                        return matched;
                    })
                        .filter(function (value) {
                        return !lodash_1.default.isNil(value);
                    })
                        .uniq()
                        .value();
                    var replacedObjects = [replacedObject];
                    matchedMultiValues.forEach(function (multiValue) {
                        var values = multiValue.replace(TemplatingUtils.MULTI_VALUE_BOUNDARIES, "")
                            .split(TemplatingUtils.MULTI_VALUE_SEPARATOR);
                        replacedObjects = lodash_1.default.flatMap(values, function (value) {
                            return replacedObjects.map(function (currentReplacedObject) {
                                var replacedObjectCopy = lodash_1.default.cloneDeep(currentReplacedObject);
                                properties.forEach(function (currentProperty) {
                                    replacedObjectCopy[currentProperty] = currentReplacedObject[currentProperty].replace(multiValue, value);
                                });
                                return replacedObjectCopy;
                            });
                        });
                    });
                    return replacedObjects;
                };
                TemplatingUtils.MULTI_VALUE_SEPARATOR = ",";
                TemplatingUtils.MULTI_VALUE_REGEX = /{.*?}/g;
                TemplatingUtils.MULTI_VALUE_BOUNDARIES = /[{}]/g;
                return TemplatingUtils;
            })();
            exports_1("TemplatingUtils", TemplatingUtils);
        }
    }
});
//# sourceMappingURL=templating_utils.js.map