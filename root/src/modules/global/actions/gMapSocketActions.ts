import IState from "../../interfaces/state/IState";
import IStateAnyArray from "../../interfaces/state/IStateAnyArray";
import gStateCode from "../code/gStateCode";
import gDialogueCode from "../code/gDialogueCode";
import { DialogueType } from "../../interfaces/enums/DialogueType";
import { DelegateType } from "../../interfaces/enums/DelegateType";
import U from "../gUtilities";
import gLensCode from "../code/gLensCode";
import ISocketTask from "../../interfaces/state/tree/ISocketTask";
import { ActionType } from "../../interfaces/enums/ActionType";
import gStageCode from "../code/gStageCode";
import IStageBehaviour from "../../interfaces/behaviours/IStageBehaviour";
import gSubtreeEffects from "../effects/gSubtreeEffects";
import gSocketTaskCode from "../code/gSocketTaskCode";
import IBranchUI from "../../interfaces/state/ui/UIs/IBranchUI";
import INode from "../../interfaces/state/tree/INode";
import ISubtreeSys from "../../interfaces/state/tree/ISubtreeSys";
import IStRoot from "../../interfaces/state/tree/IStRoot";
import gBranchesStateCode from "../code/gBranchesStateCode";
import gNodeCode from "../code/gNodeCode";
import StSocket from "../../state/tree/StSocket";


const gMapSocketActions = {

    setUp: (state: IState): IStateAnyArray => {

        const dirty: string = gLensCode.isLensNodeDirty(state);

        if (U.isNullOrWhiteSpace(dirty) === false) {

            const message = `${dirty}.
Do you want to discard those changes and mark an option as a socket?`;

            // Then need the user to confirm they want to discard the changes
            gDialogueCode.buildDialogue(
                state,
                DialogueType.Confirm,
                gMapSocketActions.completeMapSetup,
                DelegateType.Action,
                "Confirm discard changes",
                message);

            return gStateCode.cloneState(state);
        }

        return gMapSocketActions.completeMapSetup(state);
    },

    completeMapSetup: (state: IState): IStateAnyArray => {

        if (!state
            || !state.branchesState.current) {

            return state;
        }

        gBranchesStateCode.deselectAllNodes(state);

        const socketTask: ISocketTask = gSocketTaskCode.setupLensSocketTask(state);
        const stageBehaviour: IStageBehaviour = gStageCode.buildMarkSocketStages(socketTask);
        state.lens.nodeTab.stageBehaviour = stageBehaviour;
        socketTask.action = ActionType.MapHoleToSocket;
        socketTask.ui.optionIsSocket = true;
        gSocketTaskCode.setupLensNodeTab(state);

        const current: INode<IBranchUI> = state.branchesState.current;
        state.branchesState.selected = current;

        const currentUI: IBranchUI = current.ui;
        gNodeCode.expandDummy(current);
        currentUI.hole = true;
        currentUI.selected = true;

        const lensSubtree: ISubtreeSys = socketTask.lensSubtree;
        const stRoot: IStRoot = lensSubtree.stRoot;

        if (!lensSubtree.tree.isSubtree) {

            // Create new socket is the default, so create a subtree and socket
            // and skip the createSubtree behaviour stage
            socketTask.action = ActionType.CreateSubtreeAndMapToSocket;
            lensSubtree.action = ActionType.CreateSubtree;
            stRoot.text = `StRoot for: ${lensSubtree.tree.token}`;
            stRoot.action = ActionType.CreateStRoot;
            stRoot.key = gStateCode.getFreshKey(state);

            // Add socket to be mapped to the hole
            socketTask.selectedSocket = gSocketTaskCode.autoAddStSocketToTask(
                state,
                socketTask);

            // return stageBehaviour.nextStage(state);
            return gStateCode.cloneState(state);
        }

        return [
            // stageBehaviour.nextStage(state),
            gStateCode.cloneState(state),
            gSubtreeEffects.getSockets(state)
        ];
    },

    completeEditSetup: (state: IState): IStateAnyArray => {

        const socketTask: ISocketTask = gSocketTaskCode.setupLensSocketTask(state);
        const stageBehaviour: IStageBehaviour = gStageCode.buildMarkSocketStages(socketTask);
        state.lens.nodeTab.stageBehaviour = stageBehaviour;
        // stageBehaviour.nextStage(state);

        socketTask.action = ActionType.EditHole;
        gSocketTaskCode.setupLensNodeTab(state);
        state.branchesState.selected = state.branchesState.current;
        socketTask.node = state.branchesState.selected;
        
        if (state.branchesState.selected) {

            state.branchesState.selected.ui.selected = true; // Reset as was cleared in setupLensNodeTab

            if (state.branchesState.selected.isSocket === true) {

                socketTask.ui.newSocket = false;

                if (!state.branchesState.selected.socketHole) {

                    alert('SocketHole cannot be null as isSocket is true!');
                }
                else {
                    socketTask.selectedSocket = new StSocket(state.branchesState.selected.socketHole.socketKey);
                }
            }
        }

        return [
            gStateCode.cloneState(state),
            gSubtreeEffects.getSockets(state)
        ];
    }
};

export default gMapSocketActions;
