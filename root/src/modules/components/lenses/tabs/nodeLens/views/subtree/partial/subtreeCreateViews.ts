import { h, VNode, Children } from "hyperapp-local";

import ILensUI from "../../../../../../../interfaces/state/ui/UIs/ILensUI";
import INode from "../../../../../../../interfaces/state/tree/INode";
import ISubtreeSys from "../../../../../../../interfaces/state/tree/ISubtreeSys";
import ITreeBase from "../../../../../../../interfaces/state/tree/ITreeBase";
import minMaxViews from "../../../../treeLens/views/subtree/partial/minMaxViews";
import buttonsViews from "./buttonsViews";
import ITreeStats from "../../../../../../../interfaces/state/tree/ITreeStats";


const subtreeCreateViews = {

    buildNewDetailsView: (
        lensNode: INode<ILensUI>,
        treeStats: ITreeStats | null,
        newSubtree: boolean = false): Children[] => {

        const newLink: ISubtreeSys = lensNode.link as ISubtreeSys;
        const newTree: ITreeBase = newLink.tree as ITreeBase;
        let openSubtreeView: VNode | null = null;
        // let title: string;

        if (!newSubtree) {

            openSubtreeView = buttonsViews.buildOpenSubtreeButtonView(
                newTree.key as string,
                "Open the subtree in a new tab"
            );

            // title = "Subtree";
        }
        else {
            // title = "New subtree";

        }

        const view: Children[] = [

            h("div", { class: "new" },
                [
                    openSubtreeView,

                    ...minMaxViews.buildCollapsibleDetailsView(
                        newLink,
                        treeStats,
                        [],
                    )

                    // ...minMaxViews.buildCollapsibleDetailsView(
                    //     newLink,
                    //     title
                    // )
                ]
            )
        ];

        return view;
    },

    buildDetailsView: (
        lensNode: INode<ILensUI>,
        treeStats: ITreeStats | null,
        newSubtree: boolean = false): VNode => {

        const view: VNode =

            h("div",
                {
                    class: {
                        "details": true,
                        "no-margin-top": newSubtree === true
                    }
                },
                [
                    ...subtreeCreateViews.buildNewDetailsView(
                        lensNode,
                        treeStats,
                        newSubtree
                    )
                ]
            );

        return view;
    }
};

export default subtreeCreateViews;


