import { ActionType } from "../../../../../interfaces/enums/ActionType";
import IOptionJson from "../../../../../interfaces/state/ui/IOptionJson";


export default interface IConcealedOptionJson extends IOptionJson {
    
    action: ActionType;
    error: string;
    script: string;
    comment: string;
}
