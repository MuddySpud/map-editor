import { gAuthenticatedHttp } from "../../../../../global/http/gAuthenticationHttp";

import IState from "../../../../../interfaces/state/IState";
import gNodeAltsActions from "../../../../../global/actions/gNodeAltsActions";
import gBranchesStateCode from "../../../../../global/code/gBranchesStateCode";
import gErrorActions from "../../../../../global/actions/gErrorActions";
import gAjaxHeaderCode from "../../../../../global/http/gAjaxHeaderCode";
import { ActionType } from "../../../../../interfaces/enums/ActionType";
import { IHttpFetchItem } from "../../../../../interfaces/http/IHttpFetchItem";


const altsLensEffects = {

    saveAlts: (state: IState): IHttpFetchItem | undefined => {

        if (!state
            || !state.lens.nodeTab.lensNode
            || !state.lens.nodeTab.lensNode.case.alts) {

            return;
        }

        const { body, callID }: { body: any, callID: string } = gBranchesStateCode.getAltsCache(state);
        const bodyJson: string = JSON.stringify(body);

        let headers = gAjaxHeaderCode.buildHeaders(
            state,
            callID,
            ActionType.GetNodeAlts
        );

        const url: string = `${state.settings.apiUrl}/NodeAlts`;

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

                gErrorActions.setLensWarning(
                    state,
                    state.lens.nodeTab,
                    `Save node alts failed`,
                );

                return gErrorActions.reportHttpError(
                    state,
                    callID,
                    state.branchesState.tree.token,
                    url,
                    body,
                    altsLensEffects.saveAlts.name,
                    "Error sending node alts data to the server",
                    errorDetails.stack,
                    errorDetails
                );
            }
        });
    }
}

export default altsLensEffects;
