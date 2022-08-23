import IState from "../../../../../interfaces/state/IState";
import gStateCode from "../../../../../global/code/gStateCode";
import gBranchTreeTaskCode from "../../../../../global/code/gBranchTreeTaskCode";
import gDialogueCode from "../../../../../global/code/gDialogueCode";
import { DialogueType } from "../../../../../interfaces/enums/DialogueType";
import { DelegateType } from "../../../../../interfaces/enums/DelegateType";
import branchToSubtreeEffects from "../effects/branchToSubtreeEffects";
import gNotificationCode from "../../../../../global/code/gNotificationCode";
import ISubtreeLoaderUI from "../../../../../interfaces/state/ui/UIs/ISubtreeLoaderUI";
import gTabCode from "../../../../../global/code/gTabCode";
import U from "../../../../../global/gUtilities";
import IStSocket from "../../../../../interfaces/state/tree/IStSocket";
import ISocketLoaderUI from "../../../../../interfaces/state/ui/UIs/ISocketLoaderUI";
import IHole from "../../../../../interfaces/state/tree/IHole";
import Hole from "../../../../../state/tree/Hole";
import SocketLoaderUI from "../../../../../state/ui/UIs/SocketLoaderUI";
import ISubtreeLoader from "../../../../../interfaces/state/tree/ISubtreeLoader";
import gBranchesStateCode from "../../../../../global/code/gBranchesStateCode";
import gSocketTaskCode from "../../../../../global/code/gSocketTaskCode";
import IStateAnyArray from "../../../../../interfaces/state/IStateAnyArray";
import gTreeCode from "../../../../../global/code/gTreeCode";


const wrapSaveEffectInAction = (state: IState): IStateAnyArray => {

    gTreeCode.setLensTreeNodeChanges(state);

    return [
        gStateCode.cloneState(state),
        branchToSubtreeEffects.convertBranchToSubtree(state)
    ];
};

