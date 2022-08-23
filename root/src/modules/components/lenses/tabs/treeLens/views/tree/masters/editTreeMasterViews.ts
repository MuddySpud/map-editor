import { VNode } from "hyperapp-local";

import IState from "../../../../../../../interfaces/state/IState";
import ILensMasterView from "../../../../../../../interfaces/views/ILensMasterView";
import IStageBehaviour from "../../../../../../../interfaces/behaviours/IStageBehaviour";
import editTreeTabViews from "../tab/editTreeTabViews";


class editTreeMasterViewsClass implements ILensMasterView {

    public getStageBehaviour(state: IState): IStageBehaviour {

        return state.lens.treeTab.stageBehaviour;
    }

    public buildLensView(state: IState): VNode | null {

        return editTreeTabViews.buildTabView(state);
    }
}

const editTreeMasterViews = new editTreeMasterViewsClass();

export default editTreeMasterViews;


