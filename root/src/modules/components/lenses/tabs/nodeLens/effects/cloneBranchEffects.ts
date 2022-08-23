
import { gAuthenticatedHttp } from "../../../../../global/http/gAuthenticationHttp";

import IState from "../../../../../interfaces/state/IState";
import gBranchTaskCode from "../../../../../global/code/gBranchTaskCode";
import branchTaskActions from "../actions/branchTaskActions";
import gErrorActions from "../../../../../global/actions/gErrorActions";
import IStateAnyArray from "../../../../../interfaces/state/IStateAnyArray";
import gAjaxHeaderCode from "../../../../../global/http/gAjaxHeaderCode";
import { IHttpFetchItem } from "../../../../../interfaces/http/IHttpFetchItem";


const clone = (
    state: IState,
    errorTitle: string,
    warningTitle: string,
    functionName: string,
    actionDelegate: (state: IState, response: any) => IStateAnyArray
): IHttpFetchItem | undefined => {

    if (!state
        || !state.lens.nodeTab.lensBranchTask) {
        return;
    }

    const { body, callID }: { body: any, callID: string } = gBranchTaskCode.getCloneBranchTaskForPost(state);
    const bodyJson: string = JSON.stringify(body);

    let headers = gAjaxHeaderCode.buildHeaders(
        state,
        callID,
        state.lens.nodeTab.lensBranchTask.action
    );

    const url: string = `${state.settings.apiUrl}/Branch/Clone`;

    return gAuthenticatedHttp({
        url: url,
        options: {
            method: "POST",
            headers: headers,
            body: bodyJson
        },
        response: 'json',
        action: actionDelegate,
        error: (state: IState, errorDetails: any) => {

            gErrorActions.setLensWarning(
                state,
                state.lens.nodeTab,
                warningTitle,
            );

            return gErrorActions.reportHttpError(
                state,
                callID,
                state.branchesState.tree.token,
                url,
                body,
                functionName,
                errorTitle,
                errorDetails.stack,
                errorDetails
            );
        }
    });
};

const cloneBranchEffects = {

    cloneBranch: (state: IState): IHttpFetchItem | undefined => {

        return clone(
            state,
            "Error sending clone branch data to the server",
            "Clone branch failed",
            cloneBranchEffects.cloneBranch.name,
            branchTaskActions.overwriteBranchTaskTarget
        );
    },

    cloneBranchToStash: (state: IState): IHttpFetchItem | undefined => {

        return clone(
            state,
            "Error sending clone branch to stash data to the server",
            "Clone branch to stash failed",
            cloneBranchEffects.cloneBranchToStash.name,
            branchTaskActions.overwriteBranchTaskStash
        );
    }
};

export default cloneBranchEffects;
