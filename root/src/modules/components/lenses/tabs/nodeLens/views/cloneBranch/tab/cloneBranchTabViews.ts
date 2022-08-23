import { h, VNode } from "hyperapp-local";

import IBranchTask from "../../../../../../../interfaces/state/tree/IBranchTask";
import gBranchTaskCode from "../../../../../../../global/code/gBranchTaskCode";
import IState from "../../../../../../../interfaces/state/IState";
import branchTargetDetailsViews from "../../common/partial/branchTargetDetailsViews";
import cloneBranchActions from "../../../actions/cloneBranchActions";
import optionEditViews from "../../common/partial/optionEditViews";
import lensButtonsViews from "../../../../../lens/views/lensButtonsViews";
import IStageBehaviour from "../../../../../../../interfaces/behaviours/IStageBehaviour";
import cloneBranchTitleViews from "../partial/cloneBranchTitleViews";
import branchHubButtonViews from "../../common/partial/branchHubButtonViews";
import branchOptionDetailsViews from "../../common/partial/branchOptionDetailsViews";
import INodeLoader from "../../../../../../../interfaces/state/tree/INodeLoader";
import nodeActions from "../../../actions/nodeActions";

import '../../../scss/summary.scss';


const cloneBranchTabViews = {

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
        let nodeExists: boolean = optionLoader.ui.recognised === true;
        let newOrder: number = optionLoader.node?.order as number;

        const view: VNode =

            h("div", { id: "branchTaskLensView" }, [
                h("div", { id: "branchTaskLens" }, [
                    h("div", { id: "summaryLens" }, [

                        ...cloneBranchTitleViews.buildTitleView(
                            state,
                            optionLoader.token,
                            optionLoader.key,
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
                                cloneBranchActions.save,
                                nodeActions.cancel,
                                "Save the node and options",
                                "Save button disabled as the node state is either unchanged or invalid",
                                "Delete the node and its descendants"
                            )
                        ])
                    ])
                ])
            ]);

        return view;
    }
};

export default cloneBranchTabViews;


