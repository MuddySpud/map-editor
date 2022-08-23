import { h, VNode } from "hyperapp-local";

import IStageBehaviour from "../../../../../../../interfaces/behaviours/IStageBehaviour";
import IState from "../../../../../../../interfaces/state/IState";
import INodeLoader from "../../../../../../../interfaces/state/tree/INodeLoader";
import gBranchTreeTaskCode from "../../../../../../../global/code/gBranchTreeTaskCode";
import branchToSubtreeTreeTitleViews from "../partial/branchToSubtreeTreeTitleViews";
import lensButtonsViews from "../../../../../lens/views/lensButtonsViews";
import gStageActions from "../../../../../../../global/actions/gStageActions";
import selectNodeViews from "../../common/partial/selectNodeViews";
import branchTaskActions from "../../../actions/branchTaskActions";
import gSession from "../../../../../../../global/gSession";
import Filters from "../../../../../../../state/constants/Filters";
import nodeActions from "../../../actions/nodeActions";


const selectBranchTabViews = {

    buildLensView: (state: IState): VNode | null => {

        if (!state
            || !state.lens.nodeTab.lensBranchTreeTask) {

            return null;
        }

        const optionLoader: INodeLoader = state.lens.nodeTab.lensBranchTreeTask.socketLoader;
        const stageBehaviour: IStageBehaviour = state.lens.nodeTab.stageBehaviour as IStageBehaviour;

        const raw: boolean =
            optionLoader.ui.raw
            && optionLoader.key.length === 0;

        if (optionLoader.ui.raw === true) {

            state.lens.nodeTab.enableSave = false;
            gSession.setFocusFilter(Filters.branchOptionKeyFocusFilter);
        }

        gBranchTreeTaskCode.validateTabForSelectBranchOption(
            state,
            state.lens.nodeTab,
            optionLoader
        );

        const optionKey: string = optionLoader.ui.recognised === true ? optionLoader.key : '';

        const editView: VNode =

            h("div", { id: "branchTaskLensView" }, [
                h("div", { id: "branchTaskLens" }, [
                    h("div", { id: "selectRoot" }, [

                        ...branchToSubtreeTreeTitleViews.buildOptionTitleView(
                            optionKey,
                            state.lens.nodeTab,
                            stageBehaviour,
                            branchTaskActions.enableOptionClickSelect
                        ),

                        selectNodeViews.buildRootDetailsView(
                            state,
                            optionLoader,
                            "Click an option to be the subtree root",
                            raw
                        ),

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

        return editView;
    }
};

export default selectBranchTabViews;


