import INodeLoaderUI from "./INodeLoaderUI";


export default interface ISocketLoaderUI extends INodeLoaderUI {
    
    showSockets: boolean;
    optionIsSocket: boolean;
    overrideOption: boolean;
    newSocket: boolean;
}
