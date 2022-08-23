import IState from "../../interfaces/state/IState";
import gNodeAltsCode from "./gNodeAltsCode";
import gBranchTaskCode from "./gBranchTaskCode";
import gBranchTreeTaskCode from "./gBranchTreeTaskCode";
import { StageTitle } from "../../interfaces/enums/StageTitle";
import gSearchCode from "./gSearchCode";
import gBranchesStateCode from "./gBranchesStateCode";
import gNotificationCode from "./gNotificationCode";
import gValidationCode from "./gValidationCode";
import gTreeCode from "./gTreeCode";
import gShapeCode from "./gShapeCode";
import gSpreadCode from "./gSpreadCode";
import gHistoryCode from "./gHistoryCode";
import gTagsCode from "./gTagsCode";
import gSettingsCode from "./gSettingsCode";
import gViewSettingsCode from "./gViewSettingsCode";
import IRequest from "../../interfaces/state/notifications/IRequest";
import { ActionType } from "../../interfaces/enums/ActionType";
import U from "../gUtilities";
import gSubtreeCode from "./gSubtreeCode";
import gSocketTaskCode from "./gSocketTaskCode";
import Tree from "../../state/tree/Tree";
import IBranchUI from "../../interfaces/state/ui/UIs/IBranchUI";
import BranchUI from "../../state/ui/UIs/BranchUI";
import { DisplayType } from "../../interfaces/enums/DisplayType";
import gFilterCode from "./gFilterCode";
import { TabType } from "../../interfaces/enums/TabType";
import gBotCode from "./gBotCode";


const clearNodeTab = (state: IState): void => {

    gBranchesStateCode.clearLensNode(state);
    gBranchTaskCode.clearBranchTask(state);
    gBranchTreeTaskCode.clearBranchTreeTaskOnly(state);
    gBranchesStateCode.clearNodeLensBehaviours(state);
    gSocketTaskCode.clearSocketTask(state);
};

