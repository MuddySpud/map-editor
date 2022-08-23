import { VNode } from "hyperapp-local";

import IState from "../../../../../../../interfaces/state/IState";
import { LensStage } from "../../../../../../../interfaces/enums/LensStage";
import ILensMasterView from "../../../../../../../interfaces/views/ILensMasterView";
import IStageBehaviour from "../../../../../../../interfaces/behaviours/IStageBehaviour";
import editHoleTabViews from "../tab/editHoleTabViews";
import createSubtreeForSocketTabViews from "../tab/createSubtreeForSocketTabViews";

import "../../../scss/socket.scss";


class mapSocketWizardViewsClass implements ILensMasterView {

    public getStageBehaviour(state: IState): IStageBehaviour {

        return state.lens.nodeTab.stageBehaviour;
    }

    public buildLensView(state: IState): VNode | null {

        if (!state) {
            
            return null;
        }

        const stageBehaviour: IStageBehaviour = state.lens.nodeTab.stageBehaviour;
        const stage: LensStage = stageBehaviour.getStage();

        if (stage === LensStage.CreateSubtree) {

            return createSubtreeForSocketTabViews.buildTabView(state);
        }
        else {

            return editHoleTabViews.buildTabView(state);
        }
    }
}

const mapSocketWizardViews = new mapSocketWizardViewsClass();

export default mapSocketWizardViews;

