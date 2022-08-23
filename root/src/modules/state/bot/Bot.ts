import IDraft from "../../interfaces/state/bot/IDraft";
import IBot from "../../interfaces/state/bot/IBot";
import { BotType } from "../../interfaces/enums/BotType";
import IAlias from "../../interfaces/state/bot/IAlias";


export default class Bot implements IBot {

    public type: BotType = BotType.None;
    public bot: IAlias | IDraft | null = null;
}

