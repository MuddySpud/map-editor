import IPaginationDetails from "../../../interfaces/state/ui/payloads/IPaginationDetails";


export default class PaginationDetails implements IPaginationDetails {

    constructor(
        start: number,
        count: number,
        totalItems: number) {
            
        this.start = start;
        this.count = count;
        this.totalItems = totalItems;
    }

    public start: number;
    public count: number;
    public totalItems: number;
}
