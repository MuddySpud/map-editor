import IDraft from "../../interfaces/state/bot/IDraft";
import IBotUI from "../../interfaces/state/ui/UIs/IBotUI";
import BotUI from "../ui/UIs/BotUI";
import Draft from "./Draft";
import { ActionType } from "../../interfaces/enums/ActionType";
import IAlias from "../../interfaces/state/bot/IAlias";


export default class Alias implements IAlias {

    public key: string = '';
    public r: string = '';
    public title: string = '';
    public description: string = '';
    public token: string = '';
    public enabled: boolean = false;
    public draft: IDraft = new Draft();
    public version: string = '';
    public rootDkID: string = '';
    public tags: string[] = [];
    public ui: IBotUI = new BotUI();
    public action: ActionType = ActionType.None;
    public created: Date | null = null;
    public errors: Array<string> = [];
}

