import { BotType } from "../../enums/BotType";
import IAlias from "./IAlias";
import IDraft from "./IDraft";


export default interface IBot {

    type: BotType;
    bot: IAlias | IDraft | null;
}
