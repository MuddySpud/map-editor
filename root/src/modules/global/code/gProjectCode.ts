import IState from "../../interfaces/state/IState";
import gTreeCode from "./gTreeCode";
import ITreeProject from "../../interfaces/state/tree/ITreeProject";
import ISubtreeProject from "../../interfaces/state/tree/ISubtreeProject";


const replaceSubtreeProject = (
    treeProject: ITreeProject,
    subtreeProject: ISubtreeProject): void => {

    const length: number = treeProject.subtrees.length;
    let childSubtreeProject: ISubtreeProject;

    for (let i = 0; i < length; i++) {

        childSubtreeProject = treeProject.subtrees[i];

        if (subtreeProject.key === childSubtreeProject.key) {

            subtreeProject.ui = childSubtreeProject.ui;
            treeProject.subtrees[i] = subtreeProject;

            return;
        }

        replaceSubtreeProject(
            childSubtreeProject,
            subtreeProject);
    }
}

const gProjectCode = {

    loadTree: (
        state: IState,
        rawTree: any): void => {

        if (!rawTree) {
            return;
        }

        const treeProject: ITreeProject | null = gTreeCode.loadTreeProject(rawTree);

        if (!treeProject) {
            return;
        }

        state.projectState.treeProject = treeProject;
        document.title = `${treeProject.name}`;
    },

    loadSubtree: (
        state: IState,
        rawTree: any): void => {

        if (!state
            || !state.projectState.treeProject
            || !rawTree) {
            return;
        }

        const subtreeProject: ISubtreeProject | null = gTreeCode.loadSubtreeProject(rawTree);

        if (!subtreeProject) {
            return;
        }

        replaceSubtreeProject(
            state.projectState.treeProject,
            subtreeProject);
    },
};

export default gProjectCode;

