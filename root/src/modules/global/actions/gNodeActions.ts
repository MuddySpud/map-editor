import IState from "../../interfaces/state/IState";
import IStateAnyArray from "../../interfaces/state/IStateAnyArray";
import INode from "../../interfaces/state/tree/INode";
import U from "../gUtilities";
import IBranchUI from "../../interfaces/state/ui/UIs/IBranchUI";
import gStateCode from "../code/gStateCode";
import gNodeAltsEffects from "../effects/gNodeAltsEffects";
import { NotificationType } from "../../interfaces/enums/NotificationType";
import gNodeCode from "../code/gNodeCode";
import INodeBase from "../../interfaces/state/tree/INodeBase";
import gStageCode from "../code/gStageCode";
import gDialogueCode from "../code/gDialogueCode";
import { DialogueType } from "../../interfaces/enums/DialogueType";
import { DelegateType } from "../../interfaces/enums/DelegateType";
import { NodeType } from "../../interfaces/enums/NodeType";
import gBranchesStateCode from "../code/gBranchesStateCode";
import gMapSocketActions from "./gMapSocketActions";
import { DisplayType } from "../../interfaces/enums/DisplayType";
import gHubActions from "../hubs/gHubActions";
import gTimedEffects from "../effects/gTimedEffects";
import NodeKeyValidation from "../../state/ui/NodeKeyValidation";
import INodeKeyValidation from "../../interfaces/state/ui/INodeKeyValidation";
import ITokenKey from "../../interfaces/state/ui/payloads/ITokenKey";
import gBranchTreeTaskCode from "../code/gBranchTreeTaskCode";
import gSocketTaskCode from "../code/gSocketTaskCode";
import gTreeStatsActions from "./gTreeStatsActions";
import gLinkCode from "../code/gLinkCode";


