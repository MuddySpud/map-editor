import IStRoot from "../../tree/IStRoot";
import IStageBehaviour from "../../../behaviours/IStageBehaviour";


export default interface IStRootElement {
    
    root: IStRoot;
    element: HTMLElement;
    behaviour: IStageBehaviour | null;
}
