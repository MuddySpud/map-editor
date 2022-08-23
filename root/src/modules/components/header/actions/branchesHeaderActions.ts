import IState from "../../../interfaces/state/IState";
import gStateCode from "../../../global/code/gStateCode";


const branchesHeaderActions = {

    toggleMinimiseTreeDescription: (state: IState): IState => {

        state.branchesState.treeDetailsMinimised = state.branchesState.treeDetailsMinimised !== true;

        return gStateCode.cloneState(state);
    }
};

export default branchesHeaderActions;
