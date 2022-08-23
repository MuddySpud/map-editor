import { h, VNode } from "hyperapp-local";

import IState from "../../../../../../../interfaces/state/IState";
import subtreeActions from "../../../actions/subtreeActions";
import lensButtonsViews from "../../../../../lens/views/lensButtonsViews";
import ITabSave from "../../../../../../../interfaces/state/ui/tabs/ITabSave";
import gBranchTaskCode from "../../../../../../../global/code/gBranchTaskCode";
import nodeActions from "../../../actions/nodeActions";
import gTooltipActions from "../../../../../../../global/actions/gTooltipActions";
import globalSubtreeActions from "../../../../../../../global/actions/gSubtreeActions";
import buttonViews from "../../../../../lens/views/buttonViews";
import plugActions from "../../../actions/plugActions";
import gNodeCode from "../../../../../../../global/code/gNodeCode";
import INodeBase from "../../../../../../../interfaces/state/tree/INodeBase";


const buttonsViews = {

    buildSubtreeLinkHubButtons: (node: INodeBase): VNode => {

        let plugsButtonView: VNode | null = null;

        if (gNodeCode.hasNoExistingOptions(node) === false) {

            plugsButtonView = buttonsViews.buildPlugsButtonView();
        }
        
        const controlsView: VNode =

            h("div", { class: "spacer" }, [

                buttonsViews.buildSearchSubtreesButtonView(),
                buttonsViews.buildSelectSubtreeButtonView(),
                plugsButtonView
            ]);

        return controlsView;
    },

    buildSubtreeAndLinkHubButtons: (): VNode => {

        const controlsView: VNode =

            h("div", { class: "spacer" }, [

                buttonsViews.buildEditTreeButtonView(),
                buttonsViews.buildEditSubtreeButtonView(),
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
            subtreeActions.editTree
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
            subtreeActions.editSubtree
        );
    },

    buildSearchSubtreesButtonView: (): VNode => {

        const contentsView: VNode[] = [

            h("span", {}, "1"),
            h("div", { class: "properties-icon" }, ""),
            h("div", { class: "search-icon" }, "")
        ];

        return buttonViews.buildHollowButton(
            "Search subtrees",
            "view-edit",
            contentsView,
            subtreeActions.viewSearchSubtrees
        );
    },

    buildSelectSubtreeButtonView: (): VNode => {

        const contentsView: VNode[] = [

            h("span", {}, "2"),
            h("div", { class: "properties-icon" }, ""),
            h("div", { class: "select-icon" }, "")
        ];

        return buttonViews.buildHollowButton(
            "Select subtree",
            "view-edit",
            contentsView,
            subtreeActions.viewSelectSubtree
        );
    },

    buildPlugsButtonView: (): VNode => {

        const contentsView: VNode[] = [

            h("span", {}, "3"),
            h("div", { class: "properties-icon" }, ""),
            h("div", { class: "socket-link-icon" }, ""),
            h("div", { class: "socket-short-icon" }, "")
        ];

        return buttonViews.buildHollowButton(
            "Link existing options with sockets",
            "view-edit",
            contentsView,
            plugActions.editPlugs
        );
    },

    buildLinkActionView: (tab: ITabSave): VNode => {

        const view: VNode =

            h("button",
                {
                    type: "button",
                    class: "link",
                    onClick: subtreeActions.confirmPlugs,
                    disabled: tab.enableSave === false
                },
                "Link"
            );

        return view;
    },

    buildLinkCancelActionsView: (state: IState): VNode => {

        gBranchTaskCode.validateTabForPluging(
            state,
            state.lens.nodeTab
        );

        const view: VNode =

            h("div",
                {
                    class: {
                        "lens-actions": true
                    }
                },
                [
                    buttonsViews.buildLinkActionView(state.lens.nodeTab),

                    lensButtonsViews.buildCancelButtonView(
                        nodeActions.cancel,
                        "Cancel and clear the node lens")
                ]
            );

        return view;
    },

    buildOpenSubtreeButtonView: (
        subtreeKey: string,
        tooltip: string): VNode => {

        const view: VNode =

            h("div", { class: "controls" }, [
                h("div",
                    {
                        class: "open-subtree",
                        onClick: [
                            globalSubtreeActions.openSubtreeWithKey,
                            (_event: any) => subtreeKey
                        ],
                        onMouseOver: [
                            gTooltipActions.showTooltip,
                            (_event: any) => tooltip
                        ],
                        onMouseOut: gTooltipActions.clearTooltip
                    },
                    ""
                )
            ]);

        return view;
    }
};

export default buttonsViews;


