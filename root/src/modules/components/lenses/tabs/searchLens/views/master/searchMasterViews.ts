import { VNode } from "hyperapp-local";

import IState from "../../../../../../interfaces/state/IState";
import ISearchCase from "../../../../../../interfaces/state/Search/ISearchCase";
import ILensMasterView from "../../../../../../interfaces/views/ILensMasterView";
import IStageBehaviour from "../../../../../../interfaces/behaviours/IStageBehaviour";
import { LensStage } from "../../../../../../interfaces/enums/LensStage";
import searchTabViews from "../tab/searchTabViews";
import resultsTabViews from "../tab/resultsTabViews";


class searchMasterViewsClass implements ILensMasterView {

    public getStageBehaviour(state: IState): IStageBehaviour {

        return state.lens.searchTab.stageBehaviour;
    }

    public buildLensView(state: IState): VNode | null {

        if (!state
            || !state.lens.searchTab.stageBehaviour) {

            return null;
        }

        const searchCase: ISearchCase = state.lens.searchTab.lensSearch;
        const stagebehaviour: IStageBehaviour = state.lens.searchTab.stageBehaviour;
        const stage: LensStage = stagebehaviour.getStage();

        if (stage === LensStage.SearchInput) {

            return searchTabViews.buildTabView(
                state.lens.searchTab,
                searchCase,
                state.settings,
                stagebehaviour);
        }
        else if (stage === LensStage.SearchResults) {

            return resultsTabViews.buildTabView(
                searchCase,
                state.settings);
        }

        return null;
    }
}

const searchLensUIs = new searchMasterViewsClass();

export default searchLensUIs;

