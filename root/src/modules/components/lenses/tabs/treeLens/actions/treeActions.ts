import IState from "../../../../../interfaces/state/IState";
import IStateAnyArray from "../../../../../interfaces/state/IStateAnyArray";
import gStateCode from "../../../../../global/code/gStateCode";
import gTreesStateCode from "../../../../../global/code/gTreesStateCode";
import ITreeSys from "../../../../../interfaces/state/tree/ITreeSys";
import { ActionType } from "../../../../../interfaces/enums/ActionType";
import gDialogueCode from "../../../../../global/code/gDialogueCode";
import { DialogueType } from "../../../../../interfaces/enums/DialogueType";
import { DelegateType } from "../../../../../interfaces/enums/DelegateType";
import gNotificationCode from "../../../../../global/code/gNotificationCode";
import treeEffects from "../effects/treeEffects";
import gTreeEffects from "../../../../../global/effects/gTreeEffects";
import gTreeCode from "../../../../../global/code/gTreeCode";
import gTreesCoreActions from "../../../../../global/actions/gTreesCoreActions";
import U from "../../../../../global/gUtilities";
import gTabCode from "../../../../../global/code/gTabCode";
import gHubActions from "../../../../../global/hubs/gHubActions";
import gHistoryEffects from "../../../../../global/effects/gHistoryEffects";
import ITreeTab from "../../../../../interfaces/state/ui/tabs/ITreeTab";
import gShapeEffects from "../../../../../global/effects/gShapeEffects";
import tagsEffects from "../../../../../global/effects/gTagEffects";
import gValidationEffects from "../../../../../global/effects/gValidationEffects";
import ITreeElement from "../../../../../interfaces/state/ui/payloads/ITreeElement";
import INodeBaseElement from "../../../../../interfaces/state/ui/payloads/INodeBaseElement";
import INodeBase from "../../../../../interfaces/state/tree/INodeBase";
import gLensCode from "../../../../../global/code/gLensCode";
import { TabType } from "../../../../../interfaces/enums/TabType";
import gTreeActions from "../../../../../global/actions/gTreeActions";


