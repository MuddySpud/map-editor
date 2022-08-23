import { h, VNode } from "hyperapp-local";

import IState from "../../../../interfaces/state/IState";
import ITreeSys from "../../../../interfaces/state/tree/ITreeSys";
import cellViews from "./cellViews";
import U from "../../../../global/gUtilities";


const rowViews = {

    buildTreeRowView: (
        tree: ITreeSys,
        selected: boolean): VNode => {

        const show: boolean = tree.ui.show === true;

        if (show) {

            tree.ui.show = false;
        }

        const view: VNode =

            h("div",
                {
                    key: `${tree.key}`,
                    class: {
                        "tree-row": true,
                        "selected": selected,
                        "scroll-show": show
                    }
                },
                [
                    // cellViews.buildBranchesCell(tree),
                    cellViews.buildProjectCell(tree),
                    cellViews.buildTickCell(selected),
                    cellViews.buildBotCell(tree),
                    cellViews.buildSubtreeCell(tree),
                    cellViews.buildTreeCell(tree),

                    cellViews.buildNameCell(tree),

                    cellViews.buildEditTreeCell(tree),
                    cellViews.buildDeleteTreeCell(tree),
                    cellViews.buildInfoCell(),
                ]
            );

        return view;
    },

    buildTreeRowViews: (
        state: IState,
        trees: Array<ITreeSys>
    ): VNode[] => {

        let selectedKey: string = "";
        let selected: boolean = false;

        if (U.isNullOrWhiteSpace(state.treesState.selectedKey) === false) {

            selected = true;
            selectedKey = state.treesState.selectedKey;
        }

        const treeRowViews: VNode[] = [];
        let treeRowView: VNode | null;

        trees.forEach((tree: ITreeSys) => {

            treeRowView = rowViews.buildTreeRowView(
                tree,
                selected && tree.key === selectedKey
            );

            if (treeRowView) {

                treeRowViews.push(treeRowView);
            }
        });

        return treeRowViews;
    },
};

export default rowViews;


