System.register(["app/plugins/sdk", "../target"], function(exports_1) {
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var sdk_1, target_1;
    var GenericJSONQueryCtrl;
    return {
        setters:[
            function (sdk_1_1) {
                sdk_1 = sdk_1_1;
            },
            function (target_1_1) {
                target_1 = target_1_1;
            }],
        execute: function() {
            GenericJSONQueryCtrl = (function (_super) {
                __extends(GenericJSONQueryCtrl, _super);
                /** @ngInject **/
                function GenericJSONQueryCtrl($scope, $injector, uiSegmentSrv) {
                    _super.call(this, $scope, $injector);
                    this.uiSegmentSrv = uiSegmentSrv;
                    $scope.$watch("ctrl.target.query", this.onTargetChange.bind(this), true);
                    this.target.query = this.target.query || new target_1.Target();
                    this.methodSegment = uiSegmentSrv.newSegment(this.target.query.method);
                    this.endpointSegment = uiSegmentSrv.newSegment(this.target.query.endpoint || "endpoint");
                    this.expressionSegment = uiSegmentSrv.newSegment(this.target.query.expression || "expression");
                    this.regexSegment = uiSegmentSrv.newSegment(this.target.query.regex);
                    this.seriesNameSegment = uiSegmentSrv.newSegment(this.target.query.seriesName);
                }
                GenericJSONQueryCtrl.prototype.onMethodChange = function () {
                    this.target.query.method = this.methodSegment.value;
                };
                GenericJSONQueryCtrl.prototype.onEndpointChange = function () {
                    this.target.query.endpoint = this.endpointSegment.value;
                };
                GenericJSONQueryCtrl.prototype.onExpressionChange = function () {
                    this.target.query.expression = this.expressionSegment.value;
                };
                GenericJSONQueryCtrl.prototype.onSeriesNameChange = function () {
                    this.target.query.seriesName = this.seriesNameSegment.value;
                };
                GenericJSONQueryCtrl.prototype.onRegexChange = function () {
                    this.target.query.regex = this.regexSegment.value;
                };
                GenericJSONQueryCtrl.prototype.onTargetChange = function (newTarget, oldTarget) {
                    if (this.isTargetChanged(newTarget, oldTarget)) {
                        this.refresh();
                    }
                };
                GenericJSONQueryCtrl.prototype.isTargetChanged = function (newTarget, oldTarget) {
                    return JSON.stringify(newTarget) !== JSON.stringify(oldTarget);
                };
                GenericJSONQueryCtrl.templateUrl = "partials/query.editor.html";
                return GenericJSONQueryCtrl;
            })(sdk_1.QueryCtrl);
            exports_1("GenericJSONQueryCtrl", GenericJSONQueryCtrl);
        }
    }
});
//# sourceMappingURL=query_ctrl.js.map