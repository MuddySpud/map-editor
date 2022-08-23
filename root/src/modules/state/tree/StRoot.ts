import IStRoot from "../../interfaces/state/tree/IStRoot";
import { ActionType } from "../../interfaces/enums/ActionType";


export default class StRoot implements IStRoot {

    public key: string = '';
    public r: string = '-1';
    public text: string = '';
    public token: string = '';

    public errors: Array<string> = [];
    public action: ActionType = ActionType.None;
}
