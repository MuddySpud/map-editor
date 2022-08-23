import ISubtreeLoader from "../../interfaces/state/tree/ISubtreeLoader";
import ISubtreeLoaderUI from "../../interfaces/state/ui/UIs/ISubtreeLoaderUI";
import SubtreeLoaderUI from "../ui/UIs/SubtreeLoaderUI";
import IFailedAncestors from "../../interfaces/state/tree/IFailedAncestors";
import FailedAncestors from "./FailedAncestors";
import SubtreeSys from "./SubtreeSys";
import TreeSys from "./TreeSys";
import ISubtreeSys from "../../interfaces/state/tree/ISubtreeSys";
import INode from "../../interfaces/state/tree/INode";
import IBranchUI from "../../interfaces/state/ui/UIs/IBranchUI";


export default class SubtreeLoader implements ISubtreeLoader {

    constructor(key: string) {

        const tree = new TreeSys(key);
        this.subtree = SubtreeSys.newSubtreeFromTree(tree);
    }

    public subtree: ISubtreeSys;
    public failedAncestors: IFailedAncestors = new FailedAncestors();
    public failedDescendants: IFailedAncestors = new FailedAncestors();
    public warnNodes: Array<INode<IBranchUI>> = [];
    public ui: ISubtreeLoaderUI = new SubtreeLoaderUI();
}

