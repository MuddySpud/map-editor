import { Keyboard } from "hyperapp-fx-local";

import IState from "../../../interfaces/state/IState";
import dialogueActions from "../actions/dialogueActions";
import { DialogueType } from "../../../interfaces/enums/DialogueType";
import { DialogueAction } from "../../../interfaces/enums/DialogueAction";


const lightBoxSubscriptions = (state: IState): any[] => {

    const subscriptions: any[] = [];

    if (state.dialogue
        && state.dialogue.type !== DialogueType.None
        && state.dialogue.result === DialogueAction.None) {

        subscriptions.push(
            Keyboard({
                downs: true,
                action: dialogueActions.checkForEnterKeyPress
            }));
    }

    return subscriptions;
}

export default lightBoxSubscriptions;


