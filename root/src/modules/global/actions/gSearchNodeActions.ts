import IState from "../../interfaces/state/IState";
import IStateAnyArray from "../../interfaces/state/IStateAnyArray";
import gStateCode from "../code/gStateCode";
import ISearchCase from "../../interfaces/state/Search/ISearchCase";
import U from "../gUtilities";
import ISearchBrief from "../../interfaces/state/Search/ISearchBrief";
import INodeBase from "../../interfaces/state/tree/INodeBase";
import gNodeCode from "../code/gNodeCode";
import gOptionCode from "../code/gOptionCode";
import gOptionEffects from "../effects/gOptionEffects";
import gSearchCode from "../code/gSearchCode";


const gSearchNodeActions = {

    selectNode: (
        state: IState,
        searchCase: ISearchCase): IStateAnyArray => {

        if (!state
            || !searchCase
            || !searchCase.brief
            || U.isNullOrWhiteSpace(searchCase.brief.selectedKey) === true
            || U.isNullOrWhiteSpace(searchCase.brief.selectedToken) === true) {

            return state;
        }

        if (searchCase.brief.cancelSelect === true) {

            searchCase.brief.cancelSelect = false;

            return state;
        }

        const searchBrief: ISearchBrief = searchCase.brief as ISearchBrief;
        const nodes: Array<INodeBase> = searchBrief.nodeResults.results;

        const index: number = nodes.findIndex((n: INodeBase) => {

            return n.key === searchBrief.selectedKey
                && n.token === searchBrief.selectedToken
        });

        searchBrief.nodeResults.selectedIndex = index;

        return [
            gStateCode.cloneState(state),
            gOptionEffects.getNodeOptionsAndParent(
                state,
                searchBrief.selectedKey as string)
        ];
    },

    enhanceSearchSelectedNode: (
        state: IState,
        response: any): IState => {

        if (!state
            || !response?.jsonData) {

            return state;
        }

        const brief: ISearchBrief = state.lens.searchTab.lensSearch.brief as ISearchBrief;
        const nodes: Array<INodeBase> = brief.nodeResults.results;
        const selectedNode: INodeBase = nodes[brief.nodeResults.selectedIndex];

        if (selectedNode.key !== response.jsonData.key
            || selectedNode.token !== response.jsonData.token) {
            return state;
        }

        selectedNode.nodes = gOptionCode.loadOptions(response.jsonData.nodes);

        selectedNode.parent = gNodeCode.loadNode(response.jsonData.parent);

        return gStateCode.cloneState(state);
    },

    buildNodeResults: (
        state: IState,
        response: any): IState => {

        if (!state
            || !state.lens.searchTab.lensSearch.brief
            || !response?.jsonData) {

            return state;
        }

        let searchCase: ISearchCase = state.lens.searchTab.lensSearch;
        let brief: ISearchBrief = searchCase.brief as ISearchBrief;
        let nodes: Array<INodeBase> = [];
        let node: INodeBase | null;
        gSearchCode.clearSearchCaseResults(searchCase);

        response.jsonData.values.forEach((result: any) => {

            node = gNodeCode.loadNode(result);

            if (node) {
                nodes.push(node);
            }
        });

        brief.nodeResults.results = nodes;
        brief.paginationDetails.totalItems = response.jsonData.total;

        return gStateCode.cloneState(state);
    },

    doSomethingWithSearch: (
        state: IState,
        _searchCase: ISearchCase): IState => {

        return gStateCode.cloneState(state);
    }
};

export default gSearchNodeActions;
