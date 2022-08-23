import IStageBehaviour from "../../../behaviours/IStageBehaviour";
import IAlias from "../../bot/IAlias";


export default interface IAliasElement {
    
    alias: IAlias;
    element: HTMLElement;
    behaviour: IStageBehaviour | null;
}
