import INode from "../../../interfaces/state/tree/INode";
import IBranchUI from "../../../interfaces/state/ui/UIs/IBranchUI";
import INodeEvent from "../../../interfaces/state/ui/payloads/INodeEvent";


export default class NodeEvent implements INodeEvent {
    
    constructor(
        option: INode<IBranchUI>,
        event: Event) {
            this.option = option;
            this.event = event;
        }

    public option: INode<IBranchUI>;
    public event: Event;
}
