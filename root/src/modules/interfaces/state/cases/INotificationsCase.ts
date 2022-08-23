import IDataCase from "./IDataCase";
import INotifications from "../notifications/INotifications";


export default interface INotificationsCase extends IDataCase {
    
    notifications: INotifications;
}
