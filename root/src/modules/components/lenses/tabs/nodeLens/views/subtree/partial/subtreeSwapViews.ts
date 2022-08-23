import { h, VNode } from "hyperapp-local";

import ILensUI from "../../../../../../../interfaces/state/ui/UIs/ILensUI";
import INode from "../../../../../../../interfaces/state/tree/INode";
import INodeBase from "../../../../../../../interfaces/state/tree/INodeBase";
import ISubtreeSys from "../../../../../../../interfaces/state/tree/ISubtreeSys";
import ITreeBase from "../../../../../../../interfaces/state/tree/ITreeBase";
import minMaxViews from "../../../../treeLens/views/subtree/partial/minMaxViews";
import buttonsViews from "./buttonsViews";
import ITreeStats from "../../../../../../../interfaces/state/tree/ITreeStats";


const subtreeSwapViews = {

    buildNewDetailsView: (
        lensNode: INode<ILensUI>,
        treeStats: ITreeStats | null): VNode[] => {

        const startingPoint: INodeBase = lensNode.ui.startingPoint as INodeBase;
        const oldLink: ISubtreeSys = startingPoint.link as ISubtreeSys;
        const oldTree: ITreeBase = oldLink.tree as ITreeBase;
        const newLink: ISubtreeSys = lensNode.link as ISubtreeSys;
        const newTree: ITreeBase = newLink.tree as ITreeBase;

        const view: VNode[] = [

            h("div", { class: "old" },
                [
                    buttonsViews.buildOpenSubtreeButtonView(
                        oldTree.key as string,
                        "Open the old subtree in a new tab"
                    ),

                    ...minMaxViews.buildCollapsibleDetailsView(
                        oldLink,
                        treeStats,
                        [],
                    ),

                    // ...minMaxViews.buildCollapsibleDetailsView(
                    //     oldLink,
                    //     'Current subtree'
                    // )
                ]
            ),
            h("div", { class: "new" },
                [
                    buttonsViews.buildOpenSubtreeButtonView(
                        newTree.key as string,
                        "Open the new subtree in a new tab"
                    ),

                    ...minMaxViews.buildCollapsibleDetailsView(
                        newLink,
                        treeStats,
                        [],
                    ),

                    // ...minMaxViews.buildCollapsibleDetailsView(
                    //     newLink,
                    //     'Replacement subtree'
                    // )
                ]
            )
        ];

        return view;
    },

    buildDetailsView: (
        lensNode: INode<ILensUI>,
        treeStats: ITreeStats | null): VNode => {

        const view: VNode =

            h("div", { class: "details" }, [

                ...subtreeSwapViews.buildNewDetailsView(
                    lensNode,
                    treeStats
                ),
            ]);

        return view;
    }
};

export default subtreeSwapViews;


