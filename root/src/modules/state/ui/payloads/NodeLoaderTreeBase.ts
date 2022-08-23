import INodeLoaderTreeBase from "../../../interfaces/state/ui/payloads/INodeLoaderTreeBase";
import INodeLoader from "../../../interfaces/state/tree/INodeLoader";
import ITreeBase from "../../../interfaces/state/tree/ITreeBase";


export default class NodeLoaderTreeBase implements INodeLoaderTreeBase {

    constructor(
        nodeLoader: INodeLoader,
        tree: ITreeBase) {
            
            this.nodeLoader = nodeLoader;
            this.tree = tree;
        }

    public nodeLoader: INodeLoader;
    public tree: ITreeBase;
}
