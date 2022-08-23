import { VNode } from "hyperapp-local";

import IState from "../../../../../../interfaces/state/IState";
import ILensMasterView from "../../../../../../interfaces/views/ILensMasterView";
import IStageBehaviour from "../../../../../../interfaces/behaviours/IStageBehaviour";
import spreadViews from "../tab/spreadTabViews";

import '../../scss/spread.scss';


class spreadMasterViewsClass implements ILensMasterView {

    public getStageBehaviour(state: IState): IStageBehaviour {

        return state.lens.spreadTab.stageBehaviour;
    }

    public buildLensView(state: IState): VNode | null {

        return spreadViews.buildTabView(state.lens.spreadTab.spreadCase);
    }
}

const spreadMasterViews = new spreadMasterViewsClass();

export default spreadMasterViews;

