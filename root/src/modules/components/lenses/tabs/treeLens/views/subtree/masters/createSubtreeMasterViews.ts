import { VNode } from "hyperapp-local";

import IState from "../../../../../../../interfaces/state/IState";
import ILensMasterView from "../../../../../../../interfaces/views/ILensMasterView";
import IStageBehaviour from "../../../../../../../interfaces/behaviours/IStageBehaviour";
import createSubtreeTabViews from "../tab/createSubtreeTabViews";

import '../../../scss/subtree2.scss'


class createSubtreeMasterViewsClass implements ILensMasterView {

    public getStageBehaviour(state: IState): IStageBehaviour {

        return state.lens.treeTab.stageBehaviour;
    }

    public buildLensView(state: IState): VNode | null {

        return createSubtreeTabViews.buildTabView(state);
    }
}

const createSubtreeMasterViews = new createSubtreeMasterViewsClass();

export default createSubtreeMasterViews;


