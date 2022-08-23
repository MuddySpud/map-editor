import { VNode } from "hyperapp-local";

import IState from "../../../../../../../interfaces/state/IState";
import { LensStage } from "../../../../../../../interfaces/enums/LensStage";
import ILensMasterView from "../../../../../../../interfaces/views/ILensMasterView";
import IStageBehaviour from "../../../../../../../interfaces/behaviours/IStageBehaviour";
import subtreeSelectTabViews from "../tab/subtreeSelectTabViews";
import subtreeSearchTabViews from "../tab/subtreeSearchTabViews";
import subtreeLinkCreateTabViews from "../tab/subtreeLinkCreateTabViews";
import subtreeTitleViews from "../partial/subtreeTitleViews";


class subtreeLinkCreateMasterViewsClass implements ILensMasterView {

    public getStageBehaviour(state: IState): IStageBehaviour {

        return state.lens.nodeTab.stageBehaviour;
    }

    public buildLensView(state: IState): VNode | null {

        if (!state
            || !state.lens.nodeTab.lensNode) {

            return null;
        }

        const stage: LensStage = state.lens.nodeTab.stageBehaviour.getStage();

        if (stage === LensStage.SearchInput) {

            return subtreeSearchTabViews.buildTabView(
                state,
                subtreeTitleViews.buildCreateSearchTitleView
            );
        }
        else if (stage === LensStage.SearchResults) {

            return subtreeSelectTabViews.buildTabView(
                state,
                subtreeTitleViews.buildCreateSelectTitleView,
            );
        }

        return subtreeLinkCreateTabViews.buildTabView(state);
    }
}

const subtreeLinkCreateMasterViews = new subtreeLinkCreateMasterViewsClass();

export default subtreeLinkCreateMasterViews;
