import { h, VNode } from "hyperapp-local";

import IState from "../../../../../../../interfaces/state/IState";
import ILensUI from "../../../../../../../interfaces/state/ui/UIs/ILensUI";
import INode from "../../../../../../../interfaces/state/tree/INode";
import INodeBase from "../../../../../../../interfaces/state/tree/INodeBase";
import socketsViews from "../partial/socketsViews";
import nodeActions from "../../../actions/nodeActions";
import lensButtonsViews from "../../../../../lens/views/lensButtonsViews";
import gNodeCode from "../../../../../../../global/code/gNodeCode";
import subtreeTitleViews from "../partial/subtreeTitleViews";
import buttonsViews from "../partial/buttonsViews";
import subtreeCreateViews from "../partial/subtreeCreateViews";
import IStageBehaviour from "../../../../../../../interfaces/behaviours/IStageBehaviour";


const subtreeAndLinkCreateTabViews = {

    buildTabView: (state: IState): VNode | null => {

        const lensNode: INode<ILensUI> = state.lens.nodeTab.lensNode as INode<ILensUI>;

        if (!lensNode.link) {

            return null;
        }

        const options: Array<INodeBase> = lensNode.nodes as Array<INodeBase>;
        const stageBehaviour: IStageBehaviour = state.lens.nodeTab.stageBehaviour;
        gNodeCode.validateTab(state);

        const view: VNode =

            h("div", { id: "subtreeEditLensView" }, [
                h("div", { id: "subtreeEditLens" }, [
                    h("div", { id: "summaryLens" }, [

                        ...subtreeTitleViews.buildCreateSubtreeAndLinkTitleView(stageBehaviour),

                        h("div", { class: "summary" }, [
                            h("div", { class: "hub" }, [
                                h("div", { class: "hub-left" }, ""),
                                h("div", { class: "hub-right" }, [

                                    buttonsViews.buildSubtreeAndLinkHubButtons(),
                                ]),
                            ]),

                            subtreeCreateViews.buildDetailsView(
                                lensNode,
                                state.lens.nodeTab.treeStats,
                                true
                            ),

                            ...window.TreeSolve.discussionPlugins.buildDiscussionView(
                                state,
                                lensNode,
                                false
                            ),

                            socketsViews.buildSocketsView(state, options),

                            lensButtonsViews.buildSaveCancelView(
                                state.lens.nodeTab,
                                nodeActions.saveSubtreeAndLinkNode,
                                nodeActions.cancel,
                                "Save the subtree link",
                                "Save button disabled as the node state is either unchanged or invalid",
                                "Cancel and clear the node lens"
                            )
                        ])
                    ])
                ])
            ]);

        return view;
    }
};

export default subtreeAndLinkCreateTabViews;


