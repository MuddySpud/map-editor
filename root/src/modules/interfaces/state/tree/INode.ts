import INodeBase from "./INodeBase";
import INodeCase from "./INodeCase";


export default interface INode<T> extends INodeBase {

    parent: INode<T> | null;
    nodes: Array<INode<T>>;

    ui: T;
    case: INodeCase;
}
