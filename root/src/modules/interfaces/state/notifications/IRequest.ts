import { ActionType } from "../../enums/ActionType";


export default interface IRequest {
    
    name: string;
    treeKey: string;
    nodeKey: string | null;
    callID: string;
    action: ActionType;
    time: Date;
}
