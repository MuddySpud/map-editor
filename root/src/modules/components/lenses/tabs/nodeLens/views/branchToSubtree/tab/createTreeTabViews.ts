import { h, VNode } from "hyperapp-local";

import IState from "../../../../../../../interfaces/state/IState";
import IBoolElement from "../../../../../../../interfaces/state/ui/payloads/IBoolElement";
import ITabSave from "../../../../../../../interfaces/state/ui/tabs/ITabSave";
import ITreeSys from "../../../../../../../interfaces/state/tree/ITreeSys";
import createSubtreeTreeViews from "../../../../treeLens/views/subtree/partial/createSubtreeTreeViews";
import branchToSubtreeTreeTitleViews from "../partial/branchToSubtreeTreeTitleViews";
import lensButtonsViews from "../../../../../lens/views/lensButtonsViews";
import gBranchTaskCode from "../../../../../../../global/code/gBranchTaskCode";
import gSession from "../../../../../../../global/gSession";
import Filters from "../../../../../../../state/constants/Filters";

import '../../../scss/subtree.scss';


const createTreeTabViews = {

    buildTabView: (
        state: IState,
        optionKey: string,
        tree: ITreeSys,
        tab: ITabSave,
        nextAction: (
            state: IState,
            payload: IBoolElement) => IState,
        closeTabAction: (state: IState) => IState,
    ): VNode => {

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

                    ...branchToSubtreeTreeTitleViews.buildTreeTitleView(
                        optionKey,
                        tab.stageBehaviour),

                    createSubtreeTreeViews.buildInputView(tree),

                    lensButtonsViews.buildNextCancelView(
                        tab,
                        nextAction,
                        closeTabAction,
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


