
import { gAuthenticatedHttp } from "../http/gAuthenticationHttp";

import IState from "../../interfaces/state/IState";
import gBranchesActions from "../actions/gBranchesActions";
import gErrorActions from "../../global/actions/gErrorActions";
import U from "../gUtilities";
import gBranchViewCode from "../code/gBranchViewCode";
import gAjaxHeaderCode from "../http/gAjaxHeaderCode";
import { ActionType } from "../../interfaces/enums/ActionType";
import { IHttpFetchItem } from "../../interfaces/http/IHttpFetchItem";


const gBranchEffects = {

    getAndExpandBranch: (
        state: IState,
        nodeKey: string): IHttpFetchItem | undefined => {

        if (!state
            || U.isNullOrWhiteSpace(state.branchesState.tree.token)) {
            return;
        }

        const { body, callID }: { body: any, callID: string } = gBranchViewCode.getBranchViewFromStartRequestBody(
            state,
            nodeKey
        );

        const bodyJson: string = JSON.stringify(body);

        let headers = gAjaxHeaderCode.buildHeaders(
            state,
            callID,
            ActionType.GetBranchViewFromStart
        );

        const url: string = `${state.settings.apiUrl}/BranchView/Start`;

        return gAuthenticatedHttp({
            url: url,
            options: {
                method: "POST",
                headers: headers,
                body: bodyJson
            },
            response: 'json',
            action: gBranchesActions.loadBranchAndExpand,
            error: (state: IState, errorDetails: any) => {

                return gErrorActions.reportHttpError(
                    state,
                    callID,
                    state.branchesState.tree.token,
                    url,
                    body,
                    gBranchEffects.getAndExpandBranch.name,
                    "Error getting expand branch data from the server",
                    errorDetails.stack,
                    errorDetails
                );
            }
        });
    },

    getBranch: (
        state: IState,
        nodeKey: string): IHttpFetchItem | undefined => {

        if (!state
            || U.isNullOrWhiteSpace(state.branchesState.tree.token)) {
            return;
        }

        const { body, callID }: { body: any, callID: string } = gBranchViewCode.getBranchViewFromStartRequestBody(
            state,
            nodeKey
        );

        const bodyJson: string = JSON.stringify(body);

        let headers = gAjaxHeaderCode.buildHeaders(
            state,
            callID,
            ActionType.GetBranchViewFromStart
        );

        const url: string = `${state.settings.apiUrl}/BranchView/Start`;

        return gAuthenticatedHttp({
            url: url,
            options: {
                method: "POST",
                headers: headers,
                body: bodyJson
            },
            response: 'json',
            action: gBranchesActions.loadBranch,
            error: (state: IState, errorDetails: any) => {

                return gErrorActions.reportHttpError(
                    state,
                    callID,
                    state.branchesState.tree.token,
                    url,
                    body,
                    gBranchEffects.getBranch.name,
                    "Error getting branch data from the server",
                    errorDetails.stack,
                    errorDetails
                );
            }
        });
    },

    getWholeBranchAndSetupTreeTaskOption: (
        state: IState,
        nodeKey: string): IHttpFetchItem | undefined => {

        if (!state
            || U.isNullOrWhiteSpace(state.branchesState.tree.token)) {
            return;
        }

        const { body, callID }: { body: any, callID: string } = gBranchViewCode.getBranchViewFromMidRequestBody(
            state,
            nodeKey
        );

        const bodyJson: string = JSON.stringify(body);

        let headers = gAjaxHeaderCode.buildHeaders(
            state,
            callID,
            ActionType.GetBranchViewFromMid
        );

        const url: string = `${state.settings.apiUrl}/BranchView/Mid`;

        return gAuthenticatedHttp({
            url: url,
            options: {
                method: "POST",
                headers: headers,
                body: bodyJson
            },
            response: 'json',
            action: gBranchesActions.loadBranchAndSetupTreeTaskOption,
            error: (state: IState, errorDetails: any) => {

                return gErrorActions.reportHttpError(
                    state,
                    callID,
                    state.branchesState.tree.token,
                    url,
                    body,
                    gBranchEffects.getWholeBranchAndSetupTreeTaskOption.name,
                    "Error getting whole branch data from the server",
                    errorDetails.stack,
                    errorDetails
                );
            }
        });
    }
};

export default gBranchEffects;
