import INotification from "../../interfaces/state/notifications/INotification";
import INotifications from "../../interfaces/state/notifications/INotifications";
import PaginationDetails from "../ui/payloads/PaginationDetails";
import IPaginationDetails from "../../interfaces/state/ui/payloads/IPaginationDetails";

export default class Notifications implements INotifications {

    constructor(defaultBatchSize: number) {

        this.paginationDetails = new PaginationDetails(
            0,
            defaultBatchSize,
            0
        );
    }

    public selectedKey: string = "";
    public values: Array<INotification> = new Array<INotification>();
    public paginationDetails: IPaginationDetails;
}
