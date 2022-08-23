
import { gAuthenticatedHttp } from "../http/gAuthenticationHttp";

import IState from "../../interfaces/state/IState";
import U from "../gUtilities";
import gErrorActions from "../actions/gErrorActions";
import gAjaxHeaderCode from "../http/gAjaxHeaderCode";
import { ActionType } from "../../interfaces/enums/ActionType";
import { IHttpFetchItem } from "../../interfaces/http/IHttpFetchItem";
import gBotCode from "../code/gBotCode";
import gBotActions from "../actions/gBotActions";
import IAlias from "../../interfaces/state/bot/IAlias";
import { BotType } from "../../interfaces/enums/BotType";
import IDraft from "../../interfaces/state/bot/IDraft";


const getAliasAndShowTab = (
    state: IState,
    functionName: string,
    loadBotActionDelegate: (
        state: IState,
        response: any) => IState
): IHttpFetchItem | undefined => {

    if (!state
        || U.isNullOrWhiteSpace(state.botsState.selectedAliasKey) === true) {
        return;
    }

    const { body, callID }: { body: any, callID: string } = gBotCode.getAliasKeyRequestBody(
        state,
        state.botsState.selectedAliasKey
    );

    const bodyJson: string = JSON.stringify(body);

    let headers = gAjaxHeaderCode.buildHeaders(
        state,
        callID,
        ActionType.GetAlias
    );

    const url: string = `${state.settings.apiUrl}/Bot/Alias`;

    return gAuthenticatedHttp({
        url: url,
        options: {
            method: "POST",
            headers: headers,
            body: bodyJson
        },
        response: 'json',
        action: loadBotActionDelegate,
        error: (state: IState, errorDetails: any) => {

            return gErrorActions.reportHttpError(
                state,
                callID,
                null,
                url,
                body,
                functionName,
                "Error getting bot data from the server",
                errorDetails.stack,
                errorDetails
            );
        }
    });
};

const getDraftAndShowTab = (
    state: IState,
    functionName: string,
    loadBotActionDelegate: (
        state: IState,
        response: any) => IState
): IHttpFetchItem | undefined => {

    if (!state
        || U.isNullOrWhiteSpace(state.botsState.selectedAliasKey) === true) {
        return;
    }

    const { body, callID }: { body: any, callID: string } = gBotCode.getDraftKeyRequestBody(
        state,
        state.botsState.selectedDraftKey
    );

    const bodyJson: string = JSON.stringify(body);

    let headers = gAjaxHeaderCode.buildHeaders(
        state,
        callID,
        ActionType.GetDraft
    );

    const url: string = `${state.settings.apiUrl}/Bot/Draft`;

    return gAuthenticatedHttp({
        url: url,
        options: {
            method: "POST",
            headers: headers,
            body: bodyJson
        },
        response: 'json',
        action: loadBotActionDelegate,
        error: (state: IState, errorDetails: any) => {

            return gErrorActions.reportHttpError(
                state,
                callID,
                null,
                url,
                body,
                functionName,
                "Error getting bot data from the server",
                errorDetails.stack,
                errorDetails
            );
        }
    });
};

const deleteAlias = (
    state: IState,
    functionName: string,
    alias: IAlias,
    showWarning: boolean = false): IHttpFetchItem | undefined => {

    if (!state
        || !alias) {
        return;
    }

    const { body, callID }: { body: any, callID: string } = gBotCode.getDeleteAliasRequestBody(
        state,
        alias
    );

    const bodyJson: string = JSON.stringify(body);

    let headers = gAjaxHeaderCode.buildHeaders(
        state,
        callID,
        ActionType.DeleteAlias
    );

    const url: string = `${state.settings.apiUrl}/Bot/Alias`;

    return gAuthenticatedHttp({
        url: url,
        options: {
            method: "DELETE",
            headers: headers,
            body: bodyJson
        },
        response: 'json',
        action: gBotActions.removeDeletedAlias,
        error: (state: IState, errorDetails: any) => {

            if (showWarning) {

                gErrorActions.setLensWarning(
                    state,
                    state.lens.botTab,
                    `Delete bot alias failed`,
                );
            }

            return gErrorActions.reportHttpError(
                state,
                callID,
                alias.draft?.token,
                url,
                body,
                functionName,
                "Error sending delete bot alias data to the server",
                errorDetails.stack,
                errorDetails
            );
        }
    });
};

