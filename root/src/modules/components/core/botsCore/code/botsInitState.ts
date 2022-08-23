import IState from "../../../../interfaces/state/IState";
import IStateAnyArray from "../../../../interfaces/state/IStateAnyArray";
import { DisplayType } from "../../../../interfaces/enums/DisplayType";
import { IHttpFetchItem } from "../../../../interfaces/http/IHttpFetchItem";
import gBotFilterEffects from "../../../../global/effects/gBotFilterEffects";


const botsInitState = {

    initialiseBotsDisplay: (state: IState): IStateAnyArray => {

        const props: IHttpFetchItem | undefined = botsInitState.initialiseBotsDisplayProps(state);

        if (!props) {

            return state;
        }

        return [
            state,
            props
        ];
    },

    initialiseBotsDisplayProps: (state: IState): IHttpFetchItem | undefined => {

        state.displayType = DisplayType.Bots;
        state.loading = true;

        return gBotFilterEffects.autoFilter(state);
    }
};

export default botsInitState;

