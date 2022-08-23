import { ActionType } from "../../enums/ActionType";
import IBotUI from "../ui/UIs/IBotUI";


export default interface IDraft {

    key: string;
    r: string;
    treeKey: string;
    jobKey: string;
    rootDkID: string;
    version: string;
    name: string;
    title: string;
    description: string;
    token: string;
    tags: Array<string>;
    action: ActionType;
    created: Date | null;

    deleteLock: boolean;

    ui: IBotUI;
}
