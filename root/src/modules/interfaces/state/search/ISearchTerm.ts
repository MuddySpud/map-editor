import { JoinerType } from "../../enums/search/JoinerType";
import { FieldType } from "../../enums/search/FieldType";
import { TermType } from "../../enums/search/TermType";


export default interface ISearchTerm {
    
    key: string;
    joiner: JoinerType;
    field: FieldType;
    term: TermType;
    text: string;
    truth: boolean;
    
}
