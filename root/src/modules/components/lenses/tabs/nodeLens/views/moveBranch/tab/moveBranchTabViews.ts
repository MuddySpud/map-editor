import { h, VNode } from "hyperapp-local";

import IBranchTask from "../../../../../../../interfaces/state/tree/IBranchTask";
import gBranchTaskCode from "../../../../../../../global/code/gBranchTaskCode";
import IState from "../../../../../../../interfaces/state/IState";
import branchTargetDetailsViews from "../../common/partial/branchTargetDetailsViews";
import moveBranchActions from "../../../actions/moveBranchActions";
import optionEditViews from "../../common/partial/optionEditViews";
import lensButtonsViews from "../../../../../lens/views/lensButtonsViews";
import moveBranchTitleViews from "../partial/moveBranchTitleViews";
import IStageBehaviour from "../../../../../../../interfaces/behaviours/IStageBehaviour";
import branchHubButtonViews from "../../common/partial/branchHubButtonViews";
import branchOptionDetailsViews from "../../common/partial/branchOptionDetailsViews";
import INodeLoader from "../../../../../../../interfaces/state/tree/INodeLoader";
import nodeActions from "../../../actions/nodeActions";

import '../../../scss/summary.scss';


const moveBranchTabViews = {

    buildTabView: (state: IState): VNode | null => {

        if (!state
            || !state.lens.nodeTab.lensBranchTask) {

            return null;
        }

        const branchTask: IBranchTask = state.lens.nodeTab.lensBranchTask as IBranchTask;
        const stageBehaviour: IStageBehaviour = state.lens.nodeTab.stageBehaviour as IStageBehaviour;
        const optionLoader: INodeLoader = state.lens.nodeTab.lensBranchTask.optionLoader;
        const targetLoader: INodeLoader = branchTask.targetLoader;

        gBranchTaskCode.validateTabForBranchTask(
            state,
            state.lens.nodeTab
        );

        const targetKey: string = targetLoader.ui.recognised === true ? targetLoader.key ?? '' : '';
        let optionKey: string = '';
        let optionToken: string = '';
        let nodeExists: boolean = optionLoader.ui.recognised === true;
        let newOrder: number = optionLoader.node?.order as number;

        if (nodeExists) {

            optionKey = optionLoader.key;
            optionToken = optionLoader.token;
        }

        const view: VNode =

            h("div", { id: "branchTaskLensView" }, [
                h("div", { id: "branchTaskLens" }, [
                    h("div", { id: "summaryLens" }, [

                        ...moveBranchTitleViews.buildTitleView(
                            state,
                            optionToken,
                            optionKey,
                            nodeExists,
                            targetKey,
                            stageBehaviour),

                        h("h4", { class: "explain" }, "3. Review and save"),
                        h("div", { class: "sub-icons" }, [
                            h("div", { class: "properties-icon" }, ""),
                            h("div", { class: "review-icon" }, "")
                        ]),

                        h("div", { class: "summary" }, [
                            h("div", { class: "hub" }, [
                                h("div", { class: "hub-left" }, ""),
                                h("div", { class: "hub-right" }, [

                                    branchHubButtonViews.buildHubButtons(),
                                ]),
                            ]),

                            ...branchOptionDetailsViews.buildOptionDetailsView(branchTask.optionLoader),
                            ...branchTargetDetailsViews.buildTargetDetailsView(branchTask.targetLoader),
                            ...branchTargetDetailsViews.buildOriginDetailsView(branchTask.optionLoader.node?.parent),

                            optionEditViews.buildOptionView(
                                branchTask.optionLoader.node,
                                newOrder
                            ),

                            lensButtonsViews.buildSaveCancelView(
                                state.lens.nodeTab,
                                moveBranchActions.save,
                                nodeActions.cancel,
                                "Go to next step",
                                "Next button disabled as the node state is either unchanged or invalid",
                                "Cancel and clear the node lens"
                            )
                        ])
                    ])
                ])
            ]);

        return view;
    }
};

export default moveBranchTabViews;


