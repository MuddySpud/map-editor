import { h, VNode } from "hyperapp-local";

import IState from "../../../../../../../interfaces/state/IState";
import ITabSave from "../../../../../../../interfaces/state/ui/tabs/ITabSave";
import ISubtreeSys from "../../../../../../../interfaces/state/tree/ISubtreeSys";
import editSubtreeViews from "../../../../treeLens/views/subtree/partial/editSubtreeViews";
import subtreeActions from "../../../../treeLens/actions/subtreeActions";
import lensButtonsViews from "../../../../../lens/views/lensButtonsViews";
import gBranchTaskCode from "../../../../../../../global/code/gBranchTaskCode";
import gSession from "../../../../../../../global/gSession";
import Filters from "../../../../../../../state/constants/Filters";
import gSubtreeCode from "../../../../../../../global/code/gSubtreeCode";
import subtreeTitleViews from "../partial/subtreeTitleViews";
import IStageBehaviour from "../../../../../../../interfaces/behaviours/IStageBehaviour";
import nodeActions from "../../../actions/nodeActions";
import INode from "../../../../../../../interfaces/state/tree/INode";
import ILensUI from "../../../../../../../interfaces/state/ui/UIs/ILensUI";
import gSubtreeActions from "../../../../../../../global/actions/gSubtreeActions";

import '../../../scss/subtree.scss';


const createSubtreeTabViews = {

    buildTabView: (
        state: IState,
        stageBehaviour: IStageBehaviour
    ): VNode | null => {

        if (!state.lens.nodeTab.lensNode) {

            return null;
        }

        const lensNode: INode<ILensUI> = state.lens.nodeTab.lensNode as INode<ILensUI>;

        if (!lensNode.link) {

            return null;
        }

        const subtree: ISubtreeSys = lensNode.link;
        const tab: ITabSave = state.lens.nodeTab;

        if (subtree.ui.raw === true) {

            // tab.enableSave = false; As the rootText is set then the subtree is valid when raw
            gSession.setFocusFilter(Filters.stRootTextFocusFilter);
            gSubtreeCode.clearErrors(subtree);
        }
        else {

            gBranchTaskCode.validateTabForNewSubTree(
                tab,
                subtree
            );
        }

        const editView =

            h("div", { id: "treeLensView" }, [
                h("div", { id: "treeLens" }, [
                    h("div", { id: "subtreeLens" }, [

                        ...subtreeTitleViews.buildCreateSubtreeTitleView(stageBehaviour),

                        ...editSubtreeViews.buildInputView(
                            subtree,
                            subtreeActions.setRootText,
                            subtreeActions.setSocketText,
                            subtreeActions.addStSocket,
                            subtreeActions.deleteStSocket,
                            stageBehaviour
                        ),

                        lensButtonsViews.buildNextCancelView(
                            tab,
                            gSubtreeActions.linkToNewSubtree,
                            nodeActions.cancel,
                            "Go to next step",
                            "Next button disabled as the node state is either unchanged or invalid",
                            "Cancel and clear the node lens"
                        )
                    ])
                ])
            ]);

        return editView;
    }
};

export default createSubtreeTabViews;


