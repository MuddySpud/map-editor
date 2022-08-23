import IBranchUI from "../UIs/IBranchUI";
import INode from "../../tree/INode";


export default interface INodeEvent {

    option: INode<IBranchUI>;
    event: Event;
}
