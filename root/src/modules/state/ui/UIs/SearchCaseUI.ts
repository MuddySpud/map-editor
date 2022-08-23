import ISearchCaseUI from "../../../interfaces/state/ui/UIs/ISearchCaseUI";


export default class SearchCaseUI implements ISearchCaseUI {

    public advanced: boolean = false;
    public raw: boolean = true;
    public overrideExpand: boolean = true;
}
