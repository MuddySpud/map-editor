import { VNode } from "hyperapp-local";

import IState from "../../../../../../../interfaces/state/IState";
import ILensMasterView from "../../../../../../../interfaces/views/ILensMasterView";
import IStageBehaviour from "../../../../../../../interfaces/behaviours/IStageBehaviour";
import treeHubTabViews from "../tab/treeHubTabViews";

import '../../../scss/loading.scss';


class treeHubMasterViewsClass implements ILensMasterView {

    public getStageBehaviour(state: IState): IStageBehaviour {

        return state.lens.treeTab.stageBehaviour;
    }

    public buildLensView(state: IState): VNode | null {

        return treeHubTabViews.buildTabView(state);
    }
}

const treeHubMasterViews = new treeHubMasterViewsClass();

export default treeHubMasterViews;


