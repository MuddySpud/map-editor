
import { gAuthenticatedHttp } from "../../../../../global/http/gAuthenticationHttp";

import IState from "../../../../../interfaces/state/IState";
import gErrorActions from "../../../../../global/actions/gErrorActions";
import gBranchTreeTaskCode from "../../../../../global/code/gBranchTreeTaskCode";
import gBranchToSubtreeActions from "../../../../../global/actions/gBranchToSubtreeActions";
import U from "../../../../../global/gUtilities";
import gAjaxHeaderCode from "../../../../../global/http/gAjaxHeaderCode";
import { IHttpFetchItem } from "../../../../../interfaces/http/IHttpFetchItem";


const branchToSubtreeEffects = {

    convertBranchToSubtree: (state: IState): IHttpFetchItem | undefined => {

        if (!state) {
            return;
        }

        if (!state
            || !state.lens.nodeTab.lensBranchTreeTask
            || U.isNullOrWhiteSpace(state.lens.nodeTab.lensBranchTreeTask?.subtreeLoader.subtree.tree.key) === true) {
            return;
        }

        const { body, callID }: { body: any, callID: string } = gBranchTreeTaskCode.getBranchTreeRequestBody(
            state,
            state.lens.nodeTab.lensBranchTreeTask
        );

        const bodyJson: string = JSON.stringify(body);

        let headers = gAjaxHeaderCode.buildHeaders(
            state,
            callID,
            state.lens.nodeTab.lensBranchTreeTask.action
        );

        const url: string = `${state.settings.apiUrl}/Branch/ToSubtree`;

        return gAuthenticatedHttp({
            url: url,
            options: {
                method: "POST",
                headers: headers,
                body: bodyJson
            },
            response: 'json',
            action: gBranchToSubtreeActions.overwriteBranchWithSubtree,
            error: (state: IState, errorDetails: any) => {

                gErrorActions.setLensWarning(
                    state,
                    state.lens.nodeTab,
                    `Branch to subtree failed`,
                );

                return gErrorActions.reportHttpError(
                    state,
                    callID,
                    state.branchesState.tree.token,
                    url,
                    body,
                    branchToSubtreeEffects.convertBranchToSubtree.name,
                    "Error sending convert branch to subtree data to the server",
                    errorDetails.stack,
                    errorDetails
                );
            }
        });
    }
};

export default branchToSubtreeEffects;
