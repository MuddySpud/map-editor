
import { gAuthenticatedHttp } from "../http/gAuthenticationHttp";

import IState from "../../interfaces/state/IState";
import gInitActions from "../actions/gInitActions";
import U from "../gUtilities";
import gBranchViewCode from "../code/gBranchViewCode";
import gViewCode from "../code/gViewCode";
import gErrorActions from "../actions/gErrorActions";
import gTreeCode from "../code/gTreeCode";
import gAjaxHeaderCode from "../http/gAjaxHeaderCode";
import { ActionType } from "../../interfaces/enums/ActionType";
import { IHttpFetchItem } from "../../interfaces/http/IHttpFetchItem";


const gInitEffects = {

    getProjectInitData: (
        state: IState,
        treeKey: string): IHttpFetchItem | undefined => {

        if (!state
            || !U.isPositiveNumeric(treeKey)) {
            return;
        }

        const { body, callID }: { body: any, callID: string } = gTreeCode.getTreeProjectRequestBody(
            state,
            state.treesState.selectedKey
        );

        const bodyJson: string = JSON.stringify(body);

        let headers = gAjaxHeaderCode.buildHeaders(
            state,
            callID,
            ActionType.GetTreeProject
        );

        const url: string = `${state.settings.apiUrl}/Tree/Project`;

        return gAuthenticatedHttp({
            url: url,
            options: {
                method: "POST",
                headers: headers,
                body: bodyJson
            },
            response: 'json',
            action: gInitActions.loadProjectOrBuildFresh,
            error: (state: IState, errorDetails: any) => {

                return gErrorActions.reportHttpError(
                    state,
                    callID,
                    null,
                    url,
                    body,
                    gInitEffects.getProjectInitData.name,
                    "Error getting tree project data from the server",
                    errorDetails.stack,
                    errorDetails
                );
            }
        });
    },

    getBranchesInitData: (
        state: IState,
        treeKey: string): IHttpFetchItem | undefined => {

        if (!state
            || !U.isPositiveNumeric(treeKey)) {
            return;
        }

        const { body, callID }: { body: any, callID: string } = gViewCode.getLoadLiveViewRequestBody(
            state,
            treeKey
        );

        const bodyJson: string = JSON.stringify(body);

        let headers = gAjaxHeaderCode.buildHeaders(
            state,
            callID,
            ActionType.GetLiveView
        );

        const url: string = `${state.settings.apiUrl}/UserView/Live`;

        return gAuthenticatedHttp({
            url: url,
            options: {
                method: "POST",
                headers: headers,
                body: bodyJson
            },
            response: 'json',
            action: gInitActions.loadViewOrBuildFresh,
            error: (state: IState, errorDetails: any) => {

                return gErrorActions.reportHttpError(
                    state,
                    callID,
                    null,
                    url,
                    body,
                    gInitEffects.getBranchesInitData.name,
                    "Error getting tree init data from the server",
                    errorDetails.stack,
                    errorDetails
                );
            }
        });
    },

    getNodeInitData: (
        state: IState,
        treeToken: string,
        nodeKey: string): IHttpFetchItem | undefined => {

        if (!state
            || U.isNullOrWhiteSpace(treeToken)) {
            return;
        }

        const { body, callID }: { body: any, callID: string } = gBranchViewCode.getBranchViewFromEndRequestBody(
            state,
            treeToken,
            nodeKey);

        const bodyJson: string = JSON.stringify(body);

        let headers = gAjaxHeaderCode.buildHeaders(
            state,
            callID,
            ActionType.GetBranchViewFromEnd
        );

        const url: string = `${state.settings.apiUrl}/BranchView/End`;

        return gAuthenticatedHttp({
            url: url,
            options: {
                method: "POST",
                headers: headers,
                body: bodyJson
            },
            response: 'json',
            action: gInitActions.loadViewOrBuildFresh,
            error: (state: IState, errorDetails: any) => {

                return gErrorActions.reportHttpError(
                    state,
                    callID,
                    treeToken,
                    url,
                    body,
                    gInitEffects.getNodeInitData.name,
                    "Error getting node init data from the server",
                    errorDetails.stack,
                    errorDetails
                );
            }
        });
    }
};

export default gInitEffects;
