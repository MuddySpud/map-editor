import IState from "../../../../interfaces/state/IState";
import gStateCode from "../../../../global/code/gStateCode";
import gLensCode from "../../../../global/code/gLensCode";
import { TabType } from "../../../../interfaces/enums/TabType";
import gFilterCode from "../../../../global/code/gFilterCode";
import gTabCode from "../../../../global/code/gTabCode";


const coreActions = {

    toggleShowStash: (state: IState): IState => {

        state.branchesState.stash.ui.showNode = state.branchesState.stash.ui.showNode === false;

        return gStateCode.cloneState(state);
    },

    toggleFilter: (state: IState): IState => {

        if (state.lens.filterTab.liveSearch
            && state.lens.filterTab.liveSearch.brief) {

            if (gLensCode.maximiseLens(state) === true) {

                gTabCode.setSelectedTab(
                    state,
                    TabType.Filter);

                return gStateCode.cloneState(state);
            }
            else if (state.lens.selectedTab === TabType.Filter) {

                gLensCode.clearTab(
                    state,
                    TabType.Filter
                );

                return gStateCode.cloneState(state);
            }
        }

        gFilterCode.showFilter(state);

        return gStateCode.cloneState(state);
    }
};

export default coreActions;