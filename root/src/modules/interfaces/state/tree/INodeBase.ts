import { NodeType } from "../../enums/NodeType";
import { ActionType } from "../../enums/ActionType";
import ISubtreeSys from "./ISubtreeSys";
import IStSocket from "./IStSocket";
import ISocketHole from "./ISocketHole";
import ICacheFile from "./ICacheFile";
import IReserve from "./IReserve";
import ILooper from "./ILooper";


export default interface INodeBase {
    
    key: string | null;
    r: string;
    parent: INodeBase | null;
    type: NodeType;
    option: string;
    discussion: string;
    inputs: string;
    token: string | null;
    order: number;
    nodes: Array<INodeBase>;
    isSocket: boolean;
    socketHole: ISocketHole | null;
    isPlug: boolean;
    isLink: boolean;
    isVirtual: boolean;
    isHidden: boolean;
    looper: ILooper;
    errors: Array<string>;
    action: ActionType;
    isEntry: boolean;
    isRoot: boolean;
    isSilentRoot: boolean;
    isStash: boolean;
    isStashRoot: boolean;
    isParentRoot: boolean;
    isParentSilentRoot: boolean;
    link: ISubtreeSys | null;
    plug: IStSocket | null;
    bin: any;
    files: Array<ICacheFile>;
    reserve: IReserve;
}
