import { h, VNode } from "hyperapp-local";

import searchViews from "../partial/search/searchViews";
import ISearchCase from "../../../../../../interfaces/state/Search/ISearchCase";
import ISettings from "../../../../../../interfaces/state/user/ISettings";
import IStageBehaviour from "../../../../../../interfaces/behaviours/IStageBehaviour";
import ISearchBrief from "../../../../../../interfaces/state/Search/ISearchBrief";
import searchTermsViews from "../partial/search/searchTermsViews";
import ITabSave from "../../../../../../interfaces/state/ui/tabs/ITabSave";


const searchTabViews = {

    buildTabView: (
        searchTab: ITabSave,
        searchCase: ISearchCase,
        settings: ISettings,
        stageBehaviour: IStageBehaviour): VNode => {

        const searchBrief: ISearchBrief = searchCase.brief as ISearchBrief;

        const view: VNode =

            h("div", { id: "searchLensView" }, [
                h("div", { id: "searchLens" }, [
                    h("div", { class: "icons" }, [
                        h("div", { class: "search-icon" }, ""),
                    ]),

                    searchViews.buildTips(searchBrief),

                    searchTermsViews.buildSearchTermsView(
                        searchTab,
                        searchCase,
                        settings),

                    searchViews.buildAddSearchRowView(
                        searchTab,
                        searchCase),

                    searchViews.buildActionsView(
                        searchCase,
                        stageBehaviour),
                ])
            ]);

        return view;
    }
};

export default searchTabViews;

