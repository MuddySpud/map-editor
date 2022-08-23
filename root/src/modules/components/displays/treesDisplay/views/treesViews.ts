import { h, VNode } from "hyperapp-local";

import IState from "../../../../interfaces/state/IState";
import ITreeSys from "../../../../interfaces/state/tree/ITreeSys";
import loadingView from "../../../loading/views/loadingView";
import treePaginationViews from "./treePaginationViews";
import treeRowViews from "./rowViews";
import StringEvent from "../../../../state/ui/payloads/StringEvent";
import gTooltipActions from "../../../../global/actions/gTooltipActions";
import gTreeActions from "../../../../global/actions/gTreeActions";

import '../scss/index.scss';


const buildTreesView = (
    state: IState,
    trees: Array<ITreeSys>
): VNode => {

    const view: VNode =

        h("div", { id: "trees" }, [
            h("div", { class: "tree-display" }, [

                treePaginationViews.buildTopPagination(state),

                h("div", { class: "tree-table" },

                    treeRowViews.buildTreeRowViews(
                        state,
                        trees
                    )
                ),

                treePaginationViews.buildBottomPagination(state),
            ])
        ]);

    return view;
};

const buildCreateTreeView = (_state: IState): VNode => {

    const view: VNode =

        h("div", { class: "first-tree" }, [
            h("a",
                {
                    class: "create-tree",
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
                    h("div", { class: "create-icon" }, ""),
                    h("span", { }, "Create your first tree")
                ]
            )
        ]);

    return view;
};

const treesViews = {

    buildView: (state: IState): VNode => {

        const trees: Array<ITreeSys> = state.treesState.trees;

        let innardsView: VNode;

        if (state.loading) {

            innardsView = loadingView.buildView("Loading trees...");
        }
        else if (state.treesState.treesCount === 0
            && state.lens.treeTab.lensTree === null) {

            innardsView = buildCreateTreeView(state);
        }
        else {

            innardsView = buildTreesView(
                state,
                trees
            );
        }

        const view: VNode =

            h("div", { id: "treesView" }, [

                innardsView
            ]);

        return view;
    }
};

export default treesViews;


