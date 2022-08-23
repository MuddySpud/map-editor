import { VNode } from "hyperapp-local";

import IState from "../../../../../../../interfaces/state/IState";
import ILensMasterView from "../../../../../../../interfaces/views/ILensMasterView";
import IStageBehaviour from "../../../../../../../interfaces/behaviours/IStageBehaviour";
import cloneTreeTabViews from "../tab/cloneTreeTabViews";


class cloneTreeMasterViewsClass implements ILensMasterView {

    public getStageBehaviour(state: IState): IStageBehaviour {

        return state.lens.treeTab.stageBehaviour;
    }

    public buildLensView(state: IState): VNode | null {

        return cloneTreeTabViews.buildTabView(state);
    }
}

const cloneTreeMasterViews = new cloneTreeMasterViewsClass();

export default cloneTreeMasterViews;


