import IViewSettings from "../../user/IViewSettings";
import ITabSave from "./ITabSave";


export default interface IViewSettingsTab extends ITabSave {

    lensViewSettings: IViewSettings | null;
}
