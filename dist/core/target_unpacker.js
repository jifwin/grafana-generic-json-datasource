System.register(["lodash"], function(exports_1) {
    var lodash_1;
    var TargetUnpacker;
    return {
        setters:[
            function (lodash_1_1) {
                lodash_1 = lodash_1_1;
            }],
        execute: function() {
            TargetUnpacker = (function () {
                function TargetUnpacker(templatingUtils) {
                    this.templatingUtils = templatingUtils;
                }
                TargetUnpacker.prototype.unpack = function (target, property) {
                    return this.templatingUtils.replace(target[property])
                        .map(function (value) {
                        var clonedTarget = lodash_1.default.cloneDeep(target);
                        clonedTarget[property] = value;
                        return clonedTarget;
                    });
                };
                return TargetUnpacker;
            })();
            exports_1("TargetUnpacker", TargetUnpacker);
        }
    }
});
//# sourceMappingURL=target_unpacker.js.map