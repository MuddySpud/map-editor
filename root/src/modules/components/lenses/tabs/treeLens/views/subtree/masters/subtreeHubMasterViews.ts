import { VNode } from "hyperapp-local";

import IState from "../../../../../../../interfaces/state/IState";
import ILensMasterView from "../../../../../../../interfaces/views/ILensMasterView";
import IStageBehaviour from "../../../../../../../interfaces/behaviours/IStageBehaviour";
import subtreeHubTabViews from "../tab/subtreeHubTabViews";

import '../../../scss/loading.scss';


class subtreeHubMasterViewsClass implements ILensMasterView {

    public getStageBehaviour(state: IState): IStageBehaviour {

        return state.lens.treeTab.stageBehaviour;
    }

    public buildLensView(state: IState): VNode | null {

        return subtreeHubTabViews.buildTabView(state);
    }
}

const subtreeHubMasterViews = new subtreeHubMasterViewsClass();

export default subtreeHubMasterViews;


