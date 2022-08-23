import ISearchCase from "../../Search/ISearchCase";
import ITabSave from "./ITabSave";


export default interface IFilterTab extends ITabSave {

    advanced: boolean;
    lensSearch: ISearchCase;
    liveSearch: ISearchCase;
}
