import IRequest from "./notifications/IRequest";
import IPaginationDetails from "./ui/payloads/IPaginationDetails";
import IDraft from "./bot/IDraft";


export default interface IDraftsState {
    
    drafts: Array<IDraft>;
    draftCount: number;
    openRequests: Array<IRequest>;
    closedRequests: Array<IRequest>;
    paginationDetails: IPaginationDetails;
}

