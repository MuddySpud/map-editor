import IState from "../../interfaces/state/IState";
import ILensUI from "../../interfaces/state/ui/UIs/ILensUI";
import ISearchBrief from "../../interfaces/state/search/ISearchBrief";
import SearchBrief from "../../state/search/SearchBrief";
import ISearchTerm from "../../interfaces/state/search/ISearchTerm";
import gStateCode from "./gStateCode";
import SearchTerm from "../../state/search/SearchTerm";
import { FieldType } from "../../interfaces/enums/search/FieldType";
import ISearchCase from "../../interfaces/state/Search/ISearchCase";
import ISettings from "../../interfaces/state/user/ISettings";
import IFieldMapping from "../../interfaces/state/search/IFieldMapping";
import { InputType } from "../../interfaces/enums/search/InputType";
import gSearchSubtreeActions from "../actions/gSearchSubtreeActions";
import INode from "../../interfaces/state/tree/INode";
import gNodeCode from "./gNodeCode";
import { SearchType } from "../../interfaces/enums/search/SearchType";
import gSearchNodeActions from "../actions/gSearchNodeActions";
import gStageCode from "./gStageCode";
import { TabType } from "../../interfaces/enums/TabType";
import gLensCode from "./gLensCode";
import { JoinerType } from "../../interfaces/enums/search/JoinerType";
import { TermType } from "../../interfaces/enums/search/TermType";
import IPaginationDetails from "../../interfaces/state/ui/payloads/IPaginationDetails";
import { ActionType } from "../../interfaces/enums/ActionType";
import gTreesStateCode from "./gTreesStateCode";
import gTreesCoreActions from "../actions/gTreesCoreActions";
import gTabCode from "./gTabCode";
import gBotsCoreActions from "../actions/gBotsCoreActions";


