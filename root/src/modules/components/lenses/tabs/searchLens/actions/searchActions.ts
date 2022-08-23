import IState from "../../../../../interfaces/state/IState";
import IStateAnyArray from "../../../../../interfaces/state/IStateAnyArray";
import gStateCode from "../../../../../global/code/gStateCode";
import SearchTermElement from "../../../../../state/ui/payloads/SearchTermElement";
import ISearchTerm from "../../../../../interfaces/state/Search/ISearchTerm";
import ISearchTermElement from "../../../../../interfaces/state/ui/payloads/ISearchTermElement";
import { TermType } from "../../../../../interfaces/enums/search/TermType";
import U from "../../../../../global/gUtilities";
import { FieldType } from "../../../../../interfaces/enums/search/FieldType";
import { JoinerType } from "../../../../../interfaces/enums/search/JoinerType";
import searchEffects from "../effects/searchEffects";
import ISearchCase from "../../../../../interfaces/state/Search/ISearchCase";
import ISearchBrief from "../../../../../interfaces/state/Search/ISearchBrief";
import gSession from "../../../../../global/gSession";
import ISearchStage from "../../../../../interfaces/state/Search/ISearchStage";
import IPaginationPayload from "../../../../../interfaces/state/ui/payloads/IPaginationPayload";
import ITabSave from "../../../../../interfaces/state/ui/tabs/ITabSave";
import gSearchCode from "../../../../../global/code/gSearchCode";


