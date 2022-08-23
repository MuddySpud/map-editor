
import { gAuthenticatedHttp } from "../http/gAuthenticationHttp";

import IState from "../../interfaces/state/IState";
import gValidationActions from "../actions/gValidationActions";
import gErrorActions from "../../global/actions/gErrorActions";
import U from "../gUtilities";
import gTreeCode from "../code/gTreeCode";
import gAjaxHeaderCode from "../http/gAjaxHeaderCode";
import { ActionType } from "../../interfaces/enums/ActionType";
import { IHttpFetchItem } from "../../interfaces/http/IHttpFetchItem";


const gValidationEffects = {

    validateTree: (
        state: IState,
        treeKey: string,
        token: string,
        isSubtree: boolean): IHttpFetchItem | undefined => {

        if (!U.isPositiveNumeric(treeKey)) {
            return;
        }

        const { body, callID }: { body: any, callID: string } = gTreeCode.getTreeValidationRequestBody(
            state,
            treeKey,
            token,
            isSubtree
        );

        const bodyJson: string = JSON.stringify(body);

        let headers = gAjaxHeaderCode.buildHeaders(
            state, 
            callID,
            ActionType.ValidateTree
        );

        const url: string = `${state.settings.apiUrl}/Tree/Validate`;

        return gAuthenticatedHttp({
            url: url,
            options: {
                method: "POST",
                headers: headers,
                body: bodyJson
            },
            response: 'json',
            action: gValidationActions.loadResults,
            error: (state: IState, errorDetails: any) => {

                return gErrorActions.reportHttpError(
                    state,
                    callID,
                    token,
                    url,
                    body,
                    gValidationEffects.validateTree.name,
                    "Error sending tree validation data to the server",
                    errorDetails.stack,
                    errorDetails
                );
            }
        });
    }
}

export default gValidationEffects;
