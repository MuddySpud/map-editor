import { h, VNode } from "hyperapp-local";

import IState from "../../../../../../../interfaces/state/IState";
import ILensUI from "../../../../../../../interfaces/state/ui/UIs/ILensUI";
import INode from "../../../../../../../interfaces/state/tree/INode";
import subtreeActions from "../../../actions/subtreeActions";
import lensButtonsViews from "../../../../../lens/views/lensButtonsViews";
import gBranchTaskCode from "../../../../../../../global/code/gBranchTaskCode";
import plugViews from "../partial/plugViews";
import nodeActions from "../../../actions/nodeActions";
import subtreeTitleViews from "../partial/subtreeTitleViews";
import IStageBehaviour from "../../../../../../../interfaces/behaviours/IStageBehaviour";


const plugTabViews = {

    buildTabView: (state: IState): VNode | null => {

        const lensNode: INode<ILensUI> = state.lens.nodeTab.lensNode as INode<ILensUI>;

        if (!lensNode.link) {

            return null;
        }

        const stageBehaviour: IStageBehaviour = state.lens.nodeTab.stageBehaviour;

        gBranchTaskCode.validateTabForPluging(
            state,
            state.lens.nodeTab
        );

        const view: VNode =

            h("div", { id: "subtreeEditLensView" }, [
                h("div", { id: "subtreeEditLens" }, [
                    h("div", { id: "plugLens" }, [

                        ...subtreeTitleViews.buildPlugTitleView(stageBehaviour),
                        // subtreeSwapViews.buildDetailsView(lensNode),
                        plugViews.buildDetailsView(
                            lensNode,
                            lensNode.link),

                        lensButtonsViews.buildNextCancelView(
                            state.lens.nodeTab,
                            subtreeActions.confirmPlugs,
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

export default plugTabViews;


