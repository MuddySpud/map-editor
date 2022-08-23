import { h, VNode } from "hyperapp-local";

import IState from "../../../../../../../interfaces/state/IState";
import ITreeSys from "../../../../../../../interfaces/state/tree/ITreeSys";
import treeButtonViews from "../../common/partial/treeButtonViews";
import treeLensControlsViews from "../../common/partial/treeLensControlsViews";
import treeTitleViews from "../partial/treeTitleViews";
import minMaxViews from "../partial/minMaxViews";
import loadingView from "../../../../../../loading/views/loadingView";


const treeHubTabViews = {

    buildTabView(state: IState): VNode | null {

        if (!state
            || !state.lens.treeTab.display
            || !state.lens.treeTab.lensTree) {

            return loadingView.buildView("Loading stats...");
        }

        const lensTree: ITreeSys = state.lens.treeTab.lensTree;

        const view: VNode =

            h("div", { id: "treeLensView" }, [
                h("div", { id: "treeLens" }, [

                    treeLensControlsViews.build_Refresh_Show_ControlsView(),

                    h("div", { class: "hub" }, [
                        h("div", { class: "hub-left" }, [

                            ...treeTitleViews.buildTreeHubTitleView(),

                            ...minMaxViews.buildCollapsibleDetailsView(
                                lensTree,
                                "Tree"),

                            ...minMaxViews.buildCollapsibleStatsView(
                                state.lens.treeTab.stats,
                                "Stats"),

                            ...minMaxViews.buildCollapsibleCountsView(
                                state.lens.treeTab.stats,
                                "Counts")
                        ]),
                        h("div", { class: "hub-right" }, [

                            ...treeButtonViews.buildHubButtons(lensTree),
                        ])
                    ]),
                ])
            ]);

        return view;
    }
};

export default treeHubTabViews;


