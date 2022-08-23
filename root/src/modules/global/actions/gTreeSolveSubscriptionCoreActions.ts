import IState from "../../interfaces/state/IState";
import IStateAnyArray from "../../interfaces/state/IStateAnyArray";
import gStateCode from "../code/gStateCode";
import gLensCode from "../code/gLensCode";
import gFilterCode from "../code/gFilterCode";
import gTreeSolveSubscriptionStateCode from "../code/gTreeSolveSubscriptionStateCode";


const gTreeSolveSubscriptionCoreActions = {

    loadSubscriptions: (
        state: IState,
        response: any): IStateAnyArray => {

        if (!response?.jsonData) {

            return state;
        }

        gLensCode.checkResponse(
            state,
            response.jsonData
        );

        if (!gFilterCode.checkResponseCurrent(state, response.jsonData)) {

            return gStateCode.cloneState(state);
        }

        gTreeSolveSubscriptionStateCode.loadSubscriptions(
            state,
            response.jsonData
        );

        state.loading = false;

        if (state.subscriptionState.subscriptions?.length === 1) {

            // If only one subscription select it automatically
            state.subscriptionState.subscriptionID = state.subscriptionState.subscriptions[0];
        }

        return gStateCode.cloneState(state);
    }
};

export default gTreeSolveSubscriptionCoreActions;
