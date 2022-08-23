import { h, VNode } from "hyperapp-local";

import IState from "../../../../../../../interfaces/state/IState";
import editTreeDetailsViews from "../partial/editTreeDetailsViews";
import ITreeSys from "../../../../../../../interfaces/state/tree/ITreeSys";
import gSession from "../../../../../../../global/gSession";
import Filters from "../../../../../../../state/constants/Filters";
import gTreeCode from "../../../../../../../global/code/gTreeCode";
import treeTitleViews from "../partial/treeTitleViews";
import minMaxViews from "../partial/minMaxViews";
import treeActions from "../../../actions/treeActions";
import lensButtonsViews from "../../../../../lens/views/lensButtonsViews";


const cloneTreeTabViews = {

    buildTabView(state: IState): VNode | null {

        if (!state
            || !state.lens.treeTab.display) {

            return null;
        }

        const lensTree: ITreeSys = state.lens.treeTab.lensTree as ITreeSys;
        const originalTree: ITreeSys = state.lens.treeTab.cloneOriginalTree as ITreeSys;

        if (lensTree.ui.raw === true) {

            state.lens.treeTab.enableSave = false;
            gSession.setFocusFilter(Filters.treeNameFocusFilter);
        }
        else {

            gTreeCode.validateTabForNewTree(
                state,
                state.lens.treeTab,
                lensTree
            );
        }

        const view: VNode =

            h("div", { id: "treeLensView" }, [
                h("div", { id: "treeLens" }, [

                    ...treeTitleViews.buildCloneTreeTitleView(),

                    ...minMaxViews.buildCollapsibleDetailsView(
                        originalTree,
                        'Original'
                    ),

                    ...editTreeDetailsViews.buildCreateInputView(
                        lensTree,
                        null,
                        'Clone'),

                        lensButtonsViews.buildActionCancelView(
                            state.lens.treeTab,
                            treeActions.clone,
                            "Clone",
                            treeActions.cancel,
                            "Clone this tree",
                            "Clone button disabled as the tree state is either unchanged or invalid",
                            "Cancel clone"
                        )
                    ])
            ]);

        return view;
    }
};

export default cloneTreeTabViews;


