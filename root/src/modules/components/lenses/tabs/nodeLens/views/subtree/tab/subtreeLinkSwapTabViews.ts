import { h, VNode } from "hyperapp-local";

import IState from "../../../../../../../interfaces/state/IState";
import ILensUI from "../../../../../../../interfaces/state/ui/UIs/ILensUI";
import INode from "../../../../../../../interfaces/state/tree/INode";
import INodeBase from "../../../../../../../interfaces/state/tree/INodeBase";
import socketsViews from "../partial/socketsViews";
import nodeActions from "../../../actions/nodeActions";
import lensButtonsViews from "../../../../../lens/views/lensButtonsViews";
import gNodeCode from "../../../../../../../global/code/gNodeCode";
import subtreeSwapViews from "../partial/subtreeSwapViews";
import subtreeTitleViews from "../partial/subtreeTitleViews";
import buttonsViews from "../partial/buttonsViews";
import IStageBehaviour from "../../../../../../../interfaces/behaviours/IStageBehaviour";

import '../../../scss/summary.scss';


const subtreeLinkSwapTabViews = {

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

                        ...subtreeTitleViews.buildSwapTitleView(stageBehaviour),

                        h("div", { class: "summary" }, [
                            h("div", { class: "hub" }, [
                                h("div", { class: "hub-left" }, ""),
                                h("div", { class: "hub-right" }, [

                                    buttonsViews.buildSubtreeLinkHubButtons(lensNode),
                                ]),
                            ]),

                            subtreeSwapViews.buildDetailsView(
                                lensNode,
                                state.lens.nodeTab.treeStats
                            ),

                            ...window.TreeSolve.discussionPlugins.buildDiscussionView(
                                state,
                                lensNode,
                                false
                            ),

                            socketsViews.buildSocketsView(state, options),

                            lensButtonsViews.buildSaveCancelView(
                                state.lens.nodeTab,
                                nodeActions.save,
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

export default subtreeLinkSwapTabViews;


