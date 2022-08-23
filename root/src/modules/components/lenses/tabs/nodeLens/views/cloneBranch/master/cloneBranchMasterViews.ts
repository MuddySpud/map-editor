import { VNode } from "hyperapp-local";

import IState from "../../../../../../../interfaces/state/IState";
import { LensStage } from "../../../../../../../interfaces/enums/LensStage";
import cloneBranchTabViews from "../tab/cloneBranchTabViews";
import ILensMasterView from "../../../../../../../interfaces/views/ILensMasterView";
import IStageBehaviour from "../../../../../../../interfaces/behaviours/IStageBehaviour";
import selectTargetTabViews from "../tab/selectTargetTabViews";
import selectBranchTabViews from "../tab/selectBranchTabViews";


class cloneBranchMasterViewsClass implements ILensMasterView {

    public getStageBehaviour(state: IState): IStageBehaviour {

        return state.lens.nodeTab.stageBehaviour;
    }

    public buildLensView(state: IState): VNode | null {

        if (!state
            || !state.lens.nodeTab.lensBranchTask) {

            return null;
        }

        const stage: LensStage = state.lens.nodeTab.stageBehaviour.getStage();

        if (stage === LensStage.SelectBranchTaskTarget) {

            return selectTargetTabViews.buildTabView(state);
        }
        else if (stage === LensStage.SelectBranchTaskOption) {

            return selectBranchTabViews.buildTabView(state);
        }
        else {

            return cloneBranchTabViews.buildTabView(state);
        }
    }
}

const cloneBranchMasterViews = new cloneBranchMasterViewsClass();

export default cloneBranchMasterViews;


