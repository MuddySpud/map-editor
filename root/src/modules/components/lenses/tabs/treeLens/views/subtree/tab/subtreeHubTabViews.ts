import { h, VNode } from "hyperapp-local";

import IState from "../../../../../../../interfaces/state/IState";
import treeButtonViews from "../../common/partial/treeButtonViews";
import treeLensControlsViews from "../../common/partial/treeLensControlsViews";
import ISubtreeSys from "../../../../../../../interfaces/state/tree/ISubtreeSys";
import ITreeSys from "../../../../../../../interfaces/state/tree/ITreeSys";
import subtreeTitleViews from "../partial/subtreeTitleViews";
import minMaxViews from "../partial/minMaxViews";
import treeMinMaxViews from "../../tree/partial/minMaxViews";
import loadingView from "../../../../../../loading/views/loadingView";


const subtreeHubTabViews = {

    buildTabView(state: IState): VNode | null {

        if (!state
            || !state.lens.treeTab.display
            || !state.lens.treeTab.lensSubtree
            || !state.lens.treeTab.lensTree) {

            return loadingView.buildView("Loading subtree...");
        }

        const lensTree: ITreeSys = state.lens.treeTab.lensTree;
        const lensSubtree: ISubtreeSys = state.lens.treeTab.lensSubtree;

        const view: VNode =

            h("div", { id: "treeLensView" }, [
                h("div", { id: "treeLens" }, [
                    h("div", { id: "subtreeLens" }, [

                        treeLensControlsViews.build_Refresh_Show_Hub_ControlsView(),

                        h("div", { class: "hub" }, [
                            h("div", { class: "hub-left" }, [

                                ...subtreeTitleViews.buildSubtreeHubTitleView(),

                                ...treeMinMaxViews.buildCollapsibleDetailsView(
                                    lensSubtree.tree,
                                    "Tree"
                                )
                            ]),
                            h("div", { class: "hub-right" }, [
                                ...treeButtonViews.buildSubtreeHubButtons(lensTree),
                            ])
                        ]),

                        ...minMaxViews.buildCollapsibleSubtreeDetailsView(
                            lensSubtree,
                            state.lens.treeTab.stats,
                            state.lens.treeTab.holes
                        )
                    ])
                ])
            ]);

        return view;
    }
};

export default subtreeHubTabViews;


