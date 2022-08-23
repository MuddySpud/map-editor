import IState from "../../interfaces/state/IState";
import gSubtreeCode from "./gSubtreeCode";
import ISubtreeSys from "../../interfaces/state/tree/ISubtreeSys";
import ISocketTask from "../../interfaces/state/tree/ISocketTask";
import INodeBase from "../../interfaces/state/tree/INodeBase";
import { ActionType } from "../../interfaces/enums/ActionType";
import gTreesStateCode from "./gTreesStateCode";
import U from "../gUtilities";
import ITreeSys from "../../interfaces/state/tree/ITreeSys";
import gTreeCode from "./gTreeCode";
import SocketTask from "../../state/tree/SocketTask";
import SubtreeSys from "../../state/tree/SubtreeSys";
import gBranchesStateCode from "./gBranchesStateCode";
import gLensCode from "./gLensCode";
import { TabType } from "../../interfaces/enums/TabType";
import gStSocketCode from "./gStSocketCode";
import IStSocket from "../../interfaces/state/tree/IStSocket";
import StSocket from "../../state/tree/StSocket";
import gStateCode from "./gStateCode";
import gSession from "../gSession";
import gTabCode from "./gTabCode";


const gSocketTaskCode = {

    setupLensSocketTask: (state: IState): ISocketTask => {

        const tree: ITreeSys = gTreeCode.convertBranchesTreeToTreeSys(state);
        const clonedTree: ITreeSys = gTreeCode.cloneTree(tree) as ITreeSys;
        const current: INodeBase = state.branchesState.current as INodeBase;

        const socketTask: ISocketTask = new SocketTask(

            SubtreeSys.newSubtreeFromTree(tree),
            SubtreeSys.newSubtreeFromTree(clonedTree),
            current.key as string,
            tree.token as string,
            current.socketHole?.socketKey ?? ''
        );

        socketTask.ui.optionIsSocket = current.isSocket;
        socketTask.ui.overrideOption = current.socketHole?.overrideOption === true;
        state.lens.nodeTab.lensSocketTask = socketTask;

        return socketTask;
    },

    clearSocketTask: (state: IState): void => {

        state.lens.nodeTab.lensSocketTask = null;
    },

    setupLensNodeTab: (state: IState): void => {

        gBranchesStateCode.clearLensNode(state);
        gLensCode.maximiseLens(state);

        gTabCode.setSelectedTab(
            state,
            TabType.Node);
    },

    validateMapSocketHole: (state: IState): boolean => {

        return gSocketTaskCode.validateMapSocket(
            state,
            gSocketTaskCode.isMapSocketHoleDirty
        );
    },

    validateMapSocketSubtree: (state: IState): boolean => {

        return gSocketTaskCode.validateMapSocket(
            state,
            null // don't worry about whether it is dirty or not
        );
    },

    addStSocketToTask: (
        state: IState,
        socketTask: ISocketTask): IStSocket => {

        const stSocket: IStSocket = gSocketTaskCode.addStSocket(
            state,
            socketTask.lensSubtree
        );

        gSession.setFocusFilter(`#stSocket_${stSocket.key}`);

        return stSocket;
    },

    autoAddStSocketToTask: (
        state: IState,
        socketTask: ISocketTask): IStSocket => {

        const stSocket: IStSocket = gSocketTaskCode.addStSocketToTask(
            state,
            socketTask
        );

        stSocket.ui.autoAdded = true;

        return stSocket;
    },

    clearAutoAddedStSockets: (socketTask: ISocketTask): void => {

        const stSockets: Array<IStSocket> = socketTask.lensSubtree.stSockets;
        let stSocket: IStSocket;
        let index = -1;

        for (let i = 0; i < stSockets.length; i++) {

            stSocket = stSockets[i];

            if (stSocket.ui.autoAdded === true) {

                if (socketTask.selectedSocket === stSocket) {

                    socketTask.selectedSocket = null;
                }

                index = i;
            }
        }

        if (index > -1) {

            stSockets.splice(index, 1);
        }
    },

    addStSocket: (
        state: IState,
        subtree: ISubtreeSys): IStSocket => {

        const stSocket: IStSocket = new StSocket(gStateCode.getFreshKey(state));
        stSocket.action = ActionType.CreateStSocket;
        stSocket.text = `StSocket ${subtree.stSockets.length + 1}`;

        const matching: IStSocket | undefined = subtree.stSockets.find(s => s.text === stSocket.text);

        if (matching) {

            stSocket.text = `${stSocket.text} ${U.generateGuid()}`;
        }

        subtree.stSockets.push(stSocket);

        return stSocket;
    },

    validateMapSocket: (
        state: IState,
        isDirtyDelegate: ((state: IState) => boolean) | null = null): boolean => {

        let valid: boolean = true;

        if (state.lens.nodeTab.lensSocketTask) {

            const socketTask: ISocketTask = state.lens.nodeTab.lensSocketTask;
            const lensSubtree: ISubtreeSys = socketTask.lensSubtree;

            if (!lensSubtree) {

                valid = false;
            }

            valid = valid
                && gSubtreeCode.validateSubtreeSys(lensSubtree);

            if (socketTask.ui.optionIsSocket === true
                && !socketTask.selectedSocket) {

                valid = false;
            }

            if (isDirtyDelegate) {

                valid = valid
                    && isDirtyDelegate(state);
            }
        }

        state.lens.nodeTab.enableSave = valid;

        return valid;
    },

    isLensSocketTaskDirty: (state: IState): boolean => {

        if (gSocketTaskCode.isMapSocketSubtreeDirty(state) === true) {

            return true;
        }

        if (gSocketTaskCode.isMapSocketHoleDirty(state) === true) {

            return true;
        }

        return false;
    },

    isMapSocketHoleDirty: (state: IState): boolean => {

        if (!state
            || !state.lens.nodeTab.lensSocketTask) {

            return false;
        }

        const socketTask: ISocketTask = state.lens.nodeTab.lensSocketTask;
        const selectedNode: INodeBase = state.branchesState.selected as INodeBase;

        if (socketTask.ui.optionIsSocket === true) {

            if (!selectedNode.isSocket) {
                // Then is mapped to a socket, before it wasn't
                if (socketTask.ui.newSocket === true) {

                    return true;
                }
                else if (!U.isNullOrWhiteSpace(socketTask.selectedSocket?.key)) {

                    return true;
                }
            }
            else if (socketTask.selectedSocket?.ui.autoAdded === true
                && socketTask.selectedSocket?.ui.raw === true) {
                // Then automatically added socket so ignore
                return false;
            }
            else if (socketTask.selectedSocket?.key !== selectedNode.socketHole?.socketKey
                || socketTask.ui.overrideOption !== selectedNode.socketHole?.overrideOption) {
                // Then the socket has been switched
                // or the socket text is overriding the option text, before it wasn't
                return true;
            }
        }
        else if (selectedNode.isSocket === true) {

            return true;
        }

        return false;
    },

    isMapSocketSubtreeDirty: (state: IState): boolean => {

        if (!state
            || !state.lens.nodeTab.lensSocketTask) {

            return false;
        }

        const lensSubtree: ISubtreeSys = state.lens.nodeTab.lensSocketTask.lensSubtree;
        const ghostSubtree: ISubtreeSys = state.lens.nodeTab.lensSocketTask.ghostSubtree;

        const dirty = lensSubtree.stRoot.text !== ghostSubtree.stRoot.text
            || gStSocketCode.checkStSocketListMatch(
                lensSubtree.stSockets,
                ghostSubtree.stSockets) === false;

        return dirty;
    },

    getMapSocketTaskForPost: (
        state: IState,
        socketTask: ISocketTask): { body: any, callID: string } => {

        const subtree: ISubtreeSys = socketTask.lensSubtree;
        const treeKey: string | null = subtree.tree.key;

        if (U.isPositiveNumeric(treeKey) === false) {

            throw new Error("SocketTask subtree tree must already exist in the database");
        }

        const callID: string = gTreesStateCode.registerTreeDataRequest(
            'Map socket',
            state,
            treeKey as string,
            socketTask.action
        );

        let body: any = {
            key: socketTask.key,
            token: socketTask.lensSubtree.tree.token,
            action: socketTask.action
        };

        if (socketTask.action === ActionType.DeleteHoleSocketMapping) {

            return {
                body,
                callID
            };
        }

        body.stSocketKey = socketTask.selectedSocket?.key;
        body.overrideOption = socketTask.ui.overrideOption;

        if (socketTask.action === ActionType.CreateSubtreeAndMapToSocket
            || socketTask.lensSubtree.action === ActionType.UpdateSubtree) {

            //Add subtree
            body.subtree = gSubtreeCode.getLoadSubtreeBody(subtree);
        }

        return {
            body,
            callID
        };
    }
};

export default gSocketTaskCode;

