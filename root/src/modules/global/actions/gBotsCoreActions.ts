import IState from "../../interfaces/state/IState";
import IStateAnyArray from "../../interfaces/state/IStateAnyArray";
import gStateCode from "../code/gStateCode";
import gStageCode from "../code/gStageCode";
import { ActionType } from "../../interfaces/enums/ActionType";
import gSession from "../gSession";
import Filters from "../../state/constants/Filters";
import gBotEffects from "../effects/gBotEffects";
import gFilterCode from "../code/gFilterCode";
import gBotsStateCode from "../code/gBotsStateCode";
import { LensActionType } from "../../interfaces/enums/LensActionType";
import gBotCode from "../code/gBotCode";
import IBotTab from "../../interfaces/state/ui/tabs/IBotTab";
import IAlias from "../../interfaces/state/bot/IAlias";
import { BotType } from "../../interfaces/enums/BotType";
import IDraft from "../../interfaces/state/bot/IDraft";


const gBotsCoreActions = {

    reloadBots: (state: IState): IState => {

        gBotCode.reloadBots(state);

        return gStateCode.cloneState(state);
    },

    loadViewOrBuildFresh: (
        state: IState,
        response: any): IStateAnyArray => {

        // console.log('Loading all bots');

        if (!response?.jsonData) {

            return state;
        }

        // gLensCode.checkResponse(
        //     state,
        //     response.jsonData
        // );

        if (!gFilterCode.checkResponseCurrent(state, response.jsonData)) {

            return gStateCode.cloneState(state);
        }

        gBotsStateCode.loadBots(
            state,
            response.jsonData
        );

        state.loading = false;

        return gStateCode.cloneState(state);
    },

    setupForDraftsHub: (state: IState): IStateAnyArray => {

        let loadBot: boolean = state.botsState.selectedDraftKey !== state.lens.botTab.lensBot?.bot?.key;
        gBotCode.prepareForDraftHub(state);

        if (!loadBot) {

            return gStateCode.cloneState(state);
        }

        state.lens.botTab.loadingDraftKey = state.botsState.selectedDraftKey;

        return [
            state, // return state as re-draw will happen with bot load
            gBotEffects.getDraft(state)
        ];
    },

    setupForAliasesHub: (state: IState): IStateAnyArray => {

        let loadBot: boolean = state.botsState.selectedAliasKey !== state.lens.botTab.lensBot.bot?.key;
        gBotCode.prepareForAliasHub(state);

        if (!loadBot) {

            return gStateCode.cloneState(state);
        }

        state.lens.botTab.loadingAliasKey = state.botsState.selectedAliasKey;

        return [
            state, // return state as re-draw will happen with bot load
            gBotEffects.getAlias(state)
        ];
    },

    setupForCreateAlias: (state: IState): IState => {

        gBotsStateCode.setLensBotForUpdate(state);
        gBotCode.createLensBotAlias(state);
        state.lens.botTab.stageBehaviour = gStageCode.buildCreateAliasStages();
        gSession.setFocusFilter(Filters.aliasTitleFocusFilter);

        return gStateCode.cloneState(state);
    },

    setupForEditAlias: (state: IState): IStateAnyArray => {

        let loadBot: boolean = state.botsState.selectedAliasKey !== state.lens.botTab.lensBot.bot?.key;
        const botTab: IBotTab = state.lens.botTab;
        gBotsStateCode.setLensBotForUpdate(state);
        gSession.setFocusFilter(Filters.aliasTitleFocusFilter);
        botTab.stageBehaviour = gStageCode.buildEditaliasestages();
        state.lens.botTab.loadingAliasKey = state.botsState.selectedAliasKey;
        const alias: IAlias = botTab.lensBot.bot as IAlias

        if (!loadBot
            && alias) {

            alias.action = ActionType.UpdateAlias;
            alias.ui.minimise = true;
            alias.draft.ui.minimise = true;

            return gStateCode.cloneState(state);
        }

        return [
            gStateCode.cloneState(state),
            gBotEffects.getAlias(state)
        ];
    },

    completeBotSelection: (
        state: IState,
        lensActionType: LensActionType): IStateAnyArray => {

        gBotCode.prepareForSwitchBots(state);
        gBotsStateCode.clearLensBots(state);

        if (lensActionType === LensActionType.ShowBotDraftHub) {

            state.botsState.selectedDraftKey = state.botsState.queuedDraftID;
            state.botsState.selectedAliasKey = gStateCode.getFreshKey(state);

            return gBotsCoreActions.setupForDraftsHub(state);
        }
        else if (lensActionType === LensActionType.ShowBotAliasHub) {

            state.botsState.selectedDraftKey = "0";
            state.botsState.selectedAliasKey = state.botsState.queuedAliasID;

            return gBotsCoreActions.setupForAliasesHub(state);
        }
        else if (lensActionType === LensActionType.CreateAlias) {

            state.botsState.selectedDraftKey = state.botsState.queuedDraftID;
            state.botsState.selectedAliasKey = gStateCode.getFreshKey(state);
            state.lens.botTab.lensBot.type = BotType.Draft

            const selectedDraft: IDraft | null = gBotCode.getDraftFromState(
                state,
                state.botsState.selectedDraftKey
            );

            if (selectedDraft) {

                state.lens.botTab.lensBot.bot = selectedDraft;
            }

            return gBotsCoreActions.setupForCreateAlias(state);
        }
        else if (lensActionType === LensActionType.EditAlias) {

            state.botsState.selectedDraftKey = "0";
            state.botsState.selectedAliasKey = state.botsState.queuedAliasID;

            return gBotsCoreActions.setupForEditAlias(state);
        }
        else {
            throw new Error(`The lensActionType must be ${LensActionType.CreateAlias} or ${LensActionType.EditAlias}. But it was ${lensActionType}.`);
        }
    }
};

export default gBotsCoreActions;
