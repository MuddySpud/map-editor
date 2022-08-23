import { h } from "hyperapp-local";

import IState from "../../../../../../../interfaces/state/IState";
import treeButtonViews from "../../common/partial/treeButtonViews";
import treeLensControlsViews from "../../common/partial/treeLensControlsViews";


const botHubTabViews = {

    buildTabView(state: IState): any {

        if (!state
            || !state.lens.treeTab.display) {
            return;
        }

        const lensTabBodyView =

            h("div", { id: "treeLensView" }, [
                h("div", { id: "treeLens" }, [
                    h("div", { id: "botLens" }, [

                        treeLensControlsViews.build_Show_Hub_ControlsView(),

                        h("div", { class: "hub" }, [
                            h("div", { class: "hub-left" }, [

                                h("div", { class: "icons" }, [
                                    h("div", { class: "tree-bot-draft-hub-icon" }, ""),
                                ]),
                                h("h3", {}, "Publish bot draft hub"),

                            ]),
                            h("div", { class: "hub-right" }, [
                                ...treeButtonViews.buildBotHubButtons(),
                            ])
                        ]),
                    ])
                ])
            ]);

        return lensTabBodyView;
    }
}

export default botHubTabViews;


