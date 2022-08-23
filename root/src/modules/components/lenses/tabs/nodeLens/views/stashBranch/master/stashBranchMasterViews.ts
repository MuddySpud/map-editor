import { VNode } from "hyperapp-local";

import IState from "../../../../../../../interfaces/state/IState";
import stashBranchTabViews from "../tab/stashBranchTabViews";
import ILensMasterView from "../../../../../../../interfaces/views/ILensMasterView";
import IStageBehaviour from "../../../../../../../interfaces/behaviours/IStageBehaviour";
import { LensStage } from "../../../../../../../interfaces/enums/LensStage";
import selectBranchTabViews from "../tab/selectBranchTabViews";


class stashBranchMasterViewsClass implements ILensMasterView {

    public getStageBehaviour(state: IState): IStageBehaviour {

        return state.lens.nodeTab.stageBehaviour;
    }

    public buildLensView(state: IState): VNode | null {

        if (!state
            || !state.lens.nodeTab.lensBranchTask) {

            return null;
        }

        const stage: LensStage = state.lens.nodeTab.stageBehaviour.getStage();

        if (stage === LensStage.SelectBranchTaskOption) {

            return selectBranchTabViews.buildTabView(state);
        }
        else {

            return stashBranchTabViews.buildTabView(state);
        }
    }
}

const stashBranchMasterViews = new stashBranchMasterViewsClass();

export default stashBranchMasterViews;


