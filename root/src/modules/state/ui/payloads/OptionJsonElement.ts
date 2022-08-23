import IOptionJson from "../../../interfaces/state/ui/IOptionJson";
import IOptionJsonElement from "../../../interfaces/state/ui/payloads/IOptionJsonElement";


export default class OptionJsonElement implements IOptionJsonElement {

    constructor(
        optionJson: IOptionJson,
        element: HTMLElement) {
            
            this.optionJson = optionJson;
            this.element = element;
        }

    public optionJson: IOptionJson;
    public element: HTMLElement;
}
