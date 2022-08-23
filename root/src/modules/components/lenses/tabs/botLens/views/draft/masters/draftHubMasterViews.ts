import { VNode } from "hyperapp-local";

import IState from "../../../../../../../interfaces/state/IState";
import ILensMasterView from "../../../../../../../interfaces/views/ILensMasterView";
import IStageBehaviour from "../../../../../../../interfaces/behaviours/IStageBehaviour";
import draftHubTabViews from "../tab/draftHubTabViews";

import '../../../scss/loading.scss';


class draftHubMasterViewsClass implements ILensMasterView {

    public getStageBehaviour(state: IState): IStageBehaviour {

        return state.lens.botTab.stageBehaviour;
    }

    public buildLensView(state: IState): VNode | null {

        return draftHubTabViews.buildTabView(state);
    }
}

const draftHubMasterViews = new draftHubMasterViewsClass();

export default draftHubMasterViews;


