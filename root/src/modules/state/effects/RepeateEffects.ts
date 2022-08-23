import IRepeatEffects from "../../interfaces/state/effects/IRepeatEffects";
import IHttpEffect from "../../interfaces/state/effects/IHttpEffect";


export default class RepeateEffects implements IRepeatEffects {

    public shortIntervalHttp: Array<IHttpEffect> = [];
    public reLoadPostHttp: Array<IHttpEffect> = [];
    public reLoadPostHttpImmediate: Array<IHttpEffect> = [];
}
