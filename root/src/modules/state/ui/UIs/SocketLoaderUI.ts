import ISocketLoaderUI from "../../../interfaces/state/ui/UIs/ISocketLoaderUI";


export default class SocketLoaderUI implements ISocketLoaderUI {

    constructor() {}

    public forceSet: boolean = false;
    public clickSelect: boolean = true;
    public showSockets: boolean = false;
    public optionIsSocket: boolean = true;
    public overrideOption: boolean = false;
    public newSocket: boolean = true;
    public minimise: boolean = false;
    public localTree: boolean = true;
    public recognised: boolean = false;
    public raw: boolean = true;
    public showTreeSelection: boolean = false;
}
