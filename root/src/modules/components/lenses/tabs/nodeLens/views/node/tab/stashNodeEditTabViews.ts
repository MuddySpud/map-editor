import { h, VNode } from "hyperapp-local";

import IState from "../../../../../../../interfaces/state/IState";
import nodeActions from "../../../actions/nodeActions";
import gNodeCode from "../../../../../../../global/code/gNodeCode";
import lensButtonsViews from "../../../../../lens/views/lensButtonsViews";
import INode from "../../../../../../../interfaces/state/tree/INode";
import ILensUI from "../../../../../../../interfaces/state/ui/UIs/ILensUI";
import typeViews from "../partial/typeViews";
import { NodeType } from "../../../../../../../interfaces/enums/NodeType";
import nodeTitleViews from "../partial/nodeTitleViews";
import wayPointViews from "../../../../../reserves/views/wayPointViews";


const stashNodeEditTabViews = {

    buildTabView(state: IState): VNode | null {

        if (!state
            || !state.lens.nodeTab.lensNode) {

            return null;
        }

        const getTitleView = (): VNode[] => {

            if (lensNode.type === NodeType.Solution) {

                return nodeTitleViews.buildEditStashSolutionTitleView();
            }

            return nodeTitleViews.buildEditStashDiscussionTitleView();
        };

        const lensNode: INode<ILensUI> = state.lens.nodeTab.lensNode;
        gNodeCode.validateTab(state);

        const view: VNode =

            h("div", { id: "nodeLensView" }, [
                h("div", { id: "nodeLens" }, [

                    ...getTitleView(),
                    typeViews.buildTypeView(lensNode),

                    ...window.TreeSolve.discussionPlugins.buildDiscussionView(
                        state,
                        lensNode,
                        true
                    ),

                    wayPointViews.buildWayPointView(
                        state,
                        lensNode
                    ),

                    window.TreeSolve.optionsPlugins.buildOptionsView(
                        state,
                        lensNode,
                        'Options',
                        'option',
                        true),

                    lensButtonsViews.buildSaveDeleteView(
                        state,
                        state.lens.nodeTab,
                        nodeActions.save,
                        nodeActions.delete,
                        "Save the node and options",
                        "Save button disabled as the node state is either unchanged or invalid",
                        "Delete the node and its descendants"
                    )
                ])
            ]);

        return view;
    }
};

export default stashNodeEditTabViews;


