import ITreeSys from "./tree/ITreeSys";
import IRequest from "./notifications/IRequest";
import IPaginationDetails from "./ui/payloads/IPaginationDetails";


export default interface ITreesState {
    
    selectedKey: string;
    queuedKey: string;
    trees: Array<ITreeSys>;
    treesCount: number;
    openRequests: Array<IRequest>;
    closedRequests: Array<IRequest>;
    paginationDetails: IPaginationDetails;
}

