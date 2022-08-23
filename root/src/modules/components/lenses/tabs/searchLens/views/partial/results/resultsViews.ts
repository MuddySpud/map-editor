import { VNode } from "hyperapp-local";

import { SearchType } from "../../../../../../../interfaces/enums/search/SearchType";
import treeResultsViews from "./treeResultsViews";
import nodeResultsViews from "./nodeResultsViews";
import ISearchCase from "../../../../../../../interfaces/state/Search/ISearchCase";
import ISettings from "../../../../../../../interfaces/state/user/ISettings";
import ISearchBrief from "../../../../../../../interfaces/state/Search/ISearchBrief";
import subtreeResultsViews from "./subtreeResultsViews";


const resultsViews = {

    buildSearchResultsView: (
        searchCase: ISearchCase,
        _settings: ISettings): VNode | null => {

        if (!searchCase
            || !searchCase.brief) {
                
            return null;
        }

        const searchBrief: ISearchBrief = searchCase.brief as ISearchBrief;

        if (searchBrief.type === SearchType.Trees) {

            return treeResultsViews.buildResultsView(searchCase);
        }
        else if (searchBrief.type === SearchType.Subtrees) {
            
            return subtreeResultsViews.buildResultsView(searchCase);
        }
        else if (searchBrief.type === SearchType.Nodes) {
            
            return nodeResultsViews.buildResultsView(searchCase);
        }

        return null;
    }
}

export default resultsViews;


