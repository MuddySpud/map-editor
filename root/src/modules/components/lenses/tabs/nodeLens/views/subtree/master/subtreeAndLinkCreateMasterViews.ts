import { VNode } from "hyperapp-local";

import IState from "../../../../../../../interfaces/state/IState";
import { LensStage } from "../../../../../../../interfaces/enums/LensStage";
import ILensMasterView from "../../../../../../../interfaces/views/ILensMasterView";
import IStageBehaviour from "../../../../../../../interfaces/behaviours/IStageBehaviour";
import subtreeAndLinkCreateTabViews from "../tab/subtreeAndLinkCreateTabViews";
import createSubtreeTabViews from "../tab/createSubtreeTabViews";
import createTreeTabViews from "../tab/createTreeTabViews";


class subtreeAndLinkCreateMasterViewsClass implements ILensMasterView {

    public getStageBehaviour(state: IState): IStageBehaviour {

        return state.lens.nodeTab.stageBehaviour;
    }

    public buildLensView(state: IState): VNode | null {

        if (!state) {

            return null;
        }

        const stageBehaviour: IStageBehaviour = state.lens.nodeTab.stageBehaviour;
        const stage: LensStage = stageBehaviour.getStage();

        if (stage === LensStage.CreateTree) {

            return createTreeTabViews.buildTabView(state);
        }
        else if (stage === LensStage.CreateSubtree) {

            return createSubtreeTabViews.buildTabView(
                state,
                stageBehaviour
            );
        }

        return subtreeAndLinkCreateTabViews.buildTabView(state);
    }
}

const subtreeAndLinkCreateMasterViews = new subtreeAndLinkCreateMasterViewsClass();

export default subtreeAndLinkCreateMasterViews;
