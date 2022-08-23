import IState from "../../interfaces/state/IState";
import IStateAnyArray from "../../interfaces/state/IStateAnyArray";
import gLensCode from "../code/gLensCode";
import gStateCode from "../code/gStateCode";
import { LensActionType } from "../../interfaces/enums/LensActionType";
import gDialogueCode from "../code/gDialogueCode";
import { DialogueType } from "../../interfaces/enums/DialogueType";
import { DelegateType } from "../../interfaces/enums/DelegateType";
import U from "../gUtilities";
import gBotCode from "../code/gBotCode";
import gBotsCoreActions from "./gBotsCoreActions";
import { LensStage } from "../../interfaces/enums/LensStage";
import { ActionType } from "../../interfaces/enums/ActionType";
import { NotificationType } from "../../interfaces/enums/NotificationType";
import IDraft from "../../interfaces/state/bot/IDraft";
import IAlias from "../../interfaces/state/bot/IAlias";
import { BotType } from "../../interfaces/enums/BotType";
import { DisplayType } from "../../interfaces/enums/DisplayType";
import gBotEffects from "../effects/gBotEffects";
import ITitleVersionValidation from "../../interfaces/state/ui/ITitleVersionValidation";
import TitleVersionValidation from "../../state/ui/TitleVersionValidation";


const loadAlias = (
    state: IState,
    rawAlias: any): void => {

    if (!state) {

        return state;
    }

    gLensCode.checkBotAliasResponse(
        state,
        rawAlias
    );

    const alias: IAlias | null = gBotCode.loadLensBotAliasFromRaw(
        state,
        rawAlias
    );

    if (state.lens.botTab.lensBot.type === BotType.Alias
        && alias) {

        const stage: LensStage = state.lens.botTab.stageBehaviour.getStage();

        if (stage === LensStage.AliasEdit) {

            alias.action = ActionType.UpdateAlias;
            alias.ui.minimise = true;
        }
        else if (stage === LensStage.CreateAlias) {

            alias.action = ActionType.CreateAlias;
        }
    }
};


const loadDraft = (
    state: IState,
    rawDraft: any): void => {

    if (!state) {

        return state;
    }

    gLensCode.checkBotDraftResponse(
        state,
        rawDraft
    );

    gBotCode.loadLensBotDraftFromRaw(
        state,
        rawDraft
    );
};

