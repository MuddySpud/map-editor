import { ActionType } from "../../enums/ActionType";


export default interface IStRoot {

    key: string;
    r: string;
    text: string;
    token: string;

    errors: Array<string>;
    action: ActionType;
}
