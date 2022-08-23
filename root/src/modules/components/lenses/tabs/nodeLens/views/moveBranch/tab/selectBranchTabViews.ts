import { h, VNode } from "hyperapp-local";

import IStageBehaviour from "../../../../../../../interfaces/behaviours/IStageBehaviour";
import IState from "../../../../../../../interfaces/state/IState";
import lensButtonsViews from "../../../../../lens/views/lensButtonsViews";
import gStageActions from "../../../../../../../global/actions/gStageActions";
import gBranchTaskCode from "../../../../../../../global/code/gBranchTaskCode";
import moveBranchTitleViews from "../partial/moveBranchTitleViews";
import selectNodeViews from "../../common/partial/selectNodeViews";
import INodeLoader from "../../../../../../../interfaces/state/tree/INodeLoader";
import gSession from "../../../../../../../global/gSession";
import Filters from "../../../../../../../state/constants/Filters";
import nodeActions from "../../../actions/nodeActions";


const selectBranchTabViews = {

    buildTabView: (state: IState): VNode | null => {

        if (!state
            || !state.lens.nodeTab.lensBranchTask) {

            return null;
        }

        const optionLoader: INodeLoader = state.lens.nodeTab.lensBranchTask.optionLoader;
        const stageBehaviour: IStageBehaviour = state.lens.nodeTab.stageBehaviour as IStageBehaviour;

        const raw: boolean =
            optionLoader.ui.raw
            && optionLoader.key.length === 0;

        if (optionLoader.ui.raw === true) {

            state.lens.nodeTab.enableSave = false;
            gSession.setFocusFilter(Filters.branchOptionKeyFocusFilter);
        }

        gBranchTaskCode.validateTabForSelectBranchOption(
            state,
            state.lens.nodeTab,
            optionLoader
        );

        let optionKey: string = '';
        let optionToken: string = '';
        let nodeExists: boolean = optionLoader.ui.recognised === true;

        if (nodeExists) {

            optionKey = optionLoader.key;
            optionToken = optionLoader.token;
        }

        const editView: VNode =

            h("div", { id: "branchTaskLensView" }, [
                h("div", { id: "branchTaskLens" }, [
                    h("div", { id: "selectBranch" }, [

                        ...moveBranchTitleViews.buildOptionTitleView(
                            state,
                            optionToken,
                            optionKey,
                            nodeExists,
                            state.lens.nodeTab,
                            stageBehaviour
                        ),

                        h("h4", { class: "explain" }, "1. Select the option to be moved"),
                        h("div", { class: "sub-icons" }, [
                            h("div", { class: "properties-icon" }, ""),
                            h("div", { class: "discussion-icon" }, "")
                        ]),

                        selectNodeViews.buildOptionDetailsView(
                            state,
                            optionLoader,
                            "Select the option to move",
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


