import IRequest from "../interfaces/state/notifications/IRequest";
import PaginationDetails from "./ui/payloads/PaginationDetails";
import IPaginationDetails from "../interfaces/state/ui/payloads/IPaginationDetails";
import IAliasesState from "../interfaces/state/IAliasesState";
import IAlias from "../interfaces/state/bot/IAlias";


export default class AliasesState implements IAliasesState {
    
    public aliases: Array<IAlias> = [];
    public aliasCount: number = 0;
    public openRequests: Array<IRequest> = [];
    public closedRequests: Array<IRequest> = [];
    
    public paginationDetails: IPaginationDetails = new PaginationDetails(
        0,
        50,
        0
    );
}
