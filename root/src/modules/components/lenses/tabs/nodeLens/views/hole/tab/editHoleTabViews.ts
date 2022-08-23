import { h, VNode } from "hyperapp-local";

import IState from "../../../../../../../interfaces/state/IState";
import lensButtonsViews from "../../../../../lens/views/lensButtonsViews";
import ISocketTask from "../../../../../../../interfaces/state/tree/ISocketTask";
import mapSocketActions from "../../../actions/mapSocketActions";
import gSocketTaskCode from "../../../../../../../global/code/gSocketTaskCode";
import mapSocketViews from "../partial/mapSocketViews";
import nodeActions from "../../../actions/nodeActions";
import mapSocketTitleViews from "../partial/mapSocketTitleViews";
import buttonsViews from "../partial/buttonsViews";
import IStageBehaviour from "../../../../../../../interfaces/behaviours/IStageBehaviour";


const editHoleTabViews = {

    buildTabView: (state: IState): VNode | null => {

        if (!state
            || !state.lens.nodeTab.lensSocketTask) {

            return null;
        }

        const socketTask: ISocketTask = state.lens.nodeTab.lensSocketTask;
        const stageBehaviour: IStageBehaviour = state.lens.nodeTab.stageBehaviour;
        gSocketTaskCode.validateMapSocketHole(state);

        const view: VNode =

            h("div", { id: "mapSocketLensView" }, [


                h("div", { id: "subtreeEditLens" }, [
                    h("div", { id: "summaryLens" }, [

                        ...mapSocketTitleViews.buildSelectSocketTitleView(stageBehaviour),

                        h("div", { class: "summary" }, [
                            h("div", { class: "hub" }, [
                                h("div", { class: "hub-left" }, ""),
                                h("div", { class: "hub-right" }, [

                                    buttonsViews.buildHubButtons(socketTask),
                                ]),
                            ]),

                            mapSocketViews.buildTypeView(socketTask.ui),

                            ...mapSocketViews.buildMapSocketButtonViews(
                                socketTask,
                                state.lens.nodeTab.stageBehaviour),

                            lensButtonsViews.buildSaveCancelView(
                                state.lens.nodeTab,
                                mapSocketActions.save,
                                nodeActions.cancel,
                                "Save the node and options",
                                "Save button disabled as the node state is either unchanged or invalid",
                                "Delete the node and its descendants"
                            )
                        ])
                    ])
                ])
            ]);

        return view;
    }
};

export default editHoleTabViews;


