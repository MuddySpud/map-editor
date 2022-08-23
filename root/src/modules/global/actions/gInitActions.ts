import IState from "../../interfaces/state/IState";
import IStateAnyArray from "../../interfaces/state/IStateAnyArray";
import IBranchUI from "../../interfaces/state/ui/UIs/IBranchUI";
import gStateCode from "../code/gStateCode";
import gSettingsCode from "../code/gSettingsCode";
import INode from "../../interfaces/state/tree/INode";
import gInitialiseTree from "../code/gInitialiseTree";
import gViewCode from "../code/gViewCode";
import gViewSettingsCode from "../code/gViewSettingsCode";
import gRootCode from "../code/gRootCode";
import gHubActions from "../hubs/gHubActions";
import gStashCode from "../code/gStashCode";
import gBranchViewTreeCode from "../code/gBranchViewTreeCode";
import { NotificationType } from "../../interfaces/enums/NotificationType";
import gViewEffects from "../effects/gViewEffects";
import gProjectCode from "../code/gProjectCode";


const gInitActions = {

    loadViewOrBuildFresh: (
        state: IState,
        response: any): IStateAnyArray => {

        if (!response?.jsonData) {

            return state;
        }

        try {

            const rTree: any = response.jsonData.tree;
            const rSettings: any = response.jsonData.settings;
            const rViewSettings: any = response.jsonData.viewSettings;
            const rLoadedNodes: any = response.jsonData.loadedNodes;
            const rStashedNodes: any = response.jsonData.stashedNodes;

            gBranchViewTreeCode.loadTree(
                state,
                rTree);

            gSettingsCode.loadSettings(
                state,
                rSettings);

            gViewSettingsCode.loadViewSettings(
                state,
                rViewSettings);

            const loadedNodes: Array<INode<IBranchUI>> = gViewCode.loadNodesAndReplaceRegistered(
                state,
                rLoadedNodes);

            gStashCode.loadStashedNodes(
                state,
                rStashedNodes);

            let selected: INode<IBranchUI> | null = gInitialiseTree.buildTree(
                state,
                loadedNodes);

            gRootCode.checkRootLoaded(state);
            state.loading = false;

            if (selected) {

                return gHubActions.selectNode(
                    state,
                    selected);
            }
        }
        catch (error: any) {

            const message: string = `ERROR in ${gInitActions.loadViewOrBuildFresh.name}
errorStack: ${error.stack}

Do you want to clear the view and re-load?`;

            gStateCode.addNotification(
                state,
                "Error getting tree init data from the server",
                message,
                state.branchesState.tree.token,
                NotificationType.ErrorAndAction,
                gViewEffects.clearLiveAndReload);
        }

        return gStateCode.cloneState(state);
    },

    loadProjectOrBuildFresh: (
        state: IState,
        response: any): IStateAnyArray => {

        if (!response?.jsonData) {

            return state;
        }

        gProjectCode.loadTree(
            state,
            response.jsonData
        );

        state.loading = false;

        return gStateCode.cloneState(state);
    }
};

export default gInitActions;
