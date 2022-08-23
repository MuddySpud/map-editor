import IState from "../interfaces/state/IState";
import Settings from "./user/Settings";
import ISettings from "../interfaces/state/user/ISettings";
import IDialogue from "../interfaces/state/ui/IDialogue";
import IRepeatEffects from "../interfaces/state/effects/IRepeatEffects";
import RepeateEffects from "./effects/RepeateEffects";
import User from "./user/User";
import IUser from "../interfaces/state/user/IUser";
import ILens from "../interfaces/state/ui/ILens";
import Lens from "./ui/Lens";
import Status from "./ui/Status";
import IStatus from "../interfaces/state/ui/IStatus";
import { DisplayType } from "../interfaces/enums/DisplayType";
import ITreesState from "../interfaces/state/ITreesState";
import TreesState from "./TreesState";
import IBranchesState from "../interfaces/state/IBranchesState";
import BranchesState from "./BranchesState";
import INotifications from "../interfaces/state/notifications/INotifications";
import Notifications from "./notifications/Notifications";
import IRecordState from "../interfaces/state/IRecordState";
import RecordState from "./RecordState";
import NoRecordState from "./NoRecordState";
import IProjectState from "../interfaces/state/IProjectState";
import ProjectState from "./ProjectState";
import ISubscriptionState from "../interfaces/state/ISubscriptionState";
import SubscriptionState from "./SubscriptionState";
import IBotsState from "../interfaces/state/IBotsState";
import BotsState from "./BotsState";


export default class State implements IState {

    constructor() {

        const settings: ISettings = new Settings();
        this.notifications = new Notifications(settings.defaultDataBatchSize);

        if (settings.record) {

            this.record = new RecordState();
        }
        else {
            this.record = new NoRecordState();
        }
        
        this.settings = settings;
        this.status = new Status();
        this.repeatEffects = new RepeateEffects();
        this.lens = new Lens();
    }

    public loading: boolean = true;
    // public introPlayed: boolean = false;
    public displayType: DisplayType = DisplayType.Trees;
    public nextKey: number = -1;
    public user: IUser = new User();
    public settings: ISettings;
    public dialogue: IDialogue | null = null;
    public notifications: INotifications;
    public status: IStatus;
    public repeatEffects: IRepeatEffects;
    public lens: ILens;

    // state
    public subscriptionState: ISubscriptionState = new SubscriptionState();
    public treesState: ITreesState = new TreesState();
    public botsState: IBotsState = new BotsState();
    public projectState: IProjectState = new ProjectState();
    public branchesState: IBranchesState = new BranchesState();

    public record: IRecordState = new RecordState();
}
