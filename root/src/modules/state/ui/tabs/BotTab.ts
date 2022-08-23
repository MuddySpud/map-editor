import { TabType } from "../../../interfaces/enums/TabType";
import IBotTab from "../../../interfaces/state/ui/tabs/IBotTab";
import IStageBehaviour from "../../../interfaces/behaviours/IStageBehaviour";
import gStageCode from "../../../global/code/gStageCode";
import IBot from "../../../interfaces/state/bot/IBot";
import Bot from "../../bot/Bot";


export default class BotTab implements IBotTab {

    public type: TabType = TabType.Bot;
    public enableSave: boolean = false;
    public saveLock: boolean = false;
    public display: boolean = false;
    public loadingDraftKey: string | null = null;
    public loadingAliasKey: string | null = null;
    public ghostBot: IBot = new Bot();
    public lensBot: IBot = new Bot();
    public stageBehaviour: IStageBehaviour = gStageCode.buildBotAliasHubStages();
}
