import { h, VNode, Children } from "hyperapp-local";

import IState from "../../../../../../interfaces/state/IState";
import ISearchCase from "../../../../../../interfaces/state/Search/ISearchCase";
import ISettings from "../../../../../../interfaces/state/user/ISettings";
import enhancedFilterViews from "../partial/enhancedFilterViews";
import automaticFilterViews from "../partial/automaticFilterViews";
import gSession from "../../../../../../global/gSession";
import Filters from "../../../../../../state/constants/Filters";
import IFilterTab from "../../../../../../interfaces/state/ui/tabs/IFilterTab";


const filterTabViews = {

    buildTabView: (state: IState): VNode => {

        const filterTab: IFilterTab = state.lens.filterTab;
        const lensSearchCase: ISearchCase = filterTab.lensSearch;
        const liveSearchCase: ISearchCase = filterTab.liveSearch;
        const settings: ISettings = state.settings;
        let innardsView: Children[];

        if (filterTab.advanced === true) {

            if (lensSearchCase.ui.raw === true) {

                filterTab.enableSave = false;
                gSession.setFocusFilter(Filters.treesAdvancedFocusFilter);
            }
            else {
                // Validate searchterms?
                filterTab.enableSave = true;
            }

            innardsView = enhancedFilterViews.buildView(
                filterTab,
                lensSearchCase,
                settings
            );
        }
        else {

            gSession.setFocusFilter(Filters.treesAutoFocusFilter);

            innardsView = automaticFilterViews.buildView(
                liveSearchCase,
                settings
            );
        }

        const view: VNode =

            h("div", { id: "filterLensView" }, [
                h("div", { id: "filterLens" }, innardsView)
            ]);

        return view;
    }
};
export default filterTabViews;

