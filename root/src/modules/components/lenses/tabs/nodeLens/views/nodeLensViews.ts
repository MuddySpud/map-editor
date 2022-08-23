import { VNode } from "hyperapp-local";

import IState from "../../../../../interfaces/state/IState";
import nodeEditMasterViews from "./node/master/nodeEditMasterViews";
import nodeCreateMasterViews from "./node/master/nodeCreateMasterViews";
import subtreeLinkEditMasterViews from "./subtree/master/subtreeLinkEditMasterViews";
import { StageTitle } from "../../../../../interfaces/enums/StageTitle";
import IStageBehaviour from "../../../../../interfaces/behaviours/IStageBehaviour";
import moveBranchMasterViews from "./moveBranch/master/moveBranchMasterViews";
import ILensMasterView from "../../../../../interfaces/views/ILensMasterView";
import cloneBranchMasterViews from "./cloneBranch/master/cloneBranchMasterViews";
import stashBranchMasterViews from "./stashBranch/master/stashBranchMasterViews";
import branchToSubtreeMasterViews from "./branchToSubtree/masters/branchToSubtreeMasterViews";
import mapSocketMasterViews from "./hole/masters/mapSocketMasterViews";
import subtreeLinkSwapMasterViews from "./subtree/master/subtreeLinkSwapMasterViews";
import subtreeLinkCreateMasterViews from "./subtree/master/subtreeLinkCreateMasterViews";
import subtreeAndLinkCreateMasterViews from "./subtree/master/subtreeAndLinkCreateMasterViews";

import '../scss/index.scss';


class nodeLensUIsClass implements ILensMasterView {

    public buildLensView(state: IState): VNode | null {

        const viewBuilder: ILensMasterView = this.getViewBuilder(state);

        return viewBuilder.buildLensView(state);
    }

    public getStageBehaviour(state: IState): IStageBehaviour {

        const viewBuilder: ILensMasterView = this.getViewBuilder(state);

        return viewBuilder.getStageBehaviour(state);
    }

    getViewBuilder(state: IState): ILensMasterView {

        const stageBehaviour: IStageBehaviour = state.lens.nodeTab.stageBehaviour as IStageBehaviour;
        const stageName: StageTitle = stageBehaviour.stages.name;

        if (stageName === StageTitle.LensEditNode) {

            return nodeEditMasterViews;
        }
        if (stageName === StageTitle.LensCreateNode) {

            return nodeCreateMasterViews;
        }
        else if (stageName === StageTitle.LensEditSubtreeLink) {

            return subtreeLinkEditMasterViews;
        }
        else if (stageName === StageTitle.LensSwapSubtreeLink) {

            return subtreeLinkSwapMasterViews;
        }
        else if (stageName === StageTitle.LensCreateSubtreeLink) {

            return subtreeLinkCreateMasterViews;
        }
        else if (stageName === StageTitle.LensCreateSubtreeAndLink) {

            return subtreeAndLinkCreateMasterViews;
        }
        else if (stageName === StageTitle.LensMoveBranch) {

            return moveBranchMasterViews;
        }
        else if (stageName === StageTitle.LensCloneBranch) {

            return cloneBranchMasterViews;
        }
        else if (stageName === StageTitle.LensStashBranch) {

            return stashBranchMasterViews;
        }
        else if (stageName === StageTitle.LensBranchToSubtree) {

            return branchToSubtreeMasterViews;
        }
        else if (stageName === StageTitle.LensMarkSocket
            || stageName === StageTitle.LensEditHole) {

            return mapSocketMasterViews;
        }
        else {

            alert("not built yet");
        }

        throw new Error("StageTitle not coded for yet...");
    }
}

const nodeLensUIs = new nodeLensUIsClass();

export default nodeLensUIs;


