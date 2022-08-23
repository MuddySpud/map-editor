import IProjectState from "../interfaces/state/IProjectState";
import ITreeProject from "../interfaces/state/tree/ITreeProject";


export default class ProjectState implements IProjectState {
    
    public treeProject: ITreeProject | null = null;
}
