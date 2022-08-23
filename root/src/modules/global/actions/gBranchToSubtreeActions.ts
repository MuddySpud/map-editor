import IState from "../../interfaces/state/IState";
import IStateAnyArray from "../../interfaces/state/IStateAnyArray";
import IBranchUI from "../../interfaces/state/ui/UIs/IBranchUI";
import INode from "../../interfaces/state/tree/INode";
import { DialogueType } from "../../interfaces/enums/DialogueType";
import { DelegateType } from "../../interfaces/enums/DelegateType";
import IBranchTreeTask from "../../interfaces/state/tree/IBranchTreeTask";
import { NotificationType } from "../../interfaces/enums/NotificationType";
import ISubtreeLoader from "../../interfaces/state/tree/ISubtreeLoader";
import gNodeActions from "./gNodeActions";
import gBranchesStateCode from "../code/gBranchesStateCode";
import gBranchEffects from "../effects/gBranchEffects";
import gNodeCode from "../code/gNodeCode";
import gStateCode from "../code/gStateCode";
import gDialogueCode from "../code/gDialogueCode";
import gStageCode from "../code/gStageCode";
import U from "../gUtilities";
import gLensCode from "../code/gLensCode";
import gBranchTaskActions from "./gBranchTaskActions";
import gBranchTreeTaskCode from "../code/gBranchTreeTaskCode";
import IStSocket from "../../interfaces/state/tree/IStSocket";
import { TabType } from "../../interfaces/enums/TabType";
import gTreeCode from "../code/gTreeCode";


const gBranchToSubtreeActions = {

    overwriteBranchWithSubtree: (
        state: IState,
        response: any): IStateAnyArray => {

        if (!state.lens.nodeTab.lensBranchTreeTask
            || !response.jsonData) {

            return state;
        }

        const rawNode: any = response.jsonData;
        state.lens.nodeTab.saveLock = false;

        const loadedNode: INode<IBranchUI> | null = gBranchesStateCode.findAndReLoadRegisteredNode(
            state,
            rawNode);

        if (loadedNode) {

            loadedNode.ui.branchViewNodeControls = false;
            loadedNode.ui.dummy = false;

            gLensCode.clearTab(
                state,
                TabType.Node
            );

            state.branchesState.current = loadedNode;
            gBranchesStateCode.setLensNodeForUpdate(state);

            const message: string = `Key: ${loadedNode.key}, 
Text: ${loadedNode.discussion},
Subtree: ${loadedNode.link?.tree.name}.`;

            gStateCode.addNotification(
                state,
                `Branch converted to subtree`,
                message,
                loadedNode.token,
                NotificationType.Info
            );
        }

        gTreeCode.reloadTrees(state);

        return gNodeActions.completeNodeSelection(state);
    },

    setUp: (
        state: IState,
        option: INode<IBranchUI>): IStateAnyArray => {

        const dirty: string = gLensCode.isLensNodeDirty(state);

        if (U.isNullOrWhiteSpace(dirty) === false) {

            const message = `${dirty}.
Do you want to discard those changes and convert a branch to a subtree?`;

            // Then need the user to confirm they want to discard the changes
            gDialogueCode.buildDialogue(
                state,
                DialogueType.Confirm,
                gBranchToSubtreeActions.selectOption,
                DelegateType.Action,
                "Confirm discard changes",
                message,
                option);

            return gStateCode.cloneState(state);
        }

        return gBranchToSubtreeActions.selectOption(
            state,
            option);
    },

    selectOption: (
        state: IState,
        option: INode<IBranchUI>): IStateAnyArray => {

        const branchTreeTask: IBranchTreeTask = gBranchTreeTaskCode.createBranchTreeTask(
            state,
            gStateCode.getFreshKey(state),
            state.branchesState.tree.token as string,
            state.branchesState.tree.name,
            option.discussion);

        if (U.isNullOrWhiteSpace(option.token) === false
            && U.isNullOrWhiteSpace(option.key) === false) {

            gLensCode.clearTab(
                state,
                TabType.Node
            );

            gBranchTreeTaskCode.setUpOption(
                state,
                branchTreeTask.socketLoader,
                option
            );
        }

        state.lens.nodeTab.lensBranchTreeTask = branchTreeTask;
        state.lens.nodeTab.stageBehaviour = gStageCode.buildBranchToSubtreeStages(branchTreeTask);

        const reLoad: boolean = gNodeCode.checkDescendantsLoaded(option);

        if (reLoad === true) {

            return gBranchTaskActions.completeSelectionAndNext(
                state,
                gBranchEffects.getBranch(
                    state,
                    option.key as string
                )
            );
        }

        return gBranchTaskActions.completeSelectionAndNext(state);
    },

    resetTree: (state: IState): IState => {

        if (!state
            || !state.lens.nodeTab.lensBranchTreeTask) {

            return state;
        }

        const branchTreeTask: IBranchTreeTask = state.lens.nodeTab.lensBranchTreeTask;

        if (!branchTreeTask.socketLoader.node) {

            return state;
        }

        gBranchTreeTaskCode.setDefaultBranchTreeProperties(
            branchTreeTask,
            state.branchesState.tree.name,
            branchTreeTask.socketLoader.node.discussion
        );

        return gStateCode.cloneState(state);
    },

    resetSubtree: (state: IState): IState => {

        if (!state
            || !state.lens.nodeTab.lensBranchTreeTask) {

            return state;
        }

        gBranchTreeTaskCode.setDefaultBranchSubtreeProperties(state.lens.nodeTab.lensBranchTreeTask);

        return gStateCode.cloneState(state);
    },

    resetBoundaries: (state: IState): IState => {

        if (!state
            || !state.lens.nodeTab.lensBranchTreeTask) {

            return state;
        }

        const subtreeLoader: ISubtreeLoader = state.lens.nodeTab.lensBranchTreeTask.subtreeLoader;
        subtreeLoader.ui.minimiseWarnings = true;
        subtreeLoader.warnNodes = [];
        subtreeLoader.failedAncestors.ancestorKeys = [];
        subtreeLoader.failedDescendants.ancestorKeys = [];

        subtreeLoader.subtree.stSockets.forEach((stSocket: IStSocket) => {

            stSocket.holes = [];
        });

        return gStateCode.cloneState(state);
    }
};

export default gBranchToSubtreeActions;
