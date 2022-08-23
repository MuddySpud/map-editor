import IAlias from "./bot/IAlias";
import IRequest from "./notifications/IRequest";
import IPaginationDetails from "./ui/payloads/IPaginationDetails";


export default interface IAliasesState {
    
    aliases: Array<IAlias>;
    aliasCount: number;
    openRequests: Array<IRequest>;
    closedRequests: Array<IRequest>;
    paginationDetails: IPaginationDetails;
}

