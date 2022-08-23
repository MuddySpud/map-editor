import { ActionType } from "../../enums/ActionType";
import IHole from "./IHole";
import ISocketLoaderUI from "../ui/UIs/ISocketLoaderUI";
import ISocketUI from "../ui/UIs/ISocketUI";


export default interface IStSocket {

    key: string;
    r: string;
    text: string;
    token: string;
    holes: Array<IHole<ISocketLoaderUI>>;

    errors: Array<string>;
    action: ActionType;
    ui: ISocketUI;
}
