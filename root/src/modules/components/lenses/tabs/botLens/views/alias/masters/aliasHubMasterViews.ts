import { VNode } from "hyperapp-local";

import IState from "../../../../../../../interfaces/state/IState";
import ILensMasterView from "../../../../../../../interfaces/views/ILensMasterView";
import IStageBehaviour from "../../../../../../../interfaces/behaviours/IStageBehaviour";
import aliasHubTabViews from "../tab/aliasHubTabViews";

import '../../../scss/loading.scss';


class aliasHubMasterViewsClass implements ILensMasterView {

    public getStageBehaviour(state: IState): IStageBehaviour {

        return state.lens.botTab.stageBehaviour;
    }

    public buildLensView(state: IState): VNode | null {

        return aliasHubTabViews.buildTabView(state);
    }
}

const aliasHubMasterViews = new aliasHubMasterViewsClass();

export default aliasHubMasterViews;


