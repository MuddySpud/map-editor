import IState from "../../interfaces/state/IState";
import INode from "../../interfaces/state/tree/INode";
import IBranchUI from "../../interfaces/state/ui/UIs/IBranchUI";
import IBranchTreeTask from "../../interfaces/state/tree/IBranchTreeTask";
import IStageBehaviour from "../../interfaces/behaviours/IStageBehaviour";
import gNodeCode from "../code/gNodeCode";
import gStateCode from "../code/gStateCode";
import gViewCode from "../code/gViewCode";
import gInitialiseTree from "../code/gInitialiseTree";
import gBranchesStateCode from "../code/gBranchesStateCode";
import gBranchTreeTaskCode from "../code/gBranchTreeTaskCode";


const gBranchesActions = {

    loadBranchAndExpand: (
        state: IState,
        response: any): IState => {

        if (!state
            || !response?.jsonData) {

            return state;
        }

        gViewCode.queueCacheLiveView(state);
        const loadedNodes: Array<INode<IBranchUI>> = gViewCode.loadNodes(response.jsonData.loadedNodes);

        // The first node is the start
        const newStart = loadedNodes[0];

        const start: INode<IBranchUI> | null = gBranchesStateCode.getRegisteredNode(
            state,
            state.branchesState.tree.token,
            newStart.key
        );

        if (start) {

            const registeredLoadedNodes: Array<INode<IBranchUI>> = gBranchesStateCode.registerLoadedNodes(
                state,
                loadedNodes,
            );

            gInitialiseTree.buildBranchesAndExpand(
                state,
                start,
                registeredLoadedNodes
            );
        }
        else {
            throw new Error("Can't find the branch start node to overwrite.");
        }

        return gStateCode.cloneState(state);
    },

    loadBranch: (
        state: IState,
        response: any): IState => {

        if (!state
            || !response?.jsonData) {

            return state;
        }

        gViewCode.queueCacheLiveView(state);
        const loadedNodes: Array<INode<IBranchUI>> = gViewCode.loadNodes(response.jsonData.loadedNodes);

        // The first node is the start
        const newStart = loadedNodes[0];

        const start: INode<IBranchUI> | null = gBranchesStateCode.getRegisteredNode(
            state,
            state.branchesState.tree.token,
            newStart.key
        );

        if (start) {

            const registeredLoadedNodes: Array<INode<IBranchUI>> = gBranchesStateCode.registerLoadedNodes(
                state,
                loadedNodes,
            );

            gInitialiseTree.buildBranches(
                state,
                start,
                registeredLoadedNodes
            );
        }
        else {
            throw new Error("Can't find the branch start node to overwrite.");
        }

        return gStateCode.cloneState(state);
    },

    loadBranchAndSetupTreeTaskOption: (
        state: IState,
        response: any): IState => {

        if (!state
            || !response?.jsonData) {

            return state;
        }

        gViewCode.queueCacheLiveView(state);
        const loadedNodes: Array<INode<IBranchUI>> = gViewCode.loadNodes(response.jsonData.loadedNodes);

        // The first node is the start
        const newStart = loadedNodes[0];

        const start: INode<IBranchUI> | null = gBranchesStateCode.getRegisteredNode(
            state,
            state.branchesState.tree.token,
            newStart.key
        );

        if (start) {

            const registeredLoadedNodes: Array<INode<IBranchUI>> = gBranchesStateCode.registerLoadedNodes(
                state,
                loadedNodes,
            );

            gInitialiseTree.buildBranches(
                state,
                start,
                registeredLoadedNodes
            );

            const branchTreeTask: IBranchTreeTask | null = state.lens.nodeTab.lensBranchTreeTask;

            if (branchTreeTask) {

                const option: INode<IBranchUI> | null = gNodeCode.showNode(
                    state,
                    state.branchesState.tree.token as string,
                    branchTreeTask.socketLoader.key
                );

                if (!option) {
                    throw new Error(`Could not find option matching optionLoader.key: ${branchTreeTask.socketLoader.key}`)
                }

                gNodeCode.expandChildren(option);
                gBranchesStateCode.deselectAllNodes(state);

                gBranchTreeTaskCode.setUpOption(
                    state,
                    branchTreeTask.socketLoader,
                    option
                );

                // re-run next stage
                const stageBehaviour: IStageBehaviour = state.lens.nodeTab.stageBehaviour;

                return stageBehaviour.nextStage(state);
            }
        }
        else {
            throw new Error("Can't find the branch start node to overwrite.");
        }

        return gStateCode.cloneState(state);
    }
};

export default gBranchesActions;
