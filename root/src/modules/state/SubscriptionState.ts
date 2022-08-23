import ISubscriptionState from "../interfaces/state/ISubscriptionState";


export default class SubscriptionState implements ISubscriptionState {
    
    public subscriptionID: string = "";
    public subscriptions: Array<string> = [];
    public showSubscriptions: boolean = false;
}
