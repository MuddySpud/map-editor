import IState from "../../../../interfaces/state/IState";
import gStateCode from "../../../../global/code/gStateCode";


const branchesActions = {

    toggleShowStash: (state: IState): IState => {

        state.branchesState.stash.ui.showNode = state.branchesState.stash.ui.showNode === false;

        return gStateCode.cloneState(state);
    }
};

export default branchesActions;
