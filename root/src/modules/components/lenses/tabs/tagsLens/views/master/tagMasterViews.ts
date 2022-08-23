import { VNode } from "hyperapp-local";

import IState from "../../../../../../interfaces/state/IState";
import ILensMasterView from "../../../../../../interfaces/views/ILensMasterView";
import IStageBehaviour from "../../../../../../interfaces/behaviours/IStageBehaviour";
import tagTabViews from "../tab/tagTabViews";

import '../../scss/tags.scss';


class tagMasterViewsClass implements ILensMasterView {

    public getStageBehaviour(state: IState): IStageBehaviour {

        return state.lens.tagsTab.stageBehaviour;
    }

    public buildLensView(state: IState): VNode | null {

        if (!state
            || !state.lens.treeTab.lensTree
            || !state.lens.tagsTab.tagsCase) {

            return null;
        }

        return tagTabViews.buildTabView(
            state.lens.treeTab.lensTree,
            state.lens.tagsTab
        );
    }
}

const tagMasterViews = new tagMasterViewsClass();

export default tagMasterViews;
