import IState from "../../../../interfaces/state/IState";
import IStateAnyArray from "../../../../interfaces/state/IStateAnyArray";
import { DisplayType } from "../../../../interfaces/enums/DisplayType";
import gTreeFilterEffects from "../../../../global/effects/gTreeFilterEffects";
import { IHttpFetchItem } from "../../../../interfaces/http/IHttpFetchItem";


const treesInitState = {

    initialiseTreesDisplay: (state: IState): IStateAnyArray => {

        const props: IHttpFetchItem | undefined = treesInitState.initialiseTreesDisplayProps(state);

        if (!props) {

            return state;
        }

        return [
            state,
            props
        ];
    },

    initialiseTreesDisplayProps: (state: IState): IHttpFetchItem | undefined => {

        state.displayType = DisplayType.Trees;
        state.loading = true;

        return gTreeFilterEffects.autoFilter(state);
    }
};

export default treesInitState;

