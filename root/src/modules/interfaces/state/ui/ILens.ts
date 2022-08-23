import { VNode } from "hyperapp-local";

import { TabType } from "../../enums/TabType";
import INodeTab from "./tabs/INodeTab";
import ISettingsTab from "./tabs/ISettingsTab";
import IViewSettingsTab from "./tabs/IViewSettingsTab";
import ISearchTab from "./tabs/ISearchTab";
import ITreeTab from "./tabs/ITreeTab";
import INotificationsTab from "./tabs/INotificationsTab";
import IValidatidationsTab from "./tabs/IValidationsTab";
import ISpreadTab from "./tabs/ISpreadTab";
import IShapeTab from "./tabs/IShapeTab";
import ITagsTab from "./tabs/ITagsTab";
import IHistoryTab from "./tabs/IHistoryTab";
import IValidationResults from "./IValidationResults";
import IFilterTab from "./tabs/IFilterTab";
import ILensWarning from "./ILensWarning";
import IBotTab from "./tabs/IBotTab";


export default interface ILens {

    selectedTab: TabType;
    minimised: boolean;
    validationResults: IValidationResults;
    warning: ILensWarning | null;

    nodeTab: INodeTab;
    settingsTab: ISettingsTab;
    viewSettingsTab: IViewSettingsTab;
    searchTab: ISearchTab;
    filterTab: IFilterTab;
    treeTab: ITreeTab;
    botTab: IBotTab;
    notificationsTab: INotificationsTab;
    validationsTab: IValidatidationsTab;
    spreadTab: ISpreadTab;
    shapeTab: IShapeTab;
    tagsTab: ITagsTab;
    historyTab: IHistoryTab;
    overlayDelegate: (() => VNode) | null
}
