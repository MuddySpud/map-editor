import { VNode } from "hyperapp-local";

import IState from "../../../interfaces/state/IState";
import { DisplayType } from "../../../interfaces/enums/DisplayType";
import branchesHeaderView from "./branchesHeaderView";
import treesHeaderView from "./treesHeaderView";
import projectHeaderView from "./projectHeaderView";

import "../scss/index.scss";
import botsHeaderView from "./botsHeaderView";


const headerView = {

    buildView: (state: IState): VNode | null => {

        if (!state) {
            
            return null;
        }

        if (state.displayType === DisplayType.Branches) {

            return branchesHeaderView.buildView(state);
        }
        else if (state.displayType === DisplayType.Project) {

            return projectHeaderView.buildView(state);
        }
        else if (state.displayType === DisplayType.Bots) {

            return botsHeaderView.buildView(state);
        }

        return treesHeaderView.buildView(state);
    }
};

export default headerView;


