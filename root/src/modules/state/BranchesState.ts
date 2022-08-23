import Tree from "./tree/Tree";
import ITree from "../interfaces/state/tree/ITree";
import IBranchUI from "../interfaces/state/ui/UIs/IBranchUI";
import INode from "../interfaces/state/tree/INode";
import BranchUI from "./ui/UIs/BranchUI";
import IBranchesState from "../interfaces/state/IBranchesState";
import IViewSettings from "../interfaces/state/user/IViewSettings";
import ViewSettings from "./user/ViewSettings";
import IStash from "../interfaces/state/tree/IStash";
import Stash from "./tree/Stash";


export default class BranchesState implements IBranchesState {


    constructor() {

        this.tree = new Tree<IBranchUI>(BranchUI);

        this.stash = new Stash<IBranchUI>(
            BranchUI,
            ''
        );

        this.registered = new Array<INode<IBranchUI>>();
        this.viewSettings = new ViewSettings();
    }

    public tree: ITree<IBranchUI>;
    public stash: IStash<IBranchUI>;
    public current: INode<IBranchUI> | null = null;
    public selected: INode<IBranchUI> | null = null;
    public registered: Array<INode<IBranchUI>>;
    public viewSettings: IViewSettings;
    public treeDetailsMinimised: boolean = true;
    public maxBranchDepth: number = 0;
}
