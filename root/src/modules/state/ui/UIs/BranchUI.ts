import IBranchUI from "../../../interfaces/state/ui/UIs/IBranchUI";


export default class BranchUI implements IBranchUI {

    constructor() {
    }

    public expanded: boolean = false;
    public selected: boolean = false;
    public loaded: boolean = false;
    public freshLoad: boolean = false;
    public hole: boolean = false;
    public dummy: boolean = false;
    public branchViewOptionControls: boolean = false;
    public loadInBranchUIOptionControls: boolean = false;
    public branchViewNodeControls: boolean = false;
    public branchTaskTarget: boolean = false;
    public branchTaskOption: boolean = false;
    public branchTaskLimit: boolean = false;
    public loading: boolean = false;
    public registered: boolean = false;
    public blurring: boolean = false;
    public showNode: boolean = false;
    public showOption: boolean = false;
    public highlightTime: number = 0;
    public info: boolean = false;
}
