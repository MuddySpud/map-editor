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
import loopTextViews from "../partial/loopTextViews";


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

                return nodeTitleViews.buildEditRootTitleView();
            }
            else if (lensNode.type === NodeType.Solution) {

                return nodeTitleViews.buildEditSolutionTitleView();
            }

            return nodeTitleViews.buildEditDiscussionTitleView();
        };

        const view: VNode =

            h("div", { id: "nodeLensView" }, [
                h("div", { id: "nodeLens" }, [

                    ...getTitleView(),
                    inputsButtonViews.buildShowInputsViewButton(lensNode),

                    ...window.TreeSolve.discussionPlugins.buildButtonsView(
                        state,
                        lensNode
                    ),

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

                    loopTextViews.buildLoopTextView(
                        state,
                        lensNode
                    ),

                    window.TreeSolve.optionsPlugins.buildOptionsView(
                        state,
                        lensNode,
                        'Options',
                        'option',
                        true
                    ),

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

export default nodeEditTabViews;


