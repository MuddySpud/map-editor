import IState from "../../../../../../../interfaces/state/IState";
import ILensMasterView from "../../../../../../../interfaces/views/ILensMasterView";
import IStageBehaviour from "../../../../../../../interfaces/behaviours/IStageBehaviour";
import botHubTabViews from "../tab/botHubTabViews";


class botHubMasterViewsClass implements ILensMasterView {

    public getStageBehaviour(state: IState): IStageBehaviour {

        return state.lens.treeTab.stageBehaviour;
    }

    public buildLensView(state: IState): any {

        return botHubTabViews.buildTabView(state);
    }
}

const botHubMasterViews = new botHubMasterViewsClass();

export default botHubMasterViews;


