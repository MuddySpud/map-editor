import ITree from "./tree/ITree";
import INode from "./tree/INode";
import IBranchUI from "./ui/UIs/IBranchUI";
import IViewSettings from "./user/IViewSettings";
import IStash from "./tree/IStash";


export default interface IBranchesState {

    tree: ITree<IBranchUI>;
    stash: IStash<IBranchUI>;
    current: INode<IBranchUI> | null;
    selected: INode<IBranchUI> | null;
    registered: Array<INode<IBranchUI>>;
    viewSettings: IViewSettings;
    treeDetailsMinimised: boolean;
    maxBranchDepth: number;
}

