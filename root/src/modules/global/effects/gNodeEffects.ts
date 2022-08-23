
import { gAuthenticatedHttp } from "../http/gAuthenticationHttp";

import IState from "../../interfaces/state/IState";
import gNodeActions from "../actions/gNodeActions";
import gErrorActions from "../../global/actions/gErrorActions";
import gNodeCode from "../code/gNodeCode";
import U from "../gUtilities";
import { ActionType } from "../../interfaces/enums/ActionType";
import gTreesStateCode from "../code/gTreesStateCode";
import gAjaxHeaderCode from "../http/gAjaxHeaderCode";
import { IHttpFetchItem } from "../../interfaces/http/IHttpFetchItem";


const gNodeEffects = {

    getNode: (
        state: IState,
        nodeKey: string): IHttpFetchItem | undefined => {

        if (!state
            || U.isPositiveNumeric(nodeKey) === false) {
            return;
        }

        const { body, callID }: { body: any, callID: string } = gNodeCode.getRefreshNodeRequestBody(
            state,
            nodeKey);

        const bodyJson: string = JSON.stringify(body);

        let headers = gAjaxHeaderCode.buildHeaders(
            state,
            callID,
            ActionType.GetNode
        );

        const url: string = `${state.settings.apiUrl}/Node/Get`;

        return gAuthenticatedHttp({
            url: url,
            options: {
                method: "POST",
                headers: headers,
                body: bodyJson
            },
            response: 'json',
            action: gNodeActions.overWriteRefreshedNode,
            error: (state: IState, errorDetails: any) => {

                return gErrorActions.reportHttpError(
                    state,
                    callID,
                    state.branchesState.tree.token,
                    url,
                    body,
                    gNodeEffects.getNode.name,
                    "Error refreshing node data with the server",
                    errorDetails.stack,
                    errorDetails
                );
            }
        });
    },

    validateNodeKey: (
        state: IState,
        token: string,
        key: string): IHttpFetchItem | undefined => {

        if (!state
            || U.isPositiveNumeric(key) === false
            || U.isNullOrWhiteSpace(token) === true) {
            return;
        }

        const callID: string = gTreesStateCode.registerDataRequest(
            'Validate node key',
            state,
            state.branchesState.tree.key as string,
            ActionType.ValidateNodeKey,
        );

        const body: any = {
            token: token,
            key: key,
            action: ActionType.ValidateNodeKey
        };

        const bodyJson: string = JSON.stringify(body);

        let headers = gAjaxHeaderCode.buildHeaders(
            state,
            callID,
            ActionType.ValidateNodeKey
        );

        const url: string = `${state.settings.apiUrl}/Node/ValidateKey`;

        return gAuthenticatedHttp({
            url: url,
            options: {
                method: "POST",
                headers: headers,
                body: bodyJson
            },
            response: 'json',
            action: gNodeActions.processNodeKeyValidation,
            error: (state: IState, errorDetails: any) => {

                return gErrorActions.reportHttpError(
                    state,
                    callID,
                    token,
                    url,
                    body,
                    gNodeEffects.validateNodeKey.name,
                    "Error validating node key with the server",
                    errorDetails.stack,
                    errorDetails
                );
            }
        });
    }
};

export default gNodeEffects;
