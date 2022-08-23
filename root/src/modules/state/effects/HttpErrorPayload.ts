import IHttpErrorPayload from "../../interfaces/state/effects/IHttpErrorPayload";


export default class HttpErrorPayload implements IHttpErrorPayload {

    constructor(
        requestUrl: string,
        requestBody: any,
        callID: string,
        title: string,
        token: string | null) {
            
        this.requestUrl = requestUrl;
        this.requestBody = requestBody;
        this.callID = callID;
        this.title = title;
        this.token = token;
    }

    public requestUrl: string;
    public requestBody: any;
    public callID: string;
    public type: string = "httpError";
    public title: string;
    public token: string | null;
    public time: Date = new Date(Date.now());;
}
