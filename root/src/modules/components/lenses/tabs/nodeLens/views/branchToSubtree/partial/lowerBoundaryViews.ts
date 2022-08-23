import { h, VNode } from "hyperapp-local";

import INodeBase from "../../../../../../../interfaces/state/tree/INodeBase";
import IBranchTreeTask from "../../../../../../../interfaces/state/tree/IBranchTreeTask";
import ISubtreeLoader from "../../../../../../../interfaces/state/tree/ISubtreeLoader";
import IAncestorKey from "../../../../../../../interfaces/state/tree/IAncestorKey";
import IStSocket from "../../../../../../../interfaces/state/tree/IStSocket";
import IHole from "../../../../../../../interfaces/state/tree/IHole";
import ISocketLoaderUI from "../../../../../../../interfaces/state/ui/UIs/ISocketLoaderUI";
import tableViews from "../../../../../lens/views/tableViews";
import headerControlViews from "../../../../../lens/views/headerControlViews";
import buttonViews from "../../../../../lens/views/buttonViews";
import CssClasses from "../../../../../../../state/constants/CssClasses";
import gNodeActions from "../../../../../../../global/actions/gNodeActions";
import branchToSubtreeActions from "../../../actions/branchToSubtreeActions";
import errorsViews from "../../../../../lens/views/errorsViews";
import { ActionType } from "../../../../../../../interfaces/enums/ActionType";
import gTooltipActions from "../../../../../../../global/actions/gTooltipActions";
import StringEvent from "../../../../../../../state/ui/payloads/StringEvent";


