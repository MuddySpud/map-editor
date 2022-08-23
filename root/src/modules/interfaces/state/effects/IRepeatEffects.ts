import IHttpEffect from "./IHttpEffect";


export default interface IRepeatEffects {
    
    shortIntervalHttp: Array<IHttpEffect>;
    reLoadPostHttp: Array<IHttpEffect>;
    reLoadPostHttpImmediate: Array<IHttpEffect>;
}
