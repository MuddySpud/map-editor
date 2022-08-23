
import { gAuthenticatedHttp } from "../http/gAuthenticationHttp";

import IState from "../../interfaces/state/IState";
import U from "../gUtilities";
import gTreeActions from "../actions/gTreeActions";
import gTreeCode from "../code/gTreeCode";
import ITreeSys from "../../interfaces/state/tree/ITreeSys";
import gTreeStatsActions from "../actions/gTreeStatsActions";
import gErrorActions from "../actions/gErrorActions";
import ITreeBase from "../../interfaces/state/tree/ITreeBase";
import gAjaxHeaderCode from "../http/gAjaxHeaderCode";
import { ActionType } from "../../interfaces/enums/ActionType";
import { IHttpFetchItem } from "../../interfaces/http/IHttpFetchItem";


const getTreeAndShowTab = (
    state: IState,
    functionName: string,
    loadTreeActionDelegate: (
        state: IState,
        response: any) => IState
): IHttpFetchItem | undefined => {

    if (!state
        || U.isNullOrWhiteSpace(state.treesState.selectedKey) === true) {
        return;
    }

    const { body, callID }: { body: any, callID: string } = gTreeCode.getTreeKeyRequestBody(
        state,
        state.treesState.selectedKey
    );

    const bodyJson: string = JSON.stringify(body);

    let headers = gAjaxHeaderCode.buildHeaders(
        state,
        callID,
        ActionType.GetTree
    );

    const url: string = `${state.settings.apiUrl}/Tree/Get`;

    return gAuthenticatedHttp({
        url: url,
        options: {
            method: "POST",
            headers: headers,
            body: bodyJson
        },
        response: 'json',
        action: loadTreeActionDelegate,
        error: (state: IState, errorDetails: any) => {

            return gErrorActions.reportHttpError(
                state,
                callID,
                null,
                url,
                body,
                functionName,
                "Error getting tree data from the server",
                errorDetails.stack,
                errorDetails
            );
        }
    });
};

const deleteTree = (
    state: IState,
    functionName: string,
    tree: ITreeBase,
    showWarning: boolean = false): IHttpFetchItem | undefined => {

    if (!state
        || !tree) {
        return;
    }

    const { body, callID }: { body: any, callID: string } = gTreeCode.getDeleteTreeRequestBody(
        state,
        tree
    );

    const bodyJson: string = JSON.stringify(body);

    let headers = gAjaxHeaderCode.buildHeaders(
        state,
        callID,
        ActionType.DeleteTree
    );

    const url: string = `${state.settings.apiUrl}/Tree`;

    return gAuthenticatedHttp({
        url: url,
        options: {
            method: "DELETE",
            headers: headers,
            body: bodyJson
        },
        response: 'json',
        action: gTreeActions.removeDeletedTree,
        error: (state: IState, errorDetails: any) => {

            if (showWarning) {

                gErrorActions.setLensWarning(
                    state,
                    state.lens.treeTab,
                    `Delete tree failed`,
                );
            }

            return gErrorActions.reportHttpError(
                state,
                callID,
                tree.token,
                url,
                body,
                functionName,
                "Error sending delete tree data to the server",
                errorDetails.stack,
                errorDetails
            );
        }
    });
};

const gTreeEffects = {

    getTreeAndShowTab: (state: IState): IHttpFetchItem | undefined => {

        return getTreeAndShowTab(
            state,
            gTreeEffects.getTreeAndShowTab.name,
            gTreeActions.loadTreeAndShowTab
        );
    },

    getTree: (state: IState): IHttpFetchItem | undefined => {

        return getTreeAndShowTab(
            state,
            gTreeEffects.getTree.name,
            gTreeActions.loadTree
        );
    },

    getTreeStats: (state: IState): IHttpFetchItem | undefined => {

        if (!state
            || U.isNullOrWhiteSpace(state.treesState.selectedKey) === true) {
            return;
        }

        const { body, callID }: { body: any, callID: string } = gTreeCode.getLoadTreeStatsRequestBody(
            state,
            state.treesState.selectedKey
        );

        const bodyJson: string = JSON.stringify(body);

        let headers = gAjaxHeaderCode.buildHeaders(
            state,
            callID,
            ActionType.GetTreeStats
        );

        const url: string = `${state.settings.apiUrl}/Tree/Stats`;

        return gAuthenticatedHttp({
            url: url,
            options: {
                method: "POST",
                headers: headers,
                body: bodyJson
            },
            response: 'json',
            action: gTreeStatsActions.loadTreeStats,
            error: (state: IState, errorDetails: any) => {

                return gErrorActions.reportHttpError(
                    state,
                    callID,
                    null,
                    url,
                    body,
                    gTreeEffects.getTreeStats.name,
                    "Error getting tree stats data from the server",
                    errorDetails.stack,
                    errorDetails
                );
            }
        });
    },

    validateTreeName: (
        state: IState,
        name: string): IHttpFetchItem | undefined => {

        if (!state
            || U.isNullOrWhiteSpace(name) === true) {
            return;
        }

        const { body, callID }: { body: any, callID: string } = gTreeCode.getValidateTreeNameRequestBody(
            state,
            name
        );

        const bodyJson: string = JSON.stringify(body);

        let headers = gAjaxHeaderCode.buildHeaders(
            state,
            callID,
            ActionType.ValidateTreeName
        );

        const url: string = `${state.settings.apiUrl}/Tree/ValidateName`;

        return gAuthenticatedHttp({
            url: url,
            options: {
                method: "POST",
                headers: headers,
                body: bodyJson
            },
            response: 'json',
            action: gTreeActions.processTreeNameValidation,
            error: (state: IState, errorDetails: any) => {

                return gErrorActions.reportHttpError(
                    state,
                    callID,
                    null,
                    url,
                    body,
                    gTreeEffects.validateTreeName.name,
                    "Error validating tree name with the server",
                    errorDetails.stack,
                    errorDetails
                );
            }
        });
    },

    deleteTree: (state: IState): IHttpFetchItem | undefined => {

        if (!state
            || !state.lens.treeTab.lensTree) {
            return;
        }

        return deleteTree(
            state,
            gTreeEffects.deleteTree.name,
            state.lens.treeTab.lensTree,
            true
        );
    },

    deleteSelectedKeyTree: (state: IState): IHttpFetchItem | undefined => {

        if (!state
            || U.isPositiveNumeric(state.treesState.selectedKey) === false) {
            return;
        }

        const tree: ITreeSys | null = gTreeCode.getTreeFromState(
            state,
            state.treesState.selectedKey
        );

        if (!tree) {
            return;
        }

        return deleteTree(
            state,
            gTreeEffects.deleteSelectedKeyTree.name,
            tree
        );
    }
};

export default gTreeEffects;
