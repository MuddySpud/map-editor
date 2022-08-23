import { h, VNode } from "hyperapp-local";

import INodeBase from "../../../../../../../interfaces/state/tree/INodeBase";
import IState from "../../../../../../../interfaces/state/IState";
import ITreeSys from "../../../../../../../interfaces/state/tree/ITreeSys";
import IBranchTreeTask from "../../../../../../../interfaces/state/tree/IBranchTreeTask";
import IStageBehaviour from "../../../../../../../interfaces/behaviours/IStageBehaviour";
import ISubtreeSys from "../../../../../../../interfaces/state/tree/ISubtreeSys";
import lensButtonsViews from "../../../../../lens/views/lensButtonsViews";
import treeDetailsViews from "../../../../treeLens/views/tree/partial/treeDetailsViews";
import branchToSubtreeActions from "../../../actions/branchToSubtreeActions";
import limitDetailsViews from "../partial/limitDetailsViews";
import gBranchTreeTaskCode from "../../../../../../../global/code/gBranchTreeTaskCode";
import branchToSubtreeViews from "../partial/branchToSubtreeViews";
import branchToSubtreeTreeTitleViews from "../partial/branchToSubtreeTreeTitleViews";
import nodeDetailsViews from "../../node/partial/nodeDetailsViews";
import nodeWarningsViews from "../partial/nodeWarningsViews";
import nodeActions from "../../../actions/nodeActions";
import CssClasses from "../../../../../../../state/constants/CssClasses";
import subtreeDetailsViews from "../../../../treeLens/views/subtree/partial/subtreeDetailsViews";

import '../../../scss/summary.scss';


const branchToSubtreeTabViews = {

    buildTabView: (
        state: IState,
        optionKey: string): VNode | null => {

        if (!state
            || !state.lens.nodeTab.lensBranchTreeTask) {

            return null;
        }

        const branchTreeTask: IBranchTreeTask = state.lens.nodeTab.lensBranchTreeTask as IBranchTreeTask;
        const stageBehaviour: IStageBehaviour = state.lens.nodeTab.stageBehaviour;
        const subtree: ISubtreeSys = branchTreeTask.subtreeLoader.subtree;
        const tree: ITreeSys = branchTreeTask.subtreeLoader.subtree.tree as ITreeSys;
        const root: INodeBase = tree.root;

        gBranchTreeTaskCode.validate(
            state,
            branchTreeTask);

        const editView: VNode =

            h("div", { id: "branchTaskLensView" }, [
                h("div", { id: "branchTaskLens" }, [
                    h("div", { id: "summaryLens" }, [

                        ...branchToSubtreeTreeTitleViews.buildSummaryTitleView(
                            optionKey,
                            stageBehaviour),

                        h("div", { class: "summary" }, [
                            h("div", { class: "hub" }, [
                                h("div", { class: "hub-left" }, [
                                    h("h4", {}, "Tree"),
                                    h("div", { class: "tree" }, [

                                        treeDetailsViews.buildNameView(tree, CssClasses.odd),
                                        treeDetailsViews.buildDescriptionView(tree),
                                        treeDetailsViews.buildTagsView(tree, CssClasses.odd)
                                    ]),
                                ]),
                                h("div", { class: "hub-right" }, [

                                    branchToSubtreeViews.buildHubButtons(),
                                ]),
                            ]),
                            h("h4", {}, "Root"),
                            h("div", { class: "root" }, [

                                nodeDetailsViews.buildNodeDiscussionRowView(root, CssClasses.odd)
                            ]),

                            ...subtreeDetailsViews.buildStRootTextDetailsView(subtree.stRoot),
                            limitDetailsViews.buildStSocketsView(branchTreeTask),
                            nodeWarningsViews.buildWarningsView(branchTreeTask)
                        ]),

                        lensButtonsViews.buildSaveCancelView(
                            state.lens.nodeTab,
                            branchToSubtreeActions.save,
                            nodeActions.cancel,
                            "Save the node and options",
                            "Save button disabled as the node state is either unchanged or invalid",
                            "Cancel and clear the node lens"
                        )
                    ])
                ])
            ]);

        return editView;
    }
};

export default branchToSubtreeTabViews;


