import IState from "../../../interfaces/state/IState";
import IStateAnyArray from "../../../interfaces/state/IStateAnyArray";
import gStateCode from "../../../global/code/gStateCode";
import IDialogue from "../../../interfaces/state/ui/IDialogue";
import { DialogueAction } from "../../../interfaces/enums/DialogueAction";
import { DelegateType } from "../../../interfaces/enums/DelegateType";
import gDialogueCode from "../../../global/code/gDialogueCode";
import gTabCode from "../../../global/code/gTabCode";
import ITabSave from "../../../interfaces/state/ui/tabs/ITabSave";
import gUtilities from "../../../global/gUtilities";
import ILensWarning from "../../../interfaces/state/ui/ILensWarning";


const dialogueActions = {

    ok: (state: IState): IStateAnyArray => {

        if (!state.dialogue) {

            alert("State.Dialogue is null!");
        }

        const dialogue: IDialogue = state.dialogue as IDialogue;
        const delegate: any = dialogue.delegate;
        dialogue.result = DialogueAction.OK;
        state.lens.nodeTab.saveLock = false; // TODO this needs to consider other other locked tabs too!!!!

        return delegate(state);
    },

    confirm: (state: IState): IStateAnyArray => {

        if (!state.dialogue) {

            alert("State.Dialogue is null!");
        }

        const dialogue: IDialogue = state.dialogue as IDialogue;
        const delegate: any = dialogue.delegate;
        const delegateParameter: any = dialogue.delegateParameter;
        gDialogueCode.clearDialogue(state);

        if (dialogue.delegateType === DelegateType.Effect
            || dialogue.delegateType === DelegateType.SequentialEffects) {

            const newState = gStateCode.cloneState(state);

            if (delegateParameter) {

                return [
                    newState,
                    delegate(
                        state,
                        delegateParameter)
                ];
            }
            else {
                return [
                    newState,
                    delegate(state)
                ];
            }
        }

        if (delegateParameter) {

            return delegate(
                state,
                delegateParameter
            );
        }

        return delegate(state);
    },

    cancel: (state: IState): IState => {

        gDialogueCode.clearDialogue(state);
        const selectedTab: ITabSave | null = gTabCode.getSelectedTabSave(state);

        if (selectedTab) {

            selectedTab.saveLock = false;
        }

        return gStateCode.cloneState(state);
    },

    copyText: (state: IState): IState => {

        let text: string | undefined = state.dialogue?.text;

        if (gUtilities.isNullOrWhiteSpace(text) === true) {

            return state;;
        }

        navigator
            .permissions
            // @ts-ignore
            .query({ name: "clipboard-write" })
            .then(result => {

                if (result.state === "granted"
                    || result.state === "prompt") {
                    /* write to the clipboard now */

                    navigator
                        .clipboard
                        .writeText(text as string)
                        .then(
                            function () {

                                // alert('/* clipboard successfully set */');
                            },
                            function () {

                                // alert('/* clipboard write failed */');
                            });
                }
            });

        return state;
    },

    openErrorLink: (state: IState): IState => {

        let link: string | undefined = state.dialogue?.link;

        if (gUtilities.isNullOrWhiteSpace(link) === true) {

            return state;;
        }

        const url: string = link as string;
        window.open(url, "_blank");

        return state;
    },

    acknowledgeError: (state: IState): IState => {

        if (!state.dialogue) {

            alert("State.Dialogue is null!");
        }

        const warning: ILensWarning | null = state.lens.warning;

        if (warning) {

            warning.tab.saveLock = true;
        }

        const dialogue: IDialogue = state.dialogue as IDialogue;
        dialogue.result = DialogueAction.OK;

        const selectedTab: ITabSave | null = gTabCode.getSelectedTabSave(state);

        if (selectedTab) {

            selectedTab.saveLock = false;
        }

        return gStateCode.cloneState(state);
    },

    checkForEnterKeyPress: (
        state: IState,
        keyEvent: any): IStateAnyArray => {

        if (keyEvent.keyCode === 13) {

            keyEvent.preventDefault();

            return dialogueActions.confirm(state);
        }
        else if (keyEvent.keyCode === 27) {

            keyEvent.preventDefault();

            return dialogueActions.cancel(state);
        }

        return state;
    }
};

export default dialogueActions;