import IBoolElement from "../../../interfaces/state/ui/payloads/IBoolElement";


export default class BoolElement implements IBoolElement {

    constructor(
        element: HTMLElement,
        disabled: boolean) {
            
            this.element = element;
            this.disabled = disabled;
        }

    public element: HTMLElement;
    public disabled: boolean;
}
