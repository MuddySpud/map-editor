import IPaginationPayload from "../../../interfaces/state/ui/payloads/IPaginationPayload";
import IPaginationDetails from "../../../interfaces/state/ui/payloads/IPaginationDetails";


export default class PaginationPayload implements IPaginationPayload {

    constructor(
        paginationDetails: IPaginationDetails,
        payload: any) {
            
        this.paginationDetails = paginationDetails;
        this.payload = payload;
    }

    public paginationDetails: IPaginationDetails;
    public payload: any;
}
