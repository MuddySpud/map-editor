import ISubtreeSearchCase from "../../../interfaces/state/ui/payloads/ISubtreeSearchCase";
import ISubtreeSys from "../../../interfaces/state/tree/ISubtreeSys";
import ISearchCase from "../../../interfaces/state/Search/ISearchCase";


export default class SubtreeSearchCase implements ISubtreeSearchCase {
    
    constructor(
        subtree: ISubtreeSys,
        searchCase: ISearchCase | null) {

            this.subtree = subtree;
            this.searchCase = searchCase;
        }

    public subtree: ISubtreeSys;
    public searchCase: ISearchCase | null;
}
