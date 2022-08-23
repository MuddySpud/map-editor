import IState from "../../../../../interfaces/state/IState";
import IStateAnyArray from "../../../../../interfaces/state/IStateAnyArray";
import gStateCode from "../../../../../global/code/gStateCode";
import gTreesCoreActions from "../../../../../global/actions/gTreesCoreActions";
import gSpreadEffects from "../../../../../global/effects/gSpreadEffects";
import IStRootElement from "../../../../../interfaces/state/ui/payloads/IStRootElement";
import IStSocketElement from "../../../../../interfaces/state/ui/payloads/IStSocketElement";
import ISubtreeSys from "../../../../../interfaces/state/tree/ISubtreeSys";
import IStSocket from "../../../../../interfaces/state/tree/IStSocket";
import { ActionType } from "../../../../../interfaces/enums/ActionType";
import gSession from "../../../../../global/gSession";
import gTabCode from "../../../../../global/code/gTabCode";
import gTreesStateCode from "../../../../../global/code/gTreesStateCode";
import gDialogueCode from "../../../../../global/code/gDialogueCode";
import { DialogueType } from "../../../../../interfaces/enums/DialogueType";
import { DelegateType } from "../../../../../interfaces/enums/DelegateType";
import gNotificationCode from "../../../../../global/code/gNotificationCode";
import subtreeEffects from "../effects/subtreeEffects";
import { NotificationType } from "../../../../../interfaces/enums/NotificationType";
import gLensCode from "../../../../../global/code/gLensCode";
import gSubtreeCode from "../../../../../global/code/gSubtreeCode";
import gStageCode from "../../../../../global/code/gStageCode";
import gTreeCode from "../../../../../global/code/gTreeCode";
import ITreeSys from "../../../../../interfaces/state/tree/ITreeSys";
import U from "../../../../../global/gUtilities";
import IStRoot from "../../../../../interfaces/state/tree/IStRoot";
import gSocketTaskCode from "../../../../../global/code/gSocketTaskCode";
import IStageBehaviour from "../../../../../interfaces/behaviours/IStageBehaviour";
import IHole from "../../../../../interfaces/state/tree/IHole";
import ISocketLoaderUI from "../../../../../interfaces/state/ui/UIs/ISocketLoaderUI";
import gBranchesStateCode from "../../../../../global/code/gBranchesStateCode";
import IBranchUI from "../../../../../interfaces/state/ui/UIs/IBranchUI";
import INode from "../../../../../interfaces/state/tree/INode";
import { StageTitle } from "../../../../../interfaces/enums/StageTitle";
import IBranchTaskStageBehaviour from "../../../../../interfaces/behaviours/IBranchTaskStageBehaviour";


