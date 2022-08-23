import ITreeSys from "./ITreeSys";
import IStRoot from "./IStRoot";
import IStSocket from "./IStSocket";
import { ActionType } from "../../enums/ActionType";
import ISubtreeUI from "../ui/UIs/ISubtreeUI";


export default interface ISubtreeSys {

    tree: ITreeSys;
    stRoot: IStRoot;
    stSockets: Array<IStSocket>;

    errors: Array<string>;
    action: ActionType;
    ui: ISubtreeUI;
}

