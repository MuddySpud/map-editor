import ISubtreeElement from "../../../interfaces/state/ui/payloads/ISubtreeElement";
import ISubtreeSys from "../../../interfaces/state/tree/ISubtreeSys";


export default class SubtreeElement implements ISubtreeElement {

    constructor(
        subtree: ISubtreeSys,
        element: HTMLElement) {
            
            this.subtree = subtree;
            this.element = element;
        }

    public subtree: ISubtreeSys;
    public element: HTMLElement;
}
