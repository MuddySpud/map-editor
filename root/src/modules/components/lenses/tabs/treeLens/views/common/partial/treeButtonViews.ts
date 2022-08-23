import { h, VNode } from "hyperapp-local";

import IState from "../../../../../../../interfaces/state/IState";
import gTooltipActions from "../../../../../../../global/actions/gTooltipActions";
import treeActions from "../../../actions/treeActions";
import gTabCode from "../../../../../../../global/code/gTabCode";
import gUtilities from "../../../../../../../global/gUtilities";
import subtreeActions from "../../../actions/subtreeActions";
import ITreeSys from "../../../../../../../interfaces/state/tree/ITreeSys";
import StringEvent from "../../../../../../../state/ui/payloads/StringEvent";


const treeButtonViews = {

    buildActionsView: (
        state: IState,
        leftButtonText: string = '',
        leftButtonAction: any = null): VNode => {

        const saveButtonText: string = gUtilities.isNullOrWhiteSpace(leftButtonText) === true ? 'Save' : leftButtonText;
        const saveButtonAction: string = !leftButtonAction ? treeActions.save : leftButtonAction;
        let saveProperties = {};

        if (gTabCode.canSave(state.lens.treeTab) === true) {

            saveProperties = {
                type: "button",
                class: "save",
                onClick: saveButtonAction,
                onMouseOver: [
                    gTooltipActions.showTooltip,
                    (_event: any) => "Save this tree"
                ],
                onMouseOut: gTooltipActions.clearTooltip
            };
        }
        else {

            saveProperties = {
                type: "button",
                class: "save disabled",
                onMouseOver: [
                    gTooltipActions.showTooltip,
                    (_event: any) => "Save button disabled as the tree state is either unchanged or invalid"
                ],
                onMouseOut: gTooltipActions.clearTooltip
            };
        }

        const actionView: VNode =

            h("div",
                {
                    class: {
                        "lens-actions": true
                    }
                },
                [
                    h("button", saveProperties, `${saveButtonText}`),
                    h("button",
                        {
                            type: "button",
                            class: "cancel",
                            onClick: treeActions.cancel,
                            onMouseOver: [
                                gTooltipActions.showTooltip,
                                (_event: any) => "Cancel changes"
                            ],
                            onMouseOut: gTooltipActions.clearTooltip
                        },
                        "Cancel"
                    )
                ]
            );

        return actionView;
    },

    buildHubButtons: (tree: ITreeSys): VNode[] => {

        const controlsView: VNode[] = [

            h("div", { class: "spacer" }, [

                treeButtonViews.buildTreeBranchesButton(),
                treeButtonViews.buildEditTreeButton(),
                treeButtonViews.buildDeleteTreeButton(tree)
            ]),
            h("div", { class: "spacer" }, [

                treeButtonViews.buildCloneTreeButton(),
            ]),
            h("div", { class: "spacer" }, [
                treeButtonViews.buildSubtreeHubButton(tree),
                treeButtonViews.buildBotHubButton()
            ]),
            h("div", { class: "spacer" }, [

                treeButtonViews.buildValidateTreeButton(),
                treeButtonViews.buildTreeShapeButton(),
                treeButtonViews.buildTreeTagsButton(),
                treeButtonViews.buildTreeHistoryButton()
            ])
        ];

        return controlsView;
    },

    buildSubtreeHubButtons: (tree: ITreeSys): VNode[] => {

        const controlsView: VNode[] = [

            h("div", { class: "spacer" }, [

                treeButtonViews.buildEditSubtreeButton(),
                treeButtonViews.buildDeleteSubtreeButton(tree)
            ]),
            h("div", { class: "spacer" }, [

                treeButtonViews.buildSubtreeSpreadButton()
            ])
        ];

        return controlsView;
    },

    buildBotHubButtons: (): VNode[] => {

        const controlsView: VNode[] = [

            h("div", { class: "spacer" }, [

                treeButtonViews.buildPublishBotButton()
            ])
        ];

        return controlsView;
    },

    buildTreeHistoryButton: (): VNode => {

        const buttonView: VNode =

            h("a",
                {
                    class: "tree-history",
                    onClick: treeActions.showHistory,
                    onMouseOver: [
                        gTooltipActions.showTooltip,
                        (_event: any) => "View this tree's history"
                    ],
                    onMouseOut: gTooltipActions.clearTooltip
                },
                [
                    h("div", { class: "history-icon" }, "")
                ]
            );

        return buttonView;
    },

    buildTreeTagsButton: (): VNode => {

        const buttonView: VNode =

            h("a",
                {
                    class: "tree-tags",
                    onClick: treeActions.showSharedTags,
                    onMouseOver: [
                        gTooltipActions.showTooltip,
                        (_event: any) => "View shared tags"
                    ],
                    onMouseOut: gTooltipActions.clearTooltip
                },
                [
                    h("div", { class: "tags-icon" }, "")
                ]
            );

        return buttonView;
    },

    buildBotHubButton: (): VNode => {

        const buttonView: VNode =

            h("a",
                {
                    class: "bot-hub",
                    onClick: treeActions.showBotHub,
                    onMouseOver: [
                        gTooltipActions.showTooltip,
                        (_event: any) => "Publish this tree as a bot"
                    ],
                    onMouseOut: gTooltipActions.clearTooltip
                },
                [
                    // h("div", { class: "arrow-right-icon" }, ""),
                    h("div", { class: "bot-icon" }, "")
                ]
            );

        return buttonView;
    },

    buildSubtreeHubButton: (tree: ITreeSys): VNode | null => {

        if (tree.isFlat === true) {
            
            return null;
        }

        const buttonView: VNode =

            h("a",
                {
                    class: "subtree-hub",
                    onClick: treeActions.showSubtreeHub,
                    onMouseOver: [
                        gTooltipActions.showTooltip,
                        (_event: any) => "Publish this tree as a subtree"
                    ],
                    onMouseOut: gTooltipActions.clearTooltip
                },
                [
                    // h("div", { class: "arrow-right-icon" }, ""),
                    h("div", { class: "subtree-icon" }, "")
                ]
            );

        return buttonView;
    },

    buildValidateTreeButton: (): VNode => {

        const buttonView: VNode =

            h("a",
                {
                    class: "validate-tree",
                    onClick: treeActions.validateTree,
                    onMouseOver: [
                        gTooltipActions.showTooltip,
                        (_event: any) => "Validate this tree"
                    ],
                    onMouseOut: gTooltipActions.clearTooltip
                },
                [
                    // h("div", { class: "arrow-right-icon" }, ""),
                    h("div", { class: "validation-icon" }, "")
                ]
            );

        return buttonView;
    },

    buildTreeShapeButton: (): VNode => {

        const buttonView: VNode =

            h("a",
                {
                    class: "tree-shape",
                    onClick: treeActions.showTreeShape,
                    onMouseOver: [
                        gTooltipActions.showTooltip,
                        (_event: any) => "Shows this tree's subtree references"
                    ],
                    onMouseOut: gTooltipActions.clearTooltip
                },
                [
                    // h("div", { class: "arrow-right-icon" }, ""),
                    h("div", { class: "shape-icon" }, "")
                ]
            );

        return buttonView;
    },

    buildCloneTreeButton: (): VNode => {

        const buttonView: VNode =

            h("a",
                {
                    class: "clone-tree",
                    onClick: treeActions.cloneTree,
                    onMouseOver: [
                        gTooltipActions.showTooltip,
                        (_event: any) => "Clone this tree"
                    ],
                    onMouseOut: gTooltipActions.clearTooltip
                },
                [
                    h("div", { class: "tree-icon" }, ""),
                    // h("div", { class: "arrow-right-icon" }, ""),
                    h("div", { class: "goto-icon" }, ""),
                    h("div", { class: "tree-icon" }, ""),
                    h("div", { class: "tree-icon" }, ""),
                ]
            );

        return buttonView;
    },

    buildTreeBranchesButton: (): VNode => {

        const buttonView: VNode =

            h("a",
                {
                    class: "view-branches",
                    onClick: treeActions.viewBranches,
                    onMouseOver: [
                        gTooltipActions.showTooltip,
                        (_event: any) => "View branches"
                    ],
                    onMouseOut: gTooltipActions.clearTooltip
                },
                [
                    // h("div", { class: "goto-icon" }, ""),
                    h("div", { class: "branches-icon" }, "")
                ]
            );

        return buttonView;
    },

    buildEditTreeButton: (): VNode => {

        const buttonView: VNode =

            h("a",
                {
                    class: "edit-tree",
                    onClick: treeActions.editTree,
                    onMouseOver: [
                        gTooltipActions.showTooltip,
                        (_event: any) => "Edit this tree"
                    ],
                    onMouseOut: gTooltipActions.clearTooltip
                },
                [
                    h("div", { class: "edit-icon" }, "")
                ]
            );

        return buttonView;
    },

    buildDeleteTreeButton: (tree: ITreeSys): VNode => {

        let properties: any = {
            class: {
                "delete-tree": true
            },
            onMouseOut: gTooltipActions.clearTooltip
        };

        let tooltip: string;

        if (!tree.deleteLock) {

            properties.onClick = treeActions.deleteTree;
            tooltip = "Delete this tree";
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

        const buttonView: VNode =

            h("a",
                properties,
                [
                    h("div", { class: "delete-icon" }, "")
                ]
            );

        return buttonView;
    },

    buildEditSubtreeButton: (): VNode => {

        const buttonView: VNode =

            h("a",
                {
                    class: "edit-subtree",
                    onClick: subtreeActions.editSubtree,
                    onMouseOver: [
                        gTooltipActions.showTooltip,
                        (_event: any) => "Edit this subtree"
                    ],
                    onMouseOut: gTooltipActions.clearTooltip
                },
                [
                    h("div", { class: "edit-icon" }, "")
                ]
            );

        return buttonView;
    },

    buildDeleteSubtreeButton: (tree: ITreeSys): VNode => {

        let properties: any = {
            class: {
                "delete-subtree": true
            },
            onMouseOut: gTooltipActions.clearTooltip
        };

        let tooltip: string;

        if (!tree.deleteLock) {

            properties.onClick = subtreeActions.deleteSubtree;
            tooltip = "Delete this subtree";
        }
        else {
            properties.class.disabled = true;
            tooltip = `Delete subtree is disabled. 
This subtree has been referenced by another tree. Delete all references first.`;
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

        const buttonView: VNode =

            h("a",
                properties,
                [
                    h("div", { class: "delete-icon" }, "")
                ]
            );

        return buttonView;
    },

    buildEditBotButton: (): VNode => {

        const buttonView: VNode =

            h("a",
                {
                    class: "edit-bot",
                    // onClick: botActions.editBot,
                    onMouseOver: [
                        gTooltipActions.showTooltip,
                        (_event: any) => "Edit this bot"
                    ],
                    onMouseOut: gTooltipActions.clearTooltip
                },
                [
                    h("div", { class: "edit-icon" }, "")
                ]
            );

        return buttonView;
    },

    buildDeleteBotButton: (): VNode => {

        const buttonView: VNode =

            h("a",
                {
                    class: "delete-bot",
                    // onClick: botActions.deleteBot,
                    onMouseOver: [
                        gTooltipActions.showTooltip,
                        (_event: any) => "Delete this bot"
                    ],
                    onMouseOut: gTooltipActions.clearTooltip
                },
                [
                    h("div", { class: "delete-icon" }, "")
                ]
            );

        return buttonView;
    },

    buildSubtreeSpreadButton: (): VNode => {

        const buttonView: VNode =

            h("a",
                {
                    class: "subtree-spread",
                    onClick: subtreeActions.showSubtreeSpread,
                    onMouseOver: [
                        gTooltipActions.showTooltip,
                        (_event: any) => "Shows where this subtree is used"
                    ],
                    onMouseOut: gTooltipActions.clearTooltip
                },
                [
                    // h("div", { class: "subtree-icon" }, ""),
                    h("div", { class: "spread-icon" }, "")
                ]
            );

        return buttonView;
    },

    buildPublishBotButton: (): VNode => {

        const buttonView: VNode =

            h("a",
                {
                    class: "publish-bot",
                    onClick: treeActions.publishTree,
                    onMouseOver: [
                        gTooltipActions.showTooltip,
                        (_event: any) => "Publish to a bot"
                    ],
                    onMouseOut: gTooltipActions.clearTooltip
                },
                [
                    // h("div", { class: "subtree-icon" }, ""),
                    h("div", { class: "publish-icon" }, "")
                ]
            );

        return buttonView;
    }
};

export default treeButtonViews;


