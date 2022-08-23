import { VNode } from "hyperapp-local";

import IState from "../../../../../../interfaces/state/IState";
import ILensMasterView from "../../../../../../interfaces/views/ILensMasterView";
import IStageBehaviour from "../../../../../../interfaces/behaviours/IStageBehaviour";
import shapeTabViews from "../tab/shapeTabViews";

import '../../scss/shape.scss';


class shapeMasterViewsClass implements ILensMasterView {

    public getStageBehaviour(state: IState): IStageBehaviour {

        return state.lens.shapeTab.stageBehaviour;
    }

    public buildLensView(state: IState): VNode | null {

        return shapeTabViews.buildTabView(state.lens.shapeTab.shapeCase);
    }
}

const shapeMasterViews = new shapeMasterViewsClass();

export default shapeMasterViews;
