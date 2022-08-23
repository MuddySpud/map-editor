import ITreeRootElement from "../../../interfaces/state/ui/payloads/ITreeRootElement";
import ITreeRoot from "../../../interfaces/state/tree/ITreeRoot";


export default class TreeRootElement implements ITreeRootElement {

    constructor(
        tree: ITreeRoot,
        element: HTMLElement) {
            
            this.tree = tree;
            this.element = element;
        }

    public tree: ITreeRoot;
    public element: HTMLElement;
}
