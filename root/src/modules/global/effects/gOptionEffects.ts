
import { gAuthenticatedHttp } from "../http/gAuthenticationHttp";

import IState from "../../interfaces/state/IState";
import gErrorActions from "../../global/actions/gErrorActions";
import gSearchNodeActions from "../actions/gSearchNodeActions";
import gNodeCode from "../code/gNodeCode";
import gAjaxHeaderCode from "../http/gAjaxHeaderCode";
import { ActionType } from "../../interfaces/enums/ActionType";
import { IHttpFetchItem } from "../../interfaces/http/IHttpFetchItem";


const gOptionEffects = {

    getNodeOptionsAndParent: (
        state: IState,
        nodeKey: string): IHttpFetchItem | undefined => {

        // This is to load a selected node from the searched results with its options

        if (!state) {
            return;
        }

        const { body, callID }: { body: any, callID: string } = gNodeCode.getLoadNodeOptionsAndParentRequestBody(
            state,
            nodeKey
        );

        const bodyJson: string = JSON.stringify(body);

        let headers = gAjaxHeaderCode.buildHeaders(
            state,
            callID,
            ActionType.GetOptionsAndParent
        );

        const url: string = `${state.settings.apiUrl}/Node/OptionsAndParent`;

        return gAuthenticatedHttp({
            url: url,
            options: {
                method: "POST",
                headers: headers,
                body: bodyJson
            },
            response: 'json',
            action: gSearchNodeActions.enhanceSearchSelectedNode,
            error: (state: IState, errorDetails: any) => {

                return gErrorActions.reportHttpError(
                    state,
                    callID,
                    state.branchesState.tree.token,
                    url,
                    body,
                    gOptionEffects.getNodeOptionsAndParent.name,
                    "Error getting node options and parent from the server",
                    errorDetails.stack,
                    errorDetails
                );
            }
        });
    },
}

export default gOptionEffects;
