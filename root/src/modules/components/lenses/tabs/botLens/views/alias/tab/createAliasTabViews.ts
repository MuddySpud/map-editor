import { h, VNode } from "hyperapp-local";

import IState from "../../../../../../../interfaces/state/IState";
import lensButtonsViews from "../../../../../lens/views/lensButtonsViews";
import gSession from "../../../../../../../global/gSession";
import Filters from "../../../../../../../state/constants/Filters";
import gBotCode from "../../../../../../../global/code/gBotCode";
import botActions from "../../../actions/botActions";
import { BotType } from "../../../../../../../interfaces/enums/BotType";
import IAlias from "../../../../../../../interfaces/state/bot/IAlias";
import aliasEditDetailsViews from "../partial/aliasEditDetailsViews";
import aliasTitleViews from "../partial/aliasTitleViews";
import draftMinMaxViews from "../../draft/partial/draftMinMaxViews";
import typeViews from "../partial/typeViews";


const createAliasTabViews = {

    buildTabView(state: IState): VNode | null {

        if (!state
            || !state.lens.botTab.display
            || state.lens.botTab.lensBot.type !== BotType.Alias
            || !state.lens.botTab.lensBot.type) {

            return null;
        }

        const alias: IAlias = state.lens.botTab.lensBot.bot as IAlias;

        if (alias.ui.raw === true) {

            state.lens.botTab.enableSave = false;
            gSession.setFocusFilter(Filters.aliasTitleFocusFilter);
        }
        else {

            gBotCode.validateTabForNewAlias(
                state.lens.botTab,
                alias
            );
        }

        const view: VNode =

            h("div", { id: "botLensView" }, [
                h("div", { id: "botLens" }, [

                    ...aliasTitleViews.buildCreateTitleView(),

                    typeViews.buildTypeView(alias),

                    ...draftMinMaxViews.buildCollapsibleDetailsView(
                        alias.draft,
                        "draft"
                    ),

                    ...aliasEditDetailsViews.buildCreateInputView(alias),

                    lensButtonsViews.buildSaveCancelActionView(
                        state.lens.botTab,
                        botActions.saveAlias,
                        botActions.cancel,
                        "Cancel",
                        "Save the alias",
                        "Save button disabled as the alias state is either unchanged or invalid",
                        "Cancel"
                    )
                ])
            ]);

        return view;
    }
};

export default createAliasTabViews;


