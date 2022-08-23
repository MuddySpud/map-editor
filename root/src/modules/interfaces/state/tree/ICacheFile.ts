import { ActionType } from "../../enums/ActionType";


export default interface ICacheFile {

    id: string;
    r: string;
    fileID: string;     
    fileName: string;
    action: ActionType;
}
