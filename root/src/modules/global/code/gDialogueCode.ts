import IState from "../../interfaces/state/IState";
import { DialogueType } from "../../interfaces/enums/DialogueType";
import { DelegateType } from "../../interfaces/enums/DelegateType";
import IDialogue from "../../interfaces/state/ui/IDialogue";
import Dialogue from "../../state/ui/Dialogue";


const gDialogueCode = {

    clearDialogue: (state: IState): void => {

        if (state) {
            state.dialogue = null;
        }
    },

    buildDialogue: (
        state: IState,
        type: DialogueType,
        delegate: any,
        delegateType: DelegateType,
        title: string,
        text: string,
        delegateParameter?: any,
        link: string = ''): IDialogue => {

        const dialogue = new Dialogue();
        dialogue.title = title;
        dialogue.type = type;
        dialogue.delegate = delegate;
        dialogue.delegateType = delegateType;
        dialogue.delegateParameter = delegateParameter;
        dialogue.text = text;
        dialogue.link = link;
        state.dialogue = dialogue;

        return state.dialogue;
    }
};

export default gDialogueCode;

