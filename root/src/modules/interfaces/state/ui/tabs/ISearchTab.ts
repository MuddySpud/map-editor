import ISearchCase from "../../Search/ISearchCase";
import ITabSave from "./ITabSave";


export default interface ISearchTab extends ITabSave {

    lensSearch: ISearchCase;
}
