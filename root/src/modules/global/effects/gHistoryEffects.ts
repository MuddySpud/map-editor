
import { gAuthenticatedHttp } from "../http/gAuthenticationHttp";

import IState from "../../interfaces/state/IState";
import gHistoryActions from "../actions/gHistoryActions";
import gHistoryCode from "../code/gHistoryCode";
import gErrorActions from "../../global/actions/gErrorActions";
import U from "../gUtilities";
import gAjaxHeaderCode from "../http/gAjaxHeaderCode";
import { ActionType } from "../../interfaces/enums/ActionType";
import { IHttpFetchItem } from "../../interfaces/http/IHttpFetchItem";


const gHistoryEffects = {

    getTreeHistory: (state: IState): IHttpFetchItem | undefined => {

        if (!state
            || !state.lens.treeTab.lensTree
            || !U.isPositiveNumeric(state.lens.treeTab.lensTree.key)) {
            return;
        }

        const { body, callID }: { body: any, callID: string } = gHistoryCode.getTreeHistoryRequestBody(state);
        const bodyJson: string = JSON.stringify(body);

        let headers = gAjaxHeaderCode.buildHeaders(
            state,
            callID,
            ActionType.GetTreeHistory
        );

        const url: string = `${state.settings.apiUrl}/History/Get`;

        return gAuthenticatedHttp({
            url: url,
            options: {
                method: "POST",
                headers: headers,
                body: bodyJson
            },
            response: 'json',
            action: gHistoryActions.loadHistoryCase,
            error: (state: IState, errorDetails: any) => {

                return gErrorActions.reportHttpError(
                    state,
                    callID,
                    state.lens.treeTab.lensTree?.token ?? null,
                    url,
                    body,
                    gHistoryEffects.getTreeHistory.name,
                    "Error getting tree history data from the server",
                    errorDetails.stack,
                    errorDetails
                );
            }
        });
    }
};

export default gHistoryEffects;
