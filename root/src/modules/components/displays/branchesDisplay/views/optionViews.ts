import { h, VNode } from "hyperapp-local";

import INode from "../../../../interfaces/state/tree/INode";
import optionActions from "../actions/optionActions";
import nodeView from "./nodeViews";
import optionViewActions from "../actions/optionViewActions";
import IBranchUI from "../../../../interfaces/state/ui/UIs/IBranchUI";
import IState from "../../../../interfaces/state/IState";
import controlsViews from "./controlsViews";
import gNodeCode from "../../../../global/code/gNodeCode";
import U from "../../../../global/gUtilities";
import NodeEvent from "../../../../state/ui/payloads/NodeEvent";


const optionViews = {

    buildOptionView: (
        state: IState,
        option: INode<IBranchUI>,
        depth: number): VNode | null => {

        if (option.isHidden === true) {
            return null;
        }

        let highlight: boolean = option.ui.highlightTime > 0;
        const error: boolean = gNodeCode.hasError(option) === true;
        const show: boolean = option.ui.showOption === true;

        if (show) {

            option.ui.showOption = false;
        }

        const buildOptionProperties = (): any => {

            const properties = {
                class: {
                    "option": true,
                    "plug": option.isPlug === true,
                    "socket": option.isSocket === true,
                    "option-menu": option.ui.branchViewOptionControls === true,
                    "node-menu": option.ui.branchViewNodeControls === true,
                    "expanded": option.ui.expanded === true,
                    "error": error === true,
                    "branch-option": option.ui.branchTaskOption === true,
                    "info": option.ui.info === true,
                    "branch-limit": option.ui.branchTaskLimit === true,
                    "override-option": option.socketHole?.overrideOption === true,
                    "highlight": highlight,
                    "scroll-show": show
                },
                key: `${option.key}`
            };

            return properties;
        };

        const buildChildren = (): VNode => {

            let children: any = "";
            let hidden: boolean = true;

            if (option.ui.expanded === true) {

                hidden = false;

                children = nodeView.buildNodeView(
                    state,
                    option,
                    depth
                );
            }

            const properties = {
                class: {
                    "kids": true,
                    "hidden": hidden
                }
            };

            let childView = h("div", properties, children);

            return childView;
        };

        const buildExpandButton = (option: INode<IBranchUI>): VNode | null => {

            if (option.ui.branchViewNodeControls === true) {

                return null;
            }

            let expandView: VNode;

            if (option.ui.loading) {

                expandView =

                    h("div", { class: "option-spinner" }, [
                        h("div", {}, ''),
                        h("div", {}, ''),
                        h("div", {}, ''),
                    ]);
            }
            else {

                expandView =

                    h("div",
                        {
                            class: "option-expand",
                            onClick: [
                                optionActions.toggleExpandOption,
                                (_event: any) => option
                            ]
                        },
                        ""
                    );
            }

            return expandView;
        };

        const buildNodeControlsView = (option: INode<IBranchUI>): VNode | null => {

            if (option.parent
                && option.parent.isVirtual === true) {

                return controlsViews.buildAddFlatControlsView(option);
            }

            return controlsViews.buildAddNodeControlsView(
                state,
                option);
        };

        const buildOptionIconView = (option: INode<IBranchUI>): VNode | null => {

            if (error === true
                || option.isSocket === true
                || option.isPlug === true
                || option.socketHole?.overrideOption === true) {

                return h("div", { class: "option-icon" }, "");
            }

            return null;
        };

        const buildOptionActionsButton = (option: INode<IBranchUI>): VNode | null => {

            if (option.parent
                && option.parent.isVirtual === true
                && U.isNullOrWhiteSpace(option.discussion) === false
                && option.isSocket === true) {
                // If flat tree and discussion has been set don't display action menu
                return null;
            }

            // If a menu is displayed for an option don't show the three dots option actions
            if (option.ui.branchViewNodeControls === true
                || option.ui.branchViewOptionControls === true) {

                return null;
            }

            const view: VNode =

                h("div",
                    {
                        class: "option-actions",
                        onMouseDown: [
                            optionActions.startShowMenu,
                            (_event: any) => option
                        ],
                        // Replacing onClick with onMouseDown might cause problems...
                        // onClick: [
                        //     optionActions.startShowMenu,
                        //     (_event: any) => option
                        // ],
                    },
                    ""
                );

            return view;
        };

        const buildOptionInfoButtonView = (option: INode<IBranchUI>): VNode => {

            const view =

                h("div",
                    {
                        class: "option-info",
                        onMouseDown: [
                            optionActions.showInfo,
                            (event: any) => {
                                return new NodeEvent(
                                    option,
                                    event
                                );
                            }
                        ],
                    },
                    ""
                );

            return view;
        };

        const text: string = option.socketHole?.overrideOption === true ?
            option.socketHole?.socketText :
            option.option;

        const optionView: VNode =

            h("div", buildOptionProperties(), [

                controlsViews.buildOptionActionView(option),
                buildExpandButton(option),

                h("a",
                    {
                        class: "option-knobs",
                        onMouseDown: [
                            optionActions.selectOption,
                            (_event: any) => option
                        ],
                        onMouseEnter: [
                            optionViewActions.onOptionMouseEnter,
                            (event: any) => event.target
                        ],
                        onMouseLeave: [
                            optionViewActions.onOptionMouseLeave,
                            (event: any) => event.target
                        ]
                    },
                    [
                        buildOptionActionsButton(option),
                        buildOptionIconView(option),
                        h("span", {}, `${text}`),
                        buildOptionInfoButtonView(option)
                    ]),

                controlsViews.buildInfoControlsView(option),
                buildNodeControlsView(option),
                buildChildren()
            ]);

        return optionView;
    }
};

export default optionViews;
