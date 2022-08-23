import ITabSave from "./ITabSave";
import IBot from "../../bot/IBot";


export default interface IBotTab extends ITabSave {

    display: boolean;
    loadingAliasKey: string | null;
    loadingDraftKey: string | null;
    ghostBot: IBot;
    lensBot: IBot;
}
