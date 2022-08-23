import ITreesState from "../interfaces/state/ITreesState";
import ITreeSys from "../interfaces/state/tree/ITreeSys";
import IRequest from "../interfaces/state/notifications/IRequest";
import PaginationDetails from "./ui/payloads/PaginationDetails";
import IPaginationDetails from "../interfaces/state/ui/payloads/IPaginationDetails";


export default class TreesState implements ITreesState {
    
    public selectedKey: string = "";
    public queuedKey: string = "";
    public trees: Array<ITreeSys> = [];
    public openRequests: Array<IRequest> = [];
    public closedRequests: Array<IRequest> = [];
    public treesCount: number = 0;
    
    public paginationDetails: IPaginationDetails = new PaginationDetails(
        0,
        50,
        0
    );
}
