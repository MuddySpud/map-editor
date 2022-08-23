import { VNode } from "hyperapp-local";

import IState from "../../../../../interfaces/state/IState";
import { StageTitle } from "../../../../../interfaces/enums/StageTitle";
import IStageBehaviour from "../../../../../interfaces/behaviours/IStageBehaviour";
import ILensMasterView from "../../../../../interfaces/views/ILensMasterView";
import aliasHubMasterViews from "./alias/masters/aliasHubMasterViews";
import draftHubMasterViews from "./draft/masters/draftHubMasterViews";
import editAliasMasterViews from "./alias/masters/editAliasMasterViews";
import createAliasMasterViews from "./alias/masters/createAliasMasterViews";

import '../scss/index.scss';


class botMasterViewsClass implements ILensMasterView {

    public buildLensView(state: IState): VNode | null {

        const viewBuilder: ILensMasterView = this.getViewBuilder(state);

        return viewBuilder.buildLensView(state);
    }

    public getStageBehaviour(state: IState): IStageBehaviour {

        const viewBuilder: ILensMasterView = this.getViewBuilder(state);

        return viewBuilder.getStageBehaviour(state);
    }

    getViewBuilder(state: IState): ILensMasterView {

        const stageBehaviour: IStageBehaviour = state.lens.botTab.stageBehaviour as IStageBehaviour;
        const stageName: StageTitle = stageBehaviour.stages.name;

        if (stageName === StageTitle.LensAliasHub) {

            return aliasHubMasterViews;
        }
        else if (stageName === StageTitle.LensDraftHub) {

            return draftHubMasterViews;
        }
        else if (stageName === StageTitle.LensEditAlias) {

            return editAliasMasterViews;
        }
        else if (stageName === StageTitle.LensCreateAlias) {

            return createAliasMasterViews;
        }
        else {

            alert("not built yet");
        }

        throw new Error("StageTitle not coded for yet...");
    }
}

const botMasterViews = new botMasterViewsClass();

export default botMasterViews;


