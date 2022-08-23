import IState from "../../../../../interfaces/state/IState";
import gStateCode from "../../../../../global/code/gStateCode";
import IStSocket from "../../../../../interfaces/state/tree/IStSocket";
import gSession from "../../../../../global/gSession";
import Filters from "../../../../../state/constants/Filters";
import ISocketTask from "../../../../../interfaces/state/tree/ISocketTask";
import { ActionType } from "../../../../../interfaces/enums/ActionType";
import IStRootElement from "../../../../../interfaces/state/ui/payloads/IStRootElement";
import IStSocketElement from "../../../../../interfaces/state/ui/payloads/IStSocketElement";
import gSocketTaskCode from "../../../../../global/code/gSocketTaskCode";
import gTabCode from "../../../../../global/code/gTabCode";
import mapSocketEffects from "../effects/mapSocketEffects";
import { DialogueType } from "../../../../../interfaces/enums/DialogueType";
import { DelegateType } from "../../../../../interfaces/enums/DelegateType";
import gDialogueCode from "../../../../../global/code/gDialogueCode";
import INode from "../../../../../interfaces/state/tree/INode";
import IBranchUI from "../../../../../interfaces/state/ui/UIs/IBranchUI";
import gBranchesStateCode from "../../../../../global/code/gBranchesStateCode";
import { NotificationType } from "../../../../../interfaces/enums/NotificationType";
import gStageCode from "../../../../../global/code/gStageCode";
import IStageBehaviour from "../../../../../interfaces/behaviours/IStageBehaviour";
import gSubtreeCode from "../../../../../global/code/gSubtreeCode";
// import gTreeCode from "../../../../../global/code/gTreeCode";
import IStateAnyArray from "../../../../../interfaces/state/IStateAnyArray";
import ISubtreeSys from "../../../../../interfaces/state/tree/ISubtreeSys";
import gNodeCode from "../../../../../global/code/gNodeCode";
import gTreeCode from "../../../../../global/code/gTreeCode";
import gTreeStatsActions from "../../../../../global/actions/gTreeStatsActions";


const wrapSaveEffectInAction = (state: IState): IStateAnyArray => {

    // gTreeCode.setLensTreeNodeChanges(state);

    return [
        gStateCode.cloneState(state),
        mapSocketEffects.save(state)
    ];
};

const clearSocketMapping = (
    state: IState,
    node: INode<IBranchUI>): void => {

    node.ui.branchViewNodeControls = false;
    node.ui.dummy = false;
    node.ui.expanded = false;
    state.lens.nodeTab.lensSocketTask = null;

    gStateCode.addNotification(
        state,
        `Hole mapping to Socket cleared`,
        `Key: ${node.key}, 
Hole: ${node.option}.`,
        node.token,
        NotificationType.Info
    );
};

const createSocketMapping = (
    state: IState,
    node: INode<IBranchUI>,
    rawSubtree: any,
    socketTask: ISocketTask): void => {

    state.lens.nodeTab.saveLock = false;
    socketTask.ui.newSocket = false;

    gSubtreeCode.loadSocketTaskSockets(
        state,
        rawSubtree
    );

    const stageBehaviour: IStageBehaviour = gStageCode.buildMarkSocketStages(socketTask);
    state.lens.nodeTab.stageBehaviour = stageBehaviour;
    socketTask.action = ActionType.EditHole;
    node.ui.branchViewNodeControls = false;
    node.ui.dummy = false;

    gStateCode.addNotification(
        state,
        `Hole mapped to Socket`,
        `Key: ${node.key}, 
Hole: ${node.option}.`,
        node.token,
        NotificationType.Info
    );

    state.lens.nodeTab.enableSave = true;
};

