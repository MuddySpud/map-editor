import { VNode } from "hyperapp-local";

import IState from "../../../../../../interfaces/state/IState";
import ILensMasterView from "../../../../../../interfaces/views/ILensMasterView";
import IStageBehaviour from "../../../../../../interfaces/behaviours/IStageBehaviour";
import settingsTabViews from "../tab/settingsTabViews";


class settingsMasterViewsClass implements ILensMasterView {

    public getStageBehaviour(state: IState): IStageBehaviour {

        return state.lens.settingsTab.stageBehaviour;
    }

    public buildLensView(state: IState): VNode | null {

        return settingsTabViews.buildTabView(state);
    }
}

const settingsMasterViews = new settingsMasterViewsClass();

export default settingsMasterViews;