const branchToSubtreeActions = {

    save: (state: IState): IState => {

        if (!state.lens.nodeTab.lensBranchTreeTask) {

            return state;
        }

        if (!gTabCode.canSave(state.lens.nodeTab)) {
            
            return gStateCode.cloneState(state);
        }

        state.lens.nodeTab.saveLock = true;
        const isValid: boolean = gBranchTreeTaskCode.validateBranchTreeTask(state);

        if (isValid) {

            gDialogueCode.buildDialogue(
                state,
                DialogueType.Confirm,
                wrapSaveEffectInAction,
                DelegateType.Action,
                "Confirm save",
                `Are you sure you want to convert the branch to a subtree?`);
        }
        else {
            gNotificationCode.buildBranchTreeTaskValidationFailedNotification(state);
        }

        return gStateCode.cloneState(state);
    },

    toggleAllDescendants: (state: IState): IState => {

        if (!state
            || !state.lens.nodeTab.lensBranchTreeTask) {

            return state;
        }

        let treeLoaderView: ISubtreeLoaderUI = state.lens.nodeTab.lensBranchTreeTask.subtreeLoader.ui;
        treeLoaderView.allDescendants = treeLoaderView.allDescendants === false;
        state.lens.nodeTab.stageBehaviour.resetMax();

        return gStateCode.cloneState(state);
    },

    removeLimit: (
        state: IState,
        limit: IHole<ISocketLoaderUI>): IState => {

        if (!state
            || !state.lens.nodeTab.lensBranchTreeTask
            || !limit) {

            return state;
        }

        state.lens.nodeTab.stageBehaviour.resetMax();
        const stSockets: Array<IStSocket> = state.lens.nodeTab.lensBranchTreeTask.subtreeLoader.subtree.stSockets;
        let holes: Array<IHole<ISocketLoaderUI>> = [];
        let stSocket: IStSocket;
        let hole: IHole<ISocketLoaderUI>;
        let limitIndex: number = -1;
        let stop: boolean = false;

        for (let i = 0; i < stSockets.length; i++) {

            stSocket = stSockets[i];
            holes = stSocket.holes;

            for (let j = 0; j < holes.length; j++) {

                hole = holes[j];

                if (hole.key === limit.key) {

                    limitIndex = j;
                    stop = true;

                    break;
                }
            }

            if (stop) {
                break;
            }
        }

        if (limitIndex < 0) {

            return gStateCode.cloneState(state);
        }

        holes.splice(limitIndex, 1);

        const node = gBranchesStateCode.getRegisteredNode(
            state,
            limit.token,
            limit.key
        );

        if (node) {

            node.ui.branchTaskLimit = false;
        }

        return gStateCode.cloneState(state);
    },

    addLimit: (
        state: IState,
        stSocket: IStSocket): IState => {

        if (!state
            || !state.lens.nodeTab.lensBranchTreeTask
            || U.isNullOrWhiteSpace(state.branchesState.tree.token) === true
            || !stSocket) {

            return state;
        }

        state.lens.nodeTab.stageBehaviour.resetMax();
        let subtreeLoader: ISubtreeLoader = state.lens.nodeTab.lensBranchTreeTask.subtreeLoader;
        const limit: IHole<ISocketLoaderUI> = new Hole<ISocketLoaderUI>(SocketLoaderUI);
        limit.key = gStateCode.getFreshKey(state);
        stSocket.holes.push(limit);

        gBranchTreeTaskCode.enableClickSelect(
            subtreeLoader,
            limit);

        gBranchTreeTaskCode.forceSelectLimit(
            subtreeLoader,
            limit);

        return gStateCode.cloneState(state);
    },

    socketFromLimit: (state: IState): IState => {

        if (!state
            || !state.lens.nodeTab.lensBranchTreeTask
            || U.isNullOrWhiteSpace(state.branchesState.tree.token) === true) {

            return state;
        }

        state.lens.nodeTab.stageBehaviour.resetMax();
        let subtreeLoader: ISubtreeLoader = state.lens.nodeTab.lensBranchTreeTask.subtreeLoader;

        const stSocket: IStSocket = gSocketTaskCode.addStSocket(
            state,
            subtreeLoader.subtree
        );

        const limit: IHole<ISocketLoaderUI> = new Hole<ISocketLoaderUI>(SocketLoaderUI);
        limit.key = gStateCode.getFreshKey(state);
        stSocket.holes.push(limit);
        stSocket.ui.textFromOption = true;

        gBranchTreeTaskCode.enableClickSelect(
            subtreeLoader,
            limit);

        gBranchTreeTaskCode.forceSelectLimit(
            subtreeLoader,
            limit);

        return gStateCode.cloneState(state);
    },

    toggleMinimiseLimit: (
        state: IState,
        limit: IHole<ISocketLoaderUI>): IState => {

        if (!state
            || !limit) {

            return state;
        }

        limit.ui.minimise = limit.ui.minimise === false;

        return gStateCode.cloneState(state);
    },

    toggleOverrideOption: (
        state: IState,
        limit: IHole<ISocketLoaderUI>): IState => {

        if (!state
            || !limit) {

            return state;
        }

        state.lens.nodeTab.stageBehaviour.resetMax();
        limit.ui.overrideOption = limit.ui.overrideOption === false;

        return gStateCode.cloneState(state);
    },

    toggleMinimiseStSocket: (
        state: IState,
        stSocket: IStSocket): IState => {

        if (!state
            || !stSocket) {

            return state;
        }

        stSocket.ui.minimise = stSocket.ui.minimise === false;

        return gStateCode.cloneState(state);
    },

    toggleMinimiseWarnings: (
        state: IState,
        subtreeLoader: ISubtreeLoader): IState => {

        if (!state
            || !subtreeLoader) {

            return state;
        }

        subtreeLoader.ui.minimiseWarnings = subtreeLoader.ui.minimiseWarnings === false;

        return gStateCode.cloneState(state);
    }
};

export default branchToSubtreeActions;


