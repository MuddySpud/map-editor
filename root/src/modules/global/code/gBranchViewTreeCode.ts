import IState from "../../interfaces/state/IState";
import IBranchUI from "../../interfaces/state/ui/UIs/IBranchUI";
import BranchUI from "../../state/ui/UIs/BranchUI";
import ITree from "../../interfaces/state/tree/ITree";
import Stash from "../../state/tree/Stash";
import U from "../gUtilities";
import ITreeBase from "../../interfaces/state/tree/ITreeBase";
import gTreeCode from "./gTreeCode";
import ITreeSys from "../../interfaces/state/tree/ITreeSys";


const gBranchViewTreeCode = {

    loadTree: (
        state: IState,
        rawTree: any): void => {

        if (!rawTree) {
            return;
        }

        const tree: ITreeBase | null = gTreeCode.loadTreeShallow(rawTree);

        if (!tree) {
            return;
        }

        const treeBranchUI: ITree<IBranchUI> = tree as ITree<IBranchUI>;
        treeBranchUI.isBot = rawTree.isBot;
        treeBranchUI.isSubtree = rawTree.isSubtree;
        state.branchesState.tree = treeBranchUI;

        document.title = `${tree.name}`;

        if (U.isNullOrWhiteSpace(tree.token) === false) {

            state.branchesState.stash = new Stash(
                BranchUI,
                tree.token as string);
        }
    },

    updateTree: (
        state: IState,
        tree: ITreeSys | null): void => {

        if (!tree) {
            return;
        }

        if (!U.isPositiveNumeric(state.branchesState.tree.key)
            || state.branchesState.tree.key !== tree?.key) {

            return;
        }

        gTreeCode.updateTreeBase(
            state.branchesState.tree,
            tree
        );

        state.branchesState.tree.isBot = tree.isBot;
        state.branchesState.tree.isSubtree = tree.isSubtree;
    }
};

export default gBranchViewTreeCode;

