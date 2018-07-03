import { QueryCtrl } from "app/plugins/sdk";
export declare class GenericJSONQueryCtrl extends QueryCtrl {
    private uiSegmentSrv;
    static templateUrl: string;
    methodSegment: any;
    private endpointSegment;
    private expressionSegment;
    private regexSegment;
    private seriesNameSegment;
    /** @ngInject **/
    constructor($scope: any, $injector: any, uiSegmentSrv: any);
    onMethodChange(): void;
    onEndpointChange(): void;
    onExpressionChange(): void;
    onSeriesNameChange(): void;
    onRegexChange(): void;
    private onTargetChange(newTarget, oldTarget);
    private isTargetChanged(newTarget, oldTarget);
}