const lowerBoundaryViews = {

    buildBoundaryTypeView: (branchTreeTask: IBranchTreeTask): VNode | null => {

        if (!branchTreeTask
            || branchTreeTask.subtreeLoader.subtree.stSockets.length > 0) {

            return null;
        }

        const allDescendants: boolean = branchTreeTask.subtreeLoader.ui.allDescendants;
        const descendantClass: string = allDescendants === true ? CssClasses.yep : CssClasses.nope;

        return buttonViews.buildTypeButtonView(
            "Include all descendants",
            "Include all descendants and don't set any lower boundaries for the subtree",
            descendantClass,
            branchToSubtreeActions.toggleAllDescendants
        );
    },

    buildStSocketsView: (branchTreeTask: IBranchTreeTask): VNode | null => {

        if (!branchTreeTask
            || (branchTreeTask.subtreeLoader.ui.allDescendants === true
                && branchTreeTask.subtreeLoader.subtree.stSockets.length === 0)) {

            return null;
        }

        const socketViews: any[] = [];
        let socketView: any;
        let counter: number = 0;

        branchTreeTask.subtreeLoader.subtree.stSockets.forEach((stSocket: IStSocket) => {

            socketView = lowerBoundaryViews.buildStSocketUI(
                stSocket,
                ++counter);

            socketViews.push(socketView);
        });

        const view: VNode =

            h("div", {}, [
                h("div", { class: "limits" }, [
                    h("h4", {}, "Boundaries"),
                    h("ul", {}, [
                        h("li", { class: "notes" }, "A socket must be mapped to at least one boundary."),
                        h("li", { class: "notes" }, "A boundary can be a limit or a hole."),
                        h("li", { class: "notes" }, "0 or 1 limits allowed, plus 0 or many holes."),
                        h("li", { class: "notes" }, "The option selected as boundary will end up in the subtree, mapped to a socket."),
                        h("li", { class: "notes" }, "The discussion will remain with the parent tree, linked to the socket."),
                    ]),
                    ...socketViews,
                    lowerBoundaryViews.buildLimitErrorsView(branchTreeTask.subtreeLoader),
                    lowerBoundaryViews.buildAddSocketHoleButtonView(),
                ])
            ]);

        return view;
    },

    buildStSocketControlView: (
        stSocket: IStSocket,
        isMinimised: boolean): VNode => {

        let tooltip: string = " this socket";

        if (isMinimised === false) {

            tooltip = `Minimise${tooltip}`;
        }
        else {
            tooltip = `Maximise${tooltip}`;
        }

        return headerControlViews.buildMinimiseDataView(
            tooltip,
            stSocket,
            branchToSubtreeActions.toggleMinimiseStSocket,
            isMinimised
        );
    },

    buildStSocketUI: (
        stSocket: IStSocket,
        index: number): VNode | null => {

        if (!stSocket) {
            return null;
        }

        const holeViews: VNode[] = [];
        let holeView: VNode;
        let counter: number = 0;

        stSocket.holes.forEach((hole: IHole<ISocketLoaderUI>) => {

            holeView = lowerBoundaryViews.buildLimitView(
                hole,
                `${++counter}`);

            holeViews.push(holeView);
        });

        const holeHeaderClass: string = stSocket.holes.length > 0 ?
            '' :
            'error-holes';

        if (stSocket.ui.minimise === true) {

            return lowerBoundaryViews.buildMinimisedStSocketUI(
                stSocket,
                holeViews,
                holeHeaderClass,
                index
            );
        }

        return lowerBoundaryViews.buildMaximisedStSocketUI(
            stSocket,
            holeViews,
            holeHeaderClass,
            index
        );
    },

    buildMinimisedStSocketUI: (
        stSocket: IStSocket,
        holeViews: any[],
        holeHeaderClass: string,
        index: number): VNode => {

        const view: VNode =

            h("div", { class: "stSocket minimised" }, [
                h("h4", {}, `StSocket ${index}`),
                h("div", { class: "stSocket-box" }, [

                    lowerBoundaryViews.buildStSocketControlView(
                        stSocket,
                        true),

                    h("div", { class: "stSocket-data" }, [

                        tableViews.build2ColumnKeyValueRowView(
                            'text',
                            stSocket.text,
                            CssClasses.odd
                        )
                    ]),
                    h("div", { class: "holes" }, [
                        h("h4", { class: holeHeaderClass }, `${stSocket.holes.length} boundary options`),

                        errorsViews.buildErrorsViewIfErrors(stSocket.errors),
                        ...holeViews
                    ])
                ])
            ]);

        return view;
    },

    buildMaximisedStSocketUI: (
        stSocket: IStSocket,
        holeViews: any[],
        holeHeaderClass: string,
        index: number): VNode => {

        const view: VNode =

            h("div", { class: "stSocket" }, [
                h("h4", {}, `StSocket ${index}`),
                h("div", { class: "stSocket-box" }, [

                    lowerBoundaryViews.buildStSocketControlView(
                        stSocket,
                        false),

                    h("div", { class: "stSocket-data" }, [

                        tableViews.build2ColumnKeyValueRowView(
                            'key',
                            stSocket.key,
                            CssClasses.odd
                        ),

                        tableViews.build2ColumnKeyValueRowView(
                            'text',
                            stSocket.text
                        )
                    ]),
                    h("div", { class: "holes" }, [
                        h("h4", { class: holeHeaderClass }, `${stSocket.holes.length} boundary options`),

                        errorsViews.buildErrorsViewIfErrors(stSocket.errors),
                        ...holeViews
                    ]),

                    lowerBoundaryViews.buildAddButtonView(stSocket)
                ])
            ]);

        return view;
    },

    buildLimitControlView: (
        limit: INodeBase,
        isMinimised: boolean): VNode => {

        let tooltip: string = ' this limit';

        if (isMinimised === false) {

            tooltip = `Minimise${tooltip}`;
        }
        else {
            tooltip = `Maximise${tooltip}`;
        }

        return headerControlViews.buildDataControlView(
            tooltip,
            "Remove this limit",
            limit,
            branchToSubtreeActions.toggleMinimiseLimit,
            branchToSubtreeActions.removeLimit,
            isMinimised
        );
    },

    buildLimitView: (
        limit: IHole<ISocketLoaderUI>,
        index: string): VNode => {

        if (limit.ui.minimise === true
            && limit.errors.length === 0) {

            return lowerBoundaryViews.buildMinimisedLimitView(
                limit,
                index
            );
        }

        return lowerBoundaryViews.buildMaximisedLimitView(
            limit,
            index
        );
    },

    buildSocketShadowIconView: (isLimit: boolean): VNode => {

        let tooltip: string = 'Hole: a node with no discussion';
        let iconClass: string = 'hole-icon';

        if (isLimit === true) {

            tooltip = 'Limit: nodes between the selected subtree root and this node will move to the new subtree, from the limit onwards will remain within the parent tree';
            iconClass = 'limit-icon';
        }

        const view: VNode =

            h("div", { class: "shadow-icon" }, [
                h("div",
                    {
                        class: `${iconClass}`,
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
                    }, ""),
            ]);

        return view;
    },

    buildMinimisedLimitView: (
        limit: IHole<ISocketLoaderUI>,
        index: string): VNode => {

        const view: VNode =

            h("div", { class: "limit minimised" }, [
                h("div", { class: "limit-box" }, [

                    lowerBoundaryViews.buildLimitControlView(
                        limit,
                        true),

                    lowerBoundaryViews.buildSocketShadowIconView(limit.action === ActionType.MapLimitToSocket),

                    buttonViews.buildOpenInBranchesViewButton(
                        limit,
                        "Show this hole in the tree-view",
                        "open-view",
                        gNodeActions.showOption),

                    h("div", { class: "limit-data" }, [

                        tableViews.build3ColumnIndexKeyValueRowView(
                            index,
                            'option (subtree)',
                            limit.option,
                            CssClasses.odd
                        )
                    ])
                ])
            ]);

        return view;
    },

    buildMaximisedLimitView: (
        limit: IHole<ISocketLoaderUI>,
        index: string): VNode => {

        const views: VNode[] = [

            tableViews.build3ColumnIndexKeyValueRowView(
                index,
                'key',
                limit.key,
                CssClasses.odd
            ),

            tableViews.build3ColumnKeyValueRowView(
                'option (subtree)',
                limit.option
            ),

            tableViews.build3ColumnKeyValueRowView(
                'discussion',
                limit.discussion,
                CssClasses.odd
            )
        ];

        const view: VNode =

            h("div", { class: "limit" }, [
                h("div", { class: "limit-box" }, [

                    lowerBoundaryViews.buildLimitControlView(
                        limit,
                        false),

                    lowerBoundaryViews.buildSocketShadowIconView(limit.action === ActionType.MapLimitToSocket),
                    lowerBoundaryViews.buildOverrideButtonView(limit),
                    errorsViews.buildErrorsViewIfErrors(limit.errors),

                    buttonViews.buildOpenInBranchesViewButton(
                        limit,
                        "Show this hole in the tree-view",
                        "open-view",
                        gNodeActions.showOption),

                    h("div", { class: "limit-data" }, views)
                ])
            ]);

        return view;
    },

    buildLimitErrorsView: (subtreeLoader: ISubtreeLoader): VNode | null => {

        if (subtreeLoader.failedAncestors.ancestorKeys.length === 0
            && subtreeLoader.failedDescendants.ancestorKeys.length === 0) {

            return null;
        }

        const errorViews: VNode[] = [
            h("h4", {}, "Validation failed - limits cannot be descendants of other limits for the same subtree link")
        ];

        let errorView: VNode;

        if (subtreeLoader.failedAncestors.ancestorKeys.length > 0) {

            errorViews.push(
                h("div", { class: "row" }, [
                    h("div", { class: "error-head" }, `limit key`),
                    h("div", { class: "error-head" }, 'ancestor key')
                ])
            );

            subtreeLoader.failedAncestors.ancestorKeys.forEach((key: IAncestorKey) => {

                errorView = lowerBoundaryViews.buildLimitErrorView(key);
                errorViews.push(errorView);
            });
        }

        if (subtreeLoader.failedDescendants.ancestorKeys.length > 0) {

            errorViews.push(
                h("div", { class: "row" }, [
                    h("div", { class: "error-head" }, `limit key`),
                    h("div", { class: "error-head" }, 'descendant key')
                ])
            );

            subtreeLoader.failedDescendants.ancestorKeys.forEach((key: IAncestorKey) => {

                errorView = lowerBoundaryViews.buildLimitErrorView(key);
                errorViews.push(errorView);
            });
        }

        const view: VNode =

            h("div", { class: "error" }, [
                ...errorViews
            ]);

        return view;
    },

    buildSocketErrorsView: (stSocket: IStSocket): VNode | null => {

        if (stSocket.errors.length === 0) {

            return null;
        }

        return h("div", {}, "TODO - need to build socket error view...");
    },

    buildLimitErrorView: (key: IAncestorKey): VNode => {

        const view: VNode =

            h("div", { class: "row" }, [
                h("div", { class: "value" }, key.nodeKey),
                h("div", { class: "value" }, key.ancestorKey)
            ]);

        return view;
    },

    buildAddButtonView: (stSocket: IStSocket): VNode => {

        const text: string = stSocket.holes.length > 0 ?
            'Map another option to socket' :
            'Map an option to socket';

        return buttonViews.buildPressDataButtonView(
            text,
            `Select an option to become a lower boundary for the subtree.
It will mapped to this socket`,
            branchToSubtreeActions.addLimit,
            stSocket
        );
    },

    buildAddSocketHoleButtonView: (): VNode => {

        return buttonViews.buildPressButtonView(
            "Create socket from option",
            `Create socket and boundary from an option,
The socket text is set to text displayed in the option`,
            branchToSubtreeActions.socketFromLimit
        );
    },

    buildOverrideButtonView: (limit: IHole<ISocketLoaderUI>): VNode => {

        const overrideOptionClass: string = limit.ui.overrideOption === true ? CssClasses.yep : CssClasses.nope;

        return buttonViews.buildTypeDataButtonView(
            "Display socket text in place of option",
            "Select whether this prints the socket text instead of the hole option",
            overrideOptionClass,
            branchToSubtreeActions.toggleOverrideOption,
            limit
        );
    }
};

export default lowerBoundaryViews;

