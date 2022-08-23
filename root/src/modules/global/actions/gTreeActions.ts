import IState from "../../interfaces/state/IState";
import IStateAnyArray from "../../interfaces/state/IStateAnyArray";
import ITreeSys from "../../interfaces/state/tree/ITreeSys";
import { NotificationType } from "../../interfaces/enums/NotificationType";
import { LensStage } from "../../interfaces/enums/LensStage";
import { ActionType } from "../../interfaces/enums/ActionType";
import IStringValidation from "../../interfaces/state/ui/IStringValidation";
import StringValidation from "../../state/ui/StringValidation";
import gLensCode from "../code/gLensCode";
import gStateCode from "../code/gStateCode";
import gTreeCode from "../code/gTreeCode";
import gTreesCoreActions from "./gTreesCoreActions";
import { LensActionType } from "../../interfaces/enums/LensActionType";
import gDialogueCode from "../code/gDialogueCode";
import { DialogueType } from "../../interfaces/enums/DialogueType";
import { DelegateType } from "../../interfaces/enums/DelegateType";
import U from "../gUtilities";
import { DisplayType } from "../../interfaces/enums/DisplayType";
import gSubtreeCode from "../code/gSubtreeCode";
import ISubtreeSys from "../../interfaces/state/tree/ISubtreeSys";


const loadTree = (
    state: IState,
    rawTree: any): void => {

    if (!state) {

        return state;
    }

    gLensCode.checkResponse(
        state,
        rawTree
    );

    gTreeCode.loadLensTreeFromRaw(
        state,
        rawTree
    );

    if (state.lens.treeTab.lensTree
        && state.lens.treeTab.stageBehaviour.getStage() === LensStage.TreeEdit) {

        state.lens.treeTab.lensTree.action = ActionType.UpdateTree;
    }
};

