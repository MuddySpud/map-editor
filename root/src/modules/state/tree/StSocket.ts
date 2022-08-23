import IStSocket from "../../interfaces/state/tree/IStSocket";
import { ActionType } from "../../interfaces/enums/ActionType";
import ISocketLoaderUI from "../../interfaces/state/ui/UIs/ISocketLoaderUI";
import IHole from "../../interfaces/state/tree/IHole";
import SocketUI from "../ui/UIs/SocketUI";
import ISocketUI from "../../interfaces/state/ui/UIs/ISocketUI";


export default class StSocket implements IStSocket {

    constructor (key: string) {

        this.key = key;
    }

    public key: string;
    public r: string = '-1';
    public text: string = '';
    public token: string = '';
    public holes: Array<IHole<ISocketLoaderUI>> = [];

    public errors: Array<string> = [];
    public action: ActionType = ActionType.None;
    public ui: ISocketUI = new SocketUI();
}
