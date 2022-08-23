
import { gAuthenticatedHttp } from "../../../../../global/http/gAuthenticationHttp";

import IState from "../../../../../interfaces/state/IState";
import { ActionType } from "../../../../../interfaces/enums/ActionType";
import U from "../../../../../global/gUtilities";
import gTreesCoreActions from "../../../../../global/actions/gTreesCoreActions";
import ISubtreeSys from "../../../../../interfaces/state/tree/ISubtreeSys";
import gSubtreeCode from "../../../../../global/code/gSubtreeCode";
import subtreeActions from "../actions/subtreeActions";
import gErrorActions from "../../../../../global/actions/gErrorActions";
import gAjaxHeaderCode from "../../../../../global/http/gAjaxHeaderCode";
import { IHttpFetchItem } from "../../../../../interfaces/http/IHttpFetchItem";


const subtreeEffects = {

    saveSubtree: (state: IState): IHttpFetchItem | undefined => {

        if (!state
            || !state.lens.treeTab.lensSubtree
            || !state.lens.treeTab.lensTree) {
            return;
        }

        const subtree: ISubtreeSys = state.lens.treeTab.lensSubtree;

        if (subtree.action === ActionType.CreateSubtree
            && U.isNegativeNumeric(subtree.stRoot.key) === true) {

            // Close the create window
            gTreesCoreActions.setupForSubtreeHub(
                state,
                state.lens.treeTab.lensTree
            );
        }

        const { body, callID }: { body: any, callID: string } = gSubtreeCode.getLoadSubtreeRequestBody(
            state,
            subtree
        );

        const bodyJson: string = JSON.stringify(body);

        let headers = gAjaxHeaderCode.buildHeaders(
            state,
            callID,
            subtree.action
        );

        const url: string = `${state.settings.apiUrl}/Subtree/Save`;

        return gAuthenticatedHttp({
            url: url,
            options: {
                method: "POST",
                headers: headers,
                body: bodyJson
            },
            response: 'json',
            action: subtreeActions.overWriteLensSubtree,
            error: (state: IState, errorDetails: any) => {

                gErrorActions.setLensWarning(
                    state,
                    state.lens.treeTab,
                    `Save subtree failed`,
                );

                return gErrorActions.reportHttpError(
                    state,
                    callID,
                    subtree.tree.token,
                    url,
                    body,
                    subtreeEffects.saveSubtree.name,
                    "Error sending subtree data to the server",
                    errorDetails.stack,
                    errorDetails
                );
            }
        });
    },

    deleteSubtree: (state: IState): IHttpFetchItem | undefined => {

        if (!state.lens.treeTab.lensSubtree) {
            return;
        }

        const subtree: ISubtreeSys = state.lens.treeTab.lensSubtree;
        gSubtreeCode.clearTreeTabSubtree(state);

        const { body, callID }: { body: any, callID: string } = gSubtreeCode.getsubtreeForDELETE(
            state,
            subtree.tree
        );

        const bodyJson: string = JSON.stringify(body);

        let headers = gAjaxHeaderCode.buildHeaders(
            state,
            callID,
            ActionType.DeleteSubtree
        );

        const url: string = `${state.settings.apiUrl}/Subtree`;

        return gAuthenticatedHttp({
            url: url,
            options: {
                method: "DELETE",
                headers: headers,
                body: bodyJson
            },
            response: 'json',
            action: subtreeActions.deleteLensSubtree,
            error: (state: IState, errorDetails: any) => {

                gErrorActions.setLensWarning(
                    state,
                    state.lens.treeTab,
                    `Delete subtree failed`,
                );

                return gErrorActions.reportHttpError(
                    state,
                    callID,
                    subtree.tree.token,
                    url,
                    body,
                    subtreeEffects.deleteSubtree.name,
                    "Error sending subtree data to the server",
                    errorDetails.stack,
                    errorDetails
                );
            }
        });
    }
};

export default subtreeEffects;
