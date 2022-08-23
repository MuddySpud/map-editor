import { h } from "hyperapp-local";

import IState from "../../../../../../../interfaces/state/IState";
import IBoolElement from "../../../../../../../interfaces/state/ui/payloads/IBoolElement";
import ITabSave from "../../../../../../../interfaces/state/ui/tabs/ITabSave";
import ISubtreeSys from "../../../../../../../interfaces/state/tree/ISubtreeSys";
import editSubtreeViews from "../../../../treeLens/views/subtree/partial/editSubtreeViews";
import subtreeActions from "../../../../treeLens/actions/subtreeActions";
import branchToSubtreeTreeTitleViews from "../partial/branchToSubtreeTreeTitleViews";
import lensButtonsViews from "../../../../../lens/views/lensButtonsViews";
import gBranchTaskCode from "../../../../../../../global/code/gBranchTaskCode";
import gSession from "../../../../../../../global/gSession";
import Filters from "../../../../../../../state/constants/Filters";
import gSubtreeCode from "../../../../../../../global/code/gSubtreeCode";

import '../../../scss/subtree.scss';


const createSubtreeTabViews = {

    buildTabView: (
        optionKey: string,
        subtree: ISubtreeSys,
        tab: ITabSave,
        nextAction: (
            state: IState,
            payload: IBoolElement) => IState,
        closeTabAction: (state: IState) => IState
    ) => {

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

                        ...branchToSubtreeTreeTitleViews.buildSubtreeTitleView(
                            optionKey,
                            tab.stageBehaviour
                        ),

                        ...editSubtreeViews.buildInputView(
                            subtree,
                            subtreeActions.setRootText,
                            subtreeActions.setSocketText,
                            subtreeActions.addStSocket,
                            subtreeActions.deleteStSocket,
                            tab.stageBehaviour
                        ),

                        lensButtonsViews.buildNextCancelView(
                            tab,
                            nextAction,
                            closeTabAction,
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


