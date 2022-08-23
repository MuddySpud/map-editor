import ISearchCaseValue from "../../interfaces/state/ui/ISearchCaseValue";
import ISearchCase from "../../interfaces/state/Search/ISearchCase";


export default class SearchCaseValue implements ISearchCaseValue {

    constructor(
        searchCase: ISearchCase,
        value: string) {
            
            this.searchCase = searchCase;
            this.value = value;
        }

    public searchCase: ISearchCase;
    public value: string;
}
