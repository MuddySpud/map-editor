import { h, VNode } from "hyperapp-local";

import ITreeSys from "../../../../interfaces/state/tree/ITreeSys";
import gTooltipActions from "../../../../global/actions/gTooltipActions";
import treeActions from "../actions/treeActions";
import StringEvent from "../../../../state/ui/payloads/StringEvent";
import iconViews from "./iconViews";


const cellViews = {

    buildInfoCell: (): VNode => {

        const view: VNode =

            h("div", { class: "tree-cell narrow" }, [
                h("div", { class: "icon" }, [
                    h("div", { class: "info-icon" }, "")
                ])
            ]);

        return view;
    },

    buildTickCell: (selected: boolean): VNode => {

        const view: VNode =

            h("div", { class: "tree-cell" }, [
                h("div", { class: "icon" }, iconViews.buildTickIcon(selected))
            ]);

        return view;
    },

    buildBotCell: (tree: ITreeSys): VNode => {

        const view: VNode =

            h("div", { class: "tree-cell" }, [
                h("div",
                    {
                        class: {
                            icon: true,
                            button: true,
                            on: tree.isBot === true
                        },
                        onClick: [
                            treeActions.showBotHub,
                            (_event: any) => tree.key
                        ],
                        onMouseOver: [
                            gTooltipActions.showTooltipWithEvent,
                            (event: any) => {
                                return new StringEvent(
                                    "View in bot hub",
                                    event
                                );
                            }
                        ],
                        onMouseOut: gTooltipActions.clearTooltip
                    },
                    
                    iconViews.buildBotIcon(tree)
                )
            ]);

        return view;
    },

    buildSubtreeCell: (tree: ITreeSys): VNode => {

        const view: VNode =

            h("div", { class: "tree-cell" }, [
                h("div",
                    {
                        class: {
                            icon: true,
                            button: true,
                            on: tree.isSubtree === true
                        },
                        onClick: [
                            treeActions.showSubtreeHub,
                            (_event: any) => tree.key
                        ],
                        onMouseOver: [
                            gTooltipActions.showTooltipWithEvent,
                            (event: any) => {
                                return new StringEvent(
                                    "View in subtree hub",
                                    event
                                );
                            }
                        ],
                        onMouseOut: gTooltipActions.clearTooltip
                    },
                    
                    iconViews.buildSubtreeIcon(tree)
                )
            ]);

        return view;
    },

    buildEditTreeCell: (tree: ITreeSys): VNode => {

        const view: VNode =

            h("div", { class: "tree-cell" }, [
                h("div",
                    {
                        class: {
                            icon: true,
                            button: true,
                            "on-quiet": true
                        },
                        onClick: [
                            treeActions.showTreeEditor,
                            (_event: any) => tree.key
                        ],
                        onMouseOver: [
                            gTooltipActions.showTooltipWithEvent,
                            (event: any) => {
                                return new StringEvent(
                                    "Edit tree",
                                    event
                                );
                            }
                        ],
                        onMouseOut: gTooltipActions.clearTooltip
                    },
                    
                    iconViews.buildEditIcon(tree)
                )
            ]);

        return view;
    },

    buildDeleteTreeCell: (tree: ITreeSys): VNode => {

        let properties: any = {
            class: {
                icon: true,
                button: true,
                "on-quiet": true
            },
            onMouseOut: gTooltipActions.clearTooltip
        };

        let tooltip: string;

        if (!tree.deleteLock) {

            properties.onClick = [
                treeActions.deleteTree,
                (_event: any) => tree.key
            ];

            tooltip = "Delete tree";
        }
        else {
            properties.class.disabled = true;
            tooltip = `Delete tree is disabled. 
Its subtree has been referenced by another tree. Delete all references first.`;
        }

        properties.onMouseOver = [
            gTooltipActions.showTooltipWithEvent,
            (event: any) => {
                return new StringEvent(
                    tooltip,
                    event
                );
            }
        ];

        const view: VNode =

            h("div", { class: "tree-cell" }, [
                h("div",
                    properties,
                    
                    iconViews.buildDeleteIcon(tree)
                )
            ]);

        return view;
    },

    buildTreeCell: (tree: ITreeSys): VNode => {

        const view: VNode =

            h("div", { class: "tree-cell" }, [
                h("div",
                    {
                        class: {
                            icon: true,
                            button: true,
                            on: true
                        },
                        onClick: [
                            treeActions.showTreeHub,
                            (_event: any) => tree.key
                        ],
                        onMouseOver: [
                            gTooltipActions.showTooltipWithEvent,
                            (event: any) => {
                                return new StringEvent(
                                    "View in tree hub",
                                    event
                                );
                            }
                        ],
                        onMouseOut: gTooltipActions.clearTooltip
                    },
                    
                    iconViews.buildTreeIcon(tree)
                )
            ]);

        return view;
    },

    buildBranchesCell: (tree: ITreeSys): VNode => {

        const view: VNode =

            h("div", { class: "tree-cell" }, [
                h("div",
                    {
                        class: {
                            icon: true,
                            button: true,
                            on: true
                        },
                        onClick: [
                            treeActions.showBranches,
                            (_event: any) => tree.key
                        ],
                        onMouseOver: [
                            gTooltipActions.showTooltipWithEvent,
                            (event: any) => {
                                return new StringEvent(
                                    "View branches",
                                    event
                                );
                            }
                        ],
                        onMouseOut: gTooltipActions.clearTooltip
                    },
                    
                    iconViews.buildBranchesIcon(tree)
                )
            ]);

        return view;
    },

    buildProjectCell: (tree: ITreeSys): VNode => {

        const view: VNode =

            h("div", { class: "tree-cell" }, [
                h("div",
                    {
                        class: {
                            icon: true,
                            button: true,
                            on: true
                        },
                        onClick: [
                            treeActions.showProject,
                            (_event: any) => tree.key
                        ],
                        onMouseOver: [
                            gTooltipActions.showTooltipWithEvent,
                            (event: any) => {
                                return new StringEvent(
                                    "View tree project",
                                    event
                                );
                            }
                        ],
                        onMouseOut: gTooltipActions.clearTooltip
                    },
                    
                    iconViews.buildProjectIcon(tree)
                )
            ]);

        return view;
    },

    buildNameCell: (tree: ITreeSys): VNode => {

        const view: VNode =

            h("div", { class: "name" }, [
                h("span", {}, `${tree.name}`)
            ]);

        return view;
    }
};

export default cellViews;


