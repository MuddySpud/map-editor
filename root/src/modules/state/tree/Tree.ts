import Root from "./Root";
import ITree from "../../interfaces/state/tree/ITree";
import INode from "../../interfaces/state/tree/INode";
import TreeBase from "./TreeBase";


export default class Tree<T> extends TreeBase implements ITree<T> {

    constructor(TCreator: { new (): T; }) {
        super();
        this.root = new Root<T>(TCreator);
    }

    public root: INode<T>;
    public isSubtree: boolean = false;
    public isBot: boolean = false;
}

