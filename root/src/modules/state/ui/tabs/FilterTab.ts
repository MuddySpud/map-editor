import IFilterTab from "../../../interfaces/state/ui/tabs/IFilterTab";
import IStageBehaviour from "../../../interfaces/behaviours/IStageBehaviour";
import ISearchCase from "../../../interfaces/state/Search/ISearchCase";
import gStageCode from "../../../global/code/gStageCode";
import SearchCase from "../../search/SearchCase";
import { TabType } from "../../../interfaces/enums/TabType";


export default class FilterTab implements IFilterTab {

    public type: TabType = TabType.Filter;
    public enableSave: boolean = true; // Not used so set as true
    public saveLock: boolean = false;
    public lensSearch: ISearchCase = new SearchCase();
    public liveSearch: ISearchCase = new SearchCase();
    public stageBehaviour: IStageBehaviour = gStageCode.buildSearchNodeStages();
    public advanced: boolean = false;
}