const gBotActions = {

    processAliasNameValidation: (
        state: IState,
        response: any): IState => {

        if (!state
            || !response?.jsonData) {

            return state;
        }

        const aliasVTitleVersionValidation: ITitleVersionValidation = new TitleVersionValidation();
        aliasVTitleVersionValidation.success = response.jsonData.success;
        aliasVTitleVersionValidation.title = response.jsonData.title;
        aliasVTitleVersionValidation.version = response.jsonData.version;
        state.lens.validationResults.botAliasTitle = aliasVTitleVersionValidation;

        return gStateCode.cloneState(state);
    },

    editAlias: (state: IState): IStateAnyArray => {

        if (state.lens.botTab.lensBot.type !== BotType.Alias
            || !state.lens.botTab.lensBot.bot) {

            return state;
        }

        return gBotActions.checkCanSwapBotTab(
            state,
            "edit the bot alias",
            gBotsCoreActions.setupForEditAlias
        );
    },

    deleteAlias: (state: IState): IState => {

        if (state.lens.botTab.lensBot.type !== BotType.Alias
            || !state.lens.botTab.lensBot.bot) {

            return state;
        }

        const alias: IAlias = state.lens.botTab.lensBot.bot as IAlias;
        alias.action = ActionType.DeleteAlias;
        state.lens.botTab.loadingAliasKey = state.botsState.selectedAliasKey;

        const effect: any = gBotCode.buildEffectAndReLoadBotsSequential(
            state,
            gBotEffects.deleteLensBotAlias
        );

        gDialogueCode.buildDialogue(
            state,
            DialogueType.Confirm,
            effect,
            DelegateType.SequentialEffects,
            "Confirm delete",
            "Are you sure you want to delete the bot alias?");

        return gStateCode.cloneState(state);
    },

    deleteDraft: (state: IState): IState => {

        if (state.lens.botTab.lensBot.type !== BotType.Draft
            || !state.lens.botTab.lensBot.bot) {

            return state;
        }

        state.lens.botTab.loadingDraftKey = state.botsState.selectedDraftKey;

        const effect: any = gBotCode.buildEffectAndReLoadBotsSequential(
            state,
            gBotEffects.deleteLensBotDraft
        );

        gDialogueCode.buildDialogue(
            state,
            DialogueType.Confirm,
            effect,
            DelegateType.SequentialEffects,
            "Confirm delete",
            "Are you sure you want to delete the bot alias?");

        return gStateCode.cloneState(state);
    },

    showAliasHub: (
        state: IState,
        aliasKey: string): IStateAnyArray => {

        if (!state) {

            return state;
        }

        if (U.isNullOrWhiteSpace(aliasKey) === true) {

            return gStateCode.cloneState(state);
        }

        if (state.botsState.selectedAliasKey === aliasKey) {

            return gBotActions.checkCanSwapBotTab(
                state,
                "show the bot alias tab",
                gBotsCoreActions.setupForAliasesHub
            );
        }

        state.botsState.queuedAliasID = aliasKey;

        return gBotActions.askToSwitchRows(
            state,
            'Do you want to discard those changes and view another?',
            LensActionType.ShowBotAliasHub
        );
    },

    showDraftHub: (
        state: IState,
        draftKey: string): IStateAnyArray => {

        if (!state) {

            return state;
        }

        if (U.isNullOrWhiteSpace(draftKey) === true) {

            return gStateCode.cloneState(state);
        }

        if (state.botsState.selectedDraftKey === draftKey) {

            return gBotActions.checkCanSwapBotTab(
                state,
                "show the bot draft hub",
                gBotsCoreActions.setupForDraftsHub
            );
        }

        state.botsState.queuedDraftID = draftKey;

        return gBotActions.askToSwitchRows(
            state,
            'Do you want to discard those changes and view another?',
            LensActionType.ShowBotDraftHub
        );
    },

    confirmRefreshLensBotAlias: (state: IState): IState => {

        if (state?.lens.botTab.lensBot.type !== BotType.Alias
            || state.lens.botTab.ghostBot.type !== BotType.Alias
            || !state.lens.botTab.lensBot.bot
            || !state.lens.botTab.ghostBot.bot) {

            return state;
        }

        const same = gBotCode.checkAliasesMatchExactly(
            state.lens.botTab.lensBot.bot as IAlias,
            state.lens.botTab.ghostBot.bot as IAlias,
        );

        if (same) {

            return gBotActions.refreshLensBotAlias(state);
        }

        gDialogueCode.buildDialogue(
            state,
            DialogueType.Confirm,
            gBotActions.refreshLensBotAlias,
            DelegateType.Action,
            "Confirm refresh bot alias tab",
            "There are unsaved changes are you sure you want to discard them and refresh the bot alias tab?");

        return gStateCode.cloneState(state);
    },

    refreshLensBotAlias: (state: IState): IState => {

        if (state?.lens.botTab.lensBot.type !== BotType.Alias
            || state.lens.botTab.ghostBot.type !== BotType.Alias
            || !state.lens.botTab.lensBot.bot
            || !state.lens.botTab.ghostBot.bot) {

            return state;
        }

        const same = gBotCode.checkAliasesMatchExactly(
            state.lens.botTab.lensBot.bot as IAlias,
            state.lens.botTab.ghostBot.bot as IAlias,
        );

        let text = `No changes had been made, so no data was discarded.`;

        if (!same) {

            text = `Changes had been made and were discarded.`;
        }

        state.lens.botTab.lensBot.bot = gBotCode.cloneAlias(state.lens.botTab.ghostBot.bot as IAlias);

        gStateCode.addNotification(
            state,
            `Bot alias tab refreshed`,
            text,
            (state.lens.botTab.lensBot.bot as IAlias)?.token ?? null,
            NotificationType.Info
        );

        return gStateCode.cloneState(state);
    },

    showSelectedAlias: (state: IState): IState => {

        const selectedAlias: IAlias | null = gBotCode.getAliasFromState(
            state,
            state.botsState.selectedAliasKey
        );

        if (selectedAlias) {

            selectedAlias.ui.show = true;
        }

        state.displayType = DisplayType.Bots;

        return gStateCode.cloneState(state);
    },

    showSelectedDraft: (state: IState): IState => {

        const selectedDraft: IDraft | null = gBotCode.getDraftFromState(
            state,
            state.botsState.selectedDraftKey
        );

        if (selectedDraft) {

            selectedDraft.ui.show = true;
        }

        state.displayType = DisplayType.Bots;

        return gStateCode.cloneState(state);
    },

    removeDeletedAlias: (
        state: IState,
        response: any): IState => {

        if (!state
            || !response?.jsonData) {

            return state;
        }

        // gLensCode.checkResponse(
        //     state,
        //     response.jsonData
        // );

        const aliasKeys: IAlias | null = gBotCode.loadAliasKeys(response.jsonData);

        if (aliasKeys) {

            const deletedAlias: IAlias | null = gBotCode.getAliasFromState(
                state,
                state.botsState.selectedAliasKey
            );

            if (deletedAlias) {

                gStateCode.addNotification(
                    state,
                    `Bot alias deleted`,
                    `Key: ${deletedAlias.key}, 
    Name: ${deletedAlias.title}.`,
                    deletedAlias.draft?.token,
                    NotificationType.Info
                );
            }
        }

        return gBotsCoreActions.reloadBots(state);
    },

    removeDeletedDraft: (
        state: IState,
        response: any): IState => {

        if (!state
            || !response?.jsonData) {

            return state;
        }

        // gLensCode.checkResponse(
        //     state,
        //     response.jsonData
        // );

        const deletedDraft: IDraft | null = gBotCode.loadDraft(response.jsonData);

        if (deletedDraft) {

            gStateCode.addNotification(
                state,
                `Bot draft deleted`,
                `Key: ${deletedDraft.key}, 
Name: ${deletedDraft.title}.`,
                deletedDraft.token,
                NotificationType.Info
            );
        }

        return gBotsCoreActions.reloadBots(state);
    },

    loadAliasAndShowTab: (
        state: IState,
        response: any): IState => {

        if (!response?.jsonData) {

            return state;
        }

        loadAlias(
            state,
            response.jsonData
        );

        gBotCode.prepareForAliasHub(state);

        return gStateCode.cloneState(state);
    },

    loadAlias: (
        state: IState,
        response: any): IState => {

        if (!response?.jsonData) {

            return state;
        }

        loadAlias(
            state,
            response.jsonData
        );

        return gStateCode.cloneState(state);
    },

    toggleMinimiseDraft: (
        state: IState,
        draft: IDraft): IState => {

        if (!state
            || !draft) {

            return state;
        }

        draft.ui.minimise = draft.ui.minimise === false;

        return gStateCode.cloneState(state);
    },

    toggleMinimiseAlias: (
        state: IState,
        alias: IAlias): IState => {

        if (!state
            || !alias) {

            return state;
        }

        alias.ui.minimise = alias.ui.minimise === false;

        return gStateCode.cloneState(state);
    },

    loadDraft: (
        state: IState,
        response: any): IState => {

        if (!response?.jsonData) {

            return state;
        }

        loadDraft(
            state,
            response.jsonData
        );

        return gStateCode.cloneState(state);
    },

    checkCanSwapBotTab: (
        state: IState,
        message: string,
        actionDelegate: (state: IState) => IStateAnyArray): IStateAnyArray => {

        if (state.lens.botTab.stageBehaviour.checkDirty === true) {

            let dirty: string = '';
            let clearBot: boolean = false;

            if (gBotCode.isLensBotDirty(state) === true) {

                dirty = "There are unsaved bot changes";
                clearBot = true;
            }

            const actionDelegateWrapper: (state: IState) => IStateAnyArray = (state: IState): IStateAnyArray => {

                if (clearBot) {

                    state.lens.botTab.lensBot.bot = gBotCode.cloneAlias(state.lens.botTab.ghostBot.bot as IAlias);
                    state.lens.botTab.lensBot.type = BotType.Alias;
                }

                return actionDelegate(state);
            };

            if (U.isNullOrWhiteSpace(dirty) === false) {

                const text = `${dirty}.
Do you want to discard those changes and ${message}?`;

                // Then need the user to confirm they want to discard the changes
                gDialogueCode.buildDialogue(
                    state,
                    DialogueType.Confirm,
                    actionDelegateWrapper,
                    DelegateType.Action,
                    "Confirm discard changes",
                    text
                );

                return gStateCode.cloneState(state)
            }
        }

        return actionDelegate(state);
    },

    askToSwitchRows: (
        state: IState,
        question: string,
        lensActionsType: LensActionType): IStateAnyArray => {

        const dirty: string = gLensCode.isLensBotTabDirty(state);

        if (U.isNullOrWhiteSpace(dirty) === false) {

            const message = `${dirty}.
${question}`;

            // Then need the user to confirm they want to discard the changes
            gDialogueCode.buildDialogue(
                state,
                DialogueType.Confirm,
                gBotsCoreActions.completeBotSelection,
                DelegateType.Action,
                "Confirm discard changes",
                message,
                lensActionsType);

            return gStateCode.cloneState(state);
        }

        return gBotsCoreActions.completeBotSelection(
            state,
            lensActionsType
        );
    },

    promoteDraft: (state: IState): IStateAnyArray => {

        return gBotsCoreActions.setupForCreateAlias(state);
    }
};

export default gBotActions;
