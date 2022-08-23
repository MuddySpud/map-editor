import { Children } from "hyperapp-local";

import searchViews from "../../../searchLens/views/partial/search/searchViews";
import ISearchCase from "../../../../../../interfaces/state/Search/ISearchCase";
import ISettings from "../../../../../../interfaces/state/user/ISettings";
import searchTermsViews from "../../../searchLens/views/partial/search/searchTermsViews";
import filterTitleViews from "./filterTitleViews";
import lensButtonsViews from "../../../../lens/views/lensButtonsViews";
import filterActions from "../../actions/filterActions";
import buttonViews from "../../../../lens/views/buttonViews";
import CssClasses from "../../../../../../state/constants/CssClasses";
import ITabSave from "../../../../../../interfaces/state/ui/tabs/ITabSave";


const enhancedFilterViews = {

    buildView: (
        filterTab: ITabSave,
        searchCase: ISearchCase,
        settings: ISettings): Children[] => {

        const view: Children[] = [

            ...filterTitleViews.buildTitleView(true),

            buttonViews.buildTypeButtonView(
                "Advanced filter",
                "Select simple filter",
                CssClasses.yep,
                filterActions.toggleAdvanced
            ),

            searchTermsViews.buildSearchTermsView(
                filterTab,
                searchCase,
                settings),

            searchViews.buildAddSearchRowView(
                filterTab,
                searchCase),

            lensButtonsViews.buildActionCancelView(
                filterTab,
                filterActions.filter,
                "Filter",
                filterActions.cancel,
                "Run filter on trees",
                "Filter button disabled as the filter state is either unchanged or invalid",
                "Cancel and clear the filter lens"
            )
        ];

        return view;
    }
};
export default enhancedFilterViews;

