
import { gAuthenticatedHttp } from "../../../../../global/http/gAuthenticationHttp";

import IState from "../../../../../interfaces/state/IState";
import nodeActions from "../actions/nodeActions";
import gNodeCode from "../../../../../global/code/gNodeCode";
import globalNodeActions from "../../../../../global/actions/gNodeActions";
import gErrorActions from "../../../../../global/actions/gErrorActions";
import gAjaxHeaderCode from "../../../../../global/http/gAjaxHeaderCode";
import { IHttpFetchItem } from "../../../../../interfaces/http/IHttpFetchItem";


const nodeEffects = {

    saveNode: (state: IState): IHttpFetchItem | undefined => {

        if (!state
            || !state.lens.nodeTab.lensNode) {
            return;
        }

        const { body, callID }: { body: any, callID: string } = gNodeCode.getNodeForPost(
            state,
            state.lens.nodeTab.lensNode
        );

        const bodyJson: string = JSON.stringify(body);

        let headers = gAjaxHeaderCode.buildHeaders(
            state,
            callID,
            state.lens.nodeTab.lensNode.action
        );

        const url: string = `${state.settings.apiUrl}/Node`;

        return gAuthenticatedHttp({
            url: url,
            options: {
                method: "POST",
                headers: headers,
                body: bodyJson
            },
            response: 'json',
            action: globalNodeActions.overWriteLoadedNode,
            error: (state: IState, errorDetails: any) => {

                gErrorActions.setLensWarning(
                    state,
                    state.lens.nodeTab,
                    `Save node failed`,
                );

                return gErrorActions.reportHttpError(
                    state,
                    callID,
                    state.branchesState.tree.token,
                    url,
                    body,
                    nodeEffects.saveNode.name,
                    "Error sending node data to the server",
                    errorDetails.stack,
                    errorDetails
                );
            }
        });
    },

    saveSubtreeAndLinkNode: (state: IState): IHttpFetchItem | undefined => {

        if (!state
            || !state.lens.nodeTab.lensNode) {
            return;
        }

        const { body, callID }: { body: any, callID: string } = gNodeCode.getSubtreeAndLinkNodeForPost(
            state,
            state.lens.nodeTab.lensNode
        );

        const bodyJson: string = JSON.stringify(body);

        let headers = gAjaxHeaderCode.buildHeaders(
            state,
            callID,
            state.lens.nodeTab.lensNode.action
        );

        const url: string = `${state.settings.apiUrl}/Node/SubtreeAndLink`;

        return gAuthenticatedHttp({
            url: url,
            options: {
                method: "POST",
                headers: headers,
                body: bodyJson
            },
            response: 'json',
            action: globalNodeActions.overWriteLoadedNode,
            error: (state: IState, errorDetails: any) => {

                gErrorActions.setLensWarning(
                    state,
                    state.lens.nodeTab,
                    `Save subtree and link node failed`,
                );

                return gErrorActions.reportHttpError(
                    state,
                    callID,
                    state.branchesState.tree.token,
                    url,
                    body,
                    nodeEffects.saveSubtreeAndLinkNode.name,
                    "Error sending node data to the server",
                    errorDetails.stack,
                    errorDetails
                );
            }
        });
    },

    deleteNode: (state: IState): IHttpFetchItem | undefined => {

        if (!state
            || !state.lens.nodeTab.lensNode) {
            return;
        }

        const { body, callID }: { body: any, callID: string } = gNodeCode.getNodeForPost(
            state,
            state.lens.nodeTab.lensNode
        );

        const bodyJson: string = JSON.stringify(body);

        let headers = gAjaxHeaderCode.buildHeaders(
            state,
            callID,
            state.lens.nodeTab.lensNode.action
        );

        const url: string = `${state.settings.apiUrl}/Node`;

        return gAuthenticatedHttp({
            url: url,
            options: {
                method: "POST",
                headers: headers,
                body: bodyJson
            },
            response: 'json',
            action: nodeActions.deleteSelectedNode,
            error: (state: IState, errorDetails: any) => {

                gErrorActions.setLensWarning(
                    state,
                    state.lens.nodeTab,
                    `Delete node failed`,
                );

                return gErrorActions.reportHttpError(
                    state,
                    callID,
                    state.branchesState.tree.token,
                    url,
                    body,
                    nodeEffects.deleteNode.name,
                    "Error sending node data to the server",
                    errorDetails.stack,
                    errorDetails
                );
            }
        });
    }
};

export default nodeEffects;