const deleteDraft = (
    state: IState,
    functionName: string,
    draft: IDraft,
    showWarning: boolean = false): IHttpFetchItem | undefined => {

    if (!state
        || !draft) {
        return;
    }

    const { body, callID }: { body: any, callID: string } = gBotCode.getDeleteDraftRequestBody(
        state,
        draft
    );

    const bodyJson: string = JSON.stringify(body);

    let headers = gAjaxHeaderCode.buildHeaders(
        state,
        callID,
        ActionType.DeleteDraft
    );

    const url: string = `${state.settings.apiUrl}/Bot/Draft`;

    return gAuthenticatedHttp({
        url: url,
        options: {
            method: "DELETE",
            headers: headers,
            body: bodyJson
        },
        response: 'json',
        action: gBotActions.removeDeletedDraft,
        error: (state: IState, errorDetails: any) => {

            if (showWarning) {

                gErrorActions.setLensWarning(
                    state,
                    state.lens.botTab,
                    `Delete bot draft failed`,
                );
            }

            return gErrorActions.reportHttpError(
                state,
                callID,
                draft.token,
                url,
                body,
                functionName,
                "Error sending delete bot draft data to the server",
                errorDetails.stack,
                errorDetails
            );
        }
    });
};

const gBotEffects = {

    getAliasAndShowTab: (state: IState): IHttpFetchItem | undefined => {

        return getAliasAndShowTab(
            state,
            gBotEffects.getAliasAndShowTab.name,
            gBotActions.loadAliasAndShowTab
        );
    },

    getAlias: (state: IState): IHttpFetchItem | undefined => {

        return getAliasAndShowTab(
            state,
            gBotEffects.getAlias.name,
            gBotActions.loadAlias
        );
    },

    getDraft: (state: IState): IHttpFetchItem | undefined => {

        return getDraftAndShowTab(
            state,
            gBotEffects.getDraft.name,
            gBotActions.loadDraft
        );
    },

    deleteLensBotAlias: (state: IState): IHttpFetchItem | undefined => {

        if (state?.lens.botTab.lensBot.type !== BotType.Alias) {
            return;
        }

        return deleteAlias(
            state,
            gBotEffects.deleteLensBotAlias.name,
            state.lens.botTab.lensBot.bot as IAlias,
            true
        );
    },

    deleteAlias: (
        state: IState,
        alias: IAlias): IHttpFetchItem | undefined => {

        if (!alias) {
            return;
        }

        return deleteAlias(
            state,
            gBotEffects.deleteAlias.name,
            alias,
            true
        );
    },

    deleteLensBotDraft: (state: IState): IHttpFetchItem | undefined => {

        if (state?.lens.botTab.lensBot.type !== BotType.Draft) {
            return;
        }

        return deleteDraft(
            state,
            gBotEffects.deleteLensBotDraft.name,
            state.lens.botTab.lensBot.bot as IDraft,
            true
        );
    },

    deleteDraft: (
        state: IState,
        draft: IDraft): IHttpFetchItem | undefined => {

        if (state?.lens.botTab.lensBot.type !== BotType.Draft) {
            return;
        }

        return deleteDraft(
            state,
            gBotEffects.deleteLensBotDraft.name,
            draft,
            true
        );
    },

    deleteSelectedKeyAlias: (state: IState): IHttpFetchItem | undefined => {

        if (!state
            || U.isPositiveNumeric(state.botsState.selectedAliasKey) === false) {
            return;
        }

        const alias: IAlias | null = gBotCode.getAliasFromState(
            state,
            state.botsState.selectedAliasKey
        );

        if (!alias) {
            return;
        }

        return deleteAlias(
            state,
            gBotEffects.deleteSelectedKeyAlias.name,
            alias
        );
    },

    validateAliasTitleVersion: (state: IState): IHttpFetchItem | undefined => {

        if (state?.lens.botTab.lensBot.type !== BotType.Alias
            || !state?.lens.botTab.lensBot.bot) {
            return;
        }

        const { body, callID }: { body: any, callID: string } = gBotCode.getValidateAliasNameRequestBody(state);

        const bodyJson: string = JSON.stringify(body);

        let headers = gAjaxHeaderCode.buildHeaders(
            state,
            callID,
            ActionType.ValidateAliasName
        );

        const url: string = `${state.settings.apiUrl}/Bot/Alias/ValidateName`;

    return gAuthenticatedHttp({
            url: url,
            options: {
                method: "POST",
                headers: headers,
                body: bodyJson
            },
            response: 'json',
            action: gBotActions.processAliasNameValidation,
            error: (state: IState, errorDetails: any) => {

                return gErrorActions.reportHttpError(
                    state,
                    callID,
                    null,
                    url,
                    body,
                    gBotEffects.validateAliasTitleVersion.name,
                    "Error validating bot alias title and version with the server",
                    errorDetails.stack,
                    errorDetails
                );
            }
        });
    }
};

export default gBotEffects;
