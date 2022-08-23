import { h, VNode } from "hyperapp-local";

import IState from "../../../../../../../interfaces/state/IState";
import draftLensControlsViews from "../partial/draftLensControlsViews";
import draftTitleViews from "../partial/draftTitleViews";
import { BotType } from "../../../../../../../interfaces/enums/BotType";
import IDraft from "../../../../../../../interfaces/state/bot/IDraft";
import draftButtonViews from "../partial/draftButtonViews";
import draftMinMaxViews from "../partial/draftMinMaxViews";


const draftHubTabViews = {

    buildTabView(state: IState): VNode | null {

        if (!state
            || !state.lens.botTab.display
            || state.lens.botTab.lensBot.type !== BotType.Draft
            || !state.lens.botTab.lensBot.bot) {

            return null;
        }

        const draft: IDraft = state.lens.botTab.lensBot.bot as IDraft;

        const view: VNode =

            h("div", { id: "botLensView" }, [
                h("div", { id: "botLens" }, [

                    draftLensControlsViews.build_ShowSelected_ControlsView(),

                    h("div", { class: "hub" }, [
                        h("div", { class: "hub-left" }, [

                            ...draftTitleViews.buildHubTitleView(),

                            ...draftMinMaxViews.buildCollapsibleDetailsView(
                                draft,
                                "draft"
                            )
                        ]),
                        h("div", { class: "hub-right" }, [

                            ...draftButtonViews.buildHubButtons(draft),
                        ])
                    ]),
                ])
            ]);

        return view;
    }
};

export default draftHubTabViews;


