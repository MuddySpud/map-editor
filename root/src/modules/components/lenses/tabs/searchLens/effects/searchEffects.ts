
import { gAuthenticatedHttp } from "../../../../../global/http/gAuthenticationHttp";

import IState from "../../../../../interfaces/state/IState";
import gErrorActions from "../../../../../global/actions/gErrorActions";
import gSearchCode from "../../../../../global/code/gSearchCode";
import ISearchCase from "../../../../../interfaces/state/Search/ISearchCase";
import U from "../../../../../global/gUtilities";
import gAjaxHeaderCode from "../../../../../global/http/gAjaxHeaderCode";
import { IHttpFetchItem } from "../../../../../interfaces/http/IHttpFetchItem";


const searchEffects = {

    search: (
        state: IState,
        searchCase: ISearchCase): IHttpFetchItem | undefined => {

        if (!state
            || !searchCase
            || !searchCase.brief
            || !searchCase.buildAction) {
            return;
        }

        const { body, callID }: { body: any, callID: string } = gSearchCode.getSearchRequestBody(
            state,
            searchCase,
            state.settings
            );

        const bodyJson: string = JSON.stringify(body);

        let headers = gAjaxHeaderCode.buildHeaders(
            state,
            callID,
            body.action
        );

        const type = U.upperCaseFirstLetter(searchCase.brief.type.toString());
        const url: string = `${state.settings.apiUrl}/Search/${type}`;
        
        return gAuthenticatedHttp({
            url: url,
            options: {
                method: "POST",
                headers: headers,
                body: bodyJson
            },
            response: 'json',
            action: searchCase.buildAction,
            error: (state: IState, errorDetails: any) => {

                gErrorActions.setLensWarning(
                    state,
                    state.lens.searchTab,
                    `Search failed`,
                );

                return gErrorActions.reportHttpError(
                    state,
                    callID,
                    null,
                    url,
                    body,
                    searchEffects.search.name,
                    "Error sending search data to the server",
                    errorDetails.stack,
                    errorDetails
                );
            }
        });
    }
};

export default searchEffects;
