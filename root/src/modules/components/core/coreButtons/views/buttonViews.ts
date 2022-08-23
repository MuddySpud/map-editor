import { h, VNode } from "hyperapp-local";

import IState from "../../../../interfaces/state/IState";
import gTooltipActions from "../../../../global/actions/gTooltipActions";
import StringEvent from "../../../../state/ui/payloads/StringEvent";
import U from "../../../../global/gUtilities";
import globalCoreActions from "../../../../global/actions/gCoreActions";
import coreActions from "../actions/coreActions";
import gTreeActions from "../../../../global/actions/gTreeActions";


const buttonViews = {

    buildFilterButtonView: (): VNode => {

        const view: VNode =

            h("a",
                {
                    class: "button filter-trees",
                    onClick: coreActions.toggleFilter,
                    onMouseOver: [
                        gTooltipActions.showTooltipWithEvent,
                        (event: any) => {
                            return new StringEvent(
                                "Filter trees",
                                event
                            );
                        }
                    ],
                    onMouseOut: gTooltipActions.clearTooltip
                },
                [
                    h("div", { class: "filter-icon" }, "")
                ]
            );

        return view;
    },

    buildCreateTreeButtonView: (): VNode => {

        const view: VNode =

            h("a",
                {
                    class: "button create-tree",
                    onClick: gTreeActions.createTree,
                    onMouseOver: [
                        gTooltipActions.showTooltipWithEvent,
                        (event: any) => {
                            return new StringEvent(
                                "Create a new tree",
                                event
                            );
                        }
                    ],
                    onMouseOut: gTooltipActions.clearTooltip
                },
                [
                    h("div", { class: "tree-icon" }, ""),
                    h("div", { class: "create-icon" }, "")
                ]
            );

        return view;
    },

    buildShowProjectButtonView: (state: IState): VNode | null => {

        if (U.isNullOrWhiteSpace(state.branchesState.tree.key) === true) {

            return null;
        }

        const view: VNode =

            h("a",
                {
                    class: "button",
                    onClick: [
                        globalCoreActions.showProject
                    ],
                    onMouseOver: [
                        gTooltipActions.showTooltipWithEvent,
                        (event: any) => {
                            return new StringEvent(
                                "Go to current tree's project view",
                                event
                            );
                        }
                    ],
                    onMouseOut: gTooltipActions.clearTooltip
                },
                [
                    h("div", { class: "tree-project-icon" }, "")
                ]
            );

        return view;
    },

    buildStashButtonView: (state: IState): VNode => {

        let iconClass: string;
        let tooltip: string;

        if (state.branchesState.stash.ui.showNode === true) {

            iconClass = "show-icon";
            tooltip = "Hide stash";
        }
        else {
            iconClass = "hidden-icon";
            tooltip = "Show stash";
        }

        const view: VNode =

            h("div", { class: 'main-buttons' }, [
                h("a",
                    {
                        class: "button show-stash",
                        onClick: [
                            coreActions.toggleShowStash
                        ],
                        onMouseOver: [
                            gTooltipActions.showTooltipWithEvent,
                            (event: any) => {
                                return new StringEvent(
                                    tooltip,
                                    event
                                );
                            }
                        ],
                        onMouseOut: gTooltipActions.clearTooltip
                    },
                    [
                        h("div", { class: "stash-icon" }, ""),
                        h("div", { class: `${iconClass}` }, "")
                    ]
                )
            ]);

        return view;
    },

    buildShowTreesButtonView: (_state: IState): VNode | null => {

        const view: VNode =

            h("a",
                {
                    class: "button",
                    onClick: [
                        globalCoreActions.showTrees
                    ],
                    onMouseOver: [
                        gTooltipActions.showTooltipWithEvent,
                        (event: any) => {
                            return new StringEvent(
                                "Go to all trees",
                                event
                            );
                        }
                    ],
                    onMouseOut: gTooltipActions.clearTooltip
                },
                [
                    h("div", { class: "trees-icon" }, "")
                ]
            );

        return view;
    },

    buildShowBotsButtonView: (_state: IState): VNode | null => {

        const view: VNode =

            h("a",
                {
                    class: "button",
                    onClick: [
                        globalCoreActions.showBots
                    ],
                    onMouseOver: [
                        gTooltipActions.showTooltipWithEvent,
                        (event: any) => {
                            return new StringEvent(
                                "Go to all bots",
                                event
                            );
                        }
                    ],
                    onMouseOut: gTooltipActions.clearTooltip
                },
                [
                    h("div", { class: "bots-icon" }, "")
                ]
            );

        return view;
    },

    buildShowBranchesButtonView: (state: IState): VNode | null => {

        if (U.isNullOrWhiteSpace(state.branchesState.tree.key) === true) {

            return null;
        }

        const view: VNode =

            h("a",
                {
                    class: "button",
                    onClick: [
                        globalCoreActions.showBranches
                    ],
                    onMouseOver: [
                        gTooltipActions.showTooltipWithEvent,
                        (event: any) => {
                            return new StringEvent(
                                "Go to current branches view",
                                event
                            );
                        }
                    ],
                    onMouseOut: gTooltipActions.clearTooltip
                },
                [
                    h("div", { class: "branches-icon" }, "")
                ]
            );

        return view;
    }
}

export default buttonViews;


