import ISocketLoader from "../../interfaces/state/tree/ISocketLoader";
import IStSocket from "../../interfaces/state/tree/IStSocket";
import StSocket from "./StSocket";
import INodeBase from "../../interfaces/state/tree/INodeBase";
import ISocketLoaderUI from "../../interfaces/state/ui/UIs/ISocketLoaderUI";
import SocketLoaderUI from "../ui/UIs/SocketLoaderUI";
import { ActionType } from "../../interfaces/enums/ActionType";


export default class SocketLoader implements ISocketLoader {

    constructor(
        holeKey: string,
        token: string,
        stSocketKey: string) {

        this.key = holeKey;
        this.token = token;
        this.selectedSocket = new StSocket(stSocketKey);
        this.ui = new SocketLoaderUI();
    }

    public selectedSocket: IStSocket | null = null;
    public key: string = "";
    public token: string = "";
    public node: INodeBase | null = null;
    public errors: Array<string> = [];
    public action: ActionType = ActionType.None;
    public ui: ISocketLoaderUI;
}
