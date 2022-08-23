import { h, VNode } from "hyperapp-local";

import IState from "../../../../../../../interfaces/state/IState";
import editSubtreeViews from "../partial/editSubtreeViews";
import treeButtonViews from "../../common/partial/treeButtonViews";
import ISubtreeSys from "../../../../../../../interfaces/state/tree/ISubtreeSys";
import subtreeActions from "../../../actions/subtreeActions";
import gSubtreeCode from "../../../../../../../global/code/gSubtreeCode";
import subtreeTitleViews from "../partial/subtreeTitleViews";
import minMaxViews from "../../tree/partial/minMaxViews";

import '../../../scss/subtree2.scss';


const editSubtreeTabViews = {

    buildTabView(state: IState): VNode | null {

        if (!state
            || !state.lens.treeTab.display
            || !state.lens.treeTab.lensSubtree) {

            return null;
        }

        const lensSubtree: ISubtreeSys = state.lens.treeTab.lensSubtree as ISubtreeSys;
        gSubtreeCode.validateTab(state);

        const lensTabBodyView: VNode =

            h("div", { id: "treeLensView" }, [
                h("div", { id: "treeLens" }, [
                    h("div", { id: "subtreeLens" }, [

                        ...subtreeTitleViews.buildEditSubtreeTitleView(),

                        ...minMaxViews.buildCollapsibleShortDetailsView(
                            lensSubtree.tree,
                            "Tree"
                        ),

                        ...editSubtreeViews.buildInputView(
                            lensSubtree,
                            subtreeActions.setRootText,
                            subtreeActions.setSocketText,
                            subtreeActions.addStSocket,
                            subtreeActions.deleteStSocket),

                        treeButtonViews.buildActionsView(
                            state,
                            "Save",
                            subtreeActions.save)
                    ])
                ])
            ]);

        return lensTabBodyView;
    }
};

export default editSubtreeTabViews;


