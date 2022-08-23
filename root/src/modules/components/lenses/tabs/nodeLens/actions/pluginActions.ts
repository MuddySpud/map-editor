import IState from "../../../../../interfaces/state/IState";
import gStateCode from "../../../../../global/code/gStateCode";
import { DiscussionType } from "../../../../../interfaces/enums/DiscussionType";
import gSession from "../../../../../global/gSession";
import Filters from "../../../../../state/constants/Filters";
import ILensUI from "../../../../../interfaces/state/ui/UIs/ILensUI";
import INode from "../../../../../interfaces/state/tree/INode";
import U from "../../../../../global/gUtilities";
import { DialogueType } from "../../../../../interfaces/enums/DialogueType";
import { DelegateType } from "../../../../../interfaces/enums/DelegateType";
import gDialogueCode from "../../../../../global/code/gDialogueCode";


const confirmBinDiscussionExists = (node: INode<ILensUI>): INode<ILensUI> => {

    if (!node.bin) {

        node.bin = {};
    }

    if (!node.bin.discussion) {

        node.bin.discussion = {};
    }

    return node;
}

const checkCanChange = (
    state: IState,
    node: INode<ILensUI>,
    pluginType: DiscussionType): boolean => {

    if (!state.branchesState.selected) {

        return true;
    }

    if (node.ui.raw) {

        if (U.isNullOrWhiteSpace(state.branchesState.selected.discussion)) {

            return true;
        }
    }
    else {
        if (U.isNullOrWhiteSpace(node.discussion)) {

            return true;
        }

        if (node.bin.discussion.type === pluginType) {

            return true;
        }
    }

    return false;
}

const pluginActions = {

    showPlugins: (state: IState): IState => {

        if (!state
            || !state.lens.nodeTab.lensNode) {

            return state;
        }

        state.lens.nodeTab.lensNode.ui.showDiscussionPlugins = true;
        gSession.setFocusFilter(Filters.pluginSelectFilter);

        return gStateCode.cloneState(state);
    },

    hidePlugins: (state: IState): IState => {

        if (!state
            || !state.lens.nodeTab.lensNode) {

            return state;
        }

        state.lens.nodeTab.lensNode.ui.showDiscussionPlugins = false;
        gSession.removeFocusFilter(Filters.pluginSelectFilter);

        return gStateCode.cloneState(state);
    },

    selectPlugin: (
        state: IState,
        pluginType: DiscussionType): IState => {

        if (!state
            || !state.lens.nodeTab.lensNode) {

            return state;
        }

        const lensNode: INode<ILensUI> = confirmBinDiscussionExists(state.lens.nodeTab.lensNode);

        if (checkCanChange(
            state,
            lensNode,
            pluginType)) {

            return pluginActions.completeSelectPlugin(
                state,
                pluginType
            );
        }

        // Then need the user to confirm they want to discard the changes
        gDialogueCode.buildDialogue(
            state,
            DialogueType.Confirm,
            pluginActions.completeSelectPlugin,
            DelegateType.Action,
            "Confirm discard changes",
            `Changing discussion type will clear all the discussion data, are you sure you want to continue?`,
            pluginType);

        return gStateCode.cloneState(state);
    },

    completeSelectPlugin: (
        state: IState,
        pluginType: DiscussionType): IState => {

        if (!state
            || !state.lens.nodeTab.lensNode) {

            return state;
        }

        const lensNode: INode<ILensUI> = confirmBinDiscussionExists(state.lens.nodeTab.lensNode);
        lensNode.bin.discussion.type = pluginType;
        lensNode.ui.raw = false;

        window.TreeSolve.discussionPlugins.checkCurrent(
            state,
            lensNode
        );

        lensNode.ui.showDiscussionPlugins = false;
        gSession.setFocusFilter(Filters.discussionFocusFilter);

        return gStateCode.cloneState(state);
    },

    clearPlugins: (state: IState): IState => {

        if (!state
            || !state.lens.nodeTab.lensNode) {

            return state;
        }

        const lensNode: INode<ILensUI> = confirmBinDiscussionExists(state.lens.nodeTab.lensNode);

        if (checkCanChange(
            state,
            lensNode,
            DiscussionType.Text)) {

            return pluginActions.completeSelectPlugin(
                state,
                DiscussionType.Text
            );
        }

        // Then need the user to confirm they want to discard the changes
        gDialogueCode.buildDialogue(
            state,
            DialogueType.Confirm,
            pluginActions.completeSelectPlugin,
            DelegateType.Action,
            "Confirm discard changes",
            `Changing discussion type will clear all the discussion data, are you sure you want to continue?`,
            DiscussionType.Text);

        return gStateCode.cloneState(state);
    },

    toggleEnableOptionPlugins: (state: IState): IState => {

        if (!state) {

            return state;
        }

        window.TreeSolve.optionsPlugins.toggleEnableOptionPlugins(state);

        return gStateCode.cloneState(state);
    }
};

export default pluginActions;
