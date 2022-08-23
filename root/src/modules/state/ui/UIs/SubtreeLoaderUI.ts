import ISubtreeLoaderUI from "../../../interfaces/state/ui/UIs/ISubtreeLoaderUI";


export default class SubtreeLoaderUI implements ISubtreeLoaderUI {
    
    public forceSetTree: boolean = false;
    public forceSetSubtree: boolean = false;
    public forceSetLimits: boolean = false;
    public clickSelect: boolean = true;
    public allDescendants: boolean = true;
    public minimiseWarnings: boolean = true;
}
