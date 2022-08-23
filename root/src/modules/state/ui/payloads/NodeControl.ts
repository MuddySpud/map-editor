import INode from "../../../interfaces/state/tree/INode";
import IBranchUI from "../../../interfaces/state/ui/UIs/IBranchUI";
import INodeControl from "../../../interfaces/state/ui/payloads/INodeControl";
import { LensActionType } from "../../../interfaces/enums/LensActionType";


export default class NodeControl implements INodeControl {
    
    constructor(
        branchViewNode: INode<IBranchUI>,
        control: LensActionType) {
            this.option = branchViewNode;
            this.control = control;
        }

    public option: INode<IBranchUI>;
    public control: LensActionType;
}
