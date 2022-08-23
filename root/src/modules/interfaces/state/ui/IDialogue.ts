import { DialogueType } from "../../enums/DialogueType";
import { DialogueAction } from "../../enums/DialogueAction";
import { DelegateType } from "../../enums/DelegateType";

export default interface IDialogue {
    title: string;
    text: string;
    link: string;
    type: DialogueType;
    result: DialogueAction;
    delegate: any;
    delegateType: DelegateType;
    delegateParameter: any;
}
