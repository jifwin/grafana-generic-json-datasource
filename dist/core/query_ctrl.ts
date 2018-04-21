import {QueryCtrl} from "app/plugins/sdk";
import {Target} from "../target";

export class GenericJSONQueryCtrl extends QueryCtrl {
    public static templateUrl = "partials/query.editor.html";
    private static MATCH_ALL_REGEX = "(.*?)";
    public methodSegment: any;
    private endpointSegment: any;
    private expressionSegment: any;
    private regexSegment: any;

    /** @ngInject **/
    constructor($scope, $injector, private uiSegmentSrv) {
        super($scope, $injector);
        $scope.$watch("ctrl.target.query", this.onTargetChange.bind(this), true);
        this.target.query = this.target.query || new Target();
        this.methodSegment = uiSegmentSrv.newSegment(this.target.query.method || "GET");
        this.endpointSegment = uiSegmentSrv.newSegment(this.target.query.endpoint || "endpoint");
        this.expressionSegment = uiSegmentSrv.newSegment(this.target.query.expression || "expression");
        this.regexSegment = uiSegmentSrv.newSegment(this.target.query.regex || GenericJSONQueryCtrl.MATCH_ALL_REGEX);
    }

    public onMethodChange() {
        this.target.query.method = this.methodSegment.value;
    }

    public onEndpointChange() {
        this.target.query.endpoint = this.endpointSegment.value;
    }

    public onExpressionChange() {
        this.target.query.expression = this.expressionSegment.value;
    }

    public onRegexChange() {
        this.target.query.regex = this.regexSegment.value;
    }

    private onTargetChange(newTarget, oldTarget) {
        if (this.isTargetChanged(newTarget, oldTarget)) {
            this.refresh();
        }
    }

    private isTargetChanged(newTarget, oldTarget) {
        return JSON.stringify(newTarget) !== JSON.stringify(oldTarget);
    }
}
