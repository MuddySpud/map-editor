import IHttpEffect from "../../interfaces/state/effects/IHttpEffect";
import IState from "../../interfaces/state/IState";
import IStateAnyArray from "../../interfaces/state/IStateAnyArray";


export default class HttpEffect implements IHttpEffect {

    constructor(
        name: string,
        token: string | null,
        url: string,
        getDataDelegate: ((state: IState) => { body: any, callID: string, callChain: Array<string>, success: boolean }) | null,
        actionDelegate: (state: IState, response: any) => IStateAnyArray,
        requestBody: any = null) {

        this.name = name;
        this.token = token;
        this.url = url;
        this.getDataDelegate = getDataDelegate;
        this.actionDelegate = actionDelegate;
        this.requestBody = requestBody;
    }

    public name: string;
    public token: string | null;
    public url: string;
    public getDataDelegate: ((state: IState) => { body: any, callID: string, callChain: Array<string>, success: boolean }) | null;
    public actionDelegate: (state: IState, response: any) => IStateAnyArray;
    public requestBody: any;
}
