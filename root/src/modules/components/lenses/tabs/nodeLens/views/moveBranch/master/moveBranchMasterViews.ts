import { VNode } from "hyperapp-local";

import IState from "../../../../../../../interfaces/state/IState";
import ILensMasterView from "../../../../../../../interfaces/views/ILensMasterView";
import { LensStage } from "../../../../../../../interfaces/enums/LensStage";
import moveBranchTabViews from "../tab/moveBranchTabViews";
import IStageBehaviour from "../../../../../../../interfaces/behaviours/IStageBehaviour";
import selectBranchTabViews from "../tab/selectBranchTabViews";
import selectTargetTabViews from "../tab/selectTargetTabViews";


class moveBranchMasterViewsClass implements ILensMasterView {

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

            return moveBranchTabViews.buildTabView(state);
        }
    }
}

const moveBranchMasterViews = new moveBranchMasterViewsClass();

export default moveBranchMasterViews;

