import IState from "../../interfaces/state/IState";
import IStateAnyArray from "../../interfaces/state/IStateAnyArray";
import IBranchUI from "../../interfaces/state/ui/UIs/IBranchUI";
import gStateCode from "../code/gStateCode";
import IBranchTask from "../../interfaces/state/tree/IBranchTask";
import INode from "../../interfaces/state/tree/INode";
import gDialogueCode from "../code/gDialogueCode";
import { DialogueType } from "../../interfaces/enums/DialogueType";
import { DelegateType } from "../../interfaces/enums/DelegateType";
import gStageCode from "../code/gStageCode";
import gBranchTaskCode from "../code/gBranchTaskCode";
import U from "../gUtilities";
import BranchTask from "../../state/tree/BranchTask";
import gLensCode from "../code/gLensCode";
import gBranchTaskActions from "./gBranchTaskActions";
import { ActionType } from "../../interfaces/enums/ActionType";
import { TabType } from "../../interfaces/enums/TabType";


const gCloneBranchActions = {

    setUp: (
        state: IState,
        option: INode<IBranchUI>): IStateAnyArray => {

        const dirty: string = gLensCode.isLensNodeDirty(state);

        if (U.isNullOrWhiteSpace(dirty) === false) {

            const message = `${dirty}.
Do you want to discard those changes and clone a branch?`;

            // Then need the user to confirm they want to discard the changes
            gDialogueCode.buildDialogue(
                state,
                DialogueType.Confirm,
                gCloneBranchActions.selectCloneOption,
                DelegateType.Action,
                "Confirm discard changes",
                message,
                option);

            return gStateCode.cloneState(state);
        }

        return gCloneBranchActions.selectCloneOption(
            state,
            option);
    },

    selectCloneOption: (
        state: IState,
        option: INode<IBranchUI>): IStateAnyArray => {

        const branchTask: IBranchTask = new BranchTask();

        if (U.isNullOrWhiteSpace(option.token) === false
            && U.isNullOrWhiteSpace(option.key) === false) {

            gLensCode.clearTab(
                state,
                TabType.Node
            );

            gBranchTaskCode.setUpOption(
                state,
                branchTask.optionLoader,
                option
            );
        }

        branchTask.action = ActionType.CloneBranch;
        branchTask.targetLoader.token = state.branchesState.tree.token as string;
        state.lens.nodeTab.lensBranchTask = branchTask;

        return gCloneBranchActions.completeOptionSelection(state);
    },

    completeOptionSelection: (state: IState): IStateAnyArray => {

        if (!state
            || !state.lens.nodeTab.lensBranchTask) {

            return gStateCode.cloneState(state);
        }

        const branchTask: IBranchTask = state.lens.nodeTab.lensBranchTask as IBranchTask;
        state.lens.nodeTab.stageBehaviour = gStageCode.buildCloneBranchStages(branchTask);

        return gBranchTaskActions.completeSelectionAndNext(state);
    }
};

export default gCloneBranchActions;
