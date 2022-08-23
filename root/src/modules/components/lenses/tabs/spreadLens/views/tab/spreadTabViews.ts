import { h } from "hyperapp-local";

import ISpreadCase from "../../../../../../interfaces/state/cases/ISpreadCase";
import treeLensControlsViews from "../../../treeLens/views/common/partial/treeLensControlsViews";
import ISpread from "../../../../../../interfaces/state/tree/ISpread";
import spreadViews from "../partial/spreadViews";


const spreadTabViews = {

    buildTabView: (spreadCase: ISpreadCase | null) => {

        if (spreadCase) {
            spreadCase.fresh = false;
        }

        const buildRootView = (rootSpread: ISpread | null | undefined) => {

            if (!rootSpread) {
                return;
            }

            const view: any =

                h("div", { class: "root-spread" }, [
                    h("a", {}, [
                        h("span", {}, rootSpread.tree.token),
                    ]),
                    h("div", { class: "kids" }, [
                        h("div", { class: "spreads" },

                            spreadViews.buildSpreadsView(rootSpread)
                        )
                    ])
                ]);

            return view;
        };

        const resultsView =

            h("div", { id: "spreadLensView" }, [
                h("div", { id: "spreadLens" }, [

                    treeLensControlsViews.build_Refresh_Show_Hub_ControlsView(),

                    h("div", { class: "icons" }, [
                        h("div", { class: "spread-icon" }, ""),
                    ]),
                    h("h3", {}, "Spread"),

                    buildRootView(spreadCase?.spread)
                ])
            ]);

        return resultsView;
    }
};

export default spreadTabViews;


