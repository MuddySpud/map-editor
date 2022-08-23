import { VNode } from "hyperapp-local";

import IState from "../../../../../../../interfaces/state/IState";
import ILensMasterView from "../../../../../../../interfaces/views/ILensMasterView";
import IStageBehaviour from "../../../../../../../interfaces/behaviours/IStageBehaviour";
import createAliasTabViews from "../tab/createAliasTabViews";


class createAliasMasterViewsClass implements ILensMasterView {

    public getStageBehaviour(state: IState): IStageBehaviour {

        return state.lens.botTab.stageBehaviour;
    }

    public buildLensView(state: IState): VNode | null {

        return createAliasTabViews.buildTabView(state);
    }
}

const createAliasMasterViews = new createAliasMasterViewsClass();

export default createAliasMasterViews;


