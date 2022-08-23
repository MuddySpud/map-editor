import INode from "../../interfaces/state/tree/INode";
import NodeBase from "./NodeBase";
import INodeCase from "../../interfaces/state/tree/INodeCase";
import NodeCase from "./NodeCase";


export default class Node<T> extends NodeBase implements INode<T> {

    constructor(TCreator: { new (): T; }) {
        super();
        this.ui = new TCreator();
    }

    public parent: INode<T>|null = null;
    public nodes: Array<INode<T>> = new Array<INode<T>>();

    public ui: T;
    public case: INodeCase = new NodeCase();
}
