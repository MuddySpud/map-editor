import { VNode } from "hyperapp-local";

import IState from "../../../../../../../interfaces/state/IState";
import { LensStage } from "../../../../../../../interfaces/enums/LensStage";
import plugTabViews from "../tab/plugTabViews";
import ILensMasterView from "../../../../../../../interfaces/views/ILensMasterView";
import IStageBehaviour from "../../../../../../../interfaces/behaviours/IStageBehaviour";
import subtreeLinkSwapTabViews from "../tab/subtreeLinkSwapTabViews";
import subtreeSelectTabViews from "../tab/subtreeSelectTabViews";
import subtreeSearchTabViews from "../tab/subtreeSearchTabViews";
import subtreeTitleViews from "../partial/subtreeTitleViews";


class subtreeLinkSwapMasterViewsClass implements ILensMasterView {

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
                subtreeTitleViews.buildSwapSearchTitleView
            );
        }
        else if (stage === LensStage.SearchResults) {

            return subtreeSelectTabViews.buildTabView(
                state,
                subtreeTitleViews.buildSwapSelectTitleView,
            );
        }
        else if (stage === LensStage.Plugs) {

            return plugTabViews.buildTabView(state);
        }

        return subtreeLinkSwapTabViews.buildTabView(state);
    }
}

const subtreeLinkSwapMasterViews = new subtreeLinkSwapMasterViewsClass();

export default subtreeLinkSwapMasterViews;
