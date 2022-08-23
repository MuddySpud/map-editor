import ISettings from "../../user/ISettings";
import ITabSave from "./ITabSave";


export default interface ISettingsTab extends ITabSave {

    lensSettings: ISettings | null;
}
