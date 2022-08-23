import { h, VNode } from "hyperapp-local";

import IStageBehaviour from "../../../../../../../interfaces/behaviours/IStageBehaviour";
import IState from "../../../../../../../interfaces/state/IState";
import ISubtreeLoader from "../../../../../../../interfaces/state/tree/ISubtreeLoader";
import IHole from "../../../../../../../interfaces/state/tree/IHole";
import ISocketLoaderUI from "../../../../../../../interfaces/state/ui/UIs/ISocketLoaderUI";
import limitDetailsViews from "../partial/limitDetailsViews";
import branchToSubtreeTreeTitleViews from "../partial/branchToSubtreeTreeTitleViews";
import lensButtonsViews from "../../../../../lens/views/lensButtonsViews";
import gStageActions from "../../../../../../../global/actions/gStageActions";
import gBranchTreeTaskCode from "../../../../../../../global/code/gBranchTreeTaskCode";
import branchTreeTaskActions from "../../../actions/branchTreeTaskActions";
import gSession from "../../../../../../../global/gSession";
import Filters from "../../../../../../../state/constants/Filters";
import nodeActions from "../../../actions/nodeActions";


const selectLimitsTabViews = {

    buildTabView: (
        state: IState,
        optionKey: string,
        subtreeLoader: ISubtreeLoader): VNode | null => {

        if (!state
            || !subtreeLoader
            || !state.lens.nodeTab.lensBranchTreeTask) {

            return null;
        }

        const limit: IHole<ISocketLoaderUI> | null = gBranchTreeTaskCode.getForceSetLimit(subtreeLoader);

        if (!limit) {

            return null;
        }

        const stageBehaviour: IStageBehaviour = state.lens.nodeTab.stageBehaviour as IStageBehaviour;

        if (limit.ui.raw === true) {

            state.lens.nodeTab.enableSave = false;
            gSession.setFocusFilter(Filters.branchLimitKeyFocusFilter);
        }
        else {

            gBranchTreeTaskCode.validateTabForSelectLimit(
                state,
                state.lens.nodeTab,
                stageBehaviour.getStage(),
                limit
            );
        }

        const editView: VNode =

            h("div", { id: "branchTaskLensView" }, [
                h("div", { id: "branchTaskLens" }, [
                    h("div", { id: "selectLimit" }, [

                        ...branchToSubtreeTreeTitleViews.buildLimitTitleView(
                            optionKey,
                            limit,
                            branchTreeTaskActions.enableLimitClickSelect
                        ),

                        limitDetailsViews.buildLimitDetailsView(
                            state,
                            limit
                        ),

                        lensButtonsViews.buildNextCancelView(
                            state.lens.nodeTab,
                            gStageActions.nextStage,
                            nodeActions.cancel,
                            "Go to next step",
                            "Next button disabled as the node state is either unchanged or invalid",
                            "Cancel and clear the node lens"
                        )
                    ])
                ])
            ]);

        return editView;
    }
};

export default selectLimitsTabViews;