const gNodeActions = {

    completeNodeSelection: (
        state: IState,
        nodeType?: NodeType): IStateAnyArray => {

        // Hide all menu controls and dummies
        gBranchesStateCode.hideAllBranchUIControls(state);
        gBranchesStateCode.hideAllDummyControls(state);

        // Remove all other node lenses and behaviours
        gBranchTreeTaskCode.clearBranchTreeTaskExtended(state); // Added clear branch tree task to clear tree task
        gSocketTaskCode.clearSocketTask(state);
        gBranchesStateCode.clearNodeLensBehaviours(state);

        // Mark node as selected
        const current: INode<IBranchUI> = state.branchesState.current as INode<IBranchUI>;
        gBranchesStateCode.deselectAllNodes(state);
        current.ui.selected = true;

        // Otherwise...
        if (current.isSocket === true) {

            return gMapSocketActions.completeEditSetup(state);
        }
        else if (U.isNullOrWhiteSpace(current.discussion) === true
            && !current.isStashRoot
            && current.isSocket === false) {

            gNodeCode.expandDummy(current);
        }

        // Open lens
        gBranchesStateCode.setLensNodeForUpdate(
            state,
            nodeType
        );

        if (current.isLink === true
            && current.link) {

            gStateCode.AddReLoadDataEffectImmediate(
                state,
                `refreshNodeTreeStats`,
                current.link.tree.token,
                `${state.settings.apiUrl}/Tree/Stats`,
                gNodeCode.getRefreshNodeTreeStatsRequestBody,
                gTreeStatsActions.refreshNodeTreeStats
            );
        }

        if (!current.isStashRoot
            && !current.case.alts) {

            return [
                gStateCode.cloneState(state),
                gNodeAltsEffects.loadAlts(state)
            ];
        }

        // Otherwise return just the cloned state
        return gStateCode.cloneState(state);
    },

    confirmRefreshLensNode: (state: IState): IState => {

        const same = gNodeCode.checkNodesMatch(
            state.lens.nodeTab.lensNode as INodeBase,
            state.branchesState.selected as INodeBase
        );

        if (same) {

            return gNodeActions.refreshLensNode(state);
        }

        gDialogueCode.buildDialogue(
            state,
            DialogueType.Confirm,
            gNodeActions.refreshLensNode,
            DelegateType.Action,
            "Confirm refresh lens",
            "There are unsaved changes are you sure you want to discard them and refresh the lens?");

        return gStateCode.cloneState(state);
    },

    refreshLensNode: (state: IState): IState => {

        if (!state
            || !state.lens.nodeTab.lensNode) {

            return state;
        }

        const same = gNodeCode.checkNodesMatch(
            state.lens.nodeTab.lensNode as INodeBase,
            state.branchesState.selected as INodeBase
        );

        let text = `No changes had been made, so no data was discarded.`;

        if (!same) {
            text = `Changes had been made and were discarded.`;
        }

        gBranchesStateCode.buildLensNode(state);
        state.lens.nodeTab.stageBehaviour = gStageCode.buildStages(state);

        gStateCode.addNotification(
            state,
            `Lens refreshed`,
            text,
            state.branchesState.tree.token,
            NotificationType.Info
        );

        return gStateCode.cloneState(state);
    },

    processNodeKeyValidation: (
        state: IState,
        response: any): IState => {

        if (!state
            || !response?.jsonData) {

            return state;
        }

        const nodeKeyValidation: INodeKeyValidation = new NodeKeyValidation();
        nodeKeyValidation.success = response.jsonData.success;
        nodeKeyValidation.key = response.jsonData.key;
        nodeKeyValidation.token = response.jsonData.token;
        state.lens.validationResults.nodeKey = nodeKeyValidation;

        return gStateCode.cloneState(state);
    },

    showSelectedNode: (state: IState): IState => {

        const selected: INode<IBranchUI> = state.branchesState.selected as INode<IBranchUI>;
        gNodeCode.expandChildren(selected);
        selected.ui.showNode = true;
        let node = selected.parent;

        while (node) {

            gNodeCode.expandChildren(node);
            node = node.parent;
        }

        state.displayType = DisplayType.Branches;

        return gStateCode.cloneState(state);
    },

    showAndSelectNode: (
        state: IState,
        target: INodeBase): IStateAnyArray => {

        if (!state
            || U.isPositiveNumeric(target.key) === false
            || U.isNullOrWhiteSpace(target.token) === true) {

            return state;
        }

        const found: INode<IBranchUI> | null = gNodeCode.showNode(
            state,
            target.token as string,
            target.key as string
        );

        if (!found) {

            return gHubActions.initialiseFocusedBranchesDisplay(
                state,
                target.token as string,
                target.key as string);
        }

        return gHubActions.selectNode(
            state,
            found);
    },

    showOption: (
        state: IState,
        target: INodeBase): IStateAnyArray => {

        if (!state
            || U.isPositiveNumeric(target.key) === false
            || U.isNullOrWhiteSpace(target.token) === true) {

            return state;
        }

        const found: INode<IBranchUI> | null = gNodeCode.showNode(
            state,
            target.token as string,
            target.key as string,
            true
        );

        if (!found) {

            return gHubActions.initialiseFocusedBranchesDisplay(
                state,
                target.token as string,
                target.key as string);
        }

        state.branchesState.registered.forEach((node: INode<IBranchUI>) => {

            if (node.key !== target.key) {

                node.ui.highlightTime = 0;
                node.ui.showNode = false;
                node.ui.showOption = false;
            }
        });

        if (found.ui.highlightTime > 0) {

            found.ui.highlightTime = 0;

            return gStateCode.cloneState(state);
        }

        found.ui.highlightTime = Date.now() + state.settings.highlightTime;

        return [
            gStateCode.cloneState(state),
            gTimedEffects.runDelayedAction(
                state.settings.highlightTime,
                gNodeActions.removeHighlight
            )
        ];
    },

    removeHighlight: (state: IState): IState => {

        let reset: boolean = false;
        let now: number = Date.now();

        state.branchesState.registered.forEach((node: INode<IBranchUI>) => {

            if (node.ui.highlightTime > 0
                && node.ui.highlightTime < now) {

                node.ui.highlightTime = 0;
                reset = true;
            }
        });

        if (!reset) {
            return state;
        }

        return gStateCode.cloneState(state);
    },

    openNodeWithKey: (
        state: IState,
        node: INodeBase): IState => {

        return gNodeActions.openNodeWithTokenAndKey(
            state,
            node.token,
            node.key
        );
    },

    openNodeWithTokenKey: (
        state: IState,
        tokenKey: ITokenKey): IState => {

        return gNodeActions.openNodeWithTokenAndKey(
            state,
            tokenKey.token,
            tokenKey.key
        );
    },

    openNodeWithTokenAndKey: (
        state: IState,
        token: string | null,
        key: string | null): IState => {

        if (U.isNullOrWhiteSpace(token) === false
            && U.isPositiveNumeric(key) === true) {

            const url: string = gLinkCode.buildLink(
                state,
                `author/node/${token}/${key}`
            );
    
            window.open(url, "_blank");
        }

        return state;
    },

    overWriteRefreshedNode: (
        state: IState,
        response: any): IState => {

        if (!response?.jsonData) {

            return state;
        }

        return gNodeActions.overWriteNode(
            state,
            response.jsonData,
            'Node refreshed'
        );
    },

    overWriteLoadedNode: (
        state: IState,
        response: any): IState => {

        if (!response?.jsonData) {

            return state;
        }

        return gNodeActions.overWriteNode(
            state,
            response.jsonData,
            'Node saved');
    },

    overWriteNode: (
        state: IState,
        rawNode: any,
        notice: string): IState => {

        if (!rawNode) {

            return state;
        }

        state.lens.nodeTab.saveLock = false;

        const loadedNode: INode<IBranchUI> | null = gBranchesStateCode.findAndReLoadRegisteredNode(
            state,
            rawNode);

        if (loadedNode) {

            gNodeActions.refreshLensNode(state);
            loadedNode.ui.branchViewNodeControls = false;
            loadedNode.ui.dummy = false;

            gStateCode.addNotification(
                state,
                notice,
                `Key: ${loadedNode.key},
Option: ${loadedNode.option},
Discussion: ${loadedNode.discussion}.`,
                loadedNode.token,
                NotificationType.Info
            );
        }

        state.lens.nodeTab.enableSave = true;

        return gStateCode.cloneState(state);
    }
};

export default gNodeActions;
