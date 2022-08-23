import { h, VNode } from "hyperapp-local";

import IState from "../../../../../../../interfaces/state/IState";
import nodeActions from "../../../actions/nodeActions";
import gNodeCode from "../../../../../../../global/code/gNodeCode";
import lensButtonsViews from "../../../../../lens/views/lensButtonsViews";
import nodeTitleViews from "../partial/nodeTitleViews";
import INode from "../../../../../../../interfaces/state/tree/INode";
import ILensUI from "../../../../../../../interfaces/state/ui/UIs/ILensUI";


const stashRootEditTabViews = {

    buildTabView(state: IState): VNode | null {

        if (!state
            || !state.lens.nodeTab.lensNode) {

            return null;
        }

        const lensNode: INode<ILensUI> = state.lens.nodeTab.lensNode;
        gNodeCode.validateTab(state);

        const view: VNode =

            h("div", { id: "nodeLensView" }, [
                h("div", { id: "nodeLens" }, [

                    ...nodeTitleViews.buildEditStashRootTitleView(),

                    window.TreeSolve.optionsPlugins.buildOptionsView(
                        state,
                        lensNode,
                        'Branches',
                        'locate-branch',
                        true
                    ),

                    lensButtonsViews.buildSaveDeleteView(
                        state,
                        state.lens.nodeTab,
                        nodeActions.save,
                        nodeActions.delete,
                        "Save the node and options",
                        "Save button disabled as the node state is either unchanged or invalid",
                        "Delete the node and its descendants"
                    )
                ])
            ]);

        return view;
    }
};

export default stashRootEditTabViews;


