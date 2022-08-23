import ISubtreeLoaderUI from "../ui/UIs/ISubtreeLoaderUI";
import IFailedAncestors from "./IFailedAncestors";
import ISubtreeSys from "./ISubtreeSys";
import INode from "./INode";
import IBranchUI from "../ui/UIs/IBranchUI";


export default interface ISubtreeLoader {

    subtree: ISubtreeSys;
    failedAncestors: IFailedAncestors;
    failedDescendants: IFailedAncestors;
    warnNodes: Array<INode<IBranchUI>>

    ui: ISubtreeLoaderUI;
}
