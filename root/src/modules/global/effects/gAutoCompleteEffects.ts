
import { gAuthenticatedHttp } from "../http/gAuthenticationHttp";

import IState from "../../interfaces/state/IState";
import gErrorActions from "../../global/actions/gErrorActions";
import U from "../gUtilities";
import { ActionType } from "../../interfaces/enums/ActionType";
import gAutoCompleteActions from "../actions/gAutoCompleteActions";
import gTreesStateCode from "../code/gTreesStateCode";
import gAjaxHeaderCode from "../http/gAjaxHeaderCode";
import { IHttpFetchItem } from "../../interfaces/http/IHttpFetchItem";


const gAutoCompleteEffects = {

    token: (
        state: IState,
        fragment: string): IHttpFetchItem | undefined => {

        if (U.isNullOrWhiteSpace(fragment) === true) {

            return;
        }

        const callID: string = gTreesStateCode.registerDataRequest(
            'Autocomplete token',
            state,
            state.branchesState.tree.key as string,
            ActionType.AutoCompleteToken
        );

        const body: any = {
            fragment: fragment,
            action: ActionType.AutoCompleteToken
        };

        const bodyJson: string = JSON.stringify(body);

        let headers = gAjaxHeaderCode.buildHeaders(
            state,
            callID,
            ActionType.AutoCompleteToken
        );

        const url: string = `${state.settings.apiUrl}/autoComplete/Token`;
        
        return gAuthenticatedHttp({
            url: url,
            options: {
                method: "POST",
                headers: headers,
                body: bodyJson
            },
            response: 'json',
            action: gAutoCompleteActions.processTokenValidation,
            error: (state: IState, errorDetails: any) => {

                return gErrorActions.reportHttpError(
                    state,
                    callID,
                    null,
                    url,
                    body,
                    gAutoCompleteEffects.token.name,
                    "Error sending autocomplete token data to the server",
                    errorDetails.stack,
                    errorDetails
                );
            }
        });
    }
};

export default gAutoCompleteEffects;
