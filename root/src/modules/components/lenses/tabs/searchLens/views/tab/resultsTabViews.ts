import { SearchType } from "../../../../../../interfaces/enums/search/SearchType";
import treeResultsViews from "../partial/results/treeResultsViews";
import nodeResultsViews from "../partial/results/nodeResultsViews";
import ISearchCase from "../../../../../../interfaces/state/Search/ISearchCase";
import ISettings from "../../../../../../interfaces/state/user/ISettings";
import ISearchBrief from "../../../../../../interfaces/state/Search/ISearchBrief";
import subtreeResultsViews from "../partial/results/subtreeResultsViews";
import { VNode } from "hyperapp-local";


const resultsTabViews = {

    buildTabView: (
        searchCase: ISearchCase,
        settings: ISettings): VNode | null => {

        if (!searchCase
            || !searchCase.brief
            || !settings) {

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
};

export default resultsTabViews;

