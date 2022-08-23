
import { gAuthenticatedHttp } from "../http/gAuthenticationHttp";

import IState from "../../interfaces/state/IState";
import gNotificationsCode from "../code/gNotificationsCode";
import gNotificationsActions from "../actions/gNotificationsActions";
import gErrorActions from "../../global/actions/gErrorActions";
import IHttpErrorPayload from "../../interfaces/state/effects/IHttpErrorPayload";
import gStateCode from "../code/gStateCode";
import { ActionType } from "../../interfaces/enums/ActionType";
import gAjaxHeaderCode from "../http/gAjaxHeaderCode";
import U from "../gUtilities";
import { IHttpFetchItem } from "../../interfaces/http/IHttpFetchItem";


const gNotificationsEffects = {

    getNotifications: (state: IState): IHttpFetchItem | undefined => {

        if (!state) {
            return;
        }

        const { body, callID }: { body: any, callID: string } = gNotificationsCode.getNotificationsRequestBody(state);
        const bodyJson: string = JSON.stringify(body);

        let headers = gAjaxHeaderCode.buildHeaders(
            state,
            callID,
            body.action
        );

        const url: string = `${state.settings.apiUrl}/Notifications/Get`;

        return gAuthenticatedHttp({
            url: url,
            options: {
                method: "POST",
                headers: headers,
                body: bodyJson
            },
            response: 'json',
            action: gNotificationsActions.loadNotificationsCase,
            error: (state: IState, errorDetails: any) => {

                return gErrorActions.reportHttpError(
                    state,
                    callID,
                    null,
                    url,
                    body,
                    gNotificationsEffects.getNotifications.name,
                    "Error getting notifications data from the server",
                    errorDetails.stack,
                    errorDetails
                );
            }
        });
    },

    saveHttpError: (
        state: IState,
        payload: IHttpErrorPayload): IHttpFetchItem | undefined => {

        if (!state) {
            return;
        }

        const body: any = {
            key: state.user.key,
            notifications: [
                payload
            ],
            action: ActionType.SaveHttpError
        };

        const bodyJson: string = JSON.stringify(body);
        const callID: string = U.generateGuid();

        let headers = gAjaxHeaderCode.buildHeaders(
            state,
            callID,
            ActionType.SaveHttpError
        );

        const url: string = `${state.settings.apiUrl}/Notifications/SaveHttpError`;

        return gAuthenticatedHttp({
            url: url,
            options: {
                method: "POST",
                headers: headers,
                body: bodyJson
            },
            response: 'json',
            action: gNotificationsActions.loadNotificationsCase,
            error: (state: IState, _errorDetails: any) => {

                alert(`SaveHttpError failed - cannot call save notification as could create loop
Need something else...`);

                return gStateCode.cloneState(state);
            }
        });
    }
}

export default gNotificationsEffects;
