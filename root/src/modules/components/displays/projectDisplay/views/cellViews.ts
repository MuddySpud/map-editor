import { h, VNode } from "hyperapp-local";

import ITreeProject from "../../../../interfaces/state/tree/ITreeProject";
import gTooltipActions from "../../../../global/actions/gTooltipActions";
import StringEvent from "../../../../state/ui/payloads/StringEvent";
import iconViews from "./iconViews";
import projectActions from "../actions/projectActions";
import ISubtreeProject from "../../../../interfaces/state/tree/ISubtreeProject";


const cellViews = {

    buildInfoCell: (): VNode => {

        const view: VNode =

            h("div", { class: "project-cell narrow" }, [
                h("div", { class: "icon" }, [
                    h("div", { class: "info-icon" }, "")
                ])
            ]);

        return view;
    },

    buildTickCell: (selected: boolean): VNode => {

        const view: VNode =

            h("div", { class: "project-cell tick" }, [
                h("div", { class: "icon" }, iconViews.buildTickIcon(selected))
            ]);

        return view;
    },

    buildBotCell: (treeProject: ITreeProject): VNode => {

        const view: VNode =

            h("div", { class: "project-cell" }, [
                h("div",
                    {
                        class: {
                            icon: true,
                            button: true,
                            on: treeProject.isBot === true
                        },
                        onClick: [
                            projectActions.showBotHub,
                            (_event: any) => treeProject.key
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

                    iconViews.buildBotIcon(treeProject)
                )
            ]);

        return view;
    },

    buildBlankCell: (draw: boolean): VNode | null => {

        if (!draw) {

            return null;
        }

        const view: VNode =

            h("div", { class: "project-cell" }, [
                h("div", { class: "icon" }, "")
            ]);

        return view;
    },

    buildSubtreeCell: (treeProject: ITreeProject): VNode | null => {

        if (!treeProject.isSubtree) {
            
            return null;
        }

        const view: VNode =

            h("div", { class: "project-cell" }, [
                h("div",
                    {
                        class: {
                            icon: true,
                            button: true,
                            on: treeProject.isSubtree === true
                        },
                        onClick: [
                            projectActions.showSubtreeHub,
                            (_event: any) => treeProject.key
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

                    iconViews.buildSubtreeIcon(treeProject)
                )
            ]);

        return view;
    },

    buildEditTreeCell: (treeProject: ITreeProject): VNode => {

        const view: VNode =

            h("div", { class: "project-cell" }, [
                h("div",
                    {
                        class: {
                            icon: true,
                            button: true,
                            "on-quiet": true
                        },
                        onClick: [
                            projectActions.showTreeEditor,
                            (_event: any) => treeProject.key
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

                    iconViews.buildEditIcon()
                )
            ]);

        return view;
    },

    buildDeleteTreeCell: (treeProject: ITreeProject): VNode => {

        let properties: any = {
            class: {
                icon: true,
                button: true,
                "on-quiet": true
            },
            onMouseOut: gTooltipActions.clearTooltip
        };

        let tooltip: string;

        if (!treeProject.deleteLock) {

            properties.onClick = [
                projectActions.deleteTree,
                (_event: any) => treeProject.key
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

            h("div", { class: "project-cell" }, [
                h("div",
                    properties,

                    iconViews.buildDeleteIcon()
                )
            ]);

        return view;
    },

    buildExpandCell: (subtreeProject: ISubtreeProject): VNode => {

        const view: VNode =

            h("div", { class: "expand-cell" }, [
                h("div",
                    {
                        class: "project-expand",
                        onMouseDown: [
                            projectActions.expand,
                            (_event: any) => subtreeProject
                        ]
                    },
                    ""
                )
            ]);

        return view;
    },

    buildTreeCell: (treeProject: ITreeProject): VNode => {

        const view: VNode =

            h("div", { class: "project-cell" }, [
                h("div",
                    {
                        class: {
                            icon: true,
                            button: true,
                            on: true
                        },
                        onClick: [
                            projectActions.showTreeHub,
                            (_event: any) => treeProject.key
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

                    iconViews.buildTreeIcon(treeProject)
                )
            ]);

        return view;
    },

    buildProjectCell: (treeProject: ITreeProject): VNode => {

        const view: VNode =

            h("div", { class: "project-cell" }, [
                h("div", { class: "icon badge" },

                    iconViews.buildProjectIcon(treeProject)
                )
            ]);

        return view;
    },

    buildBranchesCell: (treeProject: ITreeProject): VNode => {

        const view: VNode =

            h("div", { class: "project-cell" }, [
                h("div",
                    {
                        class: {
                            icon: true,
                            button: true,
                            on: true
                        },
                        onClick: [
                            projectActions.showBranches,
                            (_event: any) => treeProject.key
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

                    iconViews.buildBranchesIcon()
                )
            ]);

        return view;
    },

    buildNameCell: (treeProject: ITreeProject): VNode => {

        const view: VNode =

            h("div", { class: "name" }, [
                h("span", {}, `${treeProject.name}`)
            ]);

        return view;
    }
};

export default cellViews;


