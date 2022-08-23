
import { gAuthenticatedHttp } from "../http/gAuthenticationHttp";

import IState from "../../interfaces/state/IState";
import gFilterCode from "../code/gFilterCode";
import gErrorActions from "../actions/gErrorActions";
import gAjaxHeaderCode from "../http/gAjaxHeaderCode";
import { ActionType } from "../../interfaces/enums/ActionType";
import { IHttpFetchItem } from "../../interfaces/http/IHttpFetchItem";
import gBotsCoreActions from "../actions/gBotsCoreActions";


const gBotFilterEffects = {

    filterProps: (state: IState): IHttpFetchItem | undefined => {

        return gBotFilterEffects.filter(state);
    },

    filter: (state: IState): IHttpFetchItem | undefined => {

        if (state.lens.filterTab.advanced === true) {

            return gBotFilterEffects.advancedFilter(state);
        }

        return gBotFilterEffects.autoFilter(state);
    },

    advancedFilter: (state: IState): IHttpFetchItem | undefined => {

        if (!state) {

            return state;
        }

        const { body, callID }: { body: any, callID: string } = gFilterCode.getAdvancedFilterCache(state);
        const bodyJson: string = JSON.stringify(body);

        let headers = gAjaxHeaderCode.buildHeaders(
            state,
            callID,
            ActionType.FilterBots
        );

        const url: string = `${state.settings.apiUrl}/Bots/Search`;

        return gAuthenticatedHttp({
            url: url,
            options: {
                method: "POST",
                headers: headers,
                body: bodyJson
            },
            response: 'json',
            action: gBotsCoreActions.loadViewOrBuildFresh,
            error: (state: IState, errorDetails: any) => {

                gErrorActions.setLensWarning(
                    state,
                    state.lens.filterTab,
                    `Filter failed`,
                );

                return gErrorActions.reportHttpError(
                    state,
                    callID,
                    null,
                    url,
                    body,
                    gBotFilterEffects.advancedFilter.name,
                    "Error sending bots advanced filter data to the server",
                    errorDetails.stack,
                    errorDetails
                );
            }
        });
    },

    autoFilter: (state: IState): IHttpFetchItem | undefined => {

        if (!state) {

            return;
        }

        const { body, callID }: { body: any, callID: string } = gFilterCode.getBotsAutoFilterRequestBody(state);
        const bodyJson: string = JSON.stringify(body);

        let headers = gAjaxHeaderCode.buildHeaders(
            state,
            callID,
            ActionType.FilterBots
        );

        // const url: string = `${state.settings.apiUrl}/Bots/Filter`;
        const url: string = `${state.settings.apiUrl}/Bots/Filter`;

        // console.log('Fetching all bots');
        
        return gAuthenticatedHttp({
            url: url,
            options: {
                method: "POST",
                headers: headers,
                body: bodyJson
            },
            response: 'json',
            action: gBotsCoreActions.loadViewOrBuildFresh,
            error: (state: IState, errorDetails: any) => {

                gErrorActions.setLensWarning(
                    state,
                    state.lens.filterTab,
                    `Filter failed`,
                );

                return gErrorActions.reportHttpError(
                    state,
                    callID,
                    null,
                    url,
                    body,
                    gBotFilterEffects.autoFilter.name,
                    "Error sending bots auto filter data to the server",
                    errorDetails.stack,
                    errorDetails
                );
            }
        });
    }
};

export default gBotFilterEffects;
