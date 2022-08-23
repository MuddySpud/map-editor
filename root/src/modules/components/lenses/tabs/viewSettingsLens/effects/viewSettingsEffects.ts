
import { gAuthenticatedHttp } from "../../../../../global/http/gAuthenticationHttp";

import IState from "../../../../../interfaces/state/IState";
import gStateCode from "../../../../../global/code/gStateCode";
import gErrorActions from "../../../../../global/actions/gErrorActions";
import viewSettingsActions from "../actions/viewSettingsActions";
import gAjaxHeaderCode from "../../../../../global/http/gAjaxHeaderCode";
import { ActionType } from "../../../../../interfaces/enums/ActionType";
import { IHttpFetchItem } from "../../../../../interfaces/http/IHttpFetchItem";


const viewSettingsEffects = {

    saveViewSettings: (state: IState): IHttpFetchItem | undefined => {

        if (!state) {
            return;
        }

        const { body, callID }: { body: any, callID: string } = gStateCode.getSettingsCache(state);
        const bodyJson: string = JSON.stringify(body);

        let headers = gAjaxHeaderCode.buildHeaders(
            state,
            callID,
            ActionType.UpdateUserSettings
        );

        const url: string = `${state.settings.apiUrl}/UserSettings`;

        return gAuthenticatedHttp({
            url: url,
            options: {
                method: "POST",
                headers: headers,
                body: bodyJson
            },
            response: 'json',
            action: viewSettingsActions.updateLiveViewKey,
            error: (state: IState, errorDetails: any) => {

                gErrorActions.setLensWarning(
                    state,
                    state.lens.viewSettingsTab,
                    `Save view settings failed`,
                );

                return gErrorActions.reportHttpError(
                    state,
                    callID,
                    state.branchesState.tree.token,
                    url,
                    body,
                    viewSettingsEffects.saveViewSettings.name,
                    "Error sending settings data to the server",
                    errorDetails.stack,
                    errorDetails
                );
            }
        });
    }
};

export default viewSettingsEffects;
