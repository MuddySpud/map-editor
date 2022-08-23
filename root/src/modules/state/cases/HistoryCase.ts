import IHistoryCase from "../../interfaces/state/cases/IHistoryCase";
import IDeed from "../../interfaces/state/notifications/IDeed";
import IPaginationDetails from "../../interfaces/state/ui/payloads/IPaginationDetails";
import PaginationDetails from "../ui/payloads/PaginationDetails";


export default class HistoryCase implements IHistoryCase {
    
    constructor(defaultBatchSize: number) {
            
            this.paginationDetails = new PaginationDetails(
                0,
                defaultBatchSize,
                0
            );
        }

    public fresh: boolean = true;
    public selectedID: string = "";
    public deeds: Array<IDeed> = new Array<IDeed>();
    public paginationDetails: IPaginationDetails;
}

