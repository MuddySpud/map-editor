import { VNode } from "hyperapp-local";

import IState from "../../../../../../../interfaces/state/IState";
import subtreeLinkEditTabViews from "../tab/subtreeLinkEditTabViews";
import ILensMasterView from "../../../../../../../interfaces/views/ILensMasterView";
import IStageBehaviour from "../../../../../../../interfaces/behaviours/IStageBehaviour";


class subtreeLinkEditMasterViewsClass implements ILensMasterView {

    public getStageBehaviour(state: IState): IStageBehaviour {

        return state.lens.nodeTab.stageBehaviour;
    }

    public buildLensView(state: IState): VNode | null {

        if (!state
            || !state.lens.nodeTab.lensNode) {

            return null;
        }

        return subtreeLinkEditTabViews.buildTabView(state);
    }
}

const subtreeLinkEditMasterViews = new subtreeLinkEditMasterViewsClass();

export default subtreeLinkEditMasterViews;
