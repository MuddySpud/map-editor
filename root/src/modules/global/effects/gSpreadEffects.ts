
import { gAuthenticatedHttp } from "../http/gAuthenticationHttp";

import IState from "../../interfaces/state/IState";
import ITreeBase from "../../interfaces/state/tree/ITreeBase";
import gSpreadActions from "../actions/gSpreadActions";
import gErrorActions from "../../global/actions/gErrorActions";
import U from "../gUtilities";
import gSpreadCode from "../code/gSpreadCode";
import gAjaxHeaderCode from "../http/gAjaxHeaderCode";
import { ActionType } from "../../interfaces/enums/ActionType";
import { IHttpFetchItem } from "../../interfaces/http/IHttpFetchItem";


const gSpreadEffects = {

    getSubtreeSpread: (
        state: IState,
        tree: ITreeBase): IHttpFetchItem | undefined => {

        if (!state
            || !tree
            || !U.isPositiveNumeric(tree.key)) {
            return;
        }

        const { body, callID }: { body: any, callID: string } = gSpreadCode.getSubtreeSpreadRequestBody(
            state,
            tree
        );

        const bodyJson: string = JSON.stringify(body);

        let headers = gAjaxHeaderCode.buildHeaders(
            state,
            callID,
            ActionType.GetSubtreeSpread
        );

        const url: string = `${state.settings.apiUrl}/Spread`;

        return gAuthenticatedHttp({
            url: url,
            options: {
                method: "POST",
                headers: headers,
                body: bodyJson
            },
            response: 'json',
            action: gSpreadActions.loadSpreadCase,
            error: (state: IState, errorDetails: any) => {

                return gErrorActions.reportHttpError(
                    state,
                    callID,
                    tree.token,
                    url,
                    body,
                    gSpreadEffects.getSubtreeSpread.name,
                    "Error getting subtree spread data from the server",
                    errorDetails.stack,
                    errorDetails
                );
            }
        });
    }
}

export default gSpreadEffects;
