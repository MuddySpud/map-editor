import { h, VNode } from "hyperapp-local";

import optionsViews from "./optionsViews";
import IState from "../../../../interfaces/state/IState";
import IBranchUI from "../../../../interfaces/state/ui/UIs/IBranchUI";
import INode from "../../../../interfaces/state/tree/INode";
import nodeActions from "../actions/nodeActions";
import gBranchesStateCode from "../../../../global/code/gBranchesStateCode";


const rootViews = {

    buildRootView: (state: IState): VNode => {

        const root: INode<IBranchUI> = state.branchesState.tree.root;

        if (root.isVirtual === true) {

            return rootViews.buildVirtualRootView(
                state,
                root
            );
        }

        return rootViews.buildStandardRootView(
            state,
            root
        );
    },

    buildStandardRootView: (
        state: IState,
        root: INode<IBranchUI>,
        resetSelected: boolean = false): VNode => {

        if (resetSelected === true) {

            state.branchesState.current = root;
            state.branchesState.selected = root;
            gBranchesStateCode.deselectAllNodes(state);
            root.ui.selected = true;

        }

        const rootText: string = root.discussion;
        state.branchesState.maxBranchDepth = 1;

        let buildRootProperties = (): any => {

            const properties: any = {
                class: {
                    "node": true,
                    "root": true,
                    "link": root.isLink === true,
                    "parent-silent-root": root.isParentSilentRoot, // Always false if a root not a fake root
                    "empty": root.nodes.length === 0,
                    "selected": root.ui.selected === true
                }
            };

            return properties;
        };

        const view: VNode =

            h("div",
                buildRootProperties(),
                [
                    h("a",
                        {
                            onClick: [
                                nodeActions.selectNode,
                                (_event: any) => root
                            ]
                        },
                        [
                            h("div", { class: "root-icon" }, ""),
                            h("span", { class: "discussion-text" }, rootText),
                        ]
                    ),
                    h("div",
                        {
                            class: "options"
                        },
                        optionsViews.buildOptionsView(
                            state,
                            root.nodes,
                            1
                        )
                    )
                ]);

        return view;
    },

    buildVirtualRootView: (
        state: IState,
        root: INode<IBranchUI>): VNode => {

        state.branchesState.maxBranchDepth = 1;

        let buildRootProperties = (): any => {

            const properties: any = {
                class: {
                    "node": true,
                    "virtual": true,
                    "root": true,
                    "empty": root.nodes.length === 0,
                    "selected": root.ui.selected === true
                }
            };

            return properties;
        };

        const view: VNode =
            h("div",
                buildRootProperties(),
                [
                    h("a",
                        {
                            onClick: [
                                nodeActions.selectNode,
                                (_event: any) => root
                            ]
                        },
                        [
                            h("div", { class: "root-icon" }, ""),
                            h("span", {}, `${state.branchesState.tree.name}`),
                        ]
                    ),
                    h("div",
                        {
                            class: "options"
                        },
                        optionsViews.buildOptionsView(
                            state,
                            root.nodes,
                            1
                        )
                    )
                ]);

        return view;
    }
};

export default rootViews;

