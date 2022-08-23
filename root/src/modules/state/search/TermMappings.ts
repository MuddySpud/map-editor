import { TermType } from "../../interfaces/enums/search/TermType";
import TermMapping from "./TermMapping";
import ITermMapping from "../../interfaces/state/Search/ITermMapping";
import ITermMappings from "../../interfaces/state/search/ITermMappings";


export default class TermMappings implements ITermMappings {

    [key: string]: ITermMapping;

    public phrase: ITermMapping = new TermMapping(TermType.Phrase, "phrase");
    public startsWith: ITermMapping = new TermMapping(TermType.StartsWith, "starts with");
    public tokens: ITermMapping = new TermMapping(TermType.Tokens, "words");
}
