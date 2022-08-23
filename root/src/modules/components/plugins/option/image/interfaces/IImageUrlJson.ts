import { ActionType } from "../../../../../interfaces/enums/ActionType";
import IOptionJson from "../../../../../interfaces/state/ui/IOptionJson";


export default interface IInputOptionJson extends IOptionJson {
    
    action: ActionType;
    error: string;
    text: string;
    id: string;
    fileName: string;
    fileID: string;
    enableChildOptionImages: boolean;
    uploading: boolean;
    enableImages: boolean;
}
