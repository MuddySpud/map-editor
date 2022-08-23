import { h, VNode } from "hyperapp-local";

import IState from "../../../../../../../interfaces/state/IState";
import IBranchTreeTask from "../../../../../../../interfaces/state/tree/IBranchTreeTask";
import IStageBehaviour from "../../../../../../../interfaces/behaviours/IStageBehaviour";
import INodeTab from "../../../../../../../interfaces/state/ui/tabs/INodeTab";
import lensButtonsViews from "../../../../../lens/views/lensButtonsViews";
import gStageActions from "../../../../../../../global/actions/gStageActions";
import gBranchTreeTaskCode from "../../../../../../../global/code/gBranchTreeTaskCode";
import lowerBoundaryViews from "../partial/lowerBoundaryViews";
import branchToSubtreeTreeTitleViews from "../partial/branchToSubtreeTreeTitleViews";
import nodeActions from "../../../actions/nodeActions";


const lowerBoundaryTabViews = {

    buildTabView: (
        state: IState,
        optionKey: string, ): VNode | null => {

        if (!state
            || !state.lens.nodeTab.lensBranchTreeTask) {

            return null;
        }

        const nodeTab: INodeTab = state.lens.nodeTab;
        const branchTreeTask: IBranchTreeTask = nodeTab.lensBranchTreeTask as IBranchTreeTask;
        const stageBehaviour: IStageBehaviour = nodeTab.stageBehaviour;

        gBranchTreeTaskCode.validateTabForLimits(
            state,
            nodeTab,
            branchTreeTask);

        const view: VNode =

            h("div", { id: "branchTaskLensView" }, [
                h("div", { id: "branchTaskLens" }, [
                    h("div", { id: "selectLimits" }, [

                        ...branchToSubtreeTreeTitleViews.buildBoundariesTitleView(
                            optionKey,
                            stageBehaviour
                        ),

                        lowerBoundaryViews.buildBoundaryTypeView(branchTreeTask),
                        lowerBoundaryViews.buildStSocketsView(branchTreeTask),

                        lensButtonsViews.buildNextCancelView(
                            state.lens.nodeTab,
                            gStageActions.nextStage,
                            nodeActions.cancel,
                            "Go to next step",
                            "Next button disabled as the node state is either unchanged or invalid",
                            "Cancel and clear the node lens"
                        )
                    ])
                ])
            ]);

        return view;
    }
};

export default lowerBoundaryTabViews;