const searchActions = {

    setSearchText: (
        state: IState,
        payload: SearchTermElement): IState => {

        const searchCase: ISearchCase = payload.searchCase;
        searchCase.ui.raw = false;

        const tab: ITabSave = payload.tab;
        tab.saveLock = false;

        const textarea: HTMLTextAreaElement = payload.element as HTMLTextAreaElement;
        const searchTerm: ISearchTerm | null = payload.searchTerm;

        if (!searchTerm) {
            
            throw new Error("SearchTerm cannot be null");
        }

        searchTerm.text = textarea.value;

        return gStateCode.cloneState(state);
    },

    setSearchNumber: (
        state: IState,
        payload: SearchTermElement): IState => {

        const searchCase: ISearchCase = payload.searchCase;
        searchCase.ui.raw = false;

        const tab: ITabSave = payload.tab;
        tab.saveLock = false;

        const numberInput: HTMLInputElement = payload.element as HTMLInputElement;

        const searchTerm: ISearchTerm | null = payload.searchTerm;

        if (!searchTerm) {
            
            throw new Error("SearchTerm cannot be null");
        }

        if (U.isNumeric(numberInput.value)) {

            searchTerm.text = numberInput.value;
        }

        return gStateCode.cloneState(state);
    },

    deleteSearchRow: (
        state: IState,
        payload: SearchTermElement): IState => {

        if (!state
            || !payload
            || !payload.searchCase.brief
            || !payload.searchTerm) {

            return state;
        }

        const searchCase: ISearchCase = payload.searchCase;
        searchCase.ui.raw = false;

        const tab: ITabSave = payload.tab;
        tab.saveLock = false;

        const searchTerm: ISearchTerm = payload.searchTerm as ISearchTerm;
        const searchBrief: ISearchBrief = payload.searchCase.brief as ISearchBrief;
        const searchTerms: Array<ISearchTerm> = searchBrief.searchTerms;
        let index: number = -1;

        for (let i = 0; i < searchTerms.length; i++) {

            if (searchTerms[i].key === searchTerm.key) {

                index = i;

                break;
            }
        }

        if (index > -1) {
            searchTerms.splice(index, 1);
        }

        return gStateCode.cloneState(state);
    },

    cancel: (
        state: IState,
        searchCase: ISearchCase): IState => {

        searchCase.brief = null;

        return gStateCode.cloneState(state);
    },

    addSearchRow: (
        state: IState,
        payload: SearchTermElement): IState => {

        if (!state
            || !payload
            || !payload.searchCase.brief) {

            return state;
        }

        const searchCase: ISearchCase = payload.searchCase;
        searchCase.ui.raw = false;

        const tab: ITabSave = payload.tab;
        tab.saveLock = false;

        const searchBrief: ISearchBrief = searchCase.brief as ISearchBrief;
        const key: string = gStateCode.getFreshKey(state);
        const emptySearchTerm: ISearchTerm = gSearchCode.buildDefaultSearchTerm(state);
        searchBrief.searchTerms.push(emptySearchTerm);
        gSession.setFocusFilter(`#searchText_${key}`);

        return gStateCode.cloneState(state);
    },

    setTerm: (
        state: IState,
        payload: ISearchTermElement): IState => {

        const searchCase: ISearchCase = payload.searchCase;
        searchCase.ui.raw = false;

        const tab: ITabSave = payload.tab;
        tab.saveLock = false;

        const searchTerm: ISearchTerm | null = payload.searchTerm;

        if (!searchTerm) {
            
            throw new Error("SearchTerm cannot be null");
        }

        type TermTypeType = keyof typeof TermType;

        const termSelect: HTMLSelectElement = payload.element as HTMLSelectElement;
        const selectedIndex: number = termSelect.selectedIndex;
        const newTerm = termSelect.options[selectedIndex].value;
        const termKey: TermTypeType = U.upperCaseFirstLetter(newTerm) as TermTypeType;
        searchTerm.term = TermType[termKey];

        return gStateCode.cloneState(state);
    },

    setField: (
        state: IState,
        payload: ISearchTermElement): IState => {

        const searchCase: ISearchCase = payload.searchCase;
        searchCase.ui.raw = false;

        const tab: ITabSave = payload.tab;
        tab.saveLock = false;

        const searchTerm: ISearchTerm | null = payload.searchTerm;

        if (!searchTerm) {
            
            throw new Error("SearchTerm cannot be null");
        }

        type FieldTypeType = keyof typeof FieldType;

        const fieldSelect: HTMLSelectElement = payload.element as HTMLSelectElement;
        const selectedIndex: number = fieldSelect.selectedIndex;
        const newField = fieldSelect.options[selectedIndex].value;
        const fieldKey: keyof typeof FieldType = U.upperCaseFirstLetter(newField) as FieldTypeType;
        searchTerm.field = FieldType[fieldKey];

        return gStateCode.cloneState(state);
    },

    setJoiner: (
        state: IState,
        payload: ISearchTermElement): IState => {

        const searchCase: ISearchCase = payload.searchCase;
        searchCase.ui.raw = false;

        const tab: ITabSave = payload.tab;
        tab.saveLock = false;

        const searchTerm: ISearchTerm | null = payload.searchTerm;

        if (!searchTerm) {
            
            throw new Error("SearchTerm cannot be null");
        }

        type JoinerTypeType = keyof typeof JoinerType;

        const joinerSelect: HTMLSelectElement = payload.element as HTMLSelectElement;
        const selectedIndex: number = joinerSelect.selectedIndex;
        const newJoiner = joinerSelect.options[selectedIndex].value;
        const joinerKey: JoinerTypeType = U.upperCaseFirstLetter(newJoiner) as JoinerTypeType;
        searchTerm.joiner = JoinerType[joinerKey];

        return gStateCode.cloneState(state);
    },

    setBool: (
        state: IState,
        payload: ISearchTermElement): IState => {

        const searchCase: ISearchCase = payload.searchCase;
        searchCase.ui.raw = false;

        const tab: ITabSave = payload.tab;
        tab.saveLock = false;

        const searchTerm: ISearchTerm | null = payload.searchTerm;

        if (!searchTerm) {

            throw new Error("SearchTerm cannot be null");
        }

        const boolSelect: HTMLSelectElement = payload.element as HTMLSelectElement;
        const selectedIndex: number = boolSelect.selectedIndex;
        const newBool: string = boolSelect.options[selectedIndex].value;
        let result: boolean = false;

        if (newBool === 'true') {
            result = true;
        }

        searchTerm.truth = result;

        return gStateCode.cloneState(state);
    },

    showSearchPage: (
        state: IState,
        paginationPayload: IPaginationPayload): IStateAnyArray => {

        if (!state
            || !paginationPayload
            || !paginationPayload.payload) {

            return state;
        }

        const searchCase: ISearchCase = paginationPayload.payload as ISearchCase;

        if (!searchCase.brief) {

            return state;
        }

        searchCase.brief.paginationDetails = paginationPayload.paginationDetails;

        return searchActions.searchFromCase(
            state,
            searchCase
        );
    },

    searchFromCase: (
        state: IState,
        searchCase: ISearchCase): IStateAnyArray => {

        if (!state
            || !searchCase) {

            return state;
        }

        gSearchCode.clearSearchCaseResults(searchCase);

        return [
            gStateCode.cloneState(state),
            searchEffects.search(
                state,
                searchCase)
        ];
    },

    search: (
        state: IState,
        searchStage: ISearchStage): IStateAnyArray => {

        if (!state
            || !searchStage) {

            return state;
        }

        searchStage.stageBehaviour.nextStage(state);
        searchStage.stageBehaviour.resetMax();

        return searchActions.searchFromCase(
            state,
            searchStage.searchCase
        );
    }
};

export default searchActions;
