import IStRootElement from "../../../interfaces/state/ui/payloads/IStRootElement";
import IStRoot from "../../../interfaces/state/tree/IStRoot";
import IStageBehaviour from "../../../interfaces/behaviours/IStageBehaviour";


export default class StRootElement implements IStRootElement {

    constructor(
        root: IStRoot,
        element: HTMLElement,
        behaviour: IStageBehaviour | null) {
            
            this.root = root;
            this.element = element;
            this.behaviour = behaviour;
        }

    public root: IStRoot;
    public element: HTMLElement;
    public behaviour: IStageBehaviour | null;
}
