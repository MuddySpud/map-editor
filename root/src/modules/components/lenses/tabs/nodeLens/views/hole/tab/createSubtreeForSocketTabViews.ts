import { h, VNode } from "hyperapp-local";

import IState from "../../../../../../../interfaces/state/IState";
import ISocketTask from "../../../../../../../interfaces/state/tree/ISocketTask";
import createSubtreeDetailsViews from "../../../../treeLens/views/subtree/partial/createSubtreeViews";
import mapSocketActions from "../../../actions/mapSocketActions";
import lensButtonsViews from "../../../../../lens/views/lensButtonsViews";
import gStageActions from "../../../../../../../global/actions/gStageActions";
import gSocketTaskCode from "../../../../../../../global/code/gSocketTaskCode";
import nodeActions from "../../../actions/nodeActions";
import mapSocketTitleViews from "../partial/mapSocketTitleViews";
import IStageBehaviour from "../../../../../../../interfaces/behaviours/IStageBehaviour";


const createSubtreeForSocketTabViews = {

    buildTabView(state: IState): VNode | null {

        if (!state
            || !state.lens.nodeTab.lensSocketTask) {

            return null;
        }

        const socketTask: ISocketTask = state.lens.nodeTab.lensSocketTask;
        const stageBehaviour: IStageBehaviour = state.lens.nodeTab.stageBehaviour;
        gSocketTaskCode.validateMapSocketSubtree(state);

        const view: VNode =

            h("div", { id: "treeLensView" }, [
                h("div", { id: "treeLens" }, [
                    h("div", { id: "subtreeLens" }, [

                        ...mapSocketTitleViews.buildCreateSubtreeTitleView(stageBehaviour),

                        ...createSubtreeDetailsViews.buildInputView(
                            socketTask.lensSubtree,
                            mapSocketActions.setRootText,
                            mapSocketActions.setSocketText,
                            mapSocketActions.addStSocket,
                            mapSocketActions.deleteStSocket,
                            state.lens.nodeTab.stageBehaviour
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

        return view;
    }
};

export default createSubtreeForSocketTabViews;


