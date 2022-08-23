import INode from "../../interfaces/state/tree/INode";
import NodeBase from "./NodeBase";
import { NodeType } from "../../interfaces/enums/NodeType";
import NodeCase from "./NodeCase";
import INodeCase from "../../interfaces/state/tree/INodeCase";


export default class Root<T> extends NodeBase implements INode<T> {

    constructor(TCreator: { new (): T; }) {
        
        super();
        this.ui = new TCreator();
        this.type = NodeType.Discussion;
        this.order = 1;
        this.isEntry = true;
        this.isRoot = true;
    }

    public parent: INode<T>|null = null;
    public nodes: Array<INode<T>> = new Array<INode<T>>();

    public ui: T;
    public case: INodeCase = new NodeCase();
}

