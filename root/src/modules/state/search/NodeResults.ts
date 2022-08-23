import INodeResults from "../../interfaces/state/Search/INodeResults";
import INodeBase from "../../interfaces/state/tree/INodeBase";


export default class NodeResults implements INodeResults {

    public selectedIndex: number = -1;
    public results: Array<INodeBase> = new Array<INodeBase>();
}
