import ISettingsTab from "../../../interfaces/state/ui/tabs/ISettingsTab";
import IStageBehaviour from "../../../interfaces/behaviours/IStageBehaviour";
import ISettings from "../../../interfaces/state/user/ISettings";
import gStageCode from "../../../global/code/gStageCode";
import { TabType } from "../../../interfaces/enums/TabType";


export default class SettingsTab implements ISettingsTab {

    public type: TabType = TabType.Settings;
    public enableSave: boolean = false;
    public saveLock: boolean = false;
    public lensSettings: ISettings | null = null;
    public stageBehaviour: IStageBehaviour = gStageCode.buildSettingsStages();
}
