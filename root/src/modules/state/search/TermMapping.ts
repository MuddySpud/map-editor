import ITermMapping from "../../interfaces/state/Search/ITermMapping";
import { TermType } from "../../interfaces/enums/search/TermType";


export default class TermMapping implements ITermMapping {

    constructor(
        termType: TermType,
        display: string) {
            
            this.termType = termType;
            this.display = display;
        }

    public termType: TermType;
    public display: string;

}
