import IStSocket from "./IStSocket";
import ISocketLoaderUI from "../ui/UIs/ISocketLoaderUI";
import { ActionType } from "../../enums/ActionType";
import INodeLoader from "./INodeLoader";


export default interface ISocketLoader extends INodeLoader{

    selectedSocket: IStSocket | null;
    action: ActionType;
    ui: ISocketLoaderUI;
}
