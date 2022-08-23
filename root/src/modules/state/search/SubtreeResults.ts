import ISubtreeSys from "../../interfaces/state/tree/ISubtreeSys";
import ISubtreeResults from "../../interfaces/state/search/ISubtreeResults";


export default class SubtreeResults implements ISubtreeResults {

    public selectedIndex: number = -1;
    public selectedExpanded: boolean = false;
    public results: Array<ISubtreeSys> = new Array<ISubtreeSys>();
}
