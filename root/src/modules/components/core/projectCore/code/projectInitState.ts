import IState from "../../../../interfaces/state/IState";
import IStateAnyArray from "../../../../interfaces/state/IStateAnyArray";
import { DisplayType } from "../../../../interfaces/enums/DisplayType";
import gInitEffects from "../../../../global/effects/gInitEffects";


const prepareForInitialise = (state: IState): void => {

    state.displayType = DisplayType.Project;
    state.loading = true;
};

const projectInitState = {

    initialiseProjectDisplay: (
        state: IState,
        treeKey: string): IStateAnyArray => {

        prepareForInitialise(state);

        return [
            state,
            gInitEffects.getProjectInitData(
                state,
                treeKey)
        ];
    },
};

export default projectInitState;

