import IFieldMapping from "../../interfaces/state/Search/IFieldMapping";
import { InputType } from "../../interfaces/enums/search/InputType";
import { FieldType } from "../../interfaces/enums/search/FieldType";
import { TermType } from "../../interfaces/enums/search/TermType";


export default class FieldMapping implements IFieldMapping {

    constructor(
        fieldType: FieldType,
        inputType: InputType,
        terms: Array<TermType>,
        display: string) {
            
            this.inputType = inputType;
            this.fieldType = fieldType;
            this.display = display;
            this.terms = terms;
        }

    public inputType: InputType;
    public fieldType: FieldType;
    public terms: Array<TermType>;
    public display: string;

}
