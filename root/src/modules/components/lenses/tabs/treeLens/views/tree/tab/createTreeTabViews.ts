import { h, VNode } from "hyperapp-local";

import IState from "../../../../../../../interfaces/state/IState";
import editTreeDetailsViews from "../partial/editTreeDetailsViews";
import ITreeSys from "../../../../../../../interfaces/state/tree/ITreeSys";
import lensButtonsViews from "../../../../../lens/views/lensButtonsViews";
import treeActions from "../../../actions/treeActions";
import typeViews from "../partial/typeViews";
import gSession from "../../../../../../../global/gSession";
import Filters from "../../../../../../../state/constants/Filters";
import gTreeCode from "../../../../../../../global/code/gTreeCode";
import treeTitleViews from "../partial/treeTitleViews";


const createTreeTabViews = {

    buildTabView(state: IState): VNode | null {

        if (!state
            || !state.lens.treeTab.display) {

            return null;
        }

        const lensTree: ITreeSys = state.lens.treeTab.lensTree as ITreeSys;

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

                    ...treeTitleViews.buildCreateTreeTitleView(),

                    h("div", { class: "type" }, [

                        typeViews.buildFlatView(lensTree),
                        typeViews.buildLoopView(lensTree),
                        ...typeViews.buildPluginsView(lensTree),

                    ]),
        
                    ...editTreeDetailsViews.buildCreateInputView(lensTree),

                    lensButtonsViews.buildActionCancelView(
                        state.lens.treeTab,
                        treeActions.save,
                        "Save",
                        treeActions.cancel,
                        "Save this tree",
                        "Save button disabled as the tree state is either unchanged or invalid",
                        "Cancel changes"
                    )
                ])
            ]);

        return view;
    }
};

export default createTreeTabViews;


