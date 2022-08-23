import IState from "../../../../../interfaces/state/IState";
import gStateCode from "../../../../../global/code/gStateCode";
import { DialogueType } from "../../../../../interfaces/enums/DialogueType";
import gBlankAction from "../../../../../global/actions/gBlankAction";
import { DelegateType } from "../../../../../interfaces/enums/DelegateType";
import { NotificationType } from "../../../../../interfaces/enums/NotificationType";
import gDialogueCode from "../../../../../global/code/gDialogueCode";


const testActions = {

    toggleTests: (
        state: IState,
        name: string): IState => {

            if (name === 'tempShowDialogue') {
            
                gStateCode.addNotification(
                    state,
                    "Test Error",
                    "Test error",
                    null,
                    NotificationType.Error);
    
                gDialogueCode.buildDialogue(
                    state,
                    DialogueType.Error,
                    gBlankAction,
                    DelegateType.Action,
                    "Test Error",
                    "Test Error");
            }
    
            return gStateCode.cloneState(state);
        }
    };

export default testActions;