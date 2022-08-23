import IState from "../../../../../interfaces/state/IState";
import IStateAnyArray from "../../../../../interfaces/state/IStateAnyArray";
import gStateCode from "../../../../../global/code/gStateCode";
import gTreeFilterEffects from "../../../../../global/effects/gTreeFilterEffects";
import gFilterCode from "../../../../../global/code/gFilterCode";
import gSearchCode from "../../../../../global/code/gSearchCode";
import gTabCode from "../../../../../global/code/gTabCode";
import gLensCode from "../../../../../global/code/gLensCode";
import { TabType } from "../../../../../interfaces/enums/TabType";


const filterActions = {

    filter: (state: IState): IStateAnyArray => {

        if (!state
            || !state.lens.filterTab.lensSearch.brief) {

            return state;
        }

        if (!gTabCode.canSave(state.lens.filterTab)) {

            return gStateCode.cloneState(state);
        }

        state.lens.filterTab.saveLock = true;
        state.treesState.paginationDetails.start = 0;

        state.lens.filterTab.liveSearch.brief = gSearchCode.cloneSearchBrief(
            state,
            state.lens.filterTab.lensSearch.brief);

        return [
            gStateCode.cloneState(state),
            gTreeFilterEffects.advancedFilter(state)
        ];
    },

    toggleAdvanced: (state: IState): IStateAnyArray => {

        if (!state) {

            return state;
        }

        state.lens.filterTab.advanced = state.lens.filterTab.advanced === false;
        gFilterCode.resetTrees(state);

        // As the brief has been reset calling autoFilter will clear the filter on
        // the result set
        return [
            gStateCode.cloneState(state),
            gTreeFilterEffects.autoFilter(state)
        ];
    },

    reset: (state: IState): IStateAnyArray => {

        if (!state) {

            return state;
        }

        gFilterCode.resetTrees(state);

        return [
            gStateCode.cloneState(state),
            gTreeFilterEffects.autoFilter(state)
        ];
    },

    setAutomaticFilterText: (
        state: IState,
        input: HTMLInputElement): IStateAnyArray => {

        if (!state
            || !input) {

            return state;
        }

        const changed: boolean = gSearchCode.setFirstSearchLineText(
            state.lens.filterTab.liveSearch,
            input.value
        );

        if (changed === true) {

            state.treesState.paginationDetails.start = 0;
        }

        return [
            gStateCode.cloneState(state),
            gTreeFilterEffects.autoFilter(state)
        ];
    },

    cancel: (state: IState): IState => {

        if (!state
            || !state.lens.filterTab.lensSearch.brief) {

            return state;
        }

        gLensCode.clearTab(
            state,
            TabType.Filter
        );

        return gStateCode.cloneState(state);
    }
};

export default filterActions;

