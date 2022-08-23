import ITreeElement from "../../../interfaces/state/ui/payloads/ITreeElement";
import ITreeSys from "../../../interfaces/state/tree/ITreeSys";
import IStageBehaviour from "../../../interfaces/behaviours/IStageBehaviour";


export default class TreeElement implements ITreeElement {

    constructor(
        tree: ITreeSys,
        element: HTMLElement,
        behaviour: IStageBehaviour | null) {
            
            this.tree = tree;
            this.element = element;
            this.behaviour = behaviour;
        }

    public tree: ITreeSys;
    public element: HTMLElement;
    public behaviour: IStageBehaviour | null;
}
