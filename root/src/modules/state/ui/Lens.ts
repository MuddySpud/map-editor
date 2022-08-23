import ILens from "../../interfaces/state/ui/ILens";
import { TabType } from "../../interfaces/enums/TabType";
import INodeTab from "../../interfaces/state/ui/tabs/INodeTab";
import NodeTab from "./tabs/NodeTab";
import ISettingsTab from "../../interfaces/state/ui/tabs/ISettingsTab";
import IViewSettingsTab from "../../interfaces/state/ui/tabs/IViewSettingsTab";
import ISearchTab from "../../interfaces/state/ui/tabs/ISearchTab";
import ITreeTab from "../../interfaces/state/ui/tabs/ITreeTab";
import SettingsTab from "./tabs/SettingsTab";
import ViewSettingsTab from "./tabs/ViewSettingsTab";
import TreeTab from "./tabs/TreeTab";
import SearchTab from "./tabs/SearchTab";
import NotificationsTab from "./tabs/NotificationsTab";
import ValidationsTab from "./tabs/ValidationsTab";
import INotificationsTab from "../../interfaces/state/ui/tabs/INotificationsTab";
import IValidatidationsTab from "../../interfaces/state/ui/tabs/IValidationsTab";
import ISpreadTab from "../../interfaces/state/ui/tabs/ISpreadTab";
import SpreadTab from "./tabs/SpreadTab";
import IShapeTab from "../../interfaces/state/ui/tabs/IShapeTab";
import ShapeTab from "./tabs/ShapeTab";
import ITagsTab from "../../interfaces/state/ui/tabs/ITagsTab";
import TagsTab from "./tabs/TagsTab";
import IHistoryTab from "../../interfaces/state/ui/tabs/IHistoryTab";
import HistoryTab from "./tabs/HistoryTab";
import IValidationResults from "../../interfaces/state/ui/IValidationResults";
import ValidationResults from "./ValidationResults";
import FilterTab from "./tabs/FilterTab";
import IFilterTab from "../../interfaces/state/ui/tabs/IFilterTab";
import ILensWarning from "../../interfaces/state/ui/ILensWarning";
import { VNode } from "hyperapp-local";
import IBotTab from "../../interfaces/state/ui/tabs/IBotTab";
import BotTab from "./tabs/BotTab";


export default class Lens implements ILens {

    public selectedTab: TabType = TabType.None;
    public minimised: boolean = false;
    public validationResults: IValidationResults = new ValidationResults();
    public warning: ILensWarning | null = null;

    public nodeTab: INodeTab = new NodeTab();
    public settingsTab: ISettingsTab = new SettingsTab();
    public viewSettingsTab: IViewSettingsTab = new ViewSettingsTab();
    public searchTab: ISearchTab = new SearchTab();
    public filterTab: IFilterTab = new FilterTab();
    public treeTab: ITreeTab = new TreeTab();
    public botTab: IBotTab = new BotTab();
    public notificationsTab: INotificationsTab = new NotificationsTab();
    public validationsTab: IValidatidationsTab = new ValidationsTab();
    public spreadTab: ISpreadTab = new SpreadTab();
    public shapeTab: IShapeTab = new ShapeTab();
    public tagsTab: ITagsTab = new TagsTab();
    public historyTab: IHistoryTab = new HistoryTab();
    public overlayDelegate: (() => VNode) | null = null;

}
