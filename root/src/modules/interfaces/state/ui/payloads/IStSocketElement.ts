import IStSocket from "../../tree/IStSocket";
import ISubtreeSys from "../../tree/ISubtreeSys";
import IStageBehaviour from "../../../behaviours/IStageBehaviour";


export default interface IStSocketElement {
    
    stSocket: IStSocket | null;
    subtree: ISubtreeSys | null;
    element: HTMLElement | null;
    behaviour: IStageBehaviour | null;
}
