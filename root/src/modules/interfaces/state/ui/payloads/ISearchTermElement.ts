import ISearchTerm from "../../Search/ISearchTerm";
import ISearchCase from "../../Search/ISearchCase";
import ITabSave from "../tabs/ITabSave";


export default interface ISearchTermElement {

    tab: ITabSave;
    searchCase: ISearchCase;
    searchTerm: ISearchTerm | null;
    element: HTMLElement | null;
}
