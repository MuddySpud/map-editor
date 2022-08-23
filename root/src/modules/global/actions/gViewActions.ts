import IState from "../../interfaces/state/IState";
import IStateAnyArray from "../../interfaces/state/IStateAnyArray";
import gStateCode from "../code/gStateCode";
import gInitEffects from "../effects/gInitEffects";
import gViewEffects from "../effects/gViewEffects";


const gViewActions = {

    reloadLiveView: (state: IState): IStateAnyArray => {
       
        const treeKey: string = state.branchesState.tree.key as string;

        const reloadEffect = gInitEffects.getBranchesInitData(
            state,
            treeKey);

        return [
            gStateCode.cloneState(state),
            reloadEffect
        ];
    },

    clearLive: (state: IState): IStateAnyArray => {

        return [
            gStateCode.cloneState(state),
            gViewEffects.clearLiveAndReload(state)
        ];
    }
}

export default gViewActions;

