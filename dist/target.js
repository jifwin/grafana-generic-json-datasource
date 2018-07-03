System.register([], function(exports_1) {
    var Target;
    return {
        setters:[],
        execute: function() {
            Target = (function () {
                function Target() {
                    this.method = "GET";
                    this.endpoint = undefined;
                    this.expression = undefined;
                    this.regex = Target.MATCH_ALL_REGEX;
                    this.seriesName = Target.REF_ID;
                }
                Target.MATCH_ALL_REGEX = "(.*?)";
                Target.REF_ID = "__REF_ID";
                return Target;
            })();
            exports_1("Target", Target);
        }
    }
});
//# sourceMappingURL=target.js.map