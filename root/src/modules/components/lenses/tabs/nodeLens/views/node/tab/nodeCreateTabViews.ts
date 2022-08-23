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
import inputsViews from "../../../../../inputs/views/inputsViews";
import inputsButtonViews from "../../../../../inputs/views/inputsButtonViews";
import wayPointViews from "../../../../../reserves/views/wayPointViews";


const nodeEditTabViews = {

    buildTabView(state: IState): VNode | null {

        if (!state
            || !state.lens.nodeTab.lensNode) {

            return null;
        }

        const lensNode: INode<ILensUI> = state.lens.nodeTab.lensNode;
        gNodeCode.validateTab(state);

        const getTitleView = (): VNode[] => {

            if (lensNode.isRoot === true) {

                alert("Cannot create a root");
            }
            else if (lensNode.type === NodeType.Solution) {

                return nodeTitleViews.buildCreateSolutionTitleView();
            }

            return nodeTitleViews.buildCreateDiscussionTitleView();
        };

        const view: VNode =

            h("div", { id: "nodeLensView" }, [
                h("div", { id: "nodeLens" }, [

                    ...getTitleView(),
                    inputsButtonViews.buildShowInputsViewButton(lensNode),
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

                    inputsViews.buildInputsView(
                        state,
                        lensNode
                    ),

                    window.TreeSolve.optionsPlugins.buildOptionsView(
                        state,
                        lensNode,
                        'Options',
                        'option',
                        true),

                    lensButtonsViews.buildSaveCancelActionView(
                        state.lens.nodeTab,
                        nodeActions.save,
                        nodeActions.cancel,
                        "Cancel",
                        "Save the node and options",
                        "Save button disabled as the node state is either unchanged or invalid",
                        "Cancel"
                    )
                ])
            ]);

        return view;
    }
};

export default nodeEditTabViews;


