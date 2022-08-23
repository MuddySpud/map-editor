import IState from "../../../interfaces/state/IState";
import { VNode } from "hyperapp-local";
import IDialogue from "../../../interfaces/state/ui/IDialogue";
import { DialogueType } from "../../../interfaces/enums/DialogueType";
import confirmDialogueViews from "../views/confirmDialogueViews";
import errorDialogueViews from "../views/errorDialogueViews";
import okDialogueViews from "../views/okDialogueViews";


const dialogueCode = {

    getDialogue: (state: IState): VNode | null => {

        if (!state.dialogue) {

            alert(`Dialogue was null...`);

            return null;
        }

        const dialogue: IDialogue = state.dialogue as IDialogue;

        if (dialogue.type === DialogueType.Confirm) {

            return confirmDialogueViews.buildConfirmDialogueView(state);
        }
        else if (dialogue.type === DialogueType.OK) {

            return okDialogueViews.buildOKDialogueView(state);
        }
        else if (dialogue.type === DialogueType.Error) {

            return errorDialogueViews.buildErrorDialogueView(state);
        }
        else if (dialogue.type === DialogueType.errorAction) {

            return errorDialogueViews.buildErrorAndActionDialogueView(state);
        }
        else if (dialogue.type === DialogueType.None) {

            alert(`Dialogue was None...`);

            return null;
        }

        alert(`Dialogue has not been coded for yet...`);

        return null;
    },
};

export default dialogueCode;

