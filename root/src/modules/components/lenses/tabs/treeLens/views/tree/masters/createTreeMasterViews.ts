import { VNode } from "hyperapp-local";

import IState from "../../../../../../../interfaces/state/IState";
import ILensMasterView from "../../../../../../../interfaces/views/ILensMasterView";
import IStageBehaviour from "../../../../../../../interfaces/behaviours/IStageBehaviour";
import createTreeTabViews from "../tab/createTreeTabViews";


class createTreeMasterViewsClass implements ILensMasterView {

    public getStageBehaviour(state: IState): IStageBehaviour {

        return state.lens.treeTab.stageBehaviour;
    }

    public buildLensView(state: IState): VNode | null {

        return createTreeTabViews.buildTabView(state);
    }
}

const createTreeMasterViews = new createTreeMasterViewsClass();

export default createTreeMasterViews;