const subtreeActions = {

    save: (state: IState): IState => {

        if (!state.lens.treeTab.lensSubtree) {
            return state;
        }

        if (!gTabCode.canSave(state.lens.treeTab)) {

            return gStateCode.cloneState(state);
        }

        state.lens.treeTab.saveLock = true;
        const isValid: boolean = gTreesStateCode.lensSubtreeIsValidDirty(state);
        state.lens.treeTab.loadingKey = state.treesState.selectedKey;

        if (!isValid) {
            gNotificationCode.buildTreeValidationFailedNotification(state);
        }

        const lensSubtree: ISubtreeSys = state.lens.treeTab.lensSubtree;

        if (lensSubtree.action !== ActionType.CreateSubtree
            && lensSubtree.action !== ActionType.UpdateSubtree) {
            alert(`The subtree action type: ${lensSubtree.action} has not been coded for yet...`);
        }

        const effect: any = (state: IState) => subtreeEffects.saveSubtree(state);

        gDialogueCode.buildDialogue(
            state,
            DialogueType.Confirm,
            effect,
            DelegateType.Effect,
            "Confirm save",
            `Are you sure you want to save the current state of the subtree?`);

        return gStateCode.cloneState(state);
    },

    deleteStSocket: (
        state: IState,
        payload: IStSocketElement): IState => {

        if (!state
            || !payload.stSocket
            || !payload.subtree) {

            return state;
        }

        const behaviour: IStageBehaviour | null = payload.behaviour;

        if (behaviour) {

            behaviour.resetMax();
        }

        const stSocket: IStSocket = payload.stSocket;
        const subtree: ISubtreeSys = payload.subtree;
        const stSockets: Array<IStSocket> = subtree.stSockets;
        let index: number = -1;
        let foundOption: INode<IBranchUI> | null;

        for (let i = 0; i < stSockets.length; i++) {

            if (stSockets[i].key === stSocket.key) {

                const behaviour: IStageBehaviour | null = payload.behaviour;

                if (behaviour
                    && behaviour.stages.name === StageTitle.LensBranchToSubtree) {

                    const branchTaskStageBehaviour: IBranchTaskStageBehaviour = behaviour as IBranchTaskStageBehaviour;

                    stSocket.holes.forEach((hole: IHole<ISocketLoaderUI>) => {

                        foundOption = gBranchesStateCode.getRegisteredNode(
                            state,
                            branchTaskStageBehaviour.getToken(),
                            hole.key
                        )

                        if (foundOption) {

                            foundOption.ui.branchTaskLimit = false;
                        }
                    })
                }

                // Need to remove all limits etc for this socket!!!
                index = i;

                break;
            }
        }

        if (index > -1) {

            stSockets.splice(index, 1);
        }

        return gStateCode.cloneState(state);
    },

    addStSocket: (
        state: IState,
        payload: IStSocketElement): IState => {

        if (!state
            || !payload.subtree) {

            return state;
        }

        const behaviour: IStageBehaviour | null = payload.behaviour;

        if (behaviour) {

            behaviour.resetMax();
        }

        const subtree: ISubtreeSys = payload.subtree;
        subtree.ui.raw = false;
        subtree.ui.minimiseStSockets = false;

        const stSocket: IStSocket = gSocketTaskCode.addStSocket(
            state,
            subtree
        );

        stSocket.ui.minimise = false;
        gSession.setFocusFilter(`#stSocket_${stSocket.key}`);

        return gStateCode.cloneState(state);
    },

    setRootText: (
        state: IState,
        payload: IStRootElement): IState => {

        const input: HTMLInputElement = payload.element as HTMLInputElement;
        const root: IStRoot = payload.root;
        root.text = input.value;

        if (root.action === ActionType.None
            && U.isPositiveNumeric(root.key) === true) {

            root.action = ActionType.UpdateStRoot;
        }

        return gStateCode.cloneState(state);
    },

    setRootTextWithBehaviour: (
        state: IState,
        payload: IStRootElement): IState => {

        const behaviour: IStageBehaviour | null = payload.behaviour;

        if (behaviour) {

            behaviour.resetMax();
        }

        return subtreeActions.setRootText(
            state,
            payload
        );
    },

    setSocketText: (
        state: IState,
        payload: IStSocketElement): IState => {

        if (!state
            || !payload.stSocket
            || !payload.element) {

            return state;
        }

        const input: HTMLInputElement = payload.element as HTMLInputElement;
        const stSocket: IStSocket = payload.stSocket;
        stSocket.text = input.value;

        if (stSocket.action === ActionType.None
            && U.isPositiveNumeric(stSocket.key) === true) {

            stSocket.action = ActionType.UpdateStSocket;
        }

        return gStateCode.cloneState(state);
    },

    setSocketTextWithBehaviour: (
        state: IState,
        payload: IStSocketElement): IState => {

        if (!state
            || !payload.stSocket
            || !payload.element) {

            return state;
        }

        const behaviour: IStageBehaviour | null = payload.behaviour;

        if (behaviour) {

            behaviour.resetMax();
        }

        return subtreeActions.setSocketText(
            state,
            payload
        );
    },

    editSubtree: (state: IState): IState => {

        if (!state.lens.treeTab.lensTree
            || !state.lens.treeTab.lensTree.key) {

            return state;
        }

        return gTreesCoreActions.setupForEditSubtree(state);
    },

    deleteSubtree: (state: IState): IState => {

        if (!state.lens.treeTab.lensTree) {

            return state;
        }

        const lensSubtree: ISubtreeSys = state.lens.treeTab.lensSubtree as ISubtreeSys;
        lensSubtree.action = ActionType.DeleteSubtree;
        state.lens.treeTab.loadingKey = state.treesState.selectedKey;
        const effect: any = (state: IState) => subtreeEffects.deleteSubtree(state);

        gDialogueCode.buildDialogue(
            state,
            DialogueType.Confirm,
            effect,
            DelegateType.Effect,
            "Confirm delete",
            "Are you sure you want to delete this subtree?"
        );

        return gStateCode.cloneState(state);
    },

    deleteLensSubtree: (
        state: IState,
        response: any): IState => {

        if (!response?.jsonData) {

            return state;
        }

        const rawTree = response.jsonData;
        gSubtreeCode.clearAllMappedHoles(state);

        const loadedTree: ITreeSys | null = gTreeCode.overWriteLensTreeWithNotice(
            state,
            rawTree,
            `Subtree deleted`);

        if (loadedTree) {

            state.lens.treeTab.stageBehaviour = gStageCode.buildTreeHubStages();
            state.lens.treeTab.lensSubtree = null;
            state.lens.treeTab.ghostSubtree = null;

            gSubtreeCode.pushSubtreeDeleteToTabs(
                state,
                loadedTree.key as string
            );

            // Show tree hub
            gTreeCode.prepareForHub(state);

            gStateCode.addNotification(
                state,
                `Subtree deleted`,
                `Key: ${loadedTree.key}, 
Name: ${loadedTree.name}.`,
                loadedTree.token,
                NotificationType.Info
            );
        }

        return gTreesCoreActions.reloadTrees(state);
    },

    showSubtreeSpread: (state: IState): IStateAnyArray => {

        if (!state.lens.treeTab.lensTree
            || !state.lens.treeTab.lensTree.key) {
            return state;
        }

        return [
            gTreesCoreActions.setupForSubtreeSpread(state),
            gSpreadEffects.getSubtreeSpread(
                state,
                state.lens.treeTab.lensTree)
        ];
    },

    overWriteLensSubtree: (
        state: IState,
        response: any): IState => {

        if (!response?.jsonData) {

            return state;
        }

        const rawSubtree: any = response.jsonData.subtree;
        const rawSocketHoles: Array<any> = response.jsonData.socketHoles;

        gLensCode.checkResponse(
            state,
            response.jsonData
        );

        state.lens.treeTab.saveLock = false;

        const loadedSubtree = gSubtreeCode.loadLensSubtreeRaw(
            state,
            rawSubtree
        );

        if (!loadedSubtree) {

            return gStateCode.cloneState(state);
        }

        gStateCode.addNotification(
            state,
            `Subtree saved`,
            `Key: ${loadedSubtree.tree.key}, 
Name: ${loadedSubtree.tree.name}.`,
            loadedSubtree.tree.token,
            NotificationType.Info
        );

        gSubtreeCode.updateAllMappedHoles(
            state,
            rawSocketHoles);

        state.lens.treeTab.enableSave = true;

        return gTreesCoreActions.reloadTrees(state);
    }
};

export default subtreeActions;
