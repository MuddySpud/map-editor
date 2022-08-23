import { h, VNode } from "hyperapp-local";

import ITreeRoot from "../../../../../../../interfaces/state/tree/ITreeRoot";
import treeDetailsViews from "../../tree/partial/treeDetailsViews";
import IStRoot from "../../../../../../../interfaces/state/tree/IStRoot";
import INodeBase from "../../../../../../../interfaces/state/tree/INodeBase";
import CssClasses from "../../../../../../../state/constants/CssClasses";
import subtreeRowViews from "./subtreeRowViews";


const subtreeDetailsViews = {

    buildTreeDetailsView: (tree: ITreeRoot): VNode[] => {

        if (!tree) {

            return [];
        }

        const view: VNode[] = [

            h("div", { class: "tree" }, [
                treeDetailsViews.buildNameView(tree, CssClasses.odd),
                treeDetailsViews.buildDescriptionView(tree),
                treeDetailsViews.buildKeyView(tree, CssClasses.odd),
                treeDetailsViews.buildTokenView(tree),
                treeDetailsViews.buildOwnerView(tree, CssClasses.odd),
                treeDetailsViews.buildCreatedView(tree),
                treeDetailsViews.buildTagsView(tree, CssClasses.odd),
            ])
        ];

        return view;
    },

    buildRootDetailsView: (root: INodeBase): VNode[] => {

        if (!root) {

            return [];
        }

        const view: VNode[] = [

            h("h4", {}, "root"),
            h("div", { class: "tree" }, [
                treeDetailsViews.buildRootDiscussionView(root, CssClasses.odd),
                treeDetailsViews.buildRootKeyView(root),
            ])
        ];

        return view;
    },

    buildStRootDetailsView: (
        stRoot: IStRoot,
        startOdd: boolean = true): VNode[] => {

        if (!stRoot) {

            return [];
        }

        let oddClass: string;
        let evenClass: string;

        if (startOdd === true) {

            oddClass = CssClasses.odd;
            evenClass = '';
        }
        else {

            oddClass = '';
            evenClass = CssClasses.odd;
        }

        const view: VNode[] = [

            h("div", { class: "tree" }, [
                subtreeRowViews.buildStRootTextView(stRoot, oddClass),
                subtreeRowViews.buildStRootKeyView(stRoot, evenClass),
            ])
        ];

        return view;
    },

    buildStRootTextDetailsView: (stRoot: IStRoot): VNode[] => {

        if (!stRoot) {

            return [];
        }

        const view: VNode[] = [

            h("h4", {}, "StRoot"),
            h("div", { class: "tree" }, [
                subtreeRowViews.buildStRootTextView(stRoot, CssClasses.odd),
            ])
        ];

        return view;
    }
};

export default subtreeDetailsViews;


