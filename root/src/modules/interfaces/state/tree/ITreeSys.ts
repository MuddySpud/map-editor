import ITreeRoot from "./ITreeRoot";
import ITreeUI from "../ui/UIs/ITreeUI";


export default interface ITreeSys extends ITreeRoot {

    isSubtree: boolean;
    deleteLock: boolean;
    isBot: boolean;
    
    ui: ITreeUI;
}