const treeActions = {

    publishTree: (state: IState): IStateAnyArray => {

        return [
            gStateCode.cloneState(state),
            treeEffects.publishTree(state)
        ];
    },

    toggleFlat: (state: IState): IState => {

        if (!state
            || !state.lens.treeTab.lensTree) {

            return state;
        }

        const lensTree: ITreeSys = state.lens.treeTab.lensTree;
        lensTree.isFlat = lensTree.isFlat !== true;

        return gStateCode.cloneState(state);
    },

    toggleLoop: (state: IState): IState => {

        if (!state
            || !state.lens.treeTab.lensTree) {

            return state;
        }

        const lensTree: ITreeSys = state.lens.treeTab.lensTree;
        lensTree.isLoop = lensTree.isLoop !== true;
        lensTree.isSubtree = lensTree.isLoop;

        return gStateCode.cloneState(state);
    },

    toggleAllowDiscussionPlugins: (state: IState): IState => {

        if (!state
            || !state.lens.treeTab.lensTree) {

            return state;
        }

        const lensTree: ITreeSys = state.lens.treeTab.lensTree;
        lensTree.allowDiscussionPlugins = lensTree.allowDiscussionPlugins !== true;

        return gStateCode.cloneState(state);
    },

    toggleAllowOptionPlugins: (state: IState): IState => {

        if (!state
            || !state.lens.treeTab.lensTree) {

            return state;
        }

        const lensTree: ITreeSys = state.lens.treeTab.lensTree;
        lensTree.allowOptionPlugins = lensTree.allowOptionPlugins !== true;

        return gStateCode.cloneState(state);
    },

    toggleAllowDiscussionPluginAudio: (state: IState): IState => {

        if (!state
            || !state.lens.treeTab.lensTree) {

            return state;
        }

        const lensTree: ITreeSys = state.lens.treeTab.lensTree;
        lensTree.allowDiscussionPluginAudio = lensTree.allowDiscussionPluginAudio !== true;

        return gStateCode.cloneState(state);
    },

    setName: (
        state: IState,
        payload: ITreeElement): IStateAnyArray => {

        if (!state
            || !payload) {

            return state;
        }

        const input: HTMLInputElement = payload.element as HTMLInputElement;
        const treeName: string = input.value;
        payload.tree.name = treeName;
        payload.tree.ui.raw = false;

        if (treeName !== state.lens.validationResults.treeName.value) {

            return [
                gStateCode.cloneState(state),
                gTreeEffects.validateTreeName(
                    state,
                    treeName
                )
            ];
        }

        return gStateCode.cloneState(state);
    },

    setTitle: (
        state: IState,
        payload: ITreeElement): IStateAnyArray => {

        if (!state
            || !payload) {

            return state;
        }

        const input: HTMLInputElement = payload.element as HTMLInputElement;
        const treeTitle: string = input.value;
        payload.tree.title = treeTitle;
        payload.tree.ui.raw = false;

        return gStateCode.cloneState(state);
    },

    setDescription: (
        state: IState,
        payload: ITreeElement): IState => {

        const textarea: HTMLTextAreaElement = payload.element as HTMLTextAreaElement;
        payload.tree.description = textarea.value;
        payload.tree.ui.raw = false;

        return gStateCode.cloneState(state);
    },

    setNotes: (
        state: IState,
        payload: ITreeElement): IState => {

        const textarea: HTMLTextAreaElement = payload.element as HTMLTextAreaElement;
        payload.tree.notes = textarea.value;
        payload.tree.ui.raw = false;

        return gStateCode.cloneState(state);
    },

    setRootDiscussion: (
        state: IState,
        payload: INodeBaseElement): IState => {

        const textarea: HTMLTextAreaElement = payload.element as HTMLTextAreaElement;
        const root: INodeBase = payload.node;
        root.discussion = textarea.value;

        return gStateCode.cloneState(state);
    },

    setTags: (
        state: IState,
        payload: ITreeElement): IState => {

        const textarea: HTMLTextAreaElement = payload.element as HTMLTextAreaElement;
        payload.tree.tags = textarea.value;
        payload.tree.ui.raw = false;

        return gStateCode.cloneState(state);
    },

    save: (state: IState): IState => {

        if (!state.lens.treeTab.lensTree) {

            return state;
        }

        if (!gTabCode.canSave(state.lens.treeTab)) {

            return gStateCode.cloneState(state);
        }

        state.lens.treeTab.saveLock = true;
        const isValid: boolean = gTreesStateCode.lensTreeIsValidDirty(state);
        state.lens.treeTab.loadingKey = state.treesState.selectedKey;

        if (!isValid) {

            gNotificationCode.buildTreeValidationFailedNotification(state);
        }

        const lensTree: ITreeSys = state.lens.treeTab.lensTree as ITreeSys;

        if (lensTree.action !== ActionType.CreateTree
            && lensTree.action !== ActionType.UpdateTree) {

            alert(`The tree action type: ${lensTree.action} has not been coded for yet...`);
        }

        const effect: any = (state: IState) => treeEffects.saveTree(state);

        gDialogueCode.buildDialogue(
            state,
            DialogueType.Confirm,
            effect,
            DelegateType.Effect,
            "Confirm save",
            `Are you sure you want to save the current state of the tree?`);

        return gStateCode.cloneState(state);
    },

    clone: (state: IState): IState => {

        if (!state.lens.treeTab.lensTree) {

            return state;
        }

        if (!gTabCode.canSave(state.lens.treeTab)) {

            return gStateCode.cloneState(state);
        }

        state.lens.treeTab.saveLock = true;
        state.lens.treeTab.loadingKey = state.lens.treeTab.lensTree.key;
        state.treesState.selectedKey = state.lens.treeTab.lensTree.key as string;

        const isValid: boolean = gTreesStateCode.lensTreeIsValidDirty(state);

        if (!isValid) {

            gNotificationCode.buildTreeValidationFailedNotification(state);
        }

        const effect: any = (state: IState) => treeEffects.cloneTree(state);

        gDialogueCode.buildDialogue(
            state,
            DialogueType.Confirm,
            effect,
            DelegateType.Effect,
            "Confirm clone",
            `Are you sure you want to clone this tree?`);

        return gStateCode.cloneState(state);
    },

    overWriteLensTree: (
        state: IState,
        response: any): any => {

        if (!response?.jsonData) {

            return state;
        }

        return treeActions.overWriteLensTreeWithNotice(
            state,
            response.jsonData,
            `Tree saved`);
    },

    overWriteClonedLensTree: (
        state: IState,
        response: any): any => {

        if (!response?.jsonData) {

            return state;
        }

        gTreeCode.prepareForHub(state);

        return treeActions.overWriteLensTreeWithNotice(
            state,
            response.jsonData,
            `Tree cloned`);
    },

    overWriteLensTreeWithNotice: (
        state: IState,
        rawTree: any,
        notice: string): IState => {

        gTreeCode.overWriteLensTreeWithNotice(
            state,
            rawTree,
            notice
        );

        // const loadedTree: ITreeSys | null = gTreeCode.overWriteLensTreeWithNotice(
        //     state,
        //     response,
        //     notice
        // );

        // if (!loadedTree) {

        //     return gStateCode.cloneState(state);
        // }

        return gTreesCoreActions.reloadTrees(state);
    },

    cancel: (state: IState): IStateAnyArray => {

        const treeTab: ITreeTab = state.lens.treeTab;

        if (treeTab.ghostTree
            && U.isNegativeNumeric(treeTab.ghostTree.key) === true) {

            // Then go back to trees and close treeTab
            gLensCode.clearTab(
                state,
                TabType.Tree
            );

            return gStateCode.cloneState(state);
        }

        gTreeCode.resetEdits(state);

        return gTreesCoreActions.setupForHub(state);
    },

    editTree: (state: IState): IStateAnyArray => {

        if (!state.lens.treeTab.lensTree) {

            return state;
        }

        return gTreeActions.checkCanSwapTreeTab(
            state,
            "edit the tree",
            gTreesCoreActions.setupForEditTree
        );
    },

    validateTree: (state: IState): IState => {

        if (!state.lens.treeTab.lensTree) {

            return state;
        }

        const lensTree: ITreeSys = state.lens.treeTab.lensTree as ITreeSys;

        const effect: any = (state: IState) => gValidationEffects.validateTree(
            state,
            lensTree.key as string,
            lensTree.token as string,
            lensTree.isSubtree
        );

        gDialogueCode.buildDialogue(
            state,
            DialogueType.Confirm,
            effect,
            DelegateType.Effect,
            "Confirm run validation",
            "Are you sure you want to validation on this tree, it may take a while?");

        return gStateCode.cloneState(state);
    },

    showTreeShape: (state: IState): IStateAnyArray => {

        if (!state.lens.treeTab.lensTree
            || !state.lens.treeTab.lensTree.key) {

            return state;
        }

        return [
            gTreesCoreActions.setupForSubtreeShape(state),
            gShapeEffects.getSubtreeShape(
                state,
                state.lens.treeTab.lensTree)
        ];
    },

    showSubtreeHub: (state: IState): IStateAnyArray => {

        if (!state.lens.treeTab.lensTree) {

            return state;
        }

        return gTreeActions.checkCanSwapTreeTab(
            state,
            "show the subtree hub",
            gTreesCoreActions.setupForSubtreeHubOrCreate
        );
    },

    showBotHub: (state: IState): IStateAnyArray => {

        if (!state.lens.treeTab.lensTree) {

            return state;
        }

        return gTreeActions.checkCanSwapTreeTab(
            state,
            "show the bot hub",
            gTreesCoreActions.setupForBotHub
        );
    },

    viewBranches: (state: IState): IStateAnyArray => {

        return gHubActions.showTreeBranches(
            state,
            state.treesState.selectedKey
        );
    },

    deleteTree: (state: IState): IState => {

        if (!state.lens.treeTab.lensTree) {

            return state;
        }

        const lensTree: ITreeSys = state.lens.treeTab.lensTree as ITreeSys;
        lensTree.action = ActionType.DeleteTree;
        state.lens.treeTab.loadingKey = state.treesState.selectedKey;
        const effect: any = (state: IState) => gTreeEffects.deleteTree(state);

        gDialogueCode.buildDialogue(
            state,
            DialogueType.Confirm,
            effect,
            DelegateType.Effect,
            "Confirm delete",
            "Are you sure you want to delete the tree?");

        return gStateCode.cloneState(state);
    },

    cloneTree: (state: IState): IStateAnyArray => {

        if (!state.lens.treeTab.lensTree) {

            return state;
        }

        return gTreeActions.checkCanSwapTreeTab(
            state,
            "clone a tree",
            gTreesCoreActions.setupForClone
        );
    },

    showHistory: (state: IState): IStateAnyArray => {

        if (!state.lens.treeTab.lensTree
            || !state.lens.treeTab.lensTree.key) {

            return state;
        }

        return [
            gTreesCoreActions.setupForHistory(state),
            gHistoryEffects.getTreeHistory(state)
        ];
    },

    showTreeHub: (state: IState): IStateAnyArray => {

        if (!state.lens.treeTab.lensTree) {

            return state;
        }

        return gTreeActions.checkCanSwapTreeTab(
            state,
            "show the tree hub",
            gTreesCoreActions.setupForHub
        );
    },

    showSharedTags: (state: IState): IStateAnyArray => {

        if (!state.lens.treeTab.lensTree
            || U.isPositiveNumeric(state.lens.treeTab.lensTree.key) === false) {

            return state;
        }

        return [
            gTreesCoreActions.setupForTags(state),
            tagsEffects.getTreeKin(state)
        ];
    }
};

export default treeActions;
