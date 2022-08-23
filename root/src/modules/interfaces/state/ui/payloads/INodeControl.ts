import IBranchUI from "../UIs/IBranchUI";
import INode from "../../tree/INode";
import { LensActionType } from "../../../enums/LensActionType";


export default interface INodeControl {
    option: INode<IBranchUI>;
    control: LensActionType;
}