const mapSocketActions = {

    overWriteLoadedHole: (
        state: IState,
        response: any): IState => {

        // RPTM This is loading stuff into the treeTab - is it being referenced by the nodeTab?
        // As the nodeTab can refer to another tree so this data could be incorrect for 
        if (!state
            || !state.lens.nodeTab.lensSocketTask
            || !response?.jsonData) {

            return state;
        }

        if (state.lens.treeTab.lensSubtree) {

            gStateCode.AddReLoadDataEffectImmediate(
                state,
                `refreshTreeStats`,
                state.lens.treeTab.lensSubtree?.tree.token,
                `${state.settings.apiUrl}/Tree/Stats`,
                gTreeCode.getRefreshTreeStatsRequestBody,
                gTreeStatsActions.refreshTreeStats
            );
        }

        state.lens.nodeTab.saveLock = false;
        const rawNode: any = response.jsonData.node;
        const rawSubtree: any = response.jsonData.subtree;
        const rawFlaws: any = response.jsonData.flaws;

        const loadedNode: INode<IBranchUI> | null = gBranchesStateCode.findAndReLoadRegisteredNode(
            state,
            rawNode);

        state.lens.nodeTab.enableSave = true;

        if (!loadedNode) {

            return gStateCode.cloneState(state);
        }

        const socketTask: ISocketTask = state.lens.nodeTab.lensSocketTask;

        if (loadedNode.key !== socketTask.key) {

            throw new Error("RawNode.key does not match lensSocketTask.holeKey");
        }

        const loadedSubtree: ISubtreeSys | null = gSubtreeCode.loadSubtreeSys(
            state,
            rawSubtree);

        if (!loadedSubtree) {

            return gStateCode.cloneState(state);
        }

        if (state.lens.treeTab.lensSubtree?.tree.key === loadedSubtree.tree.key) {

            state.lens.treeTab.holes = gNodeCode.loadNodesShallow(rawFlaws);

            gSubtreeCode.loadLensSubtree(
                state,
                loadedSubtree
            );
        }
        else {
            gTreeCode.updateAllOpenTrees(
                state,
                loadedSubtree.tree
            );
        }

        if (!loadedNode.isSocket) {

            clearSocketMapping(
                state,
                loadedNode
            );
        }
        else {

            createSocketMapping(
                state,
                loadedNode,
                rawSubtree,
                socketTask);
        }

        return gStateCode.cloneState(state);
    },

    copyOptionText: (state: IState): IState => {

        if (!state
            || !state.lens.nodeTab.lensSocketTask
            || !state.lens.nodeTab.lensSocketTask.selectedSocket) {

            return state;
        }

        state.lens.nodeTab.lensSocketTask.selectedSocket.text = state.branchesState.selected?.option as string;

        return gStateCode.cloneState(state);
    },

    toggleMapToSocket: (state: IState): IState => {

        if (!state
            || !state.lens.nodeTab.lensSocketTask) {

            return state;
        }

        state.lens.nodeTab.lensSocketTask.ui.optionIsSocket = state.lens.nodeTab.lensSocketTask.ui.optionIsSocket !== true;

        return gStateCode.cloneState(state);
    },

    toggleOverrideOption: (state: IState): IState => {

        if (!state
            || !state.lens.nodeTab.lensSocketTask) {

            return state;
        }

        state.lens.nodeTab.lensSocketTask.ui.overrideOption = state.lens.nodeTab.lensSocketTask.ui.overrideOption !== true;

        return gStateCode.cloneState(state);
    },

    toggleNewSocket: (state: IState): IState => {

        if (!state
            || !state.lens.nodeTab.lensSocketTask) {

            return state;
        }

        const socketTask: ISocketTask = state.lens.nodeTab.lensSocketTask;
        gSocketTaskCode.clearAutoAddedStSockets(socketTask);
        socketTask.ui.newSocket = socketTask.ui.newSocket !== true;
        const stSockets: Array<IStSocket> = socketTask.lensSubtree.stSockets;

        if (socketTask.ui.newSocket === true) {

            stSockets.forEach((stSocket: IStSocket) => {

                if (stSocket.ui.dropDownSingleton === true) {

                    throw new Error("Cannot have more than one dropDownSingleton");
                }
            });

            socketTask.lensSubtree.action = ActionType.UpdateSubtree;

            socketTask.selectedSocket = gSocketTaskCode.autoAddStSocketToTask(
                state,
                state.lens.nodeTab.lensSocketTask);

            socketTask.selectedSocket.ui.dropDownSingleton = true;

            return gStateCode.cloneState(state);
        }

        socketTask.lensSubtree.action = ActionType.None;

        return gStateCode.cloneState(state);
    },

    showSockets: (state: IState): IState => {

        if (!state
            || !state.lens.nodeTab.lensSocketTask) {

            return state;
        }

        state.lens.nodeTab.lensSocketTask.ui.showSockets = true;
        gSession.setFocusFilter(Filters.mapSocketsSelectFilter);

        return gStateCode.cloneState(state);
    },

    hideSockets: (state: IState): IState => {

        if (!state
            || !state.lens.nodeTab.lensSocketTask) {

            return state;
        }

        state.lens.nodeTab.lensSocketTask.ui.showSockets = false;
        gSession.removeFocusFilter(Filters.mapSocketsSelectFilter);

        return gStateCode.cloneState(state);
    },

    selectSocket: (
        state: IState,
        stSocket: IStSocket): IState => {

        if (!state
            || !state.lens.nodeTab.lensSocketTask) {

            return state;
        }

        const socketTask: ISocketTask = state.lens.nodeTab.lensSocketTask;
        socketTask.selectedSocket = stSocket;
        socketTask.ui.showSockets = false;

        return gStateCode.cloneState(state);
    },

    clearSocket: (state: IState): IState => {

        if (!state
            || !state.lens.nodeTab.lensSocketTask) {

            return state;
        }

        const socketTask: ISocketTask = state.lens.nodeTab.lensSocketTask;
        socketTask.selectedSocket = null;
        socketTask.ui.showSockets = false;

        return gStateCode.cloneState(state);
    },

    addStSocket: (state: IState): IState => {

        if (!state
            || !state.lens.nodeTab.lensSocketTask) {

            return state;
        }

        gSocketTaskCode.addStSocketToTask(
            state,
            state.lens.nodeTab.lensSocketTask);

        return gStateCode.cloneState(state);
    },

    save: (state: IState): IState => {

        if (!state
            || !state.lens.nodeTab.lensSocketTask) {

            return state;
        }

        if (!gTabCode.canSave(state.lens.nodeTab)) {

            return gStateCode.cloneState(state);
        }

        state.lens.nodeTab.saveLock = true;
        const socketTask: ISocketTask = state.lens.nodeTab.lensSocketTask;
        const valid: boolean = gSocketTaskCode.validateMapSocketHole(state);
        state.lens.treeTab.loadingKey = state.treesState.selectedKey;

        if (!valid) {

            return state;
        }

        let dialogueTitle: string;
        let dialogueText: string;

        // Check to see if need to create a new subtree or just map option to socket
        if (socketTask.action === ActionType.EditHole
            && socketTask.ui.optionIsSocket === false) {

            dialogueTitle = "Confirm clear";
            dialogueText = "Are you sure you want to clear the option to socket mapping?";
            socketTask.action = ActionType.DeleteHoleSocketMapping;
        }
        else if (socketTask.ui.newSocket === true) {

            dialogueTitle = "Confirm save";
            dialogueText = "Are you sure you want to create a new socket and save the option to socket mapping?";
            socketTask.action = ActionType.CreateSocketAndMapHoleToIt;
            socketTask.lensSubtree.action = ActionType.UpdateSubtree;
        }
        else {
            dialogueTitle = "Confirm save";
            dialogueText = "Are you sure you want to save the option to socket mapping?";
        }

        gDialogueCode.buildDialogue(
            state,
            DialogueType.Confirm,
            wrapSaveEffectInAction,
            DelegateType.Action,
            dialogueTitle,
            dialogueText);

        return gStateCode.cloneState(state);
    },

    editSubtree: (state: IState): IState => {

        if (!state
            || !state.lens.nodeTab.lensSocketTask) {

            return state;
        }

        state.lens.nodeTab.lensSocketTask.ui.forceSet = true;

        return gStateCode.cloneState(state);;
    },

    deleteStSocket: (
        state: IState,
        payload: IStSocketElement): IState => {

        if (!state
            || !state.lens.nodeTab.lensSocketTask
            || !payload.stSocket) {

            return state;
        }

        const stSocket: IStSocket = payload.stSocket;
        const socketTask: ISocketTask = state.lens.nodeTab.lensSocketTask;
        const stSockets: Array<IStSocket> = socketTask.lensSubtree.stSockets;
        let index: number = -1;

        for (let i = 0; i < stSockets.length; i++) {

            if (stSockets[i].key === stSocket.key) {

                index = i;

                break;
            }
        }

        if (index > -1) {

            stSockets.splice(index, 1);
        }

        return gStateCode.cloneState(state);
    },

    setRootText: (
        state: IState,
        payload: IStRootElement): IState => {

        const input: HTMLInputElement = payload.element as HTMLInputElement;
        payload.root.text = input.value;

        return gStateCode.cloneState(state);
    },

    setSocketText: (
        state: IState,
        payload: IStSocketElement): IState => {

        if (!payload.stSocket
            || !payload.element) {

            return state;
        }

        const input: HTMLInputElement = payload.element as HTMLInputElement;
        payload.stSocket.text = input.value;
        payload.stSocket.ui.raw = false;

        return gStateCode.cloneState(state);
    }
};

export default mapSocketActions;


