import IDialogue from "../../interfaces/state/ui/IDialogue";
import { DialogueType } from "../../interfaces/enums/DialogueType";
import { DialogueAction } from "../../interfaces/enums/DialogueAction";
import { DelegateType } from "../../interfaces/enums/DelegateType";


export default class Dialogue implements IDialogue {
    public title: string = '';
    public text: string = '';
    public link: string = '';
    public type: DialogueType = DialogueType.None;
    public result: DialogueAction = DialogueAction.None;
    public delegate: any;
    public delegateType: DelegateType = DelegateType.None;
    public delegateParameter: any = null;
}
