
import { gAuthenticatedHttp } from "../http/gAuthenticationHttp";

import IState from "../../interfaces/state/IState";
import gNodeAltsActions from "../actions/gNodeAltsActions";
import gNodeAltsCode from "../code/gNodeAltsCode";
import U from "../gUtilities";
import gErrorActions from "../actions/gErrorActions";
import { ActionType } from "../../interfaces/enums/ActionType";
import gAjaxHeaderCode from "../http/gAjaxHeaderCode";
import { IHttpFetchItem } from "../../interfaces/http/IHttpFetchItem";


const gNodeAltsEffects = {

    loadAlts: (state: IState): IHttpFetchItem | undefined => {

        if (!state
            || !state.lens.nodeTab.lensNode
            || !state.lens.nodeTab.lensNode.isEntry
            || U.isPositiveNumeric(state.lens.nodeTab.lensNode.key) === false) {

            return;
        }

        const { body, callID }: { body: any, callID: string } = gNodeAltsCode.getNodeAltsRequestBody(
            state,
            state.lens.nodeTab.lensNode.key as string);

        const bodyJson: string = JSON.stringify(body);

        let headers = gAjaxHeaderCode.buildHeaders(
            state,
            callID,
            ActionType.GetNodeAlts
        );

        const url: string = `${state.settings.apiUrl}/NodeAlts/Get`;

        return gAuthenticatedHttp({
            url: url,
            options: {
                method: "POST",
                headers: headers,
                body: bodyJson
            },
            response: 'json',
            action: gNodeAltsActions.overWriteNodeAlts,
            error: (state: IState, errorDetails: any) => {

                return gErrorActions.reportHttpError(
                    state,
                    callID,
                    state.branchesState.tree.token,
                    url,
                    body,
                    gNodeAltsEffects.loadAlts.name,
                    "Error get node alts data from the server",
                    errorDetails.stack,
                    errorDetails
                );
            }
        });
    },
}

export default gNodeAltsEffects;
