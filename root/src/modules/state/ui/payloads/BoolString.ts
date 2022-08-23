

export default class BoolString {

    constructor(
        stringValue: string,
        booleanValue: boolean) {
            
            this.classNames = stringValue;
            this.success = booleanValue;
        }

    public classNames: string;
    public success: boolean;
}
