import IState from "../../../../../interfaces/state/IState";
import gStateCode from "../../../../../global/code/gStateCode";
import gDialogueCode from "../../../../../global/code/gDialogueCode";
import { DialogueType } from "../../../../../interfaces/enums/DialogueType";
import { DelegateType } from "../../../../../interfaces/enums/DelegateType";
import gTabCode from "../../../../../global/code/gTabCode";
import gStashCode from "../../../../../global/code/gStashCode";
import cloneBranchEffects from "../effects/cloneBranchEffects";
import moveBranchEffects from "../effects/moveBranchEffects";
import gBranchTaskCode from "../../../../../global/code/gBranchTaskCode";
import gNotificationCode from "../../../../../global/code/gNotificationCode";
import { StashType } from "../../../../../interfaces/enums/StashType";
import IBranchTask from "../../../../../interfaces/state/tree/IBranchTask";
import { ActionType } from "../../../../../interfaces/enums/ActionType";
import IStateAnyArray from "../../../../../interfaces/state/IStateAnyArray";
import gTreeCode from "../../../../../global/code/gTreeCode";


const clone = (state: IState): IState => {

    // A clone to stash does not change the original tree - so don't need to update it
    const effect: any = (state: IState) => cloneBranchEffects.cloneBranchToStash(state);

    gDialogueCode.buildDialogue(
        state,
        DialogueType.Confirm,
        effect,
        DelegateType.Effect,
        "Confirm save",
        `Are you sure you want to copy the branch to the stash?`);

    return gStateCode.cloneState(state);
};

const move = (state: IState): IState => {

    // A move to stash will change the original tree - so need to update it
    gDialogueCode.buildDialogue(
        state,
        DialogueType.Confirm,
        wrapSaveEffectInAction,
        DelegateType.Action,
        "Confirm save",
        `Are you sure you want to move the branch to the stash?`);

    return gStateCode.cloneState(state);
};

const wrapSaveEffectInAction = (state: IState): IStateAnyArray => {

    gTreeCode.setLensTreeNodeChanges(state);

    return [
        gStateCode.cloneState(state),
        moveBranchEffects.moveBranchToStash(state)
    ];
};

const stashBranchActions = {

    toggleType: (state: IState): IState => {

        if (!state
            || !state.lens.nodeTab.lensBranchTask) {

            return state;
        }

        const branchTask: IBranchTask = state.lens.nodeTab.lensBranchTask as IBranchTask;

        if (branchTask.action === ActionType.CloneBranchToStash) {

            branchTask.action = ActionType.MoveBranchToStash;
        }
        else if (branchTask.action === ActionType.MoveBranchToStash) {

            branchTask.action = ActionType.CloneBranchToStash;
        }
        else {
            throw new Error(`Unexpected ActinType: ${branchTask.action} for stashing branch`);
        }

        return gStateCode.cloneState(state);
    },

    save: (state: IState): IState => {

        if (!state.lens.nodeTab.lensBranchTask) {

            return state;
        }

        if (!gTabCode.canSave(state.lens.nodeTab)) {

            return gStateCode.cloneState(state);
        }

        state.lens.nodeTab.saveLock = true;
        gStashCode.setStashAsTargetAndValidate(state);
        const isValid: boolean = gBranchTaskCode.validateBranchTask(state);

        if (isValid) {

            const type: StashType = gStashCode.getStashType(state);

            if (type === StashType.Move) {

                return move(state);
            }
            else if (type === StashType.Clone) {

                return clone(state);
            }
            else {
                throw new Error(`Stash type: ${type} not implemented...`);
            }
        }
        else {
            gNotificationCode.buildBranchTaskValidationFailedNotification(
                state,
                "Stash branch");
        }

        return gStateCode.cloneState(state);
    }
};

export default stashBranchActions;


