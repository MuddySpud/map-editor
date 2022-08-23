import ISearchStage from "../../interfaces/state/Search/ISearchStage";
import ISearchCase from "../../interfaces/state/Search/ISearchCase";
import IStageBehaviour from "../../interfaces/behaviours/IStageBehaviour";


export default class SearchStage implements ISearchStage {

    constructor(
        searchCase: ISearchCase,
        stageBehaviour: IStageBehaviour) {

        this.searchCase = searchCase;
        this.stageBehaviour = stageBehaviour;
    }

    public searchCase: ISearchCase;
    public stageBehaviour: IStageBehaviour;
}

