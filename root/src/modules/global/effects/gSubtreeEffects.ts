
import { gAuthenticatedHttp } from "../http/gAuthenticationHttp";

import IState from "../../interfaces/state/IState";
import ITreeBase from "../../interfaces/state/tree/ITreeBase";
import gSubtreeActions from "../actions/gSubtreeActions";
import U from "../gUtilities";
import gSubtreeCode from "../code/gSubtreeCode";
import gErrorActions from "../actions/gErrorActions";
import gStSocketCode from "../code/gStSocketCode";
import gAjaxHeaderCode from "../http/gAjaxHeaderCode";
import { ActionType } from "../../interfaces/enums/ActionType";
import { IHttpFetchItem } from "../../interfaces/http/IHttpFetchItem";


const gSubtreeEffects = {

    getSubtree: (
        state: IState,
        tree: ITreeBase): IHttpFetchItem | undefined => {

        if (!state
            || !tree) {
            return;
        }

        const { body, callID }: { body: any, callID: string } = gSubtreeCode.getSubtreeKeyRequestBody(
            state,
            tree
        );

        const bodyJson: string = JSON.stringify(body);

        let headers = gAjaxHeaderCode.buildHeaders(
            state,
            callID,
            ActionType.GetSubtree
        );

        const url: string = `${state.settings.apiUrl}/Subtree/Details`;

        return gAuthenticatedHttp({
            url: url,
            options: {
                method: "POST",
                headers: headers,
                body: bodyJson
            },
            response: 'json',
            action: gSubtreeActions.loadSubtree,
            error: (state: IState, errorDetails: any) => {

                return gErrorActions.reportHttpError(
                    state,
                    callID,
                    tree.token,
                    url,
                    body,
                    gSubtreeEffects.getSubtree.name,
                    "Error getting subtree data from the server",
                    errorDetails.stack,
                    errorDetails
                );
            }
        });
    },

    getSockets: (state: IState) => {

        if (!state
            || U.isPositiveNumeric(state.branchesState.tree.key) === false) {
            return;
        }

        const { body, callID }: { body: any, callID: string } = gStSocketCode.getLoadSocketsRequestBody(state);
        const bodyJson: string = JSON.stringify(body);

        let headers = gAjaxHeaderCode.buildHeaders(
            state,
            callID,
            ActionType.GetSockets
        );

        const url: string = `${state.settings.apiUrl}/Subtree/Sockets`;

        return gAuthenticatedHttp({
            url: url,
            options: {
                method: "POST",
                headers: headers,
                body: bodyJson
            },
            response: 'json',
            action: gSubtreeActions.loadSockets,
            error: (state: IState, errorDetails: any) => {

                return gErrorActions.reportHttpError(
                    state,
                    callID,
                    state.branchesState.tree.token,
                    url,
                    body,
                    gSubtreeEffects.getSockets.name,
                    "Error getting sockets data from the server",
                    errorDetails.stack,
                    errorDetails
                );
            }
        });
    }
};

export default gSubtreeEffects;
