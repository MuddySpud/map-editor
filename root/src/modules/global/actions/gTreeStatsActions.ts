import IState from "../../interfaces/state/IState";
import ITreeStats from "../../interfaces/state/tree/ITreeStats";
import gStateCode from "../code/gStateCode";
import gLensCode from "../code/gLensCode";
import gTreeStatsCode from "../code/gTreeStatsCode";
import ITreeStatsUI from "../../interfaces/state/ui/UIs/ITreeStatsUI";


const gTreeStatsActions = {

    refreshNodeTreeStats: (
        state: IState,
        response: any): IState => {

        if (!state) {

            return state;
        }

        state.lens.nodeTab.treeStats = gTreeStatsCode.loadTreeStats(response);

        return gStateCode.cloneState(state);
    },

    refreshTreeStats: (
        state: IState,
        response: any): IState => {

        if (!state
            || !response?.jsonData) {

            return state;
        }

        let treeStatsUI: ITreeStatsUI | null = null;

        if (state.lens.treeTab.stats) {

            treeStatsUI = state.lens.treeTab.stats.ui;
        }

        const clonedState: IState = gTreeStatsActions.loadTreeStats(
            state,
            response.jsonData
        );

        if (treeStatsUI
            && state.lens.treeTab.stats) {

            state.lens.treeTab.stats.ui = treeStatsUI;
        }

        return clonedState;
    },

    loadTreeStats: (
        state: IState,
        response: any): IState => {

        if (!state
            || !response?.jsonData) {

            return state;
        }

        gLensCode.checkResponse(
            state,
            response.jsonData
        );

        gTreeStatsCode.loadTreeTabStats(
            state,
            response.jsonData
        );

        return gStateCode.cloneState(state);
    },

    toggleMinimiseCounts: (
        state: IState,
        treeStats: ITreeStats): IState => {

        if (!state
            || !treeStats) {

            return state;
        }

        treeStats.ui.minimiseCounts = treeStats.ui.minimiseCounts === false;

        return gStateCode.cloneState(state);
    },

    toggleMinimiseStats: (
        state: IState,
        treeStats: ITreeStats): IState => {

        if (!state
            || !treeStats) {

            return state;
        }

        treeStats.ui.minimiseStats = treeStats.ui.minimiseStats === false;

        return gStateCode.cloneState(state);
    }
};

export default gTreeStatsActions;
