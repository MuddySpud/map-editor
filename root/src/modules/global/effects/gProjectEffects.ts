
import { gAuthenticatedHttp } from "../http/gAuthenticationHttp";

import IState from "../../interfaces/state/IState";
import U from "../gUtilities";
import gErrorActions from "../actions/gErrorActions";
import gTreeCode from "../code/gTreeCode";
import gProjectActions from "../actions/gProjectActions";
import gAjaxHeaderCode from "../http/gAjaxHeaderCode";
import { ActionType } from "../../interfaces/enums/ActionType";
import { IHttpFetchItem } from "../../interfaces/http/IHttpFetchItem";


const gProjectEffects = {

    getSubtreeProject: (
        state: IState,
        treeKey: string): IHttpFetchItem | undefined => {

        if (!state
            || !U.isPositiveNumeric(treeKey)) {
            return;
        }

        const { body, callID }: { body: any, callID: string } = gTreeCode.getTreeProjectRequestBody(
            state,
            treeKey
        );

        const bodyJson: string = JSON.stringify(body);

        let headers = gAjaxHeaderCode.buildHeaders(
            state,
            callID,
            ActionType.GetTreeProject
        );

        const url: string = `${state.settings.apiUrl}/Tree/Project`;

        return gAuthenticatedHttp({
            url: url,
            options: {
                method: "POST",
                headers: headers,
                body: bodyJson
            },
            response: 'json',
            action: gProjectActions.loadSubtreeProject,
            error: (state: IState, errorDetails: any) => {

                return gErrorActions.reportHttpError(
                    state,
                    callID,
                    null,
                    url,
                    body,
                    gProjectEffects.getSubtreeProject.name,
                    "Error getting subtree project data from the server",
                    errorDetails.stack,
                    errorDetails
                );
            }
        });
    }
};

export default gProjectEffects;
