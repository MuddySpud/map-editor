
import { gAuthenticatedHttp } from "../../../../../global/http/gAuthenticationHttp";

import IState from "../../../../../interfaces/state/IState";
import gStateCode from "../../../../../global/code/gStateCode";
import gErrorActions from "../../../../../global/actions/gErrorActions";
import settingActions from "../actions/settingActions";
import gAjaxHeaderCode from "../../../../../global/http/gAjaxHeaderCode";
import { ActionType } from "../../../../../interfaces/enums/ActionType";
import { IHttpFetchItem } from "../../../../../interfaces/http/IHttpFetchItem";


const settingsEffects = {

    saveSettings: (state: IState): IHttpFetchItem | undefined => {

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
            action: settingActions.updateSettingsKey,
            error: (state: IState, errorDetails: any) => {

                gErrorActions.setLensWarning(
                    state,
                    state.lens.settingsTab,
                    `Save settings failed`,
                );

                return gErrorActions.reportHttpError(
                    state,
                    callID,
                    null,
                    url,
                    body,
                    settingsEffects.saveSettings.name,
                    "Error sending settings data to the server",
                    errorDetails.stack,
                    errorDetails
                );
            }
        });
    }
}

export default settingsEffects;
