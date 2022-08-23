
import { gAuthenticatedHttp } from "../../../../../global/http/gAuthenticationHttp";

import IState from "../../../../../interfaces/state/IState";
import treeActions from "../actions/treeActions";
import gTreeCode from "../../../../../global/code/gTreeCode";
import ITreeSys from "../../../../../interfaces/state/tree/ITreeSys";
import { ActionType } from "../../../../../interfaces/enums/ActionType";
import U from "../../../../../global/gUtilities";
import gTreesCoreActions from "../../../../../global/actions/gTreesCoreActions";
import gErrorActions from "../../../../../global/actions/gErrorActions";
import gAjaxHeaderCode from "../../../../../global/http/gAjaxHeaderCode";
import { IHttpFetchItem } from "../../../../../interfaces/http/IHttpFetchItem";
import botActions from "../actions/botActions";


const treeEffects = {

    publishTree: (state: IState): IHttpFetchItem | undefined => {

        if (!state
            || !state.lens.treeTab.lensTree
            || !U.isPositiveNumeric(state.lens.treeTab.lensTree.key)) {
            return;
        }

        const tree: ITreeSys = state.lens.treeTab.lensTree;

        const { body, callID }: { body: any, callID: string } = gTreeCode.getPublishTreeRequestBody(
            state,
            tree.key as string,
            tree.token as string
        );

        const bodyJson: string = JSON.stringify(body);

        let headers = gAjaxHeaderCode.buildHeaders(
            state,
            callID,
            ActionType.PublishTree
        );

        const url: string = `${state.settings.apiUrl}/Tree/Publish`;

        return gAuthenticatedHttp({
            url: url,
            options: {
                method: "POST",
                headers: headers,
                body: bodyJson
            },
            response: 'json',
            action: botActions.overWriteBot,
            error: (state: IState, errorDetails: any) => {

                gErrorActions.setLensWarning(
                    state,
                    state.lens.treeTab,
                    `Save tree failed`,
                );

                return gErrorActions.reportHttpError(
                    state,
                    callID,
                    tree.token,
                    url,
                    body,
                    treeEffects.publishTree.name,
                    "Error sending publish tree data to the server",
                    errorDetails.stack,
                    errorDetails
                );
            }
        });
    },

    saveTree: (state: IState): IHttpFetchItem | undefined => {

        if (!state
            || !state.lens.treeTab.lensTree) {
            return;
        }

        const tree: ITreeSys = state.lens.treeTab.lensTree;

        if (tree.action === ActionType.CreateTree
            && U.isNegativeNumeric(tree.key) === true) {

            // Close the create window
            gTreesCoreActions.setupForHub(state);
        }

        const { body, callID }: { body: any, callID: string } = gTreeCode.getTreeRequestBody(
            state,
            tree
        );

        const bodyJson: string = JSON.stringify(body);

        let headers = gAjaxHeaderCode.buildHeaders(
            state,
            callID,
            tree.action
        );

        const url: string = `${state.settings.apiUrl}/Tree/Save`;

        return gAuthenticatedHttp({
            url: url,
            options: {
                method: "POST",
                headers: headers,
                body: bodyJson
            },
            response: 'json',
            action: treeActions.overWriteLensTree,
            error: (state: IState, errorDetails: any) => {

                gErrorActions.setLensWarning(
                    state,
                    state.lens.treeTab,
                    `Save tree failed`,
                );

                return gErrorActions.reportHttpError(
                    state,
                    callID,
                    tree.token,
                    url,
                    body,
                    treeEffects.saveTree.name,
                    "Error sending tree data to the server",
                    errorDetails.stack,
                    errorDetails
                );
            }
        });
    },

    cloneTree: (state: IState): IHttpFetchItem | undefined => {

        if (!state
            || !state.lens.treeTab.lensTree) {
            return;
        }

        const lensTree: ITreeSys = state.lens.treeTab.lensTree;
        const { body, callID }: { body: any, callID: string } = gTreeCode.getTreeForCLONE(state);
        const bodyJson: string = JSON.stringify(body);

        let headers = gAjaxHeaderCode.buildHeaders(
            state,
            callID,
            ActionType.CloneTree
        );

        const url: string = `${state.settings.apiUrl}/Tree/Clone`;

        return gAuthenticatedHttp({
            url: url,
            options: {
                method: "POST",
                headers: headers,
                body: bodyJson
            },
            response: 'json',
            action: treeActions.overWriteClonedLensTree,
            error: (state: IState, errorDetails: any) => {

                gErrorActions.setLensWarning(
                    state,
                    state.lens.treeTab,
                    `Clone tree failed`,
                );

                return gErrorActions.reportHttpError(
                    state,
                    callID,
                    lensTree.token,
                    url,
                    body,
                    treeEffects.cloneTree.name,
                    "Error sending clone tree data to the server",
                    errorDetails.stack,
                    errorDetails
                );
            }
        });
    }
};

export default treeEffects;
