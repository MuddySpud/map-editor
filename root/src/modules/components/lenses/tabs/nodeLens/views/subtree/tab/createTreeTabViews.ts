import { h, VNode } from "hyperapp-local";

import IState from "../../../../../../../interfaces/state/IState";
import createSubtreeTreeViews from "../../../../treeLens/views/subtree/partial/createSubtreeTreeViews";
import lensButtonsViews from "../../../../../lens/views/lensButtonsViews";
import gBranchTaskCode from "../../../../../../../global/code/gBranchTaskCode";
import gSession from "../../../../../../../global/gSession";
import Filters from "../../../../../../../state/constants/Filters";
import subtreeTitleViews from "../partial/subtreeTitleViews";
import INode from "../../../../../../../interfaces/state/tree/INode";
import ILensUI from "../../../../../../../interfaces/state/ui/UIs/ILensUI";
import ITabSave from "../../../../../../../interfaces/state/ui/tabs/ITabSave";
import ITreeSys from "../../../../../../../interfaces/state/tree/ITreeSys";
import nodeActions from "../../../actions/nodeActions";
import gStageActions from "../../../../../../../global/actions/gStageActions";

import '../../../scss/subtree.scss';


const createTreeTabViews = {

    buildTabView: (state: IState): VNode | null => {

        if (!state.lens.nodeTab.lensNode) {

            return null;
        }

        const lensNode: INode<ILensUI> = state.lens.nodeTab.lensNode as INode<ILensUI>;

        if (!lensNode.link) {

            return null;
        }

        const tree: ITreeSys = lensNode.link.tree;
        const tab: ITabSave = state.lens.nodeTab;

        if (tree.ui.raw === true) {

            tab.enableSave = false;
            gSession.setFocusFilter(Filters.treeNameFocusFilter);
        }
        else {

            gBranchTaskCode.validateTabForNewTree(
                state,
                tab,
                tree
            );
        }

        const editView: VNode =

            h("div", { id: "subtreeCreateLensView" }, [
                h("div", { id: "subtreeCreateLens" },

                    ...subtreeTitleViews.buildCreateTreeTitleView(state.lens.nodeTab.stageBehaviour),
                    createSubtreeTreeViews.buildInputView(tree),

                    lensButtonsViews.buildNextCancelView(
                        tab,
                        gStageActions.nextStage,
                        nodeActions.cancel,
                        "Go to next step",
                        "Next button disabled as the node state is either unchanged or invalid",
                        "Cancel and clear the node lens"
                    )
                )
            ]);

        return editView;
    }
};

export default createTreeTabViews;


