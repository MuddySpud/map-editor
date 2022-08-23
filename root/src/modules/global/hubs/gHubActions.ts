import IState from "../../interfaces/state/IState";
import IStateAnyArray from "../../interfaces/state/IStateAnyArray";
import INode from "../../interfaces/state/tree/INode";
import IBranchUI from "../../interfaces/state/ui/UIs/IBranchUI";
import { DialogueType } from "../../interfaces/enums/DialogueType";
import { DelegateType } from "../../interfaces/enums/DelegateType";
import gStateCode from "../code/gStateCode";
import gCoreActions from "../actions/gCoreActions";
import { TabType } from "../../interfaces/enums/TabType";
import projectInitState from "../../components/core/projectCore/code/projectInitState";
import nodeActions from "../../components/displays/branchesDisplay/actions/nodeActions";
import branchesInitState from "../../components/core/branchesCore/code/branchesInitState";
import gDialogueCode from "../code/gDialogueCode";
import gLensCode from "../code/gLensCode";
import U from "../gUtilities";


const gHubActions = {

    showTreeBranches: (
        state: IState,
        treeKey: string): IStateAnyArray => {

        if (state.branchesState.tree.key === treeKey) {

            return gCoreActions.showBranches(state);
        }

        const dirty: string = gLensCode.isLensNodeDirty(state);

        if (U.isNullOrWhiteSpace(dirty) === false) {

            const message = `${dirty}.
Do you want to discard those changes and view another tree's branches?`;

            // Then need the user to confirm they want to discard the changes
            gDialogueCode.buildDialogue(
                state,
                DialogueType.Confirm,
                gHubActions.confirmedShowTreeBranches,
                DelegateType.Action,
                "Confirm discard changes",
                message,
                state.treesState.selectedKey);

            return gStateCode.cloneState(state);
        }

        return gHubActions.confirmedShowTreeBranches(
            state,
            treeKey
        );
    },

    showTreeProject: (
        state: IState,
        treeKey: string): IStateAnyArray => {

        if (state.branchesState.tree.key === treeKey) {

            return gCoreActions.showProject(state);
        }

        const dirty: string = gLensCode.isLensNodeDirty(state);

        if (U.isNullOrWhiteSpace(dirty) === false) {

            const message = `${dirty}.
Do you want to discard those changes and view another tree's project?`;

            // Then need the user to confirm they want to discard the changes
            gDialogueCode.buildDialogue(
                state,
                DialogueType.Confirm,
                gHubActions.confirmedShowTreeProject,
                DelegateType.Action,
                "Confirm discard changes",
                message,
                state.treesState.selectedKey);

            return gStateCode.cloneState(state);
        }

        return gHubActions.confirmedShowTreeProject(
            state,
            treeKey
        );
    },

    confirmedShowTreeBranches: (
        state: IState,
        treeKey: string): IStateAnyArray => {

        gLensCode.clearTab(
            state,
            TabType.Node
        );

        return branchesInitState.initialiseBranchesDisplay(
            state,
            treeKey
        );
    },

    confirmedShowTreeProject: (
        state: IState,
        treeKey: string): IStateAnyArray => {

        gLensCode.clearTab(
            state,
            TabType.Node
        );

        return projectInitState.initialiseProjectDisplay(
            state,
            treeKey
        );
    },

    initialiseFocusedBranchesDisplay: (
        state: IState,
        treeToken: string,
        nodeKey: string): IStateAnyArray => {

        return branchesInitState.initialiseFocusedBranchesDisplay(
            state,
            treeToken,
            nodeKey
        );
    },

    selectNode: (
        state: IState,
        selected: INode<IBranchUI>): IStateAnyArray => {

        return nodeActions.selectNode(
            state,
            selected);
    }
};

export default gHubActions;
