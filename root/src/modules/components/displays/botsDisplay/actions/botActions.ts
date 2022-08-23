import IState from "../../../../interfaces/state/IState";
import IStateAnyArray from "../../../../interfaces/state/IStateAnyArray";
import gStateCode from "../../../../global/code/gStateCode";
import IPaginationPayload from "../../../../interfaces/state/ui/payloads/IPaginationPayload";
import gBotFilterEffects from "../../../../global/effects/gBotFilterEffects";
import U from "../../../../global/gUtilities";
import gBotActions from "../../../../global/actions/gBotActions";
import gBotsCoreActions from "../../../../global/actions/gBotsCoreActions";
import { LensActionType } from "../../../../interfaces/enums/LensActionType";
import IAlias from "../../../../interfaces/state/bot/IAlias";
import { ActionType } from "../../../../interfaces/enums/ActionType";
import gBotCode from "../../../../global/code/gBotCode";
import gBotEffects from "../../../../global/effects/gBotEffects";
import { DialogueType } from "../../../../interfaces/enums/DialogueType";
import { DelegateType } from "../../../../interfaces/enums/DelegateType";
import gDialogueCode from "../../../../global/code/gDialogueCode";
import IDraft from "../../../../interfaces/state/bot/IDraft";
import { IHttpFetchItem } from "../../../../interfaces/http/IHttpFetchItem";


const botActions = {

    promoteDraft: (
        state: IState,
        draftKey: string): IStateAnyArray => {

        if (U.isNullOrWhiteSpace(draftKey) === true) {

            return gStateCode.cloneState(state);
        }

        if (state.botsState.selectedDraftKey === draftKey) {

            return gBotActions.checkCanSwapBotTab(
                state,
                "promote the bot draft to alias",
                gBotsCoreActions.setupForCreateAlias
            );
        }

        state.botsState.queuedDraftID = draftKey;

        return gBotActions.askToSwitchRows(
            state,
            'Do you want to discard those changes and edit another?',
            LensActionType.CreateAlias
        );
    },

    editAlias: (
        state: IState,
        aliasKey: string): IStateAnyArray => {

        if (U.isNullOrWhiteSpace(aliasKey) === true) {

            return gStateCode.cloneState(state);
        }

        if (state.botsState.selectedAliasKey === aliasKey) {

            return gBotActions.checkCanSwapBotTab(
                state,
                "edit the bot alias",
                gBotsCoreActions.setupForEditAlias
            );
        }

        state.botsState.queuedAliasID = aliasKey;

        return gBotActions.askToSwitchRows(
            state,
            'Do you want to discard those changes and edit another?',
            LensActionType.EditAlias
        );
    },

    deleteAlias: (
        state: IState,
        aliasKey: string): IStateAnyArray => {

        if (U.isNullOrWhiteSpace(aliasKey) === true) {

            return gStateCode.cloneState(state);
        }

        const alias: IAlias | null = gBotCode.getAliasFromState(
            state,
            aliasKey
        );

        if (!alias) {
            return gStateCode.cloneState(state);
        }

        alias.action = ActionType.DeleteAlias;
        state.lens.botTab.loadingAliasKey = aliasKey;

        const deleteAlias: (state: IState) => IHttpFetchItem | undefined = (state: IState) => {

            return gBotEffects.deleteAlias(
                state,
                alias
            );
        };

        const effect: any = gBotCode.buildEffectAndReLoadBotsSequential(
            state,
            deleteAlias
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

    deleteDraft: (
        state: IState,
        draftKey: string): IStateAnyArray => {

        if (U.isNullOrWhiteSpace(draftKey) === true) {

            return gStateCode.cloneState(state);
        }

        const draft: IDraft | null = gBotCode.getDraftFromState(
            state,
            draftKey
        );

        if (!draft) {
            return gStateCode.cloneState(state);
        }

        draft.action = ActionType.DeleteDraft;
        state.lens.botTab.loadingDraftKey = draftKey;

        const deleteDraft: (state: IState) => IHttpFetchItem | undefined = (state: IState) => {

            return gBotEffects.deleteDraft(
                state,
                draft
            );
        };

        const effect: any = gBotCode.buildEffectAndReLoadBotsSequential(
            state,
            deleteDraft
        );

        gDialogueCode.buildDialogue(
            state,
            DialogueType.Confirm,
            effect,
            DelegateType.SequentialEffects,
            "Confirm delete",
            "Are you sure you want to delete the bot draft?");

        return gStateCode.cloneState(state);
    },

    showBotsPage: (
        state: IState,
        paginationPayload: IPaginationPayload): IStateAnyArray => {

        if (!state
            || !paginationPayload) {

            return state;
        }

        alert("Needs to be fixed!!!");

        state.botsState.aliasesState.paginationDetails = paginationPayload.paginationDetails;

        return [
            gStateCode.cloneState(state),
            gBotFilterEffects.filter(state)
        ];
    }
};

export default botActions;
