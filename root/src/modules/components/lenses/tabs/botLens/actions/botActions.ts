import IState from "../../../../../interfaces/state/IState";
import gStateCode from "../../../../../global/code/gStateCode";
import IStateAnyArray from "../../../../../interfaces/state/IStateAnyArray";
import gBotsCoreActions from "../../../../../global/actions/gBotsCoreActions";
import IAliasElement from "../../../../../interfaces/state/ui/payloads/IAliasElement";
import U from "../../../../../global/gUtilities";
import { BotType } from "../../../../../interfaces/enums/BotType";
import gTabCode from "../../../../../global/code/gTabCode";
import gBotsStateCode from "../../../../../global/code/gBotsStateCode";
import gNotificationCode from "../../../../../global/code/gNotificationCode";
import IAlias from "../../../../../interfaces/state/bot/IAlias";
import { ActionType } from "../../../../../interfaces/enums/ActionType";
import gDialogueCode from "../../../../../global/code/gDialogueCode";
import { DialogueType } from "../../../../../interfaces/enums/DialogueType";
import { DelegateType } from "../../../../../interfaces/enums/DelegateType";
import botEffects from "../effects/botEffects";
import gLensCode from "../../../../../global/code/gLensCode";
import gBotCode from "../../../../../global/code/gBotCode";
import { NotificationType } from "../../../../../interfaces/enums/NotificationType";
import { TabType } from "../../../../../interfaces/enums/TabType";
import gBotEffects from "../../../../../global/effects/gBotEffects";


const botActions = {

    toggleAliasEnabled: (state: IState): IState => {

        if (state?.lens.botTab.lensBot.type !== BotType.Alias
            || !state.lens.botTab.lensBot.bot) {

            return state;
        }

        const alias: IAlias = state.lens.botTab.lensBot.bot as IAlias;
        alias.enabled = alias.enabled === false;
        alias.ui.raw = false;

        return gStateCode.cloneState(state);
    },

    cancel: (state: IState): IStateAnyArray => {

        const ghostAlias: IAlias = state.lens.botTab.ghostBot.bot as IAlias;

        if (state.lens.botTab.ghostBot.type === BotType.Alias
            && ghostAlias
            && U.isNegativeNumeric(ghostAlias.key) === true) {

            // Then go back to aliases and close botTab
            gLensCode.clearTab(
                state,
                TabType.Bot
            );

            return gStateCode.cloneState(state);
        }

        gBotCode.resetEdits(state);

        return gBotsCoreActions.setupForAliasesHub(state);
    },

    overWriteLensBotAlias: (
        state: IState,
        response: any): any => {

        if (!response?.jsonData
            || state?.lens.botTab.lensBot.type !== BotType.Alias
            || !state.lens.botTab.lensBot.bot) {

            return null;
        }

        // gLensCode.checkResponse(
        //     state,
        //     rawAlias.jsonData
        // );

        // throw new Error("TEST");

        state.lens.botTab.saveLock = false;
        const alias: IAlias = state.lens.botTab.lensBot.bot as IAlias;
        const aliasAction: ActionType = alias.action;
        const aliasKey: string = alias.key;

        const loadedAlias: IAlias | null = gBotCode.loadLensBotAliasFromRaw(
            state,
            response.jsonData
        );

        if (!loadedAlias) {

            return null;
        }

        if (U.isPositiveNumeric(loadedAlias.key) === true) {

            state.botsState.selectedAliasKey = loadedAlias.key as string;
        }

        gStateCode.addNotification(
            state,
            "Bot alias loaded",
            `Key: ${loadedAlias.key}, 
Title: ${loadedAlias.title}.`,
            loadedAlias.token,
            NotificationType.Info
        );

        state.lens.botTab.enableSave = true;

        if (alias.action === aliasAction
            && U.isNegativeNumeric(aliasKey) === true) {

            // Close the create window
            gBotsCoreActions.setupForAliasesHub(state);
        }

        return gBotsCoreActions.reloadBots(state);
    },

    saveAlias: (state: IState): IState => {

        if (state?.lens.botTab.lensBot.type !== BotType.Alias
            || !state.lens.botTab.lensBot.bot) {

            return state;
        }

        if (!gTabCode.canSave(state.lens.botTab)) {

            return gStateCode.cloneState(state);
        }

        const alias: IAlias = state.lens.botTab.lensBot.bot as IAlias;
        state.lens.botTab.saveLock = true;
        const isValid: boolean = gBotsStateCode.lensBotAliasIsValidDirty(state);

        if (!isValid) {

            gNotificationCode.buildAliasValidationFailedNotification(state);
        }

        if (alias.action !== ActionType.CreateAlias
            && alias.action !== ActionType.UpdateAlias) {

            alert(`The bot alias action type: ${alias.action} has not been coded for yet...`);
        }

        const effect: any = gBotCode.buildEffectAndReLoadBotsSequential(
            state,
            botEffects.saveAliasProps
        );

        gDialogueCode.buildDialogue(
            state,
            DialogueType.Confirm,
            effect,
            DelegateType.SequentialEffects,
            "Confirm save",
            `Are you sure you want to save the current state of the bot alias?`);

        return gStateCode.cloneState(state);
    },

    setTitle: (
        state: IState,
        payload: IAliasElement): IStateAnyArray => {

        if (!state
            || !payload) {

            return state;
        }

        const input: HTMLInputElement = payload.element as HTMLInputElement;
        const aliasTitle: string = input.value;
        payload.alias.title = aliasTitle;
        payload.alias.ui.raw = false;

        if (aliasTitle !== state.lens.validationResults.botAliasTitle.title) {

            return [
                gStateCode.cloneState(state),
                gBotEffects.validateAliasTitleVersion(state)
            ];
        }

        return gStateCode.cloneState(state);
    },

    setDescription: (
        state: IState,
        payload: IAliasElement): IState => {

        const textarea: HTMLTextAreaElement = payload.element as HTMLTextAreaElement;
        payload.alias.description = textarea.value;
        payload.alias.ui.raw = false;

        return gStateCode.cloneState(state);
    },

    setVersion: (
        state: IState,
        payload: IAliasElement): IStateAnyArray => {

        const input: HTMLInputElement = payload.element as HTMLInputElement;
        const aliasVersion: string = input.value;
        payload.alias.version = aliasVersion;
        payload.alias.ui.raw = false;

        if (aliasVersion !== state.lens.validationResults.botAliasTitle.version) {

            return [
                gStateCode.cloneState(state),
                gBotEffects.validateAliasTitleVersion(state)
            ];
        }

        return gStateCode.cloneState(state);
    },

    setTags: (
        state: IState,
        payload: IAliasElement): IState => {

        const textarea: HTMLTextAreaElement = payload.element as HTMLTextAreaElement;
        payload.alias.tags = U.splitByNewLine(textarea.value);
        payload.alias.ui.raw = false;

        return gStateCode.cloneState(state);
    }
};


export default botActions;
