import ISubtreeSys from "../../tree/ISubtreeSys";
import ISearchCase from "../../Search/ISearchCase";


export default interface ISubtreeSearchCase {

    subtree: ISubtreeSys;
    searchCase: ISearchCase | null;
}
