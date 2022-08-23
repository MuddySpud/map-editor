import IStageBehaviour from "../../../behaviours/IStageBehaviour";
import IHistoryCase from "../../cases/IHistoryCase";


export default interface IHistoryTab {

    display: boolean;
    historyCase: IHistoryCase | null;
    stageBehaviour: IStageBehaviour;
}
