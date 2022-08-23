import ISettings from "./user/ISettings";
import IDialogue from "./ui/IDialogue";
import INotifications from "./notifications/INotifications";
import IRepeatEffects from "./effects/IRepeatEffects";
import IUser from "./user/IUser";
import ILens from "./ui/ILens";
import IStatus from "./ui/IStatus";
import { DisplayType } from "../enums/DisplayType";
import ITreesState from "./ITreesState";
import IBranchesState from "./IBranchesState";
import IRecordState from "./IRecordState";
import IProjectState from "./IProjectState";
import ISubscriptionState from "./ISubscriptionState";
import IBotsState from "./IBotsState";


export default interface IState {

    loading: boolean;
    displayType: DisplayType;
    nextKey: number;
    user: IUser;
    settings: ISettings;
    dialogue: IDialogue | null;
    notifications: INotifications;
    status: IStatus;
    repeatEffects: IRepeatEffects;
    lens: ILens;

    // state
    subscriptionState: ISubscriptionState;
    treesState: ITreesState;
    botsState: IBotsState;
    projectState: IProjectState;
    branchesState: IBranchesState;

    record: IRecordState;
}
