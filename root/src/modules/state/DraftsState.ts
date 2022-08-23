import IRequest from "../interfaces/state/notifications/IRequest";
import PaginationDetails from "./ui/payloads/PaginationDetails";
import IPaginationDetails from "../interfaces/state/ui/payloads/IPaginationDetails";
import IDraft from "../interfaces/state/bot/IDraft";
import IDraftsState from "../interfaces/state/IDraftsState";


export default class DraftsState implements IDraftsState {
    
    public drafts: Array<IDraft> = [];
    public draftCount: number = 0;
    public openRequests: Array<IRequest> = [];
    public closedRequests: Array<IRequest> = [];
    
    public paginationDetails: IPaginationDetails = new PaginationDetails(
        0,
        50,
        0
    );
}
