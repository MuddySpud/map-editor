import IState from "../../interfaces/state/IState";
import Stash from "../../state/tree/Stash";
import BranchUI from "../../state/ui/UIs/BranchUI";
import IStash from "../../interfaces/state/tree/IStash";
import IBranchUI from "../../interfaces/state/ui/UIs/IBranchUI";
import gNodeCode from "./gNodeCode";
import gOptionCode from "./gOptionCode";
import INode from "../../interfaces/state/tree/INode";
import IBranchTask from "../../interfaces/state/tree/IBranchTask";
import gBranchTaskCode from "./gBranchTaskCode";
import { ActionType } from "../../interfaces/enums/ActionType";
import { StashType } from "../../interfaces/enums/StashType";
import gTabCode from "./gTabCode";


const gStashCode = {

    loadStashedNodes: (
        state: IState,
        rawStashRoot: any): void => {

        if (!rawStashRoot) {
            return;
        }

        const stash: IStash<IBranchUI> = state.branchesState.stash = new Stash(
            BranchUI,
            rawStashRoot.token as string);

        stash.key = rawStashRoot.key;
        stash.option = rawStashRoot.option;
        state.branchesState.stash = stash;

        stash.nodes = gOptionCode.loadOptions(
            rawStashRoot.nodes,
            stash as INode<IBranchUI>);

        stash.nodes.sort(gNodeCode.nodeOrderCompare);

        const registered: Array<INode<IBranchUI>> = state.branchesState.registered;
        registered.push(stash);

        stash.nodes.forEach((option: INode<IBranchUI>) => {
            registered.push(option);
        });

        state.branchesState.stash = stash;
    },

    getStashType: (state: IState): StashType => {

        const branchTask: IBranchTask = state.lens.nodeTab.lensBranchTask as IBranchTask;

        return branchTask.action === ActionType.MoveBranchToStash ?
            StashType.Move :
            StashType.Clone;
    },

    setStashAsTargetAndValidate: (state: IState): void => {

        if (!gTabCode.canSave(state.lens.nodeTab)) {
            return;
        }

        state.lens.nodeTab.saveLock = true;
        const branchTask: IBranchTask = state.lens.nodeTab.lensBranchTask as IBranchTask;

        gBranchTaskCode.setUpTarget(
            state,
            branchTask,
            state.branchesState.stash
        );

        gBranchTaskCode.validateBranchTask(state);
    }
};

export default gStashCode;

