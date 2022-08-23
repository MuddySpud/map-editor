
import { gAuthenticatedHttp } from "../http/gAuthenticationHttp";

import IState from "../../interfaces/state/IState";
import gErrorActions from "../actions/gErrorActions";
import gAjaxHeaderCode from "../http/gAjaxHeaderCode";
import { ActionType } from "../../interfaces/enums/ActionType";
import { IHttpFetchItem } from "../../interfaces/http/IHttpFetchItem";
import gTreesStateCode from "../code/gTreesStateCode";
import gTreeSolveSubscriptionCoreActions from "../actions/gTreeSolveSubscriptionCoreActions";


const gTreeSolveSubscriptionEffects = {

    getSubscriptions: (state: IState): IHttpFetchItem | undefined => {

        if (!state) {

            return;
        }

        const callID: string = gTreesStateCode.registerTreeDataRequest(
            'Get subscriptions',
            state,
            "",
            ActionType.GetSubscriptions
        );

        let headers = gAjaxHeaderCode.buildHeaders(
            state,
            callID,
            ActionType.GetSubscriptions
        );

        const url: string = `${state.settings.apiUrl}/Subscriptions`;

        return gAuthenticatedHttp({
            url: url,
            options: {
                method: "POST",
                headers: headers,
                body: ""
            },
            response: 'json',
            action: gTreeSolveSubscriptionCoreActions.loadSubscriptions,
            error: (state: IState, errorDetails: any) => {

                return gErrorActions.reportHttpError(
                    state,
                    callID,
                    null,
                    url,
                    "",
                    gTreeSolveSubscriptionEffects.getSubscriptions.name,
                    "Error getting subscription data from the server",
                    errorDetails.stack,
                    errorDetails
                );
            }
        });
    }
};

export default gTreeSolveSubscriptionEffects;
