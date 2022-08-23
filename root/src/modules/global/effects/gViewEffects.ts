
import { gAuthenticatedHttp } from "../http/gAuthenticationHttp";

import IState from "../../interfaces/state/IState";
import gStateCode from "../code/gStateCode";
import { NotificationType } from "../../interfaces/enums/NotificationType";
import IUserView from "../../interfaces/state/user/IUserView";
import gViewActions from "../actions/gViewActions";
import U from "../gUtilities";
import gErrorActions from "../actions/gErrorActions";
import gAjaxHeaderCode from "../http/gAjaxHeaderCode";
import { ActionType } from "../../interfaces/enums/ActionType";
import { IHttpFetchItem } from "../../interfaces/http/IHttpFetchItem";


const gViewEffects = {

    clearLiveAndReload: (state: IState): IHttpFetchItem | undefined => {

        if (!state) {

            return state;
        }

        const liveView: IUserView = state.branchesState.viewSettings.live;

        if (U.isNullOrWhiteSpace(liveView.token) === true
            || U.isNullOrWhiteSpace(liveView.key) === true) {

            return;
        }

        let headers = gAjaxHeaderCode.buildHeaders(
            state, 
            "Needs to be fixed!!!",
            ActionType.ClearLiveUserView 
        );

        const url: string = `${state.settings.apiUrl}/UserView/Delete/${liveView.token}/${liveView.key}`;
        const errorMessage: string = `Url: ${url}`;

        return gAuthenticatedHttp({
            url: url,
            options: {
                method: "DELETE",
                headers: headers,
            },
            response: 'json',
            action: gViewActions.reloadLiveView,
            error: (state: IState, _errorDetails: any) => {

                gErrorActions.setLensWarning(
                    state,
                    state.lens.viewSettingsTab,
                    `Clear live view failed`,
                );

                // return gErrorActions.reportHttpError(
                //     state,
                //     guid,
                //     token,
                //     url,
                //     body,
                //     gValidationEffects.validateTree.name,
                //     "Error sending clear view data to the server",
                //     errorDetails.stack,
                //     errorDetails
                // );

                gStateCode.addNotification(
                    state,
                    "Error sending clear view data to the server",
                    errorMessage,
                    state.branchesState.tree.token,
                    NotificationType.Error);

                return gStateCode.cloneState(state);
            }
        });
    }
}

export default gViewEffects;
