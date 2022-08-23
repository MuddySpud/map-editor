import IViewSettingsTab from "../../../interfaces/state/ui/tabs/IViewSettingsTab";
import IStageBehaviour from "../../../interfaces/behaviours/IStageBehaviour";
import IViewSettings from "../../../interfaces/state/user/IViewSettings";
import gStageCode from "../../../global/code/gStageCode";
import { TabType } from "../../../interfaces/enums/TabType";


export default class ViewSettingsTab implements IViewSettingsTab {

    public type: TabType = TabType.UserViews;
    public enableSave: boolean = false;
    public saveLock: boolean = false;
    public lensViewSettings: IViewSettings | null = null;
    public stageBehaviour: IStageBehaviour = gStageCode.buildViewSettingsStages();
}