const gTreeActions = {

    createTree: (state: IState): IStateAnyArray => {

        if (!state) {

            return state;
        }

        state.treesState.queuedKey = gStateCode.getFreshKey(state);

        return gTreeActions.askToSwitchRows(
            state,
            'Do you want to discard those changes and create another tree?',
            LensActionType.CreateTree
        );
    },

    confirmRefreshLensTree: (state: IState): IState => {

        const same = gTreeCode.checkTreeSysMatch(
            state.lens.treeTab.lensTree as ITreeSys,
            state.lens.treeTab.ghostTree as ITreeSys,
        );

        if (same) {
            return gTreeActions.refreshLensTree(state);
        }

        gDialogueCode.buildDialogue(
            state,
            DialogueType.Confirm,
            gTreeActions.refreshLensTree,
            DelegateType.Action,
            "Confirm refresh tree tab",
            "There are unsaved changes are you sure you want to discard them and refresh the tree tab?");

        return gStateCode.cloneState(state);
    },

    checkCanSwapTreeTab: (
        state: IState,
        message: string,
        actionDelegate: (state: IState) => IStateAnyArray): IStateAnyArray => {

        if (state.lens.treeTab.stageBehaviour.checkDirty === true) {

            let dirty: string = '';
            let clearTree: boolean = false;
            let clearSubtree: boolean = false;

            if (gSubtreeCode.isLenSubtreeDirty(state) === true) {

                dirty = "There are unsaved subtree changes";
                clearSubtree = true;
            }
            else if (gTreeCode.isLensTreeDirty(state) === true) {

                dirty = "There are unsaved tree changes";
                clearTree = true;
            }

            const actionDelegateWrapper: (state: IState) => IStateAnyArray = (state: IState): IStateAnyArray => {

                if (clearSubtree) {

                    state.lens.treeTab.lensSubtree = gSubtreeCode.cloneSubtree(state.lens.treeTab.ghostSubtree as ISubtreeSys);
                }
                else if (clearTree) {

                    state.lens.treeTab.lensTree = gTreeCode.cloneTree(state.lens.treeTab.ghostTree as ITreeSys);
                }

                return actionDelegate(state);
            };

            if (U.isNullOrWhiteSpace(dirty) === false) {

                const text = `${dirty}.
Do you want to discard those changes and ${message}?`;

                // Then need the user to confirm they want to discard the changes
                gDialogueCode.buildDialogue(
                    state,
                    DialogueType.Confirm,
                    actionDelegateWrapper,
                    DelegateType.Action,
                    "Confirm discard changes",
                    text
                );

                return gStateCode.cloneState(state)
            }
        }

        return actionDelegate(state);
    },

    refreshLensTree: (state: IState): IState => {

        if (!state
            || !state.lens.treeTab.ghostTree
            || !state.lens.treeTab.lensTree) {

            return state;
        }

        const same = gTreeCode.checkTreeSysMatch(
            state.lens.treeTab.lensTree as ITreeSys,
            state.lens.treeTab.ghostTree as ITreeSys,
        );

        let text = `No changes had been made, so no data was discarded.`;

        if (!same) {
            text = `Changes had been made and were discarded.`;
        }

        state.lens.treeTab.lensTree = gTreeCode.cloneTree(state.lens.treeTab.ghostTree);

        gStateCode.addNotification(
            state,
            `Tree tab refreshed`,
            text,
            state.lens.treeTab.lensTree?.token ?? null,
            NotificationType.Info
        );

        return gStateCode.cloneState(state);
    },

    toggleMinimiseTree: (
        state: IState,
        tree: ITreeSys): IState => {

        if (!state
            || !tree) {

            return state;
        }

        tree.ui.minimise = tree.ui.minimise === false;

        return gStateCode.cloneState(state);
    },

    showSelectedTree: (state: IState): IState => {

        const selectedTree: ITreeSys | null = gTreeCode.getTreeFromState(
            state,
            state.treesState.selectedKey
        );

        if (selectedTree) {

            selectedTree.ui.show = true;
        }

        state.displayType = DisplayType.Trees;

        return gStateCode.cloneState(state);
    },

    askToSwitchRows: (
        state: IState,
        question: string,
        lensActionsType: LensActionType): IStateAnyArray => {

        const dirty: string = gLensCode.isLensTreeTabDirty(state);

        if (U.isNullOrWhiteSpace(dirty) === false) {

            const message = `${dirty}.
${question}`;

            // Then need the user to confirm they want to discard the changes
            gDialogueCode.buildDialogue(
                state,
                DialogueType.Confirm,
                gTreesCoreActions.completeTreeSelection,
                DelegateType.Action,
                "Confirm discard changes",
                message,
                lensActionsType);

            return gStateCode.cloneState(state);
        }

        return gTreesCoreActions.completeTreeSelection(
            state,
            lensActionsType);
    },

    loadTree: (
        state: IState,
        response: any): IState => {

        if (!response?.jsonData) {

            return state;
        }

        loadTree(
            state,
            response.jsonData
        );

        return gStateCode.cloneState(state);
    },

    loadTreeAndShowTab: (
        state: IState,
        response: any): IState => {

        if (!response?.jsonData) {

            return state;
        }

        loadTree(
            state,
            response.jsonData
        );

        gTreeCode.prepareForHub(state);

        return gStateCode.cloneState(state);
    },

    processTreeNameValidation: (
        state: IState,
        response: any): IState => {

        if (!state
            || !response?.jsonData) {

            return state;
        }

        const treeNameValidation: IStringValidation = new StringValidation();
        treeNameValidation.success = response.jsonData.success;
        treeNameValidation.value = response.jsonData.name;
        state.lens.validationResults.treeName = treeNameValidation;

        return gStateCode.cloneState(state);
    },

    removeDeletedTree: (
        state: IState,
        response: any): IState => {

        if (!state
            || !response?.jsonData) {

            return state;
        }

        gLensCode.checkResponse(
            state,
            response.jsonData
        );

        const deletedTree: ITreeSys | null = gTreeCode.loadTreeSys(response.jsonData);

        if (deletedTree) {

            gLensCode.clearChildTabsAfterTreeDelete(
                state,
                deletedTree.key);

            gStateCode.addNotification(
                state,
                `Tree deleted`,
                `Key: ${deletedTree.key}, 
Name: ${deletedTree.name}.`,
                deletedTree.token,
                NotificationType.Info
            );
        }

        return gTreesCoreActions.reloadTreesAndClearStats(state);
    },

    showTreeHub: (
        state: IState,
        treeKey: string | null): IStateAnyArray => {

        if (!state
            || U.isNullOrWhiteSpace(treeKey) === true) {

            return state;
        }

        gTreeCode.setSelectedTreeKey(
            state,
            treeKey as string);

        return gTreesCoreActions.setupForHub(state);
    }
};

export default gTreeActions;
