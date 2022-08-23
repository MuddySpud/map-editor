import INodeLoaderUI from "../../../interfaces/state/ui/UIs/INodeLoaderUI";


export default class NodeLoaderUI implements INodeLoaderUI {
    
    public forceSet: boolean = false;
    public clickSelect: boolean = true;
    public minimise: boolean = true;
    public localTree: boolean = true;
    public recognised: boolean = false;
    public raw: boolean = true;
    public showTreeSelection: boolean = false;
}
