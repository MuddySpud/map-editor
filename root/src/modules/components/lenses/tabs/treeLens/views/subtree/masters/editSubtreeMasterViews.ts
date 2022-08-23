import { VNode } from "hyperapp-local";

import IState from "../../../../../../../interfaces/state/IState";
import ILensMasterView from "../../../../../../../interfaces/views/ILensMasterView";
import IStageBehaviour from "../../../../../../../interfaces/behaviours/IStageBehaviour";
import editSubtreeTabViews from "../tab/editSubtreeTabViews";

import '../../../scss/subtree2.scss';


class editSubtreeMasterViewsClass implements ILensMasterView {

    public getStageBehaviour(state: IState): IStageBehaviour {

        return state.lens.treeTab.stageBehaviour;
    }

    public buildLensView(state: IState): VNode | null {

        return editSubtreeTabViews.buildTabView(state);
    }
}

const editSubtreeMasterViews = new editSubtreeMasterViewsClass();

export default editSubtreeMasterViews;


