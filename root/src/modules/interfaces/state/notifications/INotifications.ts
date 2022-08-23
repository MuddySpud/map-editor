import INotification from "./INotification";
import IPaginationDetails from "../ui/payloads/IPaginationDetails";


export default interface INotifications {
    
    selectedKey: string;
    values: Array<INotification>;
    paginationDetails: IPaginationDetails;
}
