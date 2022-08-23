import { ActionType } from "../../interfaces/enums/ActionType";
import IDraft from "../../interfaces/state/bot/IDraft";
import IBotUI from "../../interfaces/state/ui/UIs/IBotUI";
import BotUI from "../ui/UIs/BotUI";


export default class Draft implements IDraft {
    
    public key: string = '';
    public r: string = '';
    public treeKey: string = '';;
    public jobKey: string = '';;
    public name: string = '';;
    public token: string = '';;
    public title: string = '';
    public description: string = '';
    public enabled: boolean = false;
    public rootDkID: string = '';
    public version: string = '';
    public tags: string[] = [];
    public action: ActionType = ActionType.None;
    public created: Date | null = null;

    public deleteLock: boolean = false;

    public ui: IBotUI = new BotUI();
}

