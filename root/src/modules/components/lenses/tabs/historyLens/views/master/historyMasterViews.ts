import { VNode } from "hyperapp-local";

import IState from "../../../../../../interfaces/state/IState";
import ILensMasterView from "../../../../../../interfaces/views/ILensMasterView";
import IStageBehaviour from "../../../../../../interfaces/behaviours/IStageBehaviour";
import historyTabViews from "../tab/historyTabViews";

import '../../scss/history.scss'



class historyMasterViewsClass implements ILensMasterView {

    public getStageBehaviour(state: IState): IStageBehaviour {

        return state.lens.historyTab.stageBehaviour;
    }

    public buildLensView(state: IState): VNode | null {

        return historyTabViews.buildTabView(state.lens.historyTab);
    }
}

const historyMasterViews = new historyMasterViewsClass();

export default historyMasterViews;
