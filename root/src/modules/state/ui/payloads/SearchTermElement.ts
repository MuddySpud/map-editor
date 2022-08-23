import ISearchTermElement from "../../../interfaces/state/ui/payloads/ISearchTermElement";
import ISearchTerm from "../../../interfaces/state/Search/ISearchTerm";
import ISearchCase from "../../../interfaces/state/Search/ISearchCase";
import ITabSave from "../../../interfaces/state/ui/tabs/ITabSave";


export default class SearchTermElement implements ISearchTermElement {

    constructor(
        tab: ITabSave,
        searchCase: ISearchCase,
        searchTerm: ISearchTerm | null,
        element: HTMLElement | null) {

        this.tab = tab;
        this.searchCase = searchCase;
        this.searchTerm = searchTerm;
        this.element = element;
    }

    public tab: ITabSave;
    public searchCase: ISearchCase;
    public searchTerm: ISearchTerm | null;
    public element: HTMLElement | null;
}
