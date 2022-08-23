import { VNode } from "hyperapp-local";

import IState from "../../../../../../interfaces/state/IState";
import ILensMasterView from "../../../../../../interfaces/views/ILensMasterView";
import IStageBehaviour from "../../../../../../interfaces/behaviours/IStageBehaviour";
import altsTabViews from "../tab/altsTabViews";


class altsMasterViewsClass implements ILensMasterView {

    public getStageBehaviour(state: IState): IStageBehaviour {

        return state.lens.nodeTab.stageBehaviour;
    }

    public buildLensView(state: IState): VNode | null {

        if (!state
            || !state.lens.nodeTab.lensNode
            || !state.lens.nodeTab.lensNode.case.alts) {

            return null;
        }

        return altsTabViews.buildTabView(state);
    }
}

const altsMasterViews = new altsMasterViewsClass();

export default altsMasterViews;

