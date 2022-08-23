import IState from "../../interfaces/state/IState";
import INodeLoader from "../../interfaces/state/tree/INodeLoader";
import INode from "../../interfaces/state/tree/INode";
import IBranchUI from "../../interfaces/state/ui/UIs/IBranchUI";
import gBranchTaskCode from "./gBranchTaskCode";
import gBranchesStateCode from "./gBranchesStateCode";


const gNodeLoaderCode = {

    findAndResetBranchOptions: (
        state: IState,
        optionLoader: INodeLoader): void => {

        const branchOptions: Array<INode<IBranchUI>> = gBranchTaskCode.getBranchOptions(state);

        if (branchOptions.length === 1) {

            const option: INode<IBranchUI> = branchOptions[0];

            if (option.key !== optionLoader.key
                || option.token !== optionLoader.token) {

                option.ui.branchTaskOption = false;
            }
        }
        else if (branchOptions.length > 1) {

            throw new Error("There can only be one branch option in the branch-view");
        }

        if (optionLoader.token === state.branchesState.tree.token) {

            const registeredNode: INode<IBranchUI> | null = gBranchesStateCode.getRegisteredNode(
                state,
                state.branchesState.tree.token,
                optionLoader.key);

            if (registeredNode) {

                registeredNode.ui.branchTaskOption = true;
            }
        }
    },

    findAndResetBranchTargets: (
        state: IState,
        targetLoader: INodeLoader): void => {

        const branchTargets: Array<INode<IBranchUI>> = gBranchTaskCode.getBranchTargets(state);

        if (branchTargets.length === 1) {

            const target: INode<IBranchUI> = branchTargets[0];

            if (target.key !== targetLoader.key) {

                target.ui.branchTaskTarget = false;
            }
        }
        else if (branchTargets.length > 1) {

            throw new Error("There can only be one branch target in the branch-view");
        }
    }
};

export default gNodeLoaderCode;

