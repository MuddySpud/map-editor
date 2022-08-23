import IBookmarkNavigationUI from "../../../interfaces/state/ui/UIs/IBookmarkNavigationUI";


export default class BookmarkNavigationUI implements IBookmarkNavigationUI {
    
    // public forceSet: boolean = false;
    public clickSelect: boolean = true;
    public minimise: boolean = true;
    // public localTree: boolean = true;
    public recognised: boolean = false;
    public raw: boolean = true;
    // public showTreeSelection: boolean = false;
}
