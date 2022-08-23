
import { gAuthenticatedHttp } from "../http/gAuthenticationHttp";

import IState from "../../interfaces/state/IState";
import gErrorActions from "../../global/actions/gErrorActions";
import gBranchTaskCode from "../code/gBranchTaskCode";
import gBranchTaskActions from "../actions/gBranchTaskActions";
import gAjaxHeaderCode from "../http/gAjaxHeaderCode";
import { ActionType } from "../../interfaces/enums/ActionType";
import { IHttpFetchItem } from "../../interfaces/http/IHttpFetchItem";


const gMoveBranchEffects = {

    loadMoveBranchNodes: (state: IState): IHttpFetchItem | undefined => {

        if (!state
            || !state.lens.nodeTab.lensBranchTask) {

            return;
        }

        const { body, callID }: { body: any, callID: string } = gBranchTaskCode.getLoadNodesRequestJson(state);
        const bodyJson: string = JSON.stringify(body);

        let headers = gAjaxHeaderCode.buildHeaders(
            state,
            callID,
            ActionType.GetMoveBranches
        );

        const url: string = `${state.settings.apiUrl}/Branch/Nodes`;

        return gAuthenticatedHttp({
            url: url,
            options: {
                method: "POST",
                headers: headers,
                body: bodyJson
            },
            response: 'json',
            action: gBranchTaskActions.overwriteBranchTask,
            error: (state: IState, errorDetails: any) => {

                return gErrorActions.reportHttpError(
                    state,
                    callID,
                    state.branchesState.tree.token,
                    url,
                    body,
                    gMoveBranchEffects.loadMoveBranchNodes.name,
                    "Error getting branchTask move branch nodes data from the server",
                    errorDetails.stack,
                    errorDetails
                );
            }
        });
    },
}

export default gMoveBranchEffects;


