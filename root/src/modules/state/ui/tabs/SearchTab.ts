import ISearchTab from "../../../interfaces/state/ui/tabs/ISearchTab";
import IStageBehaviour from "../../../interfaces/behaviours/IStageBehaviour";
import ISearchCase from "../../../interfaces/state/Search/ISearchCase";
import gStageCode from "../../../global/code/gStageCode";
import SearchCase from "../../search/SearchCase";
import { TabType } from "../../../interfaces/enums/TabType";


export default class SearchTab implements ISearchTab {

    public type: TabType = TabType.Search;
    public enableSave: boolean = true; // Not used so set as true
    public saveLock: boolean = false;
    public lensSearch: ISearchCase = new SearchCase();
    public stageBehaviour: IStageBehaviour = gStageCode.buildSearchNodeStages();
}
