import { h, VNode } from "hyperapp-local";

import IState from "../../../../../../../interfaces/state/IState";
import editTreeDetailsViews from "../partial/editTreeDetailsViews";
import ITreeSys from "../../../../../../../interfaces/state/tree/ITreeSys";
import lensButtonsViews from "../../../../../lens/views/lensButtonsViews";
import treeActions from "../../../actions/treeActions";
import treeTitleViews from "../partial/treeTitleViews";
import minMaxViews from "../partial/minMaxViews";
import gTreeCode from "../../../../../../../global/code/gTreeCode";
import typeViews from "../partial/typeViews";


const editTreeTabViews = {

    buildTabView(state: IState): VNode | null {

        if (!state
            || !state.lens.treeTab.display) {

            return null;
        }

        const lensTree: ITreeSys = state.lens.treeTab.lensTree as ITreeSys;
        gTreeCode.validateLensTree(state);

        const view: VNode =

            h("div", { id: "treeLensView" }, [
                h("div", { id: "treeLens" }, [

                    ...treeTitleViews.buildEditTreeTitleView(),

                    h("div", { class: "type" }, [

                        ...typeViews.buildPluginsView(lensTree),

                    ]),

                    ...minMaxViews.buildCollapsibleDetailsView(lensTree, 'Tree'),
                    ...editTreeDetailsViews.buildEditInputView(lensTree),

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

export default editTreeTabViews;


