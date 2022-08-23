import { h, VNode } from "hyperapp-local";

import INode from "../../../../interfaces/state/tree/INode";
import IBranchUI from "../../../../interfaces/state/ui/UIs/IBranchUI";
import { LensActionType } from "../../../../interfaces/enums/LensActionType";
import NodeControl from "../../../../state/ui/payloads/NodeControl";
import NodeEvent from "../../../../state/ui/payloads/NodeEvent";
import IState from "../../../../interfaces/state/IState";
import { NodeType } from "../../../../interfaces/enums/NodeType";
import U from "../../../../global/gUtilities";
import gTooltipActions from "../../../../global/actions/gTooltipActions";
import CssClasses from "../../../../state/constants/CssClasses";
import optionActions from "../actions/optionActions";
import nodeActions from "../actions/nodeActions";
import gSession from "../../../../global/gSession";
import Filters from "../../../../state/constants/Filters";


const controlsViews = {

    buildErrorsTableView: (errors: string[]): VNode[] => {

        const errorViews: VNode[] = [];
        let errorView: VNode | null;
        let count: number = 0;

        errors.forEach((error: string) => {

            errorView = controlsViews.buildErrorRowView(
                error,
                ++count);

            if (errorView) {

                errorViews.push(errorView);
            }
        });

        return errorViews;
    },

    buildErrorRowView: (
        error: string,
        index: number): VNode | null => {

        if (U.isNullOrWhiteSpace(error)) {

            return null;
        }

        const errorView: VNode =

            h("div", { class: "error-row" }, [
                h("div", { class: "error-index" }, `${index}`),
                h("div", { class: "error-value" }, `${error}`)
            ]);

        return errorView;
    },

    buildAddDiscussionButtonView: (option: INode<IBranchUI>): VNode => {

        const view: VNode =

            h("a",
                {
                    onClick: [
                        nodeActions.startNodeAction,
                        (_event: any) => {
                            return new NodeControl(
                                option,
                                LensActionType.CreateDiscussion
                            );
                        }
                    ]
                },
                [
                    h("span", {}, "Add a discussion with options")
                ]
            );

        return view;
    },

    buildSetAsSocketButtonView: (
        state: IState,
        option: INode<IBranchUI>): VNode => {

        let buttonText: string = "Mark hole as a subtree socket";

        if (!state.branchesState.tree.isSubtree) {

            buttonText = "Convert tree to subtree then mark hole as a socket";
        }

        const view: VNode =

            h("a",
                {
                    onClick: [
                        nodeActions.startNodeAction,
                        (_event: any) => {
                            return new NodeControl(
                                option,
                                LensActionType.MarkSocket
                            );
                        }
                    ]
                },
                [
                    h("span", {}, buttonText)
                ]
            );

        return view;
    },

    buildAddSolutionButtonView: (option: INode<IBranchUI>): VNode => {

        const view: VNode =

            h("a",
                {
                    onClick: [
                        nodeActions.startNodeAction,
                        (_event: any) => {
                            return new NodeControl(
                                option,
                                LensActionType.CreateSolution
                            );
                        }
                    ]
                },
                [
                    h("span", {}, "Add a solution")
                ]
            );

        return view;
    },

    buildRefreshView: (option: INode<IBranchUI>): VNode => {

        const view: VNode =

            h("div",
                {
                    class: "refresh",
                    onClick: [
                        nodeActions.refresh,
                        (_event: any) => option
                    ],
                    onMouseOver: [
                        gTooltipActions.showTooltip,
                        (_event: any) => "Refresh this node from the database"
                    ],
                    onMouseOut: gTooltipActions.clearTooltip
                },
                ""
            );

        return view;
    },

    buildExpandBranchUI: (option: INode<IBranchUI>): VNode => {

        const view: VNode =

            h("div",
                {
                    class: "expand-branch",
                    onClick: [
                        nodeActions.expandBranch,
                        (_event: any) => option
                    ],
                    onMouseOver: [
                        gTooltipActions.showTooltip,
                        (_event: any) => "Expand all the options in this branch"
                    ],
                    onMouseOut: gTooltipActions.clearTooltip
                },
                ""
            );

        return view;
    },

    buildNodeDetailsView: (node: INode<IBranchUI>): VNode => {

        const entryClass: string = node.isEntry === true ? CssClasses.yep : CssClasses.nope;
        const socketClass: string = node.isSocket === true ? CssClasses.yep : CssClasses.nope;
        const linkClass: string = node.isLink === true ? CssClasses.yep : CssClasses.nope;
        const plugClass: string = node.isPlug === true ? CssClasses.yep : CssClasses.nope;
        const parentRootClass: string = node.isParentRoot === true ? CssClasses.yep : CssClasses.nope;
        const virtualTickClass: string = node.isVirtual === true ? CssClasses.yep : CssClasses.nope;

        const view: VNode =

            h("div", { class: "node-info" }, [
                h("div", { class: "row" }, [
                    h("div", { class: "key" }, "key"),
                    h("div", { class: "value" }, `${node.key}`)
                ]),
                h("div", { class: "row" }, [
                    h("div", { class: "key" }, "r"),
                    h("div", { class: "value" }, `${node.r}`)
                ]),
                h("div", { class: "row" }, [
                    h("div", { class: "key" }, "token"),
                    h("div", { class: "value" }, `${node.token}`)
                ]),
                h("div", { class: "row" }, [
                    h("div", { class: "key" }, "type"),
                    h("div", { class: "value" }, `${node.type}`)
                ]),
                h("div", { class: "row" }, [
                    h("div", { class: "key" }, "option"),
                    h("div", { class: "value" }, `${node.option}`)
                ]),
                h("div", { class: "row" }, [
                    h("div", { class: "key" }, "discussion"),
                    h("div", { class: "value" }, `${node.discussion}`)
                ]),
                h("div", { class: "row" }, [
                    h("div", { class: "key" }, "errors"),
                    h("div", { class: "value" }, controlsViews.buildErrorsTableView(node.errors))
                ]),
                h("div", { class: "row" }, [
                    h("div", { class: "key" }, "order"),
                    h("div", { class: "value" }, `${node.order}`)
                ]),
                h("div", { class: "row" }, [
                    h("div", { class: "key" }, "child count"),
                    h("div", { class: "value" }, `${node.nodes.length}`)
                ]),
                h("div", { class: "row" }, [
                    h("div", { class: "key" }, "entry"),
                    h("div", { class: "value" }, [
                        h("div", { class: `${entryClass}` }, ""),
                    ])
                ]),
                h("div", { class: "row" }, [
                    h("div", { class: "key" }, "socket"),
                    h("div", { class: "value" }, [
                        h("div", { class: `${socketClass}` }, ""),
                    ])
                ]),
                h("div", { class: "row" }, [
                    h("div", { class: "key" }, "is link"),
                    h("div", { class: "value" }, [
                        h("div", { class: `${linkClass}` }, ""),
                    ])
                ]),
                h("div", { class: "row" }, [
                    h("div", { class: "key" }, "socket link"),
                    h("div", { class: "value" }, [
                        h("div", { class: `${plugClass}` }, ""),
                    ])
                ]),
                h("div", { class: "row" }, [
                    h("div", { class: "key" }, "virtual"),
                    h("div", { class: "value" }, [
                        h("div", { class: `${virtualTickClass}` }, ""),
                    ])
                ]),
                h("div", { class: "row" }, [
                    h("div", { class: "key" }, "parent is root"),
                    h("div", { class: "value" }, [
                        h("div", { class: `${parentRootClass}` }, ""),
                    ])
                ])
            ]);


        return view;
    },

    buildAddExistingSubtreeButtonView: (option: INode<IBranchUI>): VNode => {

        const view: VNode =

            h("a",
                {
                    onClick: [
                        nodeActions.startNodeAction,
                        (_event: any) => {
                            return new NodeControl(
                                option,
                                LensActionType.CreateSubtreeLink
                            );
                        }
                    ]
                },
                [
                    h("span", {}, "Link to an existing subtree")
                ]
            );

        return view;
    },

    buildAddNewSubtreeButtonView: (option: INode<IBranchUI>): VNode => {

        const view: VNode =

            h("a",
                {
                    onClick: [
                        nodeActions.startNodeAction,
                        (_event: any) => {
                            return new NodeControl(
                                option,
                                LensActionType.CreateSubtreeAndLink
                            );
                        }
                    ]
                },
                [
                    h("span", {}, "Link to a new subtree")
                ]
            );

        return view;
    },

    buildAddFlatControlsView: (option: INode<IBranchUI>): VNode | null => {

        if (!option.ui.branchViewNodeControls) {

            return null;
        }

        gSession.setFocusFilter(Filters.nodeControlFocusFilter);

        const nodeView: VNode =

            h("div",
                {
                    id: "controlMenu",
                    tabindex: 0, // if this is not set it is not focusable
                    onBlur: [
                        nodeActions.closeControls,
                        (event: any) => {
                            return new NodeEvent(
                                option,
                                event
                            );
                        }
                    ]
                },
                [
                    controlsViews.buildAddSolutionButtonView(option),
                    controlsViews.buildAddExistingSubtreeButtonView(option),
                    controlsViews.buildAddNewSubtreeButtonView(option)
                ]);

        return nodeView;
    },

    buildInfoControlsView: (option: INode<IBranchUI>): VNode | null => {

        if (!option.ui.info) {

            return null;
        }

        gSession.setFocusFilter(Filters.infoControlFocusFilter);

        const nodeView: VNode =

            h("div",
                {
                    id: "infoMenu",
                    tabindex: 0, // if this is not set it is not focusable
                    onBlur: [
                        nodeActions.closeInfo,
                        (event: any) => {
                            return new NodeEvent(
                                option,
                                event
                            );
                        }
                    ]
                },
                [
                    h("h4", {}, "info"),

                    controlsViews.buildRefreshView(option),
                    controlsViews.buildExpandBranchUI(option),
                    controlsViews.buildNodeDetailsView(option)
                ]);

        return nodeView;
    },

    buildAddNodeControlsView: (
        state: IState,
        option: INode<IBranchUI>): VNode | null => {

        if (!option.ui.branchViewNodeControls) {

            return null;
        }

        gSession.setFocusFilter(Filters.nodeControlFocusFilter);

        const nodeView: VNode =

            h("div",
                {
                    id: "controlMenu",
                    tabindex: 0, // if this is not set it is not focusable
                    onBlur: [
                        nodeActions.closeControls,
                        (event: any) => {
                            return new NodeEvent(
                                option,
                                event
                            );
                        }
                    ]
                },
                [
                    controlsViews.buildAddDiscussionButtonView(option),
                    controlsViews.buildAddSolutionButtonView(option),
                    controlsViews.buildSetAsSocketButtonView(state, option),
                    controlsViews.buildAddExistingSubtreeButtonView(option),
                    controlsViews.buildAddNewSubtreeButtonView(option)
                ]);

        return nodeView;
    },

    buildMoveBranchButtonView: (option: INode<IBranchUI>): VNode => {

        const view: VNode =

            h("a",
                {
                    onClick: [
                        optionActions.startOptionAction,
                        (_event: any) => {
                            return new NodeControl(
                                option,
                                LensActionType.MoveBranch
                            );
                        }
                    ]
                },
                [
                    h("span", {}, "Move this branch")
                ]
            );

        return view;
    },

    buildMoveToHereButtonView: (option: INode<IBranchUI>): VNode => {

        const view: VNode =

            h("a",
                {
                    onClick: [
                        optionActions.startOptionAction,
                        (_event: any) => {
                            return new NodeControl(
                                option,
                                LensActionType.MoveToHere
                            );
                        }
                    ]
                },
                [
                    h("span", {}, "Move a branch to this discussion")
                ]
            );

        return view;
    },

    buildCloneBranchButtonView: (option: INode<IBranchUI>): VNode => {

        const view: VNode =

            h("a",
                {
                    onClick: [
                        optionActions.startOptionAction,
                        (_event: any) => {
                            return new NodeControl(
                                option,
                                LensActionType.CloneBranch
                            );
                        }
                    ]
                },
                [
                    h("span", {}, "Clone this branch")
                ]
            );

        return view;
    },

    buildCloneToHereButtonView: (option: INode<IBranchUI>): VNode => {

        const view: VNode =

            h("a",
                {
                    onClick: [
                        optionActions.startOptionAction,
                        (_event: any) => {
                            return new NodeControl(
                                option,
                                LensActionType.CloneToHere
                            );
                        }
                    ]
                },
                [
                    h("span", {}, "Clone a branch to this discussion")
                ]
            );

        return view;
    },

    buildConvertBranchToSubtreeButtonView: (option: INode<IBranchUI>): VNode | null => {

        if (option.type === NodeType.Solution) {

            return null;
        }

        const view: VNode =

            h("a",
                {
                    onClick: [
                        optionActions.startOptionAction,
                        (_event: any) => {
                            return new NodeControl(
                                option,
                                LensActionType.ConvertBranchToSubtree
                            );
                        }
                    ]
                },
                [
                    h("span", {}, "Convert this branch to subtree")
                ]
            );

        return view;
    },

    buildStashButtonView: (option: INode<IBranchUI>): VNode => {

        const view: VNode =

            h("a",
                {
                    onClick: [
                        optionActions.startOptionAction,
                        (_event: any) => {
                            return new NodeControl(
                                option,
                                LensActionType.StashBranch
                            );
                        }
                    ]
                },
                [
                    h("span", {}, "Stash this branch")
                ]
            );

        return view;
    },

    buildOptionActionView: (option: INode<IBranchUI>): VNode | null => {

        if (!option.ui.branchViewOptionControls) {

            return null;
        }

        gSession.setFocusFilter(Filters.nodeControlFocusFilter);

        const actionView: VNode =

            h("div",
                {
                    id: "controlMenu",
                    tabindex: 0, // if this is not set it is not focusable
                    onBlur: [
                        nodeActions.closeControls,
                        (event: any) => {
                            return new NodeEvent(
                                option,
                                event
                            );
                        }
                    ]
                },
                [
                    controlsViews.buildMoveBranchButtonView(option),
                    controlsViews.buildCloneBranchButtonView(option),
                    controlsViews.buildStashButtonView(option),
                    controlsViews.buildConvertBranchToSubtreeButtonView(option),

                    h("div", { class: "menu-spacer" }, ""),

                    controlsViews.buildMoveToHereButtonView(option),
                    controlsViews.buildCloneToHereButtonView(option)
                ]
            );

        return actionView;
    }
};

export default controlsViews;
