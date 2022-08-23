import { VNode } from "hyperapp-local";

import IState from "../../../../../../interfaces/state/IState";
import ILensMasterView from "../../../../../../interfaces/views/ILensMasterView";
import IStageBehaviour from "../../../../../../interfaces/behaviours/IStageBehaviour";
import viewSettingsTabViews from "../tab/viewSettingsTabViews";


class viewSettingsMasterViewsClass implements ILensMasterView {

    public getStageBehaviour(state: IState): IStageBehaviour {

        return state.lens.viewSettingsTab.stageBehaviour;
    }

    public buildLensView(state: IState): VNode | null {

        return viewSettingsTabViews.buildTabView(state);
    }
}

const viewSettingsMasterViews = new viewSettingsMasterViewsClass();

export default viewSettingsMasterViews;

