import ITreeProject from "./ITreeProject";


export default interface ISubtreeProject extends ITreeProject {
    
    hasChildren: boolean;
}