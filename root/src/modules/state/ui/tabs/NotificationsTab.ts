import INotificationsTab from "../../../interfaces/state/ui/tabs/INotificationsTab";
import IStageBehaviour from "../../../interfaces/behaviours/IStageBehaviour";
import gStageCode from "../../../global/code/gStageCode";
import INotificationsCase from "../../../interfaces/state/cases/INotificationsCase";


export default class NotificationsTab implements INotificationsTab {

    public display: boolean = false;
    public allUsers: boolean = false;
    public allTrees: boolean = false;
    public local: boolean = true;

    public notificationsCase: INotificationsCase | null = null;
    public stageBehaviour: IStageBehaviour = gStageCode.buildNotificationStages();
}
