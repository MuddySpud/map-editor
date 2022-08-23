import { VNode } from "hyperapp-local";

import IState from "../../../../../../../interfaces/state/IState";
import { LensStage } from "../../../../../../../interfaces/enums/LensStage";
import branchToSubtreeTabViews from "../tab/branchToSubtreeTabViews";
import ILensMasterView from "../../../../../../../interfaces/views/ILensMasterView";
import IStageBehaviour from "../../../../../../../interfaces/behaviours/IStageBehaviour";
import gStageActions from "../../../../../../../global/actions/gStageActions";
import lowerBoundaryViews from "../tab/lowerBoundaryTabViews";
import ISubtreeLoader from "../../../../../../../interfaces/state/tree/ISubtreeLoader";
import selectLimitsViews from "../tab/selectLimitsTabViews";
import selectBranchTabViews from "../tab/selectBranchTabViews";
import createSubtreeTabViews from "../tab/createSubtreeTabViews";
import createTreeTabViews from "../tab/createTreeTabViews";
import INodeLoader from "../../../../../../../interfaces/state/tree/INodeLoader";
import nodeActions from "../../../actions/nodeActions";


class branchToSubtreeMasterViewsClass implements ILensMasterView {

    public getStageBehaviour(state: IState): IStageBehaviour {

        return state.lens.nodeTab.stageBehaviour;
    }

    public buildLensView(state: IState): VNode | null {

        if (!state
            || !state.lens.nodeTab.lensBranchTreeTask) {
                
            return null;
        }

        const stage: LensStage = state.lens.nodeTab.stageBehaviour.getStage();
        const subtreeLoader: ISubtreeLoader = state.lens.nodeTab.lensBranchTreeTask.subtreeLoader;
        const optionLoader: INodeLoader = state.lens.nodeTab.lensBranchTreeTask.socketLoader;
        const optionKey: string = optionLoader.ui.recognised === true ? optionLoader.key : '';

        if (stage === LensStage.SelectBranchTaskOption) {

            return selectBranchTabViews.buildLensView(state);
        }
        else if (stage === LensStage.CreateTree) {

            return createTreeTabViews.buildTabView(
                state,
                optionKey,
                subtreeLoader.subtree.tree,
                state.lens.nodeTab,
                gStageActions.nextStage,
                nodeActions.cancel
            );
        }
        else if (stage === LensStage.CreateSubtree) {

            return createSubtreeTabViews.buildTabView(
                optionKey,
                subtreeLoader.subtree,
                state.lens.nodeTab,
                gStageActions.nextStage,
                nodeActions.cancel
            );
        }
        else if (stage === LensStage.CreateSubtreeLowerBoundaries) {

            return lowerBoundaryViews.buildTabView(
                state,
                optionKey);
        }
        else if (stage === LensStage.SelectBranchTaskLimit) {

            return selectLimitsViews.buildTabView(
                state,
                optionKey,
                subtreeLoader
            );
        }
        else {

            return branchToSubtreeTabViews.buildTabView(
                state,
                optionKey);
        }
    }
}

const branchToSubtreeMasterViews = new branchToSubtreeMasterViewsClass();

export default branchToSubtreeMasterViews;

