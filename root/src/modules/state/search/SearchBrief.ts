import ISearchBrief from "../../interfaces/state/Search/ISearchBrief";
import ISearchTerm from "../../interfaces/state/Search/ISearchTerm";
import { SearchType } from "../../interfaces/enums/search/SearchType";
import TreeResults from "./TreeResults";
import ITreeResults from "../../interfaces/state/Search/ITreeResults";
import INodeResults from "../../interfaces/state/search/INodeResults";
import NodeResults from "./NodeResults";
import ISubtreeResults from "../../interfaces/state/search/ISubtreeResults";
import SubtreeResults from "./SubtreeResults";
import IPaginationDetails from "../../interfaces/state/ui/payloads/IPaginationDetails";
import PaginationDetails from "../ui/payloads/PaginationDetails";


export default class SearchBrief implements ISearchBrief {

    public type: SearchType = SearchType.None;
    public searchTerms: Array<ISearchTerm> = new Array<ISearchTerm>();
    public treeResults: ITreeResults = new TreeResults();
    public subtreeResults: ISubtreeResults = new SubtreeResults();
    public nodeResults: INodeResults = new NodeResults();
    public selectedKey: string | null = null;
    public selectedToken: string | null = null;
    public cancelSelect: boolean = false;
    
    public paginationDetails: IPaginationDetails = new PaginationDetails(
        0,
        20,
        0
    );
}

