import IState from "../../../../interfaces/state/IState";
import IStateAnyArray from "../../../../interfaces/state/IStateAnyArray";
import U from "../../../../global/gUtilities";
import gStateCode from "../../../../global/code/gStateCode";
import gLensCode from "../../../../global/code/gLensCode";
import gDialogueCode from "../../../../global/code/gDialogueCode";
import { DialogueType } from "../../../../interfaces/enums/DialogueType";
import { DelegateType } from "../../../../interfaces/enums/DelegateType";
import gTreesCoreActions from "../../../../global/actions/gTreesCoreActions";
import { LensActionType } from "../../../../interfaces/enums/LensActionType";
import gCoreActions from "../../../../global/actions/gCoreActions";
import { ActionType } from "../../../../interfaces/enums/ActionType";
import gTreeEffects from "../../../../global/effects/gTreeEffects";
import ITreeSys from "../../../../interfaces/state/tree/ITreeSys";
import gTreeCode from "../../../../global/code/gTreeCode";
import IPaginationPayload from "../../../../interfaces/state/ui/payloads/IPaginationPayload";
import gTreeActions from "../../../../global/actions/gTreeActions";
import gTreeFilterEffects from "../../../../global/effects/gTreeFilterEffects";


const treeActions = {

    showTreesPage: (
        state: IState,
        paginationPayload: IPaginationPayload): IStateAnyArray => {

        if (!state
            || !paginationPayload) {

            return state;
        }

        state.treesState.paginationDetails = paginationPayload.paginationDetails;

        return [
            gStateCode.cloneState(state),
            gTreeFilterEffects.filter(state)
        ];
    },

    showTreeHub: (
        state: IState,
        treeKey: string): IStateAnyArray => {

        if (!state) {

            return state;
        }

        if (U.isNullOrWhiteSpace(treeKey) === true) {

            return gStateCode.cloneState(state);
        }

        if (state.treesState.selectedKey === treeKey) {

            return gTreeActions.checkCanSwapTreeTab(
                state,
                "show the tree hub",
                gTreesCoreActions.setupForHub
            );
        }

        state.treesState.queuedKey = treeKey;

        return gTreeActions.askToSwitchRows(
            state,
            'Do you want to discard those changes and select another tree?',
            LensActionType.ShowTreeHub
        );
    },

    showTreeEditor: (
        state: IState,
        treeKey: string): IStateAnyArray => {

        if (!state) {
            
            return state;
        }

        if (U.isNullOrWhiteSpace(treeKey) === true) {

            return gStateCode.cloneState(state);
        }

        if (state.treesState.selectedKey === treeKey) {

            return gTreeActions.checkCanSwapTreeTab(
                state,
                "edit the tree",
                gTreesCoreActions.setupForEditTree
            );
        }

        state.treesState.queuedKey = treeKey;

        return gTreeActions.askToSwitchRows(
            state,
            'Do you want to discard those changes to edit another tree?',
            LensActionType.ShowTreeEditor
        );
    },

    showBranches: (
        state: IState,
        treeKey: string): IStateAnyArray => {

        if (!state) {
            
            return state;
        }

        if (U.isNullOrWhiteSpace(treeKey) === true) {

            return gStateCode.cloneState(state);
        }

        if (state.branchesState.tree.key === treeKey) {

            return gCoreActions.showBranches(state);
        }

        gLensCode.minimiseLens(state);
        state.treesState.queuedKey = treeKey;

        return gTreeActions.askToSwitchRows(
            state,
            'Do you want to discard those changes to view the branches of another tree?',
            LensActionType.ViewBranches
        );
    },

    showProject: (
        state: IState,
        treeKey: string): IStateAnyArray => {

        if (!state) {
            
            return state;
        }

        if (U.isNullOrWhiteSpace(treeKey) === true) {

            return gStateCode.cloneState(state);
        }

        if (state.treesState.selectedKey === treeKey) {

            return gTreeActions.checkCanSwapTreeTab(
                state,
                "show the tree project",
                gCoreActions.showProject
            );
        }

        gLensCode.minimiseLens(state);
        state.treesState.queuedKey = treeKey;

        return gTreeActions.askToSwitchRows(
            state,
            "Do you want to discard those changes to view another tree's project?",
            LensActionType.ViewProject
        );
    },

    showSubtreeHub: (
        state: IState,
        treeKey: string): IStateAnyArray => {

        if (!state) {

            return state;
        }

        if (U.isNullOrWhiteSpace(treeKey) === true) {

            return gStateCode.cloneState(state);
        }

        if (state.treesState.selectedKey === treeKey) {

            return gTreeActions.checkCanSwapTreeTab(
                state,
                "show the subtree hub",
                gTreesCoreActions.setupForSubtreeHubOrCreate
            );
        }

        state.treesState.queuedKey = treeKey;

        return gTreeActions.askToSwitchRows(
            state,
            'Do you want to discard those changes and view the subtree hub of another tree?',
            LensActionType.ShowSubtreeHub
        );
    },

    showBotHub: (
        state: IState,
        treeKey: string): IStateAnyArray => {

        if (!state) {

            return state;
        }

        if (U.isNullOrWhiteSpace(treeKey) === true) {

            return gStateCode.cloneState(state);
        }

        if (state.treesState.selectedKey === treeKey) {

            return gTreeActions.checkCanSwapTreeTab(
                state,
                "show the bot hub",
                gTreesCoreActions.setupForBotHub
            );
        }

        state.treesState.queuedKey = treeKey;

        return gTreeActions.askToSwitchRows(
            state,
            'Do you want to discard those changes and view the bot hub of another tree?',
            LensActionType.ShowBotHub
        );
    },

    deleteTree: (
        state: IState,
        treeKey: string): IState => {

        if (!state
            || U.isNullOrWhiteSpace(treeKey) === true) {

            return state;
        }

        const tree: ITreeSys | null = gTreeCode.getTreeFromState(
            state,
            treeKey
        );

        if (!tree
            || U.isNullOrWhiteSpace(tree.key) === true) {

            return state;
        }

        tree.action = ActionType.DeleteTree;
        state.treesState.selectedKey = tree.key as string;
        state.lens.treeTab.loadingKey = tree.key as string;
        const effect: any = (state: IState) => gTreeEffects.deleteSelectedKeyTree(state);

        gDialogueCode.buildDialogue(
            state,
            DialogueType.Confirm,
            effect,
            DelegateType.Effect,
            "Confirm delete",
            "Are you sure you want to delete the tree?");

        return gStateCode.cloneState(state);
    }
};

export default treeActions;
