import IState from "../../../../../interfaces/state/IState";
import INode from "../../../../../interfaces/state/tree/INode";
import ILensUI from "../../../../../interfaces/state/ui/UIs/ILensUI";
import gStateCode from "../../../../../global/code/gStateCode";
import INodeBase from "../../../../../interfaces/state/tree/INodeBase";
import { NotificationType } from "../../../../../interfaces/enums/NotificationType";
import gNodeCode from "../../../../../global/code/gNodeCode";
import { ActionType } from "../../../../../interfaces/enums/ActionType";
import gNotificationCode from "../../../../../global/code/gNotificationCode";
import nodeEffects from "../effects/nodeEffects";
import { DialogueType } from "../../../../../interfaces/enums/DialogueType";
import { DelegateType } from "../../../../../interfaces/enums/DelegateType";
import { NodeType } from "../../../../../interfaces/enums/NodeType";
import U from "../../../../../global/gUtilities";
import gOptionCode from "../../../../../global/code/gOptionCode";
import gSearchCode from "../../../../../global/code/gSearchCode";
import gDialogueCode from "../../../../../global/code/gDialogueCode";
import gBranchesStateCode from "../../../../../global/code/gBranchesStateCode";
import gTabCode from "../../../../../global/code/gTabCode";
import gLensCode from "../../../../../global/code/gLensCode";
import gTreeCode from "../../../../../global/code/gTreeCode";
import IStateAnyArray from "../../../../../interfaces/state/IStateAnyArray";
import gNodeActions from "../../../../../global/actions/gNodeActions";
import { TabType } from "../../../../../interfaces/enums/TabType";
import gFileCode from "../../../../../global/code/gFileCode";
import WayPoint from "../../../../../state/tree/WayPoint";


const saveSubtreeAndLinkNodeEffectWrapper = (state: IState): IStateAnyArray => {

    return wrapEffectInAction(
        state,
        nodeEffects.saveSubtreeAndLinkNode
    );
};

const saveNodeEffectWrapper = (state: IState): IStateAnyArray => {

    return wrapEffectInAction(
        state,
        nodeEffects.saveNode
    );
};

const deleteNodeEffectWrapper = (state: IState): IStateAnyArray => {

    if (!state
        || !state.lens.nodeTab.lensNode) {

        return gStateCode.cloneState(state);
    }

    gNodeCode.setNodeAndChildrenAsDelete(
        state,
        state.lens.nodeTab.lensNode);

    return wrapEffectInAction(
        state,
        nodeEffects.deleteNode
    );
};

const wrapEffectInAction = (
    state: IState,
    saveEffectDelegate: (state: IState) => any): IStateAnyArray => {

    gTreeCode.setLensTreeNodeChanges(state);

    return [
        gStateCode.cloneState(state),
        saveEffectDelegate(state)
    ];
};

const saveSubtreeAndLinkNode = (
    state: IState,
    node: INode<ILensUI>,
    confirmMessage: string,
    saveActionDelegate: (state: IState) => IStateAnyArray): IState => {

    if (!gTabCode.canSave(state.lens.nodeTab)) {

        return gStateCode.cloneState(state);
    }

    state.lens.nodeTab.saveLock = true;
    const isDirty: boolean = gBranchesStateCode.isLensNodeDirty(state);

    if (!isDirty) {

        return state;
    }

    const selected: INodeBase = state.branchesState.selected as INodeBase;

    if (node.type === NodeType.Solution
        && node.nodes.length === 1) {
        // Check if the node is a blank node, if it is remove it.
        const isBlank: boolean = gOptionCode.isDeleteBlankOption(node.nodes[0]);

        if (isBlank) {

            node.nodes = [];
        }
    }

    gNodeCode.checkNodesAndSetActions(
        node,
        selected
    );

    if (node.action !== ActionType.CreateNode
        && node.action !== ActionType.UpdateNode
        && node.action !== ActionType.CreateSubtreeLink
        && node.action !== ActionType.CreateSubtreeAndLink
        && node.action !== ActionType.UpdateSubtreeLink) {

        alert(`The node action type: ${node.action} has not been coded for yet...`);
    }

    if (gBranchesStateCode.validateLensNode(state)) {

        gFileCode.markAllOptionFilesAsDetach(node);

        window.TreeSolve.discussionPlugins.toJson(
            state,
            node);

        window.TreeSolve.optionsPlugins.toJson(
            state,
            node);

        gDialogueCode.buildDialogue(
            state,
            DialogueType.Confirm,
            saveActionDelegate,
            DelegateType.Action,
            "Confirm save",
            confirmMessage);
    }
    else {
        gNotificationCode.buildNodeValidationFailedNotification(state);
    }

    return gStateCode.cloneState(state);
};

