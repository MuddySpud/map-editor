
export default interface IBranchUI {
    expanded: boolean;
    selected: boolean;
    loaded: boolean;
    freshLoad: boolean;
    hole: boolean;
    dummy: boolean;
    branchViewOptionControls: boolean;
    branchViewNodeControls: boolean;
    loadInBranchUIOptionControls: boolean;
    branchTaskTarget: boolean;
    branchTaskOption: boolean;
    branchTaskLimit: boolean;
    loading: boolean;
    registered: boolean;
    blurring: boolean;
    showNode: boolean;
    showOption: boolean;
    highlightTime: number;
    info: boolean;
}
