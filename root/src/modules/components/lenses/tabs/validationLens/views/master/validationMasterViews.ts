import { VNode } from "hyperapp-local";

import IState from "../../../../../../interfaces/state/IState";
import ILensMasterView from "../../../../../../interfaces/views/ILensMasterView";
import IStageBehaviour from "../../../../../../interfaces/behaviours/IStageBehaviour";
import validationTabViews from "../tab/validationTabViews";

import '../../scss/index.scss'


class validationMasterViewsClass implements ILensMasterView {

    public getStageBehaviour(state: IState): IStageBehaviour {

        return state.lens.validationsTab.stageBehaviour;
    }

    public buildLensView(state: IState): VNode | null {

        return validationTabViews.buildTabView(state.lens.validationsTab.validationCase)
    }
}

const validationMasterViews = new validationMasterViewsClass();

export default validationMasterViews;

