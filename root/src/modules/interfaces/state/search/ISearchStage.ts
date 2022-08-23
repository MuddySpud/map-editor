import ISearchCase from "./ISearchCase";
import IStageBehaviour from "../../behaviours/IStageBehaviour";


export default interface ISearchStage {

    searchCase: ISearchCase;
    stageBehaviour: IStageBehaviour;
}
