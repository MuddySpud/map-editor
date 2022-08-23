import { FieldType } from "../../enums/search/FieldType";
import { InputType } from "../../enums/search/InputType";
import { TermType } from "../../enums/search/TermType";


export default interface IFieldMapping {

    inputType: InputType;
    fieldType: FieldType;
    terms: Array<TermType>;
    display: string;
}
