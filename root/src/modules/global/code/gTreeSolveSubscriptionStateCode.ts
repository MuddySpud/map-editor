import IState from "../../interfaces/state/IState";


// This is where all alerts to data changes should be made
const gTreeSolveSubscriptionStateCode = {

    loadSubscriptions: (
        state: IState,
        rawSubscriptions: any): void => {

        if (!rawSubscriptions) {

            return;
        }

        state.subscriptionState.subscriptions = rawSubscriptions.subscriptions as Array<string>;
    }
};

export default gTreeSolveSubscriptionStateCode;

