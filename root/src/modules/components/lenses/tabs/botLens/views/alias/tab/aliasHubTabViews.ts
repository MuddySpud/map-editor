import { h, VNode } from "hyperapp-local";

import IState from "../../../../../../../interfaces/state/IState";
import { BotType } from "../../../../../../../interfaces/enums/BotType";
import aliasTitleViews from "../partial/aliasTitleViews";
import IAlias from "../../../../../../../interfaces/state/bot/IAlias";
import aliasMinMaxViews from "../partial/aliasMinMaxViews";
import aliasLensControlsViews from "../partial/aliasLensControlsViews";
import aliasButtonViews from "../partial/aliasButtonViews";
import draftMinMaxViews from "../../draft/partial/draftMinMaxViews";


const aliasHubTabViews = {

    buildTabView(state: IState): VNode | null {

        if (!state
            || !state.lens.botTab.display
            || state.lens.botTab.lensBot.type !== BotType.Alias
            || !state.lens.botTab.lensBot.bot) {

            return null;
        }

        const alias: IAlias = state.lens.botTab.lensBot.bot as IAlias;

        const view: VNode =

            h("div", { id: "botLensView" }, [
                h("div", { id: "botLens" }, [

                    aliasLensControlsViews.build_ShowSelected_ControlsView(),

                    h("div", { class: "hub" }, [
                        h("div", { class: "hub-left" }, [

                            ...aliasTitleViews.buildHubTitleView(),

                            ...aliasMinMaxViews.buildCollapsibleDetailsView(
                                alias,
                                "alias"
                            ),
                            ...draftMinMaxViews.buildCollapsibleDetailsView(
                                alias.draft,
                                "draft"
                            )
                        ]),
                        h("div", { class: "hub-right" }, [

                            ...aliasButtonViews.buildHubButtons(),
                        ])
                    ]),
                ])
            ]);

        return view;
    }
};

export default aliasHubTabViews;


