import { h, VNode } from "hyperapp-local";

import IState from "../../../../interfaces/state/IState";
import loadingView from "../../../loading/views/loadingView";
import rowViews from "./rowViews";
import U from "../../../../global/gUtilities";
import ITreeProject from "../../../../interfaces/state/tree/ITreeProject";

import '../scss/project.scss';
import '../scss/shape.scss';


const buildProjectRootView = (
    state: IState,
    treeProject: ITreeProject
): VNode => {

    let selectedKey: string = "";
    let selectionMade: boolean = false;

    if (U.isNullOrWhiteSpace(state.treesState.selectedKey) === false) {

        selectionMade = true;
        selectedKey = state.treesState.selectedKey;
    }

    const view: VNode =

        h("div", { class: "root-project" }, [

            rowViews.buildTreeProjectRowView(
                treeProject,
                selectionMade,
                selectedKey
            ),
            
            rowViews.buildProjectChildren(
                treeProject,
                selectionMade,
                selectedKey
            ),
        ]);

    return view;
};

const projectViews = {

    buildView: (state: IState): VNode => {

        const treeProject: ITreeProject | null = state.projectState.treeProject;
        let innardsView: VNode | null = null;

        if (state.loading) {

            innardsView = loadingView.buildView("Loading project...");
        }
        else if (treeProject) {

            innardsView = buildProjectRootView(
                state,
                treeProject);
        }

        const view: VNode =

            h("div", { id: "projectView" }, [

                innardsView
            ]);

        return view;
    }
};

export default projectViews;


