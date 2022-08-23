import { h, VNode } from "hyperapp-local";

import branchTreeTaskActions from "../../../actions/branchTreeTaskActions";
import buttonViews from "../../../../../lens/views/buttonViews";


const branchToSubtreeUIs = {

    buildHubButtons: (): VNode => {

        const controlsView =

            h("div", { class: "spacer" }, [

                branchToSubtreeUIs.buildChangeRootButtonView(),
                branchToSubtreeUIs.buildEditTreeButtonView(),
                branchToSubtreeUIs.buildEditSubtreeButtonView(),
                branchToSubtreeUIs.buildEditLimitsButtonView()
            ]);

        return controlsView;
    },

    buildEditTreeButtonView: (): VNode => {

        const contentsView: VNode[] = [

            h("span", {}, "2"),
            h("div", { class: "properties-icon" }, ""),
            h("div", { class: "tree-icon" }, "")
        ];

        return buttonViews.buildHollowButton(
            "Edit the tree properties",
            "view-edit",
            contentsView,
            branchTreeTaskActions.editTree
        );
    },

    buildEditLimitsButtonView: (): VNode => {

        const contentsView: VNode[] = [

            h("span", {}, "4"),
            h("div", { class: "properties-icon" }, ""),
            h("div", { class: "socket-icon" }, "")
        ];

        return buttonViews.buildHollowButton(
            "Edit the sockets and boundaries",
            "view-edit",
            contentsView,
            branchTreeTaskActions.editStSockets
        );
    },

    buildEditSubtreeButtonView: (): VNode => {

        const contentsView: VNode[] = [

            h("span", {}, "3"),
            h("div", { class: "properties-icon" }, ""),
            h("div", { class: "subtree-icon" }, "")
        ];

        return buttonViews.buildHollowButton(
            "Edit the subtree properties",
            "view-edit",
            contentsView,
            branchTreeTaskActions.editSubtree
        );
    },

    buildChangeRootButtonView: (): VNode => {

        const contentsView: any[] = [

            h("span", {}, "1"),
            h("div", { class: "properties-icon" }, ""),
            h("div", { class: "root-icon" }, "")
        ];

        return buttonViews.buildHollowButton(
            "Edit or select a new subtree root",
            "view-edit",
            contentsView,
            branchTreeTaskActions.changeRoot
        );
    }
};

export default branchToSubtreeUIs;


