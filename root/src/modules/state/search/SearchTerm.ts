import ISearchTerm from "../../interfaces/state/Search/ISearchTerm";
import { JoinerType } from "../../interfaces/enums/search/JoinerType";
import { FieldType } from "../../interfaces/enums/search/FieldType";
import { TermType } from "../../interfaces/enums/search/TermType";


export default class SearchTerm implements ISearchTerm {

    constructor(key: string) {
        
        this.key = key;
    }

    public key: string;
    public joiner: JoinerType = JoinerType.None;
    public field: FieldType = FieldType.None;
    public term: TermType = TermType.None;
    public text: string = "";
    public truth: boolean = false;
}
