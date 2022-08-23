import { h, VNode } from "hyperapp-local";

import IState from "../../../../../../../interfaces/state/IState";
import ILensUI from "../../../../../../../interfaces/state/ui/UIs/ILensUI";
import INode from "../../../../../../../interfaces/state/tree/INode";
import INodeBase from "../../../../../../../interfaces/state/tree/INodeBase";
import socketsViews from "../partial/socketsViews";
import lensButtonsViews from "../../../../../lens/views/lensButtonsViews";
import nodeActions from "../../../actions/nodeActions";
import gNodeCode from "../../../../../../../global/code/gNodeCode";
import minMaxViews from "../../../../treeLens/views/subtree/partial/minMaxViews";
import subtreeTitleViews from "../partial/subtreeTitleViews";
import IStageBehaviour from "../../../../../../../interfaces/behaviours/IStageBehaviour";


const subtreeLinkEditTabViews = {

    buildTabView: (state: IState): VNode | null => {

        const lensNode: INode<ILensUI> = state.lens.nodeTab.lensNode as INode<ILensUI>;

        if (!lensNode.link) {

            return null;
        }

        const buildActionsView = (): VNode | null => {

            if (lensNode.ui.startingPoint) {
                // Can't save or delete here now as a swap has been selected
                // Need to go to last stage to save
                return null;
            }

            return lensButtonsViews.buildSaveDeleteView(
                state,
                state.lens.nodeTab,
                nodeActions.save,
                nodeActions.delete,
                "Save the node and options",
                "Save button disabled as the node state is either unchanged or invalid",
                "Delete the node and its descendants"
            );
        };

        const options: Array<INodeBase> = lensNode.nodes as Array<INodeBase>;
        const stageBehaviour: IStageBehaviour = state.lens.nodeTab.stageBehaviour;
        gNodeCode.validateTab(state);

        const editView: VNode =

            h("div", { id: "subtreeEditLensView" }, [
                h("div", { id: "subtreeEditLens" }, [

                    ...subtreeTitleViews.buildEditTitleView(stageBehaviour),

                    // ...minMaxViews.buildCollapsibleDetailsView(
                    //     lensNode.link,
                    //     'Subtree'
                    // ),

                    ...minMaxViews.buildCollapsibleDetailsView(
                        lensNode.link,
                        state.lens.nodeTab.treeStats,
                        [],
                    ),

                    ...window.TreeSolve.discussionPlugins.buildDiscussionView(
                        state,
                        lensNode,
                        false
                    ),

                    socketsViews.buildSocketsView(state, options),
                    buildActionsView()
                ])
            ]);

        return editView;
    }
};

export default subtreeLinkEditTabViews;


