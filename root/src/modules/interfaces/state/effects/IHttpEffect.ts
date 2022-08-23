import IState from "../IState";
import IStateAnyArray from "../IStateAnyArray";

export default interface IHttpEffect {
    
    name: string;
    token: string | null;
    url: string;
    getDataDelegate: ((state: IState) => { body: any, callID: string, callChain: Array<string>, success: boolean }) | null;
    actionDelegate: (state: IState, response: any) => IStateAnyArray;
    requestBody: any;
}
