import INodeBase from "../../../interfaces/state/tree/INodeBase";
import INodeBaseElement from "../../../interfaces/state/ui/payloads/INodeBaseElement";


export default class NodeBaseElement implements INodeBaseElement {

    constructor(
        node: INodeBase,
        element: HTMLElement) {
            
            this.node = node;
            this.element = element;
        }

    public node: INodeBase;
    public element: HTMLElement;
}
