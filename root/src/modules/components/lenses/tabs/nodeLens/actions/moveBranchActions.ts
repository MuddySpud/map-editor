import IState from "../../../../../interfaces/state/IState";
import gStateCode from "../../../../../global/code/gStateCode";
import gBranchTaskCode from "../../../../../global/code/gBranchTaskCode";
import gDialogueCode from "../../../../../global/code/gDialogueCode";
import { DialogueType } from "../../../../../interfaces/enums/DialogueType";
import { DelegateType } from "../../../../../interfaces/enums/DelegateType";
import moveBranchEffects from "../effects/moveBranchEffects";
import gNotificationCode from "../../../../../global/code/gNotificationCode";
import gTabCode from "../../../../../global/code/gTabCode";
import IStateAnyArray from "../../../../../interfaces/state/IStateAnyArray";
import gTreeCode from "../../../../../global/code/gTreeCode";


const wrapSaveEffectInAction = (state: IState): IStateAnyArray => {

    gTreeCode.setLensTreeNodeChanges(state);

    return [
        gStateCode.cloneState(state),
        moveBranchEffects.moveBranch(state)
    ];
};

const moveBranchActions = {

    save: (state: IState): IState => {

        if (!state.lens.nodeTab.lensBranchTask) {

            return state;
        }
        
        if (!gTabCode.canSave(state.lens.nodeTab)) {

            return gStateCode.cloneState(state);
        }

        state.lens.nodeTab.saveLock = true;
        const isValid: boolean = gBranchTaskCode.validateBranchTask(state);

        if (isValid) {

            gDialogueCode.buildDialogue(
                state,
                DialogueType.Confirm,
                wrapSaveEffectInAction,
                DelegateType.Action,
                "Confirm save",
                `Are you sure you want to move the option?`);
        }
        else {
            gNotificationCode.buildBranchTaskValidationFailedNotification(
                state,
                "Move branch");
        }

        return gStateCode.cloneState(state);
    }
};

export default moveBranchActions;


