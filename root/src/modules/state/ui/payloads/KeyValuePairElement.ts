import IKeyValuePairElement from "../../../interfaces/state/ui/payloads/IKeyValuePairElement";
import IKeyValuePair from "../../../interfaces/state/tree/IKeyValuePair";


export default class KeyValuePairElement implements IKeyValuePairElement {

    constructor(

        keyValuePair: IKeyValuePair,
        element: HTMLElement) {
            this.keyValuePair = keyValuePair;
            this.element = element;
        }

    public keyValuePair: IKeyValuePair;
    public element: HTMLElement;
}
