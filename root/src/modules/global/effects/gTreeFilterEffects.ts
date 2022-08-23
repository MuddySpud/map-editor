
import { gAuthenticatedHttp } from "../http/gAuthenticationHttp";

import IState from "../../interfaces/state/IState";
import gFilterCode from "../code/gFilterCode";
import gTreesCoreActions from "../actions/gTreesCoreActions";
import gErrorActions from "../actions/gErrorActions";
import gAjaxHeaderCode from "../http/gAjaxHeaderCode";
import { ActionType } from "../../interfaces/enums/ActionType";
import { IHttpFetchItem } from "../../interfaces/http/IHttpFetchItem";


const gTreeFilterEffects = {

    filter: (state: IState): IHttpFetchItem | undefined => {

        if (state.lens.filterTab.advanced === true) {

            return gTreeFilterEffects.advancedFilter(state);
        }

        return gTreeFilterEffects.autoFilter(state);
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
            ActionType.FilterTrees
        );

        const url: string = `${state.settings.apiUrl}/Search/Trees`;

        return gAuthenticatedHttp({
            url: url,
            options: {
                method: "POST",
                headers: headers,
                body: bodyJson
            },
            response: 'json',
            action: gTreesCoreActions.loadViewOrBuildFresh,
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
                    gTreeFilterEffects.advancedFilter.name,
                    "Error sending trees advanced filter data to the server",
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

        const { body, callID }: { body: any, callID: string } = gFilterCode.getTreesAutoFilterRequestBody(state);
        const bodyJson: string = JSON.stringify(body);

        let headers = gAjaxHeaderCode.buildHeaders(
            state,
            callID,
            ActionType.FilterTrees
        );

        const url: string = `${state.settings.apiUrl}/Filter/Trees`;

        return gAuthenticatedHttp({
            url: url,
            options: {
                method: "POST",
                headers: headers,
                body: bodyJson
            },
            response: 'json',
            action: gTreesCoreActions.loadViewOrBuildFresh,
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
                    gTreeFilterEffects.autoFilter.name,
                    "Error sending trees auto filter data to the server",
                    errorDetails.stack,
                    errorDetails
                );
            }
        });
    }
};

export default gTreeFilterEffects;
