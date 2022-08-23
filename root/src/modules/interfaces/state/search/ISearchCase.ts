import ISearchBrief from "./ISearchBrief";
import IState from "../IState";
import IStateAnyArray from "../IStateAnyArray";
import ISearchCaseUI from "../ui/UIs/ISearchCaseUI";


export default interface ISearchCase {

    brief: ISearchBrief | null;
    buildAction: ((state: IState, searchCase: ISearchCase) => IStateAnyArray) | null;
    selectAction: ((state: IState, searchCase: ISearchCase) => any) | null;

    ui: ISearchCaseUI;
}
