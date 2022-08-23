
import { gAuthenticatedHttp } from "../http/gAuthenticationHttp";

import IState from "../../interfaces/state/IState";
import ITreeBase from "../../interfaces/state/tree/ITreeBase";
import gErrorActions from "../../global/actions/gErrorActions";
import gShapeCode from "../code/gShapeCode";
import U from "../gUtilities";
import gShapeActions from "../actions/gShapeActions";
import gAjaxHeaderCode from "../http/gAjaxHeaderCode";
import { ActionType } from "../../interfaces/enums/ActionType";
import { IHttpFetchItem } from "../../interfaces/http/IHttpFetchItem";


const gShapeEffects = {

    getSubtreeShape: (
        state: IState,
        tree: ITreeBase): IHttpFetchItem | undefined => {

        if (!state
            || !tree
            || !U.isPositiveNumeric(tree.key)) {
            return;
        }

        const { body, callID }: { body: any, callID: string } = gShapeCode.getSubtreeShapeRequestBody(
            state,
            tree
        );

        const bodyJson: string = JSON.stringify(body);

        let headers = gAjaxHeaderCode.buildHeaders(
            state,
            callID,
            ActionType.GetSubtreeShape
        );

        const url: string = `${state.settings.apiUrl}/Shape`;

        return gAuthenticatedHttp({
            url: url,
            options: {
                method: "POST",
                headers: headers,
                body: bodyJson
            },
            response: 'json',
            action: gShapeActions.loadShapeCase,
            error: (state: IState, errorDetails: any) => {

                return gErrorActions.reportHttpError(
                    state,
                    callID,
                    tree.token,
                    url,
                    body,
                    gShapeEffects.getSubtreeShape.name,
                    "Error getting subtree shape data from the server",
                    errorDetails.stack,
                    errorDetails
                );
            }
        });
    }
}

export default gShapeEffects;
