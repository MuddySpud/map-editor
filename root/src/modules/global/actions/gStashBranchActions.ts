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


const gStashBranchActions = {

    setUp: (
        state: IState,
        option: INode<IBranchUI>): IStateAnyArray => {

        const dirty: string = gLensCode.isLensNodeDirty(state);

        if (U.isNullOrWhiteSpace(dirty) === false) {

            const message = `${dirty}.
Do you want to discard those changes and stash a branch?`;

            // Then need the user to confirm they want to discard the changes
            gDialogueCode.buildDialogue(
                state,
                DialogueType.Confirm,
                gStashBranchActions.selectStashOption,
                DelegateType.Action,
                "Confirm discard changes",
                message,
                option);

            return gStateCode.cloneState(state);
        }

        return gStashBranchActions.selectStashOption(
            state,
            option);
    },

    selectStashOption: (
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

        gBranchTaskCode.setUpTarget(
            state,
            branchTask,
            state.branchesState.stash
        );

        branchTask.action = ActionType.CloneBranchToStash;
        state.lens.nodeTab.lensBranchTask = branchTask;

        return gStashBranchActions.completeOptionSelection(state);
    },

    completeOptionSelection: (state: IState): IStateAnyArray => {

        if (!state
            || !state.lens.nodeTab.lensBranchTask) {

            return gStateCode.cloneState(state);
        }

        const branchTask: IBranchTask = state.lens.nodeTab.lensBranchTask as IBranchTask;
        state.lens.nodeTab.stageBehaviour = gStageCode.buildStashBranchStages(branchTask);

        return gBranchTaskActions.completeSelectionAndNext(state);
    }
};

export default gStashBranchActions;
