import IState from "../../interfaces/state/IState";
import gStateCode from "../code/gStateCode";
import ISearchCase from "../../interfaces/state/Search/ISearchCase";
import U from "../gUtilities";
import ISearchBrief from "../../interfaces/state/Search/ISearchBrief";
import ISubtreeSys from "../../interfaces/state/tree/ISubtreeSys";
import gSubtreeCode from "../code/gSubtreeCode";
import gSearchCode from "../code/gSearchCode";


const gSearchSubtreeActions = {

    selectSubtree: (
        state: IState,
        searchCase: ISearchCase): IState => {

        if (!state
            || !searchCase
            || !searchCase.brief
            || U.isNullOrWhiteSpace(searchCase.brief.selectedKey) === true) {

            return state;
        }

        if (searchCase.brief.cancelSelect === true) {

            searchCase.brief.cancelSelect = false;

            return state;
        }

        const searchBrief: ISearchBrief = searchCase.brief as ISearchBrief;
        const subtrees: Array<ISubtreeSys> = searchBrief.subtreeResults.results;

        const index: number = subtrees.findIndex((s: ISubtreeSys) => s.tree.key === searchBrief.selectedKey);
        searchBrief.subtreeResults.selectedIndex = index;

        return gStateCode.cloneState(state);
    },

    buildSubtreeResults: (
        state: IState,
        response: any): IState => {

        if (!state
            || !state.lens.nodeTab.lensNode
            || !state.lens.nodeTab.lensNode.ui.subtreeSearch.brief
            || !response?.jsonData) {
                
            return state;
        }

        let searchCase: ISearchCase = state.lens.nodeTab.lensNode.ui.subtreeSearch;
        let brief: ISearchBrief = searchCase.brief as ISearchBrief;
        let subtrees: Array<ISubtreeSys> = [];
        let subtree: ISubtreeSys | null;
        gSearchCode.clearSearchCaseResults(searchCase);

        response.jsonData.values.forEach((result: any) => {

            subtree = gSubtreeCode.convertToSubtree(result);

            if (subtree) {
                subtrees.push(subtree);
            }
        });

        brief.subtreeResults.results = subtrees;
        brief.paginationDetails.totalItems = response.jsonData.total;

        return gStateCode.cloneState(state);
    }
};

export default gSearchSubtreeActions;
