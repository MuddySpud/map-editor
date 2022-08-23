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
import IBranchTask from "../../../../../../../interfaces/state/tree/IBranchTask";
import nodeActions from "../../../actions/nodeActions";


const selectTargetTabViews = {

    buildTabView: (state: IState): VNode | null => {

        if (!state
            || !state.lens.nodeTab.lensBranchTask) {

            return null;
        }

        const branchTask: IBranchTask = state.lens.nodeTab.lensBranchTask as IBranchTask;
        const stageBehaviour: IStageBehaviour = state.lens.nodeTab.stageBehaviour as IStageBehaviour;
        const optionLoader: INodeLoader = state.lens.nodeTab.lensBranchTask.optionLoader;
        const targetLoader: INodeLoader = branchTask.targetLoader;

        const raw: boolean =
            targetLoader.ui.raw
            && targetLoader.key.length === 0;

        if (targetLoader.ui.raw === true) {

            state.lens.nodeTab.enableSave = false;
            gSession.setFocusFilter(Filters.branchOptionKeyFocusFilter);
        }

        gBranchTaskCode.validateTabForSelectBranchTarget(
            state,
            state.lens.nodeTab,
            branchTask
        );

        const targetKey: string = targetLoader.ui.recognised === true ? targetLoader.key ?? '' : '';
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
                    h("div", { id: "selectTarget" }, [

                        ...moveBranchTitleViews.buildTargetTitleView(
                            state,
                            optionToken,
                            optionKey,
                            nodeExists,
                            targetKey,
                            state.lens.nodeTab,
                            stageBehaviour
                            ),

                        h("h4", { class: "explain" }, "2. Select the target discussion"),
                        h("div", { class: "sub-icons" }, [
                            h("div", { class: "properties-icon" }, ""),
                            h("div", { class: "target-icon" }, "")
                        ]),

                        selectNodeViews.buildTargetDetailsView(
                            state,
                            targetLoader,
                            "Select the target discussion",
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

export default selectTargetTabViews;


