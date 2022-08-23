import ITreeSys from "../../tree/ITreeSys";
import IStageBehaviour from "../../../behaviours/IStageBehaviour";


export default interface ITreeElement {
    
    tree: ITreeSys;
    element: HTMLElement;
    behaviour: IStageBehaviour | null;
}
