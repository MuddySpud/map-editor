import IStageBehaviour from "../../../behaviours/IStageBehaviour";
import INotificationsCase from "../../cases/INotificationsCase";


export default interface INotificationsTab {

    display: boolean;
    allUsers: boolean;
    allTrees: boolean;
    local: boolean;
    notificationsCase: INotificationsCase | null;
    stageBehaviour: IStageBehaviour;
}
