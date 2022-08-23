import ITreeFolder from "./ITreeFolder";
import ITreeProjectUI from "../ui/UIs/ITreeProjectUI";
import ITreeRoot from "./ITreeRoot";
import ISubtreeProject from "./ISubtreeProject";


export default interface ITreeProject extends ITreeRoot {

    isSubtree: boolean;
    deleteLock: boolean;
    isBot: boolean;

    aux: Array<ITreeFolder>;
    subtrees: Array<ISubtreeProject>;

    ui: ITreeProjectUI;
}