const gLensCode = {

    isLensNodeDirty: (state: IState): string => {

        if (gBranchesStateCode.isLensNodeDirty(state) === true) {

            return "There are unsaved node changes";
        }

        if (gNodeAltsCode.isLensAltsDirty(state) === true) {

            return "There are unsaved node alts changes";
        }

        if (gBranchTaskCode.isLensBranchTaskDirty(state) === true) {

            const stageName: StageTitle = state.lens.nodeTab.stageBehaviour.stages.name;

            if (stageName === StageTitle.LensCloneBranch) {

                return "There are unsaved clone option changes";
            }
            else if (stageName === StageTitle.LensMoveBranch) {

                return "There are unsaved move option changes";
            }
            else if (stageName === StageTitle.LensStashBranch) {

                return "There is an incomplete stash action";
            }
            else {
                return "";
            }
        }

        if (gBranchTreeTaskCode.isLensBranchTreeTaskDirty(state) === true) {

            return "There are unsaved branch to subtree changes";
        }

        if (gSocketTaskCode.isLensSocketTaskDirty(state) === true) {

            return "There are unsaved option mapping to socket changes";
        }

        return "";
    },

    isLensTreeTabDirty: (state: IState): string => {

        if (gTreeCode.isLensTreeDirty(state) === true) {

            return "There are unsaved tree changes";
        }

        if (gSubtreeCode.isLenSubtreeDirty(state) === true) {

            return "There are unsaved subtree changes";
        }

        return "";
    },

    isLensBotTabDirty: (state: IState): string => {

        if (gBotCode.isLensBotDirty(state) === true) {

            return "There are unsaved bot changes";
        }

        return "";
    },

    clearTab: (
        state: IState,
        tabType: TabType): void => {

        if (tabType === TabType.Tree) {

            gTreeCode.clearTreeTab(state);
        }
        else if (tabType === TabType.Bot) {

            gBotCode.clearBotTab(state);
        }
        else if (tabType === TabType.Node) {

            clearNodeTab(state);
        }
        else if (tabType === TabType.Settings) {

            gSettingsCode.clearSettingsTab(state);
        }
        else if (tabType === TabType.UserViews) {

            gViewSettingsCode.clearViewSettingsTab(state);
        }
        else if (tabType === TabType.Search) {

            gSearchCode.clearSearchTab(state);
        }
        else if (tabType === TabType.Filter) {

            gFilterCode.clearFilterTab(state);
        }
        else if (tabType === TabType.History) {

            gHistoryCode.clearHistoryTab(state);
        }
        else if (tabType === TabType.Shape) {

            gShapeCode.clearShapeTab(state);
        }
        else if (tabType === TabType.Spread) {

            gSpreadCode.clearSpreadTab(state);
        }
        else if (tabType === TabType.Tags) {

            gTagsCode.clearTagsTab(state);
        }
        else if (tabType === TabType.Validation) {

            gValidationCode.clearValidationsTab(state);
        }
        else if (tabType === TabType.Alerts) {

            gNotificationCode.clearNotificationsTab(state);
        }
    },

    clearAndCloseMainLensTabs: (state: IState): void => {

        clearNodeTab(state);
        gSettingsCode.clearSettingsTab(state);
        gViewSettingsCode.clearViewSettingsTab(state);
        gSearchCode.clearSearchTab(state);
        gNotificationCode.clearNotificationsTab(state);
        gTreeCode.clearTreeTab(state);
        gBotCode.clearBotTab(state);

        gLensCode.clearChildTreeTabs(state);
    },

    clearAndCloseAllLensTabs: (state: IState): void => {

        gFilterCode.clearFilterTab(state);
        gLensCode.clearAndCloseMainLensTabs(state);
    },

    clearChildTreeTabs: (
        state: IState,
        treeKey: string | null = null): void => {

        if (treeKey !== null
            && state.lens.treeTab.lensTree?.key === treeKey) {
            return;
        }

        gValidationCode.clearValidationsTab(state);
        gShapeCode.clearShapeTab(state);
        gSpreadCode.clearSpreadTab(state);
        gHistoryCode.clearHistoryTab(state);
        gTagsCode.clearTagsTab(state);

        state.status.tooltip = '';
    },

    clearChildTabsAfterTreeDelete: (
        state: IState,
        treeKey: string | null = null): void => {

        if (treeKey !== null
            && state.branchesState.tree.key === treeKey) {

            clearNodeTab(state);
            gSearchCode.clearSearchTab(state);
            state.branchesState.tree = new Tree<IBranchUI>(BranchUI);
            state.displayType = DisplayType.Trees;
        }

        if (treeKey !== null
            && state.lens.treeTab.lensTree?.key === treeKey) {

            gTreeCode.clearTreeTab(state);
            gValidationCode.clearValidationsTab(state);
            gShapeCode.clearShapeTab(state);
            gSpreadCode.clearSpreadTab(state);
            gHistoryCode.clearHistoryTab(state);
            gTagsCode.clearTagsTab(state);
        }

        state.status.tooltip = '';
    },

    minimiseLens: (state: IState): void => {

        state.status.tooltip = '';
        state.lens.minimised = true;
    },

    maximiseLens: (state: IState): boolean => {

        const minimised: boolean = state.lens.minimised;
        state.status.tooltip = '';
        state.lens.minimised = false;

        return minimised;
    },

    checkResponse: (
        state: IState,
        responseJson: any): void => {

        const callID: string = responseJson.callID;

        if (U.isNullOrWhiteSpace(callID) === true) {

            throw new Error("CallID was empty.");
        }

        const requests: Array<IRequest> = state.treesState.openRequests;
        const lastIndex: number = requests.length - 1;
        let i: number = lastIndex;
        let request: IRequest | null = null;
        let success: boolean = false;

        for (; i >= 0; i--) {

            request = requests[i];

            if (request.callID === callID) {

                success = true;

                break;
            }
        }

        if (success === true
            && request) {

            requests.splice(i, 1);
            state.treesState.closedRequests.push(request);
        }
        else {
            throw new Error(`Request with callID: ${callID}, could not be found.`);
        }

        // for some types of actions guid must match last request
        if (request.action === ActionType.GetTree
            || request.action === ActionType.CreateTree
            || request.action === ActionType.UpdateTree
            || request.action === ActionType.UpdateSubtree
            || request.action === ActionType.CreateSubtree) {

            if (i !== lastIndex) {

                throw new Error("The request should have been the last in the list.");
            }
        }
    },

    checkBotDraftResponse: (
        state: IState,
        responseJson: any): void => {

        const callID: string = responseJson.callID;

        if (U.isNullOrWhiteSpace(callID) === true) {

            throw new Error("CallID was empty.");
        }

        const requests: Array<IRequest> = state.botsState.draftsState.openRequests;
        const lastIndex: number = requests.length - 1;
        let i: number = lastIndex;
        let request: IRequest | null = null;
        let success: boolean = false;

        for (; i >= 0; i--) {

            request = requests[i];

            if (request.callID === callID) {

                success = true;

                break;
            }
        }

        if (success === true
            && request) {

            requests.splice(i, 1);
            state.botsState.draftsState.closedRequests.push(request);
        }
        else {
            throw new Error(`Request with callID: ${callID}, could not be found.`);
        }

        // for some types of actions guid must match last request
        if (request.action === ActionType.GetDraft) {

            if (i !== lastIndex) {

                throw new Error("The request should have been the last in the list.");
            }
        }
    },

    checkBotAliasResponse: (
        state: IState,
        responseJson: any): void => {

        const callID: string = responseJson.callID;

        if (U.isNullOrWhiteSpace(callID) === true) {

            throw new Error("CallID was empty.");
        }

        const requests: Array<IRequest> = state.botsState.aliasesState.openRequests;
        const lastIndex: number = requests.length - 1;
        let i: number = lastIndex;
        let request: IRequest | null = null;
        let success: boolean = false;

        for (; i >= 0; i--) {

            request = requests[i];

            if (request.callID === callID) {

                success = true;

                break;
            }
        }

        if (success === true
            && request) {

            requests.splice(i, 1);
            state.botsState.aliasesState.closedRequests.push(request);
        }
        else {
            throw new Error(`Request with callID: ${callID}, could not be found.`);
        }

        // for some types of actions guid must match last request
        if (request.action === ActionType.GetAlias
            || request.action === ActionType.CreateAlias
            || request.action === ActionType.UpdateAlias) {

            if (i !== lastIndex) {

                throw new Error("The request should have been the last in the list.");
            }
        }
    }
};

export default gLensCode;

