import IState from "../../../interfaces/state/IState";
import IStateAnyArray from "../../../interfaces/state/IStateAnyArray";
import gStateCode from "../../../global/code/gStateCode";
import gAuthenticationActions from "../../../global/http/gAuthenticationActions";
import { IHttpFetchItem } from "../../../interfaces/http/IHttpFetchItem";
import IHttpAuthenticatedProps from "../../../interfaces/http/IHttpAuthenticatedProps";
import IHttpAuthenticatedPropsBlock from "../../../interfaces/http/IHttpAuthenticatedPropsBlock";
import { gSequentialHttp } from "../../../global/http/gHttp";
import subscriptionsInitState from "../../core/treeSolveSubscriptionsCore/code/subscriptionsInitState";
import U from "../../../global/gUtilities";
import branchesInitState from "../../core/branchesCore/code/branchesInitState";
import treesInitState from "../../core/treesCore/code/treesInitState";


const initActions = {

    intro: (state: IState): IState => {

        // Do nothing so far
        return gStateCode.cloneState(state);
    },

    initialiseWithAuthorisation: (state: IState): IStateAnyArray => {

        // If authentication doesn't work you need to go to identity server in another tab
        // This site will be blocked because of the self cert.
        // Click advanced etc to allow the cert
        // Then relaunch this site and it should work
        // alert('Test');

        const pathArray: string[] = window.location.pathname.split('/');

        if (pathArray
            && pathArray.length > 2) {

            state.subscriptionState.subscriptionID = pathArray[2];
        }

        const effects: Array<IHttpAuthenticatedPropsBlock> = [];
        const httpFetchItem: IHttpFetchItem | undefined = gAuthenticationActions.checkUserLoggedInProps(state);

        // Collect just the properties from the effects, discarding the Http
        // Then rebuild them at the first level with sequentialHttp instead

        if (httpFetchItem) {

            const props: IHttpAuthenticatedProps = httpFetchItem[1];
            effects.push(props);
        }

        if (U.isNullOrWhiteSpace(state.subscriptionState.subscriptionID)) {

            // Need to display the databases the user can connect to.
            // If there is only one need to connect to that one
            const httpFetchItem: IHttpFetchItem | undefined = subscriptionsInitState.initialiseSubscriptionsDisplayProps(state);

            if (httpFetchItem) {

                const props: IHttpAuthenticatedProps = httpFetchItem[1];
                effects.push(props);
            }

            return [
                state,
                gSequentialHttp(effects)
            ];
        }

        if (pathArray
            && pathArray.length > 2
            && pathArray[1] === "ed") {

            // pathArray[2] should be the subscription

            if (pathArray
                && pathArray.length === 6
                && pathArray[3] === "author"
                && pathArray[4] === "tree"
                && U.isNumeric(pathArray[5])) {

                const treeKey = pathArray[5];

                const httpFetchItems: Array<IHttpFetchItem | undefined> = branchesInitState.initialiseBranchesDisplayAndShowTreeProps(
                    state,
                    treeKey
                );

                if (httpFetchItems) {

                    const propsList: Array<IHttpAuthenticatedProps> = [];

                    httpFetchItems.forEach((httpFetchItem: IHttpFetchItem | undefined) => {

                        if (httpFetchItem) {

                            const props: IHttpAuthenticatedProps = httpFetchItem[1];
                            propsList.push(props);
                        }
                    });

                    effects.push(propsList);
                }
            }
            else if (pathArray
                && pathArray.length === 7
                && pathArray[3] === "author"
                && pathArray[4] === "node"
                && U.isNumeric(pathArray[6])) {

                const treeToken: string = pathArray[5];
                const nodeKey: string = pathArray[6];

                const httpFetchItem: IHttpFetchItem | undefined = branchesInitState.initialiseFocusedBranchesDisplayProps(
                    state,
                    treeToken,
                    nodeKey
                );

                if (httpFetchItem) {

                    const props: IHttpAuthenticatedProps = httpFetchItem[1];
                    effects.push(props);
                }
            }
            else if (pathArray
                && pathArray.length === 5
                && pathArray[3] === "author"
                && pathArray[4] === "trees") {

                const httpFetchItem: IHttpFetchItem | undefined = treesInitState.initialiseTreesDisplayProps(state);

                if (httpFetchItem) {

                    const props: IHttpAuthenticatedProps = httpFetchItem[1];
                    effects.push(props);
                }
            }
        }
        else {
            const httpFetchItem: IHttpFetchItem | undefined = treesInitState.initialiseTreesDisplayProps(state);

            if (httpFetchItem) {

                const props: IHttpAuthenticatedProps = httpFetchItem[1];
                effects.push(props);
            }
        }

        return [
            state,
            gSequentialHttp(effects)
        ];
    },

    initialiseWithoutAuthorisation: (state: IState): IStateAnyArray => {

        // If authentication doesn't work you need to go to identity server in another tab
        // This site will be blocked because of the self cert.
        // Click advanced etc to allow the cert
        // Then relaunch this site and it should work
        // alert('Test');

        const pathArray: string[] = window.location.pathname.split('/');

        if (pathArray
            && pathArray.length > 2) {
                
            state.subscriptionState.subscriptionID = pathArray[2];
        }

        if (U.isNullOrWhiteSpace(state.subscriptionState.subscriptionID)) {

            // Need to display the databases the user can connect to.
            // If there is only one need to connect to that one
            return subscriptionsInitState.initialiseSubscriptionsDisplay(state);
        }

        if (pathArray
            && pathArray.length > 2
            && pathArray[1] === "ed") {

            // pathArray[2] should be the subscription

            if (pathArray
                && pathArray.length === 6
                && pathArray[3] === "author"
                && pathArray[4] === "tree"
                && U.isNumeric(pathArray[5])) {

                const treeKey = pathArray[5];

                return branchesInitState.initialiseBranchesDisplayAndShowTree(
                    state,
                    treeKey
                );
            }
            else if (pathArray
                && pathArray.length === 7
                && pathArray[3] === "author"
                && pathArray[4] === "node"
                && U.isNumeric(pathArray[6])) {

                const treeToken: string = pathArray[5];
                const nodeKey: string = pathArray[6];

                return branchesInitState.initialiseFocusedBranchesDisplay(
                    state,
                    treeToken,
                    nodeKey
                );
            }
            else if (pathArray
                && pathArray.length === 5
                && pathArray[3] === "author"
                && pathArray[4] === "trees") {

                return treesInitState.initialiseTreesDisplay(state);
            }
        }

        return treesInitState.initialiseTreesDisplay(state);
    }
};

export default initActions;