const gSearchCode = {

    showSearch: (state: IState): void => {

        state.lens.searchTab.stageBehaviour = gStageCode.buildSearchNodeStages();

        // stageCode.setNodeReplacement(
        //     state,
        //     StageTitle.LensSearchNodes);

        state.lens.searchTab.lensSearch.brief = gSearchCode.buildNodeSearchBrief(
            state,
            gSearchNodeActions.doSomethingWithSearch);

        gLensCode.maximiseLens(state) === true;

        gTabCode.setSelectedTab(
            state,
            TabType.Search);
    },

    clearSearchTab: (state: IState): void => {

        state.lens.searchTab.lensSearch.brief = null;
        state.lens.searchTab.stageBehaviour.clear();
    },

    clearSearchCaseResults: (searchCase: ISearchCase): void => {

        if (searchCase.brief) {

            searchCase.brief.nodeResults.results = [];
            searchCase.brief.nodeResults.selectedIndex = -1;

            searchCase.brief.subtreeResults.results = [];
            searchCase.brief.subtreeResults.selectedIndex = -1;

            searchCase.brief.treeResults.results = [];
            searchCase.brief.treeResults.selectedIndex = -1;

            searchCase.brief.selectedKey = null;
            searchCase.brief.selectedToken = null;
        }
    },

    buildSearchBrief: (state: IState): ISearchBrief => {

        const searchBrief: ISearchBrief = new SearchBrief();

        // Add an empty search row
        const emptySearchTerm: ISearchTerm = gSearchCode.buildDefaultSearchTerm(state);
        searchBrief.searchTerms.push(emptySearchTerm);

        return searchBrief;
    },

    buildDefaultSearchTerm: (state: IState): ISearchTerm => {

        const emptySearchTerm: ISearchTerm = new SearchTerm(gStateCode.getFreshKey(state));
        emptySearchTerm.field = FieldType.All;
        emptySearchTerm.term = TermType.Tokens;
        emptySearchTerm.joiner = JoinerType.And;

        return emptySearchTerm;
    },

    getSearchRequestBody: (
        state: IState,
        searchCase: ISearchCase,
        settings: ISettings): { body: any, callID: string } => {

        let action: ActionType = ActionType.None;
        const searchType: SearchType = searchCase.brief?.type as SearchType;

        if (searchType === SearchType.Nodes) {

            action = ActionType.SearchNodes;
        }
        else if (searchType === SearchType.Trees) {

            action = ActionType.SearchTrees;
        }
        else if (searchType === SearchType.Subtrees) {

            action = ActionType.SearchSubtrees;
        }

        const callID: string = gTreesStateCode.registerDataRequest(
            'Search',
            state,
            state.branchesState.tree.key as string,
            action,
        );

        const body: any = gSearchCode.getSearchCache(
            searchCase,
            settings
        );

        body.action = action;

        return {
            body,
            callID
        };
    },

    getSearchCache: (
        searchCase: ISearchCase,
        settings: ISettings,
        paginationDetails: IPaginationDetails | null = null): any => {

        if (!searchCase
            || !searchCase.brief) {

            return null;
        }

        const searchBrief: ISearchBrief = searchCase.brief;

        if (!paginationDetails) {

            paginationDetails = searchBrief.paginationDetails;
        }

        if (searchBrief.searchTerms.length === 1) {

            const searchTerm: ISearchTerm = searchBrief.searchTerms[0];

            if (searchTerm.field === FieldType.All
                && searchTerm.text === '') {

                return {
                    start: paginationDetails.start,
                    count: paginationDetails.count,
                    lines: [
                        {
                            field: FieldType.None,
                            type: TermType.None,
                            value: '',
                            joiner: JoinerType.None
                        }
                    ]
                };
            }
        }

        const mappings: any = settings.searchFieldMappings;
        let lines: any[] = [];
        let term: any;
        let value: any;
        let mapping: IFieldMapping;

        searchBrief.searchTerms.forEach((searchTerm: ISearchTerm) => {

            mapping = mappings[searchTerm.field.toString()] as IFieldMapping;
            term = searchTerm.term;

            if (mapping.inputType === InputType.Boolean) {

                value = searchTerm.truth;
                term = TermType.Boolean;
            }
            else if (mapping.inputType === InputType.Text) {

                value = searchTerm.text;
            }
            else {
                throw new Error("InputType has not been coded for.");
            }

            term = {
                field: searchTerm.field,
                type: term,
                value: value,
                joiner: searchTerm.joiner
            };

            lines.push(term);
        });

        return {
            start: paginationDetails.start,
            count: paginationDetails.count,
            lines: lines
        };
    },

    isBlankFilter: (state: IState): boolean => {

        const searchCase: ISearchCase = state.lens.filterTab.liveSearch;

        if (!searchCase
            || !searchCase.brief) {

            return true;
        }

        const searchBrief: ISearchBrief = searchCase.brief;

        if (searchBrief.searchTerms.length === 0) {

            return true;
        }
        else if (searchBrief.searchTerms.length > 1) {

            return false;
        }

        const searchTerm: ISearchTerm = searchBrief.searchTerms[0];

        if (searchTerm.field !== FieldType.All) {

            return false;
        }

        if (searchTerm.text === '') {

            return true;
        }

        return false;
    },

    getFirstSearchLineText: (searchCase: ISearchCase): string => {

        if (!searchCase
            || !searchCase.brief) {

            return '';
        }

        const searchBrief: ISearchBrief = searchCase.brief;

        if (searchBrief.searchTerms.length !== 1) {

            throw new Error(`Expected a single searchTerm, but got : ${searchBrief.searchTerms.length}`);
        }

        const searchTerm: ISearchTerm = searchBrief.searchTerms[0];

        if (searchTerm.field !== FieldType.All) {

            throw new Error(`Expected the searchTerm field to be All, but got : ${searchTerm.field}`);
        }

        return searchTerm.text;
    },

    setFirstSearchLineText: (
        searchCase: ISearchCase,
        text: string): boolean => {

        if (!searchCase
            || !searchCase.brief) {

            return false;
        }

        const searchBrief: ISearchBrief = searchCase.brief;

        if (searchBrief.searchTerms.length !== 1) {

            throw new Error(`Expected a single searchTerm, but got : ${searchBrief.searchTerms.length}`);
        }

        const searchTerm: ISearchTerm = searchBrief.searchTerms[0];

        if (searchTerm.field !== FieldType.All) {

            throw new Error(`Expected the searchTerm fiel;d to be All, but got : ${searchTerm.field}`);
        }

        const changed: boolean = searchTerm.text !== text;
        searchTerm.text = text;

        return changed;
    },

    buildTreeSearchBrief: (
        state: IState,
        searchCase: ISearchCase): void => {

        searchCase.brief = gSearchCode.buildSearchBrief(state);
        searchCase.buildAction = gTreesCoreActions.loadViewOrBuildFresh;  //searchTreeActions.buildTreeResults;
        searchCase.selectAction = null;
        searchCase.brief.type = SearchType.Trees;
    },

    buildBotSearchBrief: (
        state: IState,
        searchCase: ISearchCase): void => {

        searchCase.brief = gSearchCode.buildSearchBrief(state);
        searchCase.buildAction = gBotsCoreActions.loadViewOrBuildFresh; 
        searchCase.selectAction = null;
        searchCase.brief.type = SearchType.Bots;
    },

    cloneSearchBrief: (
        _state: IState,
        inputBrief: ISearchBrief): ISearchBrief => {

        const outputBrief: ISearchBrief = new SearchBrief();
        let clonedSearchTerm: ISearchTerm;

        inputBrief.searchTerms.forEach((searchTerm: ISearchTerm) => {

            clonedSearchTerm = new SearchTerm(searchTerm.key);
            clonedSearchTerm.field = searchTerm.field;
            clonedSearchTerm.term = searchTerm.term;
            clonedSearchTerm.joiner = searchTerm.joiner;
            clonedSearchTerm.text = searchTerm.text;
            clonedSearchTerm.truth = searchTerm.truth;
            outputBrief.searchTerms.push(clonedSearchTerm);
        });

        return outputBrief;
    },

    buildSubtreeSearchBrief: (
        state: IState,
        actionDelegate: (
            state: IState,
            searchCase: ISearchCase) => IState,
        lensNode: INode<ILensUI> | null = null
    ): ISearchBrief => {

        if (!lensNode) {

            lensNode = state.lens.nodeTab.lensNode as INode<ILensUI>;
        }

        lensNode.ui.startingPoint = gNodeCode.cloneNodeAndParentAndOptions(lensNode);

        const searchCase: ISearchCase = lensNode.ui.subtreeSearch;
        searchCase.brief = gSearchCode.buildSearchBrief(state);
        searchCase.buildAction = gSearchSubtreeActions.buildSubtreeResults;
        searchCase.selectAction = actionDelegate;
        searchCase.brief.type = SearchType.Subtrees;

        return searchCase.brief;
    },

    buildNodeSearchBrief: (
        state: IState,
        actionDelegate: (
            state: IState,
            searchCase: ISearchCase) => IState
    ): ISearchBrief => {

        const searchCase: ISearchCase = state.lens.searchTab.lensSearch;
        searchCase.brief = gSearchCode.buildSearchBrief(state);
        searchCase.buildAction = gSearchNodeActions.buildNodeResults;
        searchCase.selectAction = actionDelegate;
        searchCase.brief.type = SearchType.Nodes;

        return searchCase.brief;
    }
};

export default gSearchCode;

