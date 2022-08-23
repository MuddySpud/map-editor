import ISearchCase from "../../interfaces/state/Search/ISearchCase";
import ISearchBrief from "../../interfaces/state/Search/ISearchBrief";
import IState from "../../interfaces/state/IState";
import IStateAnyArray from "../../interfaces/state/IStateAnyArray";
import ISearchCaseUI from "../../interfaces/state/ui/UIs/ISearchCaseUI";
import SearchCaseUI from "../ui/UIs/SearchCaseUI";


export default class SearchCase implements ISearchCase {

    public brief: ISearchBrief | null = null;
    public buildAction: ((state: IState, searchCase: ISearchCase) => IStateAnyArray) | null = null;
    public selectAction: ((state: IState, searchCase: ISearchCase) => any) | null = null;

    public ui: ISearchCaseUI = new SearchCaseUI();
}

