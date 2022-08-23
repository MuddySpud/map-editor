import IValidationCircularRefResult from "../../interfaces/state/notifications/IValidationCircularRefResult";


export default class ValidationCircularRefResult implements IValidationCircularRefResult {

    constructor(
        id: number,
        success: boolean,
        tokenChain: Array<string>) {

        this.id = id;
        this.success = success;
        this.tokenChain = tokenChain;
    }

    public id: number;
    public success: boolean;
    public tokenChain: Array<string>;
}

