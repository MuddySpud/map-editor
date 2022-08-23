import INotificationsCase from "../../interfaces/state/cases/INotificationsCase";
import Notifications from "../notifications/Notifications";
import INotifications from "../../interfaces/state/notifications/INotifications";


export default class NotificationsCase implements INotificationsCase {

    constructor(defaultBatchSize: number) {

        this.notifications = new Notifications(defaultBatchSize);
    }

    public fresh: boolean = false;
    public notifications: INotifications;
}

