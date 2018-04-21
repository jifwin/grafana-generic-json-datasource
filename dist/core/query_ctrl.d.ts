import { QueryCtrl } from "app/plugins/sdk";
export declare class GenericJSONQueryCtrl extends QueryCtrl {
    private uiSegmentSrv;
    static templateUrl: string;
    private static MATCH_ALL_REGEX;
    methodSegment: any;
    private endpointSegment;
    private expressionSegment;
    private regexSegment;
    /** @ngInject **/
    constructor($scope: any, $injector: any, uiSegmentSrv: any);
    onMethodChange(): void;
    onEndpointChange(): void;
    onExpressionChange(): void;
    onRegexChange(): void;
    private onTargetChange(newTarget, oldTarget);
    private isTargetChanged(newTarget, oldTarget);
}
