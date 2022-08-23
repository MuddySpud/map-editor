import { h, VNode } from "hyperapp-local";

import ISearchTerm from "../../../../../../../interfaces/state/Search/ISearchTerm";
import searchTermViews from "./searchTermViews";
import ISearchCase from "../../../../../../../interfaces/state/Search/ISearchCase";
import ISettings from "../../../../../../../interfaces/state/user/ISettings";
import ITabSave from "../../../../../../../interfaces/state/ui/tabs/ITabSave";


const searchTermsViews = {

    buildSearchTermsView: (
        tab: ITabSave,
        searchCase: ISearchCase,
        settings: ISettings): VNode | null => {

        const buildTermsList = () => {

            if (!searchCase.brief) {

                return null;
            }

            const searchTerms: Array<ISearchTerm> = searchCase.brief.searchTerms;
            const termsViews: VNode[] = [];
            let termsView: VNode | null;

            for (let i = 0; i < searchTerms.length; i++) {

                termsView = searchTermViews.buildSearchTermView(
                    tab,
                    searchCase,
                    searchTerms[i],
                    settings,
                    i
                );

                if (termsView) {

                    termsViews.push(termsView);
                }
            }

            return termsViews;
        };

        const searchLensUI: VNode =

            h("ul", {},
                buildTermsList()
            );

        return searchLensUI;
    }
};

export default searchTermsViews;


