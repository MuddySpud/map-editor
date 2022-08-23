import ISearchTerm from "./ISearchTerm";
import { SearchType } from "../../enums/search/SearchType";
import INodeResults from "./INodeResults";
import ITreeResults from "./ITreeResults";
import ISubtreeResults from "./ISubtreeResults";
import IPaginationDetails from "../ui/payloads/IPaginationDetails";


export default interface ISearchBrief {

    searchTerms: Array<ISearchTerm>;
    subtreeResults: ISubtreeResults;
    treeResults: ITreeResults;
    nodeResults: INodeResults;
    type: SearchType;
    selectedKey: string | null;
    selectedToken: string | null;
    cancelSelect: boolean;
    paginationDetails: IPaginationDetails;
}
