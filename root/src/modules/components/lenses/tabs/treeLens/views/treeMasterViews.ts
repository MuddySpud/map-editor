import { VNode } from "hyperapp-local";

import IState from "../../../../../interfaces/state/IState";
import { StageTitle } from "../../../../../interfaces/enums/StageTitle";
import IStageBehaviour from "../../../../../interfaces/behaviours/IStageBehaviour";
import ILensMasterView from "../../../../../interfaces/views/ILensMasterView";
import editTreeMasterViews from "./tree/masters/editTreeMasterViews";
import createTreeMasterViews from "./tree/masters/createTreeMasterViews";
import cloneTreeMasterViews from "./tree/masters/cloneTreeMasterViews";
import treeHubMasterViews from "./tree/masters/treeHubMasterViews";
import subtreeHubViews from "./subtree/masters/subtreeHubMasterViews";
import createSubtreeMasterViews from "./subtree/masters/createSubtreeMasterViews";
import editSubtreeMasterViews from "./subtree/masters/editSubtreeMasterViews";
import botHubMasterViews from "./bot/masters/botHubMasterViews";

import '../scss/index.scss';


class treeMasterViewsClass implements ILensMasterView {

    public buildLensView(state: IState): VNode | null {

        const viewBuilder: ILensMasterView = this.getViewBuilder(state);

        return viewBuilder.buildLensView(state);
    }

    public getStageBehaviour(state: IState): IStageBehaviour {

        const viewBuilder: ILensMasterView = this.getViewBuilder(state);

        return viewBuilder.getStageBehaviour(state);
    }

    getViewBuilder(state: IState): ILensMasterView {

        const stageBehaviour: IStageBehaviour = state.lens.treeTab.stageBehaviour as IStageBehaviour;
        const stageName: StageTitle = stageBehaviour.stages.name;

        if (stageName === StageTitle.LensTreeHub) {

            return treeHubMasterViews;
        }
        else if (stageName === StageTitle.LensEditTree) {

            return editTreeMasterViews;
        }
        else if (stageName === StageTitle.LensCreateTree) {

            return createTreeMasterViews;
        }
        else if (stageName === StageTitle.LensCloneTree) {

            return cloneTreeMasterViews;
        }
        else if (stageName === StageTitle.LensSubtreeHub) {

            return subtreeHubViews;
        }
        else if (stageName === StageTitle.LensEditSubtree) {

            return editSubtreeMasterViews;
        }
        else if (stageName === StageTitle.LensCreateSubtree) {

            return createSubtreeMasterViews;
        }
        else if (stageName === StageTitle.LensPublish) {

            return botHubMasterViews;
        }
        else {

            alert("not built yet");
        }

        throw new Error("StageTitle not coded for yet...");
    }
}

const treeMasterViews = new treeMasterViewsClass();

export default treeMasterViews;


