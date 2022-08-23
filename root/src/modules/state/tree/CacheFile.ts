import { ActionType } from "../../interfaces/enums/ActionType";
import ICacheFile from "../../interfaces/state/tree/ICacheFile";


export default class CacheFile implements ICacheFile {

    constructor(
        id: string,
        fileID: string,
        fileName: string,
        action: ActionType) {
            
        this.id = id;
        this.fileID = fileID;
        this.fileName = fileName;
        this.action = action;
    }

    public id: string;
    public r: string = "";
    public fileID: string;
    public fileName: string;
    public action: ActionType;
}
