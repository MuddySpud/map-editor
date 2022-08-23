
import { gAuthenticatedHttp } from "../../../../global/http/gAuthenticationHttp";

import IState from "../../../../interfaces/state/IState";
import optionActions from "../actions/optionActions";
import gNodeCode from "../../../../global/code/gNodeCode";
import gErrorActions from "../../../../global/actions/gErrorActions";
import U from "../../../../global/gUtilities";
import gAjaxHeaderCode from "../../../../global/http/gAjaxHeaderCode";
import { ActionType } from "../../../../interfaces/enums/ActionType";
import { IHttpFetchItem } from "../../../../interfaces/http/IHttpFetchItem";


const optionEffects = {

    getOptions: (
        state: IState,
        nodeKey: string): IHttpFetchItem | undefined => {

        if (!state
            || !U.isPositiveNumeric(nodeKey)) {
            return;
        }

        const { body, callID }: { body: any, callID: string } = gNodeCode.getNodeForOptionsRequestBody(
            state,
            nodeKey
        );

        const bodyJson: string = JSON.stringify(body);

        let headers = gAjaxHeaderCode.buildHeaders(
            state,
            callID,
            ActionType.GetOptions
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
            action: optionActions.loadOptionsThenExpand,
            error: (state: IState, errorDetails: any) => {

                return gErrorActions.reportHttpError(
                    state,
                    callID,
                    state.branchesState.tree.token,
                    url,
                    body,
                    optionEffects.getOptions.name,
                    "Error getting option data from the server",
                    errorDetails.stack,
                    errorDetails
                );
            }
        });
    }
};

export default optionEffects;
