import { h, VNode } from "hyperapp-local";

import IState from "../../../../../../../interfaces/state/IState";
import editSubtreeViews from "../partial/editSubtreeViews";
import treeButtonViews from "../../common/partial/treeButtonViews";
import ISubtreeSys from "../../../../../../../interfaces/state/tree/ISubtreeSys";
import subtreeActions from "../../../actions/subtreeActions";
import subtreeTitleViews from "../partial/subtreeTitleViews";

import '../../../scss/subtree2.scss'


const createSubtreeTabViews = {

    buildTabView(state: IState): VNode | null {

        if (!state
            || !state.lens.treeTab.display
            || !state.lens.treeTab.lensSubtree) {

            return null;
        }

        const lensSubtree: ISubtreeSys = state.lens.treeTab.lensSubtree as ISubtreeSys;

        const view: VNode =

            h("div", { id: "treeLensView" }, [
                h("div", { id: "treeLens" }, [
                    h("div", { id: "subtreeLens" }, [

                        ...subtreeTitleViews.buildCreateSubtreeTitleView(),

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

        return view;
    }
}

export default createSubtreeTabViews;


