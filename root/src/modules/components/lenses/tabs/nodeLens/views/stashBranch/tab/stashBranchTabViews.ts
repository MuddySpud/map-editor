import { h, VNode } from "hyperapp-local";

import IState from "../../../../../../../interfaces/state/IState";
import branchOptionDetailsViews from "../../common/partial/branchOptionDetailsViews";
import branchTargetDetailsViews from "../../common/partial/branchTargetDetailsViews";
import optionEditViews from "../../common/partial/optionEditViews";
import lensButtonsViews from "../../../../../../../components/lenses/lens/views/lensButtonsViews";
import stashBranchTitleViews from "../partial/stashBranchTitleViews";
import IBranchTask from "../../../../../../../interfaces/state/tree/IBranchTask";
import IStageBehaviour from "../../../../../../../interfaces/behaviours/IStageBehaviour";
import INodeLoader from "../../../../../../../interfaces/state/tree/INodeLoader";
import gBranchTaskCode from "../../../../../../../global/code/gBranchTaskCode";
import gStashCode from "../../../../../../../global/code/gStashCode";
import stashBranchActions from "../../../actions/stashBranchActions";
import stashBranchHubButtonViews from "../partial/stashBranchHubButtonViews";
import buttonViews from "../../../../../../../components/lenses/lens/views/buttonViews";
import { StashType } from "../../../../../../../interfaces/enums/StashType";
import CssClasses from "../../../../../../../state/constants/CssClasses";
import nodeActions from "../../../actions/nodeActions";

import '../../../scss/summary.scss';


const stashBranchTabViews = {

    buildTabView: (state: IState): VNode | null => {

        if (!state
            || !state.lens.nodeTab.lensBranchTask) {

            return null;
        }

        const branchTask: IBranchTask = state.lens.nodeTab.lensBranchTask as IBranchTask;
        const stageBehaviour: IStageBehaviour = state.lens.nodeTab.stageBehaviour as IStageBehaviour;
        const optionLoader: INodeLoader = state.lens.nodeTab.lensBranchTask.optionLoader;

        gBranchTaskCode.validateTabForBranchTask(
            state,
            state.lens.nodeTab
        );

        const type: StashType = gStashCode.getStashType(state);
        const buttonText: string = `${type[0].toUpperCase() + type.slice(1)} branch to stash`;
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

                        ...stashBranchTitleViews.buildTitleView(
                            state,
                            optionToken,
                            optionKey,
                            nodeExists,
                            type,
                            stageBehaviour),

                        h("h4", { class: "explain" }, "3. Review and stash"),
                        h("div", { class: "sub-icons" }, [
                            h("div", { class: "properties-icon" }, ""),
                            h("div", { class: "review-icon" }, "")
                        ]),

                        h("div", { class: "summary" }, [
                            h("div", { class: "hub" }, [
                                h("div", { class: "hub-left" }, ""),
                                h("div", { class: "hub-right" }, [

                                    stashBranchHubButtonViews.buildHubButtons(),
                                ]),
                            ]),

                            buttonViews.buildTypeButtonView(
                                buttonText,
                                "Select whether to clone or move the branch to the stash",
                                CssClasses.yep,
                                stashBranchActions.toggleType
                            ),

                            ...branchOptionDetailsViews.buildOptionDetailsView(branchTask.optionLoader),
                            ...branchTargetDetailsViews.buildOriginDetailsView(branchTask.optionLoader.node?.parent),

                            optionEditViews.buildOptionView(
                                branchTask.optionLoader.node,
                                newOrder
                            ),

                            lensButtonsViews.buildSaveCancelView(
                                state.lens.nodeTab,
                                stashBranchActions.save,
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

export default stashBranchTabViews;