const nodeActions = {

    toggleSolution: (state: IState): IState => {

        const lensNode: INode<ILensUI> = state.lens.nodeTab.lensNode as INode<ILensUI>;
        lensNode.errors = [];

        if (lensNode.type === NodeType.Solution) {

            return nodeActions.setDiscussion(state);
        }
        else if (lensNode.type === NodeType.Discussion) {

            gDialogueCode.buildDialogue(
                state,
                DialogueType.Confirm,
                nodeActions.setSolution,
                DelegateType.Action,
                "Confirm set as solution",
                "Changing this to a Solution will delete all options on save, are you sure?");

            return gStateCode.cloneState(state);
        }

        return state;
    },

    setSolution: (state: IState): IState => {

        const lensNode: INode<ILensUI> = state.lens.nodeTab.lensNode as INode<ILensUI>;
        lensNode.type = NodeType.Solution;
        lensNode.ui.raw = false;

        // If a solution then remove all options...
        lensNode.nodes.forEach((option: INodeBase) => {

            option.action = ActionType.DeleteNode;
        });

        return gStateCode.cloneState(state);
    },

    setDiscussion: (state: IState): IState => {

        const lensNode: INode<ILensUI> = state.lens.nodeTab.lensNode as INode<ILensUI>;
        lensNode.type = NodeType.Discussion;
        lensNode.ui.raw = false;

        // If a solution then remove all options...
        lensNode.nodes.forEach((option: INodeBase) => {

            if (U.isNegativeNumeric(option.key) === true) {

                option.action = ActionType.CreateNode;
            }
            else {
                option.action = ActionType.None; // will work it out during validation...
            }
        });

        return gStateCode.cloneState(state);
    },

    toggleEntryPoint: (state: IState): IState => {

        const lensNode: INode<ILensUI> = state.lens.nodeTab.lensNode as INode<ILensUI>;
        lensNode.isEntry = lensNode.isEntry !== true;
        lensNode.ui.raw = false;

        return gStateCode.cloneState(state);
    },

    toggleWayPoint: (state: IState): IState => {

        const lensNode: INode<ILensUI> = state.lens.nodeTab.lensNode as INode<ILensUI>;

        if (lensNode.reserve.wayPoint) {

            lensNode.reserve.wayPoint = null;
        }
        else {
            lensNode.reserve.wayPoint = new WayPoint();
        }

        lensNode.ui.raw = false;

        return gStateCode.cloneState(state);
    },

    toggleIsSilentRoot: (state: IState): IState => {

        const lensNode: INode<ILensUI> = state.lens.nodeTab.lensNode as INode<ILensUI>;

        if (!lensNode.isRoot) {

            return state;
        }

        lensNode.isSilentRoot = lensNode.isSilentRoot !== true;

        lensNode.nodes.forEach((child: INode<ILensUI>) => {

            child.isParentSilentRoot = lensNode.isSilentRoot;
        });

        lensNode.ui.raw = false;

        return gStateCode.cloneState(state);
    },

    toggleShowInputs: (state: IState): IState => {

        const lensNode: INode<ILensUI> = state.lens.nodeTab.lensNode as INode<ILensUI>;
        lensNode.ui.showBlankInputs = lensNode.ui.showBlankInputs !== true;

        return gStateCode.cloneState(state);
    },

    toggleShowImages: (state: IState): IState => {

        const lensNode: INode<ILensUI> = state.lens.nodeTab.lensNode as INode<ILensUI>;
        lensNode.ui.showBlankInputs = lensNode.ui.showBlankInputs !== true;

        return gStateCode.cloneState(state);
    },

    deleteSelectedNode: (
        state: IState,
        response: any): IState => {

        if (!response?.jsonData) {

            return state;
        }

        const rawNode: any = response.jsonData;

        const loadedNode = gBranchesStateCode.findAndReLoadRegisteredNode(
            state,
            rawNode);

        if (loadedNode) {

            gNodeActions.refreshLensNode(state);
            loadedNode.ui.expanded = false;
            loadedNode.ui.branchViewNodeControls = false;
            loadedNode.ui.dummy = false;

            gStateCode.addNotification(
                state,
                `Node deleted`,
                `Key: ${loadedNode.key}, 
Text: ${loadedNode.discussion}.`,
                loadedNode.token,
                NotificationType.Info
            );
        }

        gBranchesStateCode.deselectAllNodes(state);
        gBranchesStateCode.clearLensNode(state);
        state.lens.nodeTab.enableSave = true;

        return gStateCode.cloneState(state);
    },

    next: (
        state: IState,
        _node: INode<ILensUI>): IState => {

        gNodeCode.validateTab(state);

        return gStateCode.cloneState(state);
    },

    saveSubtreeAndLinkNode: (state: IState): IState => {

        if (!state.lens.nodeTab.lensNode) {

            return state;
        }

        const lensNode: INode<ILensUI> = state.lens.nodeTab.lensNode as INode<ILensUI>;

        return saveSubtreeAndLinkNode(
            state,
            lensNode,
            'Are you sure you want to save the current state of the node and options?',
            saveSubtreeAndLinkNodeEffectWrapper
        );
    },

    save: (state: IState): IState => {

        if (!state.lens.nodeTab.lensNode) {

            return state;
        }

        const lensNode: INode<ILensUI> = state.lens.nodeTab.lensNode as INode<ILensUI>;
        gSearchCode.clearSearchCaseResults(lensNode.ui.subtreeSearch);

        return saveSubtreeAndLinkNode(
            state,
            lensNode,
            'Are you sure you want to save the the subtree and link to it?',
            saveNodeEffectWrapper
        );
    },

    cancel: (state: IState): IState => {

        gLensCode.clearTab(
            state,
            TabType.Node
        );

        return gStateCode.cloneState(state);
    },

    delete: (state: IState): IState => {

        if (state.lens.nodeTab.lensNode?.isRoot === true) {

            throw new Error("Cannot delete a root.");
        }

        gDialogueCode.buildDialogue(
            state,
            DialogueType.Confirm,
            deleteNodeEffectWrapper,
            DelegateType.Action,
            "Confirm delete",
            "Are you sure you want to delete the node and all its descendants?");

        return gStateCode.cloneState(state);
    }
};

export default nodeActions;
