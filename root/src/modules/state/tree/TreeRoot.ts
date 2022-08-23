import NodeBase from "./NodeBase";
import ITreeRoot from "../../interfaces/state/tree/ITreeRoot";
import INodeBase from "../../interfaces/state/tree/INodeBase";
import TreeBase from "./TreeBase";


export default class TreeRoot extends TreeBase implements ITreeRoot {

    constructor(key: string) {
        
        super();
        this.root = new NodeBase();
        this.key = key;
    }

    public root: INodeBase;
}

