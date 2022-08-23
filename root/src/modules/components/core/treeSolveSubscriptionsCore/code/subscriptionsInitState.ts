import IState from "../../../../interfaces/state/IState";
import IStateAnyArray from "../../../../interfaces/state/IStateAnyArray";
import { DisplayType } from "../../../../interfaces/enums/DisplayType";
import { IHttpFetchItem } from "../../../../interfaces/http/IHttpFetchItem";
import gTreeSolveSubscriptionEffects from "../../../../global/effects/gTreeSolveSubscriptionEffects";


const subscriptionsInitState = {

    initialiseSubscriptionsDisplay: (state: IState): IStateAnyArray => {

        const props: IHttpFetchItem | undefined = subscriptionsInitState.initialiseSubscriptionsDisplayProps(state);

        if (!props) {

            return state;
        }

        return [
            state,
            props
        ];
    },

    initialiseSubscriptionsDisplayProps: (state: IState): IHttpFetchItem | undefined => {

        state.displayType = DisplayType.Trees;
        state.loading = true;

        return gTreeSolveSubscriptionEffects.getSubscriptions(state);
    }
};

export default subscriptionsInitState;

