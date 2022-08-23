// 

import { IHttpFetchItem } from "../../../interfaces/http/IHttpFetchItem";
import IState from "../../../interfaces/state/IState";
// import gErrorActions from "../../../global/actions/gErrorActions";
// import U from "../../../global/gUtilities";
// import gAjaxHeaderCode from "../../../global/code/gAjaxHeaderCode";
// import recordActions from "../actions/recordActions";


const recordPanelEffects = {

    start: (state: IState): IHttpFetchItem | undefined => {

        if (!state) {
            return;
        }

        throw new Error("Not implemented exception");

        // const { body, callID }: { body: any, callID: string } = gNodeCode.getNodeForOptionsRequestBody(
        //     state,
        //     nodeKey);

        // const bodyJson: string = JSON.stringify(body);
        // let headers = gAjaxHeaderCode.buildHeaders(state, callID);
        // const url: string = `${state.settings.baseUrl}/Record/Start`;

        // return gAuthenticatedHttp({
        //     url: url,
        //     options: {
        //         method: "POST",
        //         headers: headers,
        //         body: bodyJson
        //     },
        //     response: 'json',
        //     action: recordActions.loadRecordSession,
        //     error: (state: IState, errorDetails: any) => {

        //         return gErrorActions.reportHttpError(
        //             state,
        //             callID,
        //             state.branchesState.tree.token,
        //             url,
        //             body,
        //             recordPanelEffects.start.name,
        //             "Error sending record start data to the server",
        //             errorDetails.stack,
        //             errorDetails
        //         );
        //     }
        // });
    },
    
    stop: (state: IState): IHttpFetchItem | undefined => {

        if (!state) {
            return;
        }

        throw new Error("Not implemented exception");

        // const { body, callID }: { body: any, callID: string } = gNodeCode.getNodeForOptionsRequestBody(
        //     state,
        //     nodeKey);

        // const bodyJson: string = JSON.stringify(body);
        // let headers = gAjaxHeaderCode.buildHeaders(state, callID);
        // const url: string = `${state.settings.baseUrl}/Node/Get`;

        // return gAuthenticatedHttp({
        //     url: url,
        //     options: {
        //         method: "POST",
        //         headers: headers,
        //         body: bodyJson
        //     },
        //     response: 'json',
        //     action: optionActions.loadOptionsThenExpand,
        //     error: (state: IState, errorDetails: any) => {

        //         return gErrorActions.reportHttpError(
        //             state,
        //             callID,
        //             state.branchesState.tree.token,
        //             url,
        //             body,
        //             optionEffects.getOptions.name,
        //             "Error getting option data from the server",
        //             errorDetails.stack,
        //             errorDetails
        //         );
        //     }
        // });
    },

    pause: (state: IState): IHttpFetchItem | undefined => {

        if (!state) {
            return;
        }

        throw new Error("Not implemented exception");

        // const { body, callID }: { body: any, callID: string } = gNodeCode.getNodeForOptionsRequestBody(
        //     state,
        //     nodeKey);

        // const bodyJson: string = JSON.stringify(body);
        // let headers = gAjaxHeaderCode.buildHeaders(state, callID);
        // const url: string = `${state.settings.baseUrl}/Node/Get`;

        // return gAuthenticatedHttp({
        //     url: url,
        //     options: {
        //         method: "POST",
        //         headers: headers,
        //         body: bodyJson
        //     },
        //     response: 'json',
        //     action: optionActions.loadOptionsThenExpand,
        //     error: (state: IState, errorDetails: any) => {

        //         return gErrorActions.reportHttpError(
        //             state,
        //             callID,
        //             state.branchesState.tree.token,
        //             url,
        //             body,
        //             optionEffects.getOptions.name,
        //             "Error getting option data from the server",
        //             errorDetails.stack,
        //             errorDetails
        //         );
        //     }
        // });
    }
};

export default recordPanelEffects;
