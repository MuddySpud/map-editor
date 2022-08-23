import IState from "../../interfaces/state/IState";
import gStageCode from "./gStageCode";
import { TabType } from "../../interfaces/enums/TabType";
import gLensCode from "./gLensCode";
import gSearchCode from "./gSearchCode";
import gTreesStateCode from "./gTreesStateCode";
import { ActionType } from "../../interfaces/enums/ActionType";
import { FieldType } from "../../interfaces/enums/search/FieldType";
import gTabCode from "./gTabCode";
import gTreeCode from "./gTreeCode";
import gBotsStateCode from "./gBotsStateCode";


const gFilterCode = {

    showFilter: (state: IState): void => {

        gFilterCode.resetTrees(state);
        gLensCode.maximiseLens(state) === true;

        gTabCode.setSelectedTab(
            state,
            TabType.Filter);
    },

    clearFilterTab: (state: IState): void => {

        if (state.lens.filterTab.liveSearch.brief !== null) {

            if (state.lens.filterTab.liveSearch.brief.searchTerms.length !== 1
                || state.lens.filterTab.liveSearch.brief.searchTerms[0].field !== FieldType.All
                || state.lens.filterTab.liveSearch.brief.searchTerms[0].text !== '') {

                gTreeCode.reloadTrees(state);
            }
        }

        state.treesState.paginationDetails.start = 0;
        state.lens.filterTab.liveSearch.brief = null;
        state.lens.filterTab.lensSearch.brief = null;
        state.lens.filterTab.advanced = false;
        state.lens.filterTab.stageBehaviour.clear();
    },

    resetTrees: (state: IState): void => {

        state.lens.settingsTab.saveLock = false;
        state.lens.filterTab.stageBehaviour = gStageCode.buildFilterTreeStages();

        gSearchCode.buildTreeSearchBrief(
            state,
            state.lens.filterTab.liveSearch
        );

        gSearchCode.buildTreeSearchBrief(
            state,
            state.lens.filterTab.lensSearch
        );
    },

    resetBots: (state: IState): void => {

        state.lens.settingsTab.saveLock = false;
        state.lens.filterTab.stageBehaviour = gStageCode.buildFilterBotStages();

        gSearchCode.buildBotSearchBrief(
            state,
            state.lens.filterTab.liveSearch
        );

        gSearchCode.buildBotSearchBrief(
            state,
            state.lens.filterTab.lensSearch
        );
    },

    getAdvancedFilterCache: (state: IState): { body: any, callID: string } => {

        const body: any = gSearchCode.getSearchCache(
            state.lens.filterTab.liveSearch,
            state.settings,
            state.treesState.paginationDetails
        );

        body.action = ActionType.FilterTrees;

        const callID = gTreesStateCode.registerTreeDataRequest(
            'Filter trees',
            state,
            "",
            ActionType.FilterTrees
        );

        return {
            body,
            callID
        };
    },

    getTreesAutoFilterRequestBody: (state: IState): { body: any, callID: string, callChain: Array<string>, success: boolean } => {

        const callID: string = gTreesStateCode.registerTreeDataRequest(
            'Filter trees',
            state,
            "",
            ActionType.FilterTrees
        );

        const fragment: string = gSearchCode.getFirstSearchLineText(state.lens.filterTab.liveSearch);

        const body: any = {
            start: state.treesState.paginationDetails.start,
            batchSize: state.treesState.paginationDetails.count,
            fragment: fragment,
            action: ActionType.FilterTrees
        };

        return {
            body,
            callID,
            callChain: [],
            success: true
        };
    },

    getBotAlisesAutoFilterRequestBody: (state: IState): { body: any, callID: string, callChain: Array<string>, success: boolean } => {

        const callID: string = gBotsStateCode.registerAliasDataRequest(
            'Filter aliases',
            state,
            "",
            ActionType.FilterBots
        );

        const fragment: string = gSearchCode.getFirstSearchLineText(state.lens.filterTab.liveSearch);

        const body: any = {
            start: state.treesState.paginationDetails.start,
            batchSize: state.treesState.paginationDetails.count,
            fragment: fragment,
            action: ActionType.FilterTrees
        };

        return {
            body,
            callID,
            callChain: [],
            success: true
        };
    },

    getBotsAutoFilterRequestBody: (state: IState): { body: any, callID: string, callChain: Array<string>, success: boolean } => {

        const callID: string = gTreesStateCode.registerDataRequest(
            'Filter bots',
            state,
            "",
            ActionType.FilterBots
        );

        const fragment: string = gSearchCode.getFirstSearchLineText(state.lens.filterTab.liveSearch);

        const body: any = {
            start: state.treesState.paginationDetails.start,
            batchSize: state.treesState.paginationDetails.count,
            fragment: fragment,
            action: ActionType.FilterBots
        };

        return {
            body,
            callID,
            callChain: [],
            success: true
        };
    },

    checkResponseCurrent: (
        state: IState,
        responseJson: any): boolean => {

        // Check response
        if (responseJson.fragment) {
            // Response is from autoFilter

            if (state.lens.filterTab.advanced === true) {
                // Reject response if advanced filter enabled
                return false;
            }
            else {
                const fragment: string = gSearchCode.getFirstSearchLineText(state.lens.filterTab.liveSearch);

                if (fragment !== responseJson.fragment) {
                    // Reject if fragments don't match

                    return false;
                }
            }
        }

        return true;
    }
};

export default gFilterCode;

