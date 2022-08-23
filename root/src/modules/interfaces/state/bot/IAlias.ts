import { ActionType } from "../../enums/ActionType";
import IBotUI from "../ui/UIs/IBotUI";
import IDraft from "./IDraft";


export default interface IAlias {

    key: string;
    r: string;
    title: string;
    rootDkID: string;
    description: string;
    token: string;
    enabled: boolean;
    draft: IDraft;
    version: string;
    tags: Array<string>;
    action: ActionType;
    created: Date | null;
    errors: Array<string>;

    ui: IBotUI;
}
