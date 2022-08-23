import IRequest from "../../interfaces/state/notifications/IRequest";
import { ActionType } from "../../interfaces/enums/ActionType";


export default class Request implements IRequest {

    constructor(
        name: string,
        treeKey: string,
        callID: string,
        action: ActionType,
        time: Date,
        nodeKey: string | null) {

        this.name = name;
        this.treeKey = treeKey;
        this.nodeKey = nodeKey;
        this.callID = callID;
        this.action = action;
        this.time = time;
    }

    public name: string;
    public treeKey: string;
    public nodeKey: string | null;
    public callID: string;
    public action: ActionType;
    public time: Date;
}

