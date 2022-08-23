import { h, VNode } from "hyperapp-local";

import IState from "../../../../../../../interfaces/state/IState";
import gSession from "../../../../../../../global/gSession";
import Filters from "../../../../../../../state/constants/Filters";
import gBotCode from "../../../../../../../global/code/gBotCode";
import botActions from "../../../actions/botActions";
import { BotType } from "../../../../../../../interfaces/enums/BotType";
import IAlias from "../../../../../../../interfaces/state/bot/IAlias";
import aliasEditDetailsViews from "../partial/aliasEditDetailsViews";
import aliasTitleViews from "../partial/aliasTitleViews";
import aliasMinMaxViews from "../partial/aliasMinMaxViews";
import lensButtonsViews from "../../../../../lens/views/lensButtonsViews";
import draftMinMaxViews from "../../draft/partial/draftMinMaxViews";
import typeViews from "../partial/typeViews";
import gBotActions from "../../../../../../../global/actions/gBotActions";


const editAliasTabViews = {

    buildTabView(state: IState): VNode | null {

        if (!state
            || !state.lens.botTab.display
            || state.lens.botTab.lensBot.type !== BotType.Alias) {

            return null;
        }

        const alias: IAlias = state.lens.botTab.lensBot.bot as IAlias;

        if (alias.ui.raw === true) {

            state.lens.botTab.enableSave = false;
            gSession.setFocusFilter(Filters.aliasTitleFocusFilter);
        }
        else {

            gBotCode.validateBotTabAlias(state);
        }

        const view: VNode =

            h("div", { id: "botLensView" }, [
                h("div", { id: "botLens" }, [

                    ...aliasTitleViews.buildEditTitleView(alias),

                    typeViews.buildTypeView(alias),

                    ...aliasMinMaxViews.buildCollapsibleDetailsView(
                        alias,
                        "alias"
                    ),

                    ...draftMinMaxViews.buildCollapsibleDetailsView(
                        alias.draft,
                        "draft"
                    ),

                    ...aliasEditDetailsViews.buildEditInputView(alias),

                    lensButtonsViews.buildSaveDeleteView(
                        state,
                        state.lens.botTab,
                        botActions.saveAlias,
                        gBotActions.deleteAlias,
                        "Save the bot alias",
                        "Save button disabled as the bot alias state is either unchanged or invalid",
                        "Delete the bot alias"
                    )
                ])
            ]);

        return view;
    }
};

export default editAliasTabViews;


