import { VNode } from "hyperapp-local";

import IState from "../../../../interfaces/state/IState";
import { DisplayType } from "../../../../interfaces/enums/DisplayType";
import branchesView from "./branchesView";
import treesView from "./treesView";
import projectView from "./projectView";

import "../scss/index.scss";


const buttonsView = {

    buildView: (state: IState): VNode | null => {

        if (!state) {
            
            return null;
        }

        if (state.displayType === DisplayType.Trees) {

            return treesView.buildView(state);
        }
        else if (state.displayType === DisplayType.Project) {

            return projectView.buildView(state);
        }

        return branchesView.buildView(state);
    }
};

export default buttonsView;


