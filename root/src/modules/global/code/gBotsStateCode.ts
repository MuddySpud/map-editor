import IState from "../../interfaces/state/IState";
import ILens from "../../interfaces/state/ui/ILens";
import { TabType } from "../../interfaces/enums/TabType";
import gLensCode from "./gLensCode";
import gTabCode from "./gTabCode";
import gBotCode from "./gBotCode";
import { ActionType } from "../../interfaces/enums/ActionType";
import U from "../gUtilities";
import Request from "../../state/notifications/Request";
import { BotType } from "../../interfaces/enums/BotType";
import IAlias from "../../interfaces/state/bot/IAlias";
import IDraft from "../../interfaces/state/bot/IDraft";


// This is where all alerts to data changes should be made
const gBotsStateCode = {

    updateAlias: (
        state: IState,
        alias: IAlias): void => {

        const foundAlias: IAlias | undefined = state.botsState.aliasesState.aliases.find((alias: IAlias) => alias.key === alias.key);

        if (foundAlias) {

            gBotCode.updateAlias(
                foundAlias,
                alias
            );
        }
    },

    updateDraft: (
        state: IState,
        draft: IDraft): void => {

        const foundDraft: IDraft | undefined = state.botsState.draftsState.drafts.find((draft: IDraft) => draft.key === draft.key);

        if (foundDraft) {

            gBotCode.updateDraft(
                foundDraft,
                draft
            );
        }
    },

    registerAliasDataRequest: (
        name: string,
        state: IState,
        aliasKey: string,
        action: ActionType): string => {

        const callID: string = U.generateGuid();

        state.botsState.aliasesState.openRequests.push(
            new Request(
                name,
                aliasKey,
                callID,
                action,
                new Date(Date.now()),
                null
            )
        );

        return callID;
    },

    registerDraftDataRequest: (
        name: string,
        state: IState,
        draftKey: string,
        action: ActionType): string => {

        const callID: string = U.generateGuid();

        state.botsState.draftsState.openRequests.push(
            new Request(
                name,
                draftKey,
                callID,
                action,
                new Date(Date.now()),
                null
            )
        );

        return callID;
    },

    clearLensBots: (state: IState): void => {

        state.lens.botTab.ghostBot.type = BotType.None;
        state.lens.botTab.ghostBot.bot = null;
        state.lens.botTab.lensBot.type = BotType.None;
        state.lens.botTab.lensBot.bot = null;
    },

    loadBots: (
        state: IState,
        rawBots: any): void => {

        if (!rawBots) {

            return;
        }

        gBotsStateCode.loadAliases(
            state,
            rawBots.aliases
        );

        gBotsStateCode.loadDrafts(
            state,
            rawBots.drafts
        );
    },

    loadAliases: (
        state: IState,
        rawAliases: any): void => {

        if (!rawAliases) {

            return;
        }

        state.botsState.aliasesState.aliases = gBotCode.loadAliases(rawAliases.values);
        state.botsState.aliasesState.paginationDetails.totalItems = rawAliases.total ?? 0;

        state.botsState.aliasesState.aliasCount = rawAliases.total ?? 0;
        state.botsState.aliasesState.aliasCount = state.botsState.aliasesState.aliasCount < 0 ? 0 : state.botsState.aliasesState.aliasCount;
    },

    loadDrafts: (
        state: IState,
        rawDrafts: any): void => {

        if (!rawDrafts) {

            return;
        }

        state.botsState.draftsState.drafts = gBotCode.loadDrafts(rawDrafts.values);
        state.botsState.draftsState.paginationDetails.totalItems = rawDrafts.total ?? 0;

        state.botsState.draftsState.draftCount = rawDrafts.total ?? 0;
        state.botsState.draftsState.draftCount = state.botsState.draftsState.draftCount < 0 ? 0 : state.botsState.draftsState.draftCount;
    },

    setLensBotForUpdate: (state: IState): void => {

        const lens: ILens = state.lens;
        lens.botTab.display = true;
        gLensCode.maximiseLens(state);

        gTabCode.setSelectedTab(
            state,
            TabType.Bot
        );
    },

    lensBotAliasIsValidDirty: (state: IState): boolean => {

        if (state?.lens.botTab.lensBot.type !== BotType.Alias
            || !state?.lens.botTab.lensBot.bot) {

            return false;
        }

        if (!gBotCode.validateAlias(state.lens.botTab.lensBot.bot as IAlias)) {

            return false;
        }

        if (!gBotCode.validateAliasTitle(state)) {

            return false;
        }

        if (!gBotCode.isLensBotDirty(state)) {

            return false;
        }

        return true;
    }
};

export default gBotsStateCode;

