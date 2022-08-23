import IState from "../../../../interfaces/state/IState";
import U from "../../../../global/gUtilities";
import initActions from "../../../init/actions/initActions";
import IStateAnyArray from "../../../../interfaces/state/IStateAnyArray";
import gStateCode from "../../../../global/code/gStateCode";


const subscriptionCoreActions = {

    setSubscription: (
        state: IState,
        subscriptionName: string): IStateAnyArray => {

        if (!state
            || U.isNullOrWhiteSpace(subscriptionName)) {

            return state;
        }

        state.subscriptionState.subscriptionID = subscriptionName;

        if (state?.settings?.useVsCode === true) 
        {
            return initActions.initialiseWithoutAuthorisation(state);
        }

        return initActions.initialiseWithAuthorisation(state);
    },

    cancel: (state: IState): IStateAnyArray => {

        state.subscriptionState.showSubscriptions = false;

        return gStateCode.cloneState(state);
    },

    resetSubscription: (
        state: IState,
        subscriptionName: string): IStateAnyArray => {

        if (!state
            || U.isNullOrWhiteSpace(subscriptionName)) {

            return state;
        }

        gStateCode.resetState(state);
        state.subscriptionState.subscriptionID = subscriptionName;
        state.subscriptionState.showSubscriptions = false;

        if (state?.settings?.useVsCode === true) 
        {
            return initActions.initialiseWithoutAuthorisation(state);
        }

        return initActions.initialiseWithAuthorisation(state);
    }
};

export default subscriptionCoreActions;