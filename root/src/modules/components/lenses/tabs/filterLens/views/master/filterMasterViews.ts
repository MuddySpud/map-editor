import { VNode } from "hyperapp-local";

import IState from "../../../../../../interfaces/state/IState";
import filterTabViews from "../tab/filterTabViews";
import ILensMasterView from "../../../../../../interfaces/views/ILensMasterView";
import IStageBehaviour from "../../../../../../interfaces/behaviours/IStageBehaviour";
import { TabType } from "../../../../../../interfaces/enums/TabType";

import '../../scss/filter.scss';


class filterMasterViewsClass implements ILensMasterView {

    public getStageBehaviour(state: IState): IStageBehaviour {

        return state.lens.filterTab.stageBehaviour;
    }

    public buildLensView(state: IState): VNode | null {

        if (!state) {

            return null;
        }

        if (!state.lens.filterTab.stageBehaviour
            && !state.lens.warning) {

            return null;
        }

        if (state.lens.warning
            && state.lens.warning.tab.type !== TabType.Filter) {

            return null;
        }

        return filterTabViews.buildTabView(state);
    }
}

const filterMasterViews = new filterMasterViewsClass();

export default filterMasterViews;

