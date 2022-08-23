import { NodeType } from "../../interfaces/enums/NodeType";
import { ActionType } from "../../interfaces/enums/ActionType";
import INodeBase from "../../interfaces/state/tree/INodeBase";
import ISubtreeSys from "../../interfaces/state/tree/ISubtreeSys";
import IStSocket from "../../interfaces/state/tree/IStSocket";
import ISocketHole from "../../interfaces/state/tree/ISocketHole";
import ICacheFile from "../../interfaces/state/tree/ICacheFile";
import IReserve from "../../interfaces/state/tree/IReserve";
import Reserve from "./Reserve";
import ILooper from "../../interfaces/state/tree/ILooper";
import Looper from "./Looper";


export default class NodeBase implements INodeBase {

    public key: string | null = null;
    public r: string = "-1";
    public parent: INodeBase | null = null;
    public type: NodeType = NodeType.None;
    public option: string = '';
    public discussion: string = '';
    public inputs: string = '';
    public token: string | null = null;
    public order: number = 0;
    public nodes: Array<INodeBase> = new Array<INodeBase>();
    public isRoot: boolean = false;
    public isSilentRoot: boolean = false;
    public isSocket: boolean = false;
    public isHidden: boolean = false;
    public looper: ILooper = new Looper();
    public loopRepeatText: string = "";
    public socketHole: ISocketHole | null = null;
    public isPlug: boolean = false;
    public isLink: boolean = false;
    public isVirtual: boolean = false;
    public errors: Array<string> = [];
    public action: ActionType = ActionType.None;
    public isEntry: boolean = false;
    public isParentRoot: boolean = false;
    public isParentSilentRoot: boolean = false;
    public link: ISubtreeSys | null = null;
    public plug: IStSocket | null = null;
    public isStash: boolean = false;
    public isStashRoot: boolean = false;
    public bin: any;
    public files: Array<ICacheFile> = [];
    public reserve: IReserve = new Reserve();
}
