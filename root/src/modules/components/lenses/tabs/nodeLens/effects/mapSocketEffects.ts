
import { gAuthenticatedHttp } from "../../../../../global/http/gAuthenticationHttp";

import IState from "../../../../../interfaces/state/IState";
import mapSocketActions from "../actions/mapSocketActions";
import gSocketTaskCode from "../../../../../global/code/gSocketTaskCode";
import gErrorActions from "../../../../../global/actions/gErrorActions";
import gAjaxHeaderCode from "../../../../../global/http/gAjaxHeaderCode";
import { IHttpFetchItem } from "../../../../../interfaces/http/IHttpFetchItem";


const map = (
    state: IState,
    actionDelegate: (state: IState, response: any) => IState,
    functionName: string,
    errorTitle: string,
    warningTitle: string
): IHttpFetchItem | undefined => {

    if (!state
        || !state.lens.nodeTab.lensSocketTask) {
        return;
    }

    const { body, callID }: { body: any, callID: string } = gSocketTaskCode.getMapSocketTaskForPost(
        state,
        state.lens.nodeTab.lensSocketTask
    );

    const bodyJson: string = JSON.stringify(body);

    let headers = gAjaxHeaderCode.buildHeaders(
        state,
        callID,
        state.lens.nodeTab.lensSocketTask.action
    );

    const url: string = `${state.settings.apiUrl}/Socket/Map`;

    return gAuthenticatedHttp({
        url: url,
        options: {
            method: "POST",
            headers: headers,
            body: bodyJson
        },
        response: 'json',
        action: actionDelegate,
        error: (state: IState, errorDetails: any) => {

            gErrorActions.setLensWarning(
                state,
                state.lens.nodeTab,
                warningTitle,
            );

            return gErrorActions.reportHttpError(
                state,
                callID,
                state.branchesState.tree.token,
                url,
                body,
                functionName,
                errorTitle,
                errorDetails.stack,
                errorDetails
            );
        }
    });
};

const mapSocketEffects = {

    save: (state: IState): IHttpFetchItem | undefined => {

        return map(
            state,
            mapSocketActions.overWriteLoadedHole,
            mapSocketEffects.save.name,
            "Error sending socket map data to the server",
            "Map to socket failed"
        );
    },

    // clear: (state: IState): any => {

    //     return map(
    //         state,
    //         mapSocketActions.clearHoleToSocketMapping,
    //         mapSocketEffects.clear.name,
    //         "Error sending clear socket map data to the server",
    //         "Clear socket mapping failed"
    //     );
    // }
};

export default mapSocketEffects;
