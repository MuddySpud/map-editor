
import { gAuthenticatedHttp } from "../http/gAuthenticationHttp";

import IState from "../../interfaces/state/IState";
import gTagsCode from "../code/gTagsCode";
import gTagActions from "../actions/gTagActions";
import gErrorActions from "../actions/gErrorActions";
import U from "../gUtilities";
import { ActionType } from "../../interfaces/enums/ActionType";
import gAjaxHeaderCode from "../http/gAjaxHeaderCode";
import { IHttpFetchItem } from "../../interfaces/http/IHttpFetchItem";


const gTagEffects = {

    getTreeKin: (state: IState): IHttpFetchItem | undefined => {

        if (!state
            || !state.lens.treeTab.lensTree
            || !U.isPositiveNumeric(state.lens.treeTab.lensTree.key)) {
            return;
        }

        const { body, callID }: { body: any, callID: string } = gTagsCode.getLoadTreeTagsRequestBody(state);
        const bodyJson: string = JSON.stringify(body);

        let headers = gAjaxHeaderCode.buildHeaders(
            state,
            callID,
            ActionType.GetTreeKin
        );

        const url: string = `${state.settings.apiUrl}/Trees/GetKin`;

        return gAuthenticatedHttp({
            url: url,
            options: {
                method: "POST",
                headers: headers,
                body: bodyJson
            },
            response: 'json',
            action: gTagActions.loadTagsCase,
            error: (state: IState, errorDetails: any) => {

                return gErrorActions.reportHttpError(
                    state,
                    callID,
                    state.lens.treeTab.lensTree?.token ?? null,
                    url,
                    body,
                    gTagEffects.getTreeKin.name,
                    "Error getting tree kin data from the server",
                    errorDetails.stack,
                    errorDetails
                );
            }
        });
    }
}

export default gTagEffects;
