import IStSocket from "../../../interfaces/state/tree/IStSocket";
import IOptionSocket from "../../../interfaces/state/ui/payloads/IOptionSocket";
import ILensUI from "../../../interfaces/state/ui/UIs/ILensUI";
import INode from "../../../interfaces/state/tree/INode";


export default class OptionSocket implements IOptionSocket {
    
    constructor(
        option: INode<ILensUI>,
        stSocket: IStSocket) {

            this.option = option;
            this.stSocket = stSocket;
        }

    public option: INode<ILensUI>;
    public stSocket: IStSocket;
}
