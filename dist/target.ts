export class Target {
    public static MATCH_ALL_REGEX = "(.*?)";
    public static REF_ID = "__REF_ID";

    public method: string = "GET";
    public endpoint: string = undefined;
    public expression: string = undefined;
    public regex: string = Target.MATCH_ALL_REGEX;
    public seriesName: string = Target.REF_ID;
}
