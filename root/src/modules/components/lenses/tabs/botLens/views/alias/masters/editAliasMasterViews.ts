import { VNode } from "hyperapp-local";

import IState from "../../../../../../../interfaces/state/IState";
import ILensMasterView from "../../../../../../../interfaces/views/ILensMasterView";
import IStageBehaviour from "../../../../../../../interfaces/behaviours/IStageBehaviour";
import editAliasTabViews from "../tab/editAliasTabViews";


class editAliasMasterViewsClass implements ILensMasterView {

    public getStageBehaviour(state: IState): IStageBehaviour {

        return state.lens.botTab.stageBehaviour;
    }

    public buildLensView(state: IState): VNode | null {

        return editAliasTabViews.buildTabView(state);
    }
}

const editAliasMasterViews = new editAliasMasterViewsClass();

export default editAliasMasterViews;


