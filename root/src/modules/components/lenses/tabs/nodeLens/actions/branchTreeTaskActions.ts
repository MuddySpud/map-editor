import IState from "../../../../../interfaces/state/IState";
import gStateCode from "../../../../../global/code/gStateCode";
import IBranchTreeTask from "../../../../../interfaces/state/tree/IBranchTreeTask";
import gBranchTaskCode from "../../../../../global/code/gBranchTaskCode";
import gBranchTreeTaskCode from "../../../../../global/code/gBranchTreeTaskCode";
import ISubtreeLoader from "../../../../../interfaces/state/tree/ISubtreeLoader";
import IHole from "../../../../../interfaces/state/tree/IHole";
import ISocketLoaderUI from "../../../../../interfaces/state/ui/UIs/ISocketLoaderUI";


const branchTreeTaskActions = {

    changeRoot: (state: IState): IState => {

        if (!state
            || !state.lens.nodeTab.lensBranchTreeTask) {

            return state;
        }

        const branchTreeTask: IBranchTreeTask = state.lens.nodeTab.lensBranchTreeTask;
        gBranchTaskCode.forceSelect(branchTreeTask.socketLoader);

        return gStateCode.cloneState(state);;
    },

    editTree: (state: IState): IState => {

        if (!state
            || !state.lens.nodeTab.lensBranchTreeTask) {

            return state;
        }

        const branchTreeTask: IBranchTreeTask = state.lens.nodeTab.lensBranchTreeTask;
        gBranchTreeTaskCode.forceSelectTree(branchTreeTask.subtreeLoader);

        return gStateCode.cloneState(state);;
    },

    editStSockets: (state: IState): IState => {

        if (!state
            || !state.lens.nodeTab.lensBranchTreeTask) {

            return state;
        }

        const branchTreeTask: IBranchTreeTask = state.lens.nodeTab.lensBranchTreeTask;
        gBranchTreeTaskCode.forceSelectLimits(branchTreeTask.subtreeLoader);

        return gStateCode.cloneState(state);;
    },

    editSubtree: (state: IState): IState => {

        if (!state
            || !state.lens.nodeTab.lensBranchTreeTask) {

            return state;
        }

        const branchTreeTask: IBranchTreeTask = state.lens.nodeTab.lensBranchTreeTask;
        gBranchTreeTaskCode.forceSelectSubtree(branchTreeTask.subtreeLoader);

        return gStateCode.cloneState(state);;
    },

    cancelLimitClickSelect: (state: IState): IState => {

        if (!state) {
            return state;
        }

        if (state.lens.nodeTab.lensBranchTreeTask) {

            const subtreeLoader: ISubtreeLoader = state.lens.nodeTab.lensBranchTreeTask.subtreeLoader;
            gBranchTreeTaskCode.disableLimitClickSelect(subtreeLoader);
        }
        else {
            return state;
        }

        return gStateCode.cloneState(state);;
    },

    cancelLimitForceSet: (state: IState): IState => {

        if (!state) {
            return state;
        }

        if (state.lens.nodeTab.lensBranchTreeTask) {

            const subtreeLoader: ISubtreeLoader = state.lens.nodeTab.lensBranchTreeTask.subtreeLoader;

            gBranchTreeTaskCode.deleteForceSetLimit(
                state,
                subtreeLoader);
        }
        else {
            return state;
        }

        return gStateCode.cloneState(state);;
    },

    enableLimitClickSelect: (state: IState): IState => {

        if (!state) {
            return state;
        }

        if (state.lens.nodeTab.lensBranchTreeTask) {

            const subtreeLoader: ISubtreeLoader = state.lens.nodeTab.lensBranchTreeTask.subtreeLoader;
            const limit: IHole<ISocketLoaderUI> | null = gBranchTreeTaskCode.getForceSetLimit(subtreeLoader);

            if (limit) {

                gBranchTreeTaskCode.enableClickSelect(
                    subtreeLoader,
                    limit
                );
            }
        }
        else {
            return state;
        }

        return gStateCode.cloneState(state);;
    }
};

export default branchTreeTaskActions;


