import { gAuthenticatedHttp } from "./gAuthenticationHttp";

import { ActionType } from "../../interfaces/enums/ActionType";
import IState from "../../interfaces/state/IState";
import gAjaxHeaderCode from "./gAjaxHeaderCode";
import gAuthenticationActions from "./gAuthenticationActions";
import gErrorActions from "../actions/gErrorActions";
import U from "../gUtilities";
import { IHttpFetchItem } from "../../interfaces/http/IHttpFetchItem";


const gAuthenticationEffects = {

    checkUserAuthenticated: (state: IState): IHttpFetchItem | undefined => {

        if (!state) {
            return;
        }

        const callID: string = U.generateGuid();

        let headers = gAjaxHeaderCode.buildHeaders(
            state,
            callID,
            ActionType.None
        );

        const url: string = `${state.settings.bffUrl}/${state.settings.userPath}?slide=false`;

        return gAuthenticatedHttp({
            url: url,
            options: {
                method: "GET",
                headers: headers
            },
            response: 'json',
            action: gAuthenticationActions.loadSuccessfulAuthentication,
            error: (state: IState, errorDetails: any) => {

                return gErrorActions.reportHttpError(
                    state,
                    callID,
                    "",
                    url,
                    "",
                    gAuthenticationEffects.checkUserAuthenticated.name,
                    "Error trying to authenticate with the server",
                    errorDetails.stack,
                    errorDetails
                );
            }
        });
    }
};

export default gAuthenticationEffects;
