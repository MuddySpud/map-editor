import IState from "../../../../../interfaces/state/IState";
import IBranchUI from "../../../../../interfaces/state/ui/UIs/IBranchUI";
import gStateCode from "../../../../../global/code/gStateCode";
import IBranchTask from "../../../../../interfaces/state/tree/IBranchTask";
import gBranchTaskCode from "../../../../../global/code/gBranchTaskCode";
import INodeBaseElement from "../../../../../interfaces/state/ui/payloads/INodeBaseElement";
import INodeBase from "../../../../../interfaces/state/tree/INodeBase";
import INode from "../../../../../interfaces/state/tree/INode";
import gNodeActions from "../../../../../global/actions/gNodeActions";
import INodeLoader from "../../../../../interfaces/state/tree/INodeLoader";
import U from "../../../../../global/gUtilities";
import gBranchesStateCode from "../../../../../global/code/gBranchesStateCode";
import ISocketLoader from "../../../../../interfaces/state/tree/ISocketLoader";
import INodeLoaderTreeBase from "../../../../../interfaces/state/ui/payloads/INodeLoaderTreeBase";
import gSession from "../../../../../global/gSession";
import IStateAnyArray from "../../../../../interfaces/state/IStateAnyArray";
import gNodeEffects from "../../../../../global/effects/gNodeEffects";
import gAutoCompleteEffects from "../../../../../global/effects/gAutoCompleteEffects";


const branchTaskActions = {

    nodeLoaderTokenSelectBlur: (
        state: IState,
        nodeLoader: INodeLoader): IState => {

        if (!state
            || !nodeLoader) {

            return state;
        }

        nodeLoader.ui.showTreeSelection = false;
        gSession.clearAllFocusFilters();

        return gStateCode.cloneState(state);
    },

    selectTreeToken: (
        state: IState,
        payload: INodeLoaderTreeBase): IStateAnyArray => {

        if (!state
            || !payload
            || !payload.nodeLoader
            || !payload.tree
            || !payload.tree.token) {

            return state;
        }

        const nodeLoader: INodeLoader = payload.nodeLoader;

        if (nodeLoader.token !== payload.tree.token) {

            nodeLoader.token = payload.tree.token;

            return [
                gStateCode.cloneState(state),
                gAutoCompleteEffects.token(
                    state,
                    nodeLoader.token,
                ),
                gNodeEffects.validateNodeKey(
                    state,
                    nodeLoader.token,
                    nodeLoader.key
                )
            ];
        }

        return gStateCode.cloneState(state);
    },

    toggleLocalTree: (state: IState): IState => {

        if (!state
            || !state.lens.nodeTab.lensBranchTask) {

            return state;
        }

        const optionLoader: INodeLoader = state.lens.nodeTab.lensBranchTask.optionLoader;
        optionLoader.ui.localTree = optionLoader.ui.localTree === false;
        optionLoader.ui.raw = false;
        optionLoader.ui.recognised = false;

        if (optionLoader.ui.localTree === true) {

            optionLoader.token = state.branchesState.tree.token as string;
        }
        else {
            optionLoader.token = '';
        }

        return gStateCode.cloneState(state);
    },

    toggleMinimiseOptionLoader: (
        state: IState,
        optionLoader: INodeLoader): IState => {

        if (!state
            || !optionLoader) {

            return state;
        }

        optionLoader.ui.minimise = optionLoader.ui.minimise === false;

        return gStateCode.cloneState(state);
    },

    cancelOptionClickSelect: (state: IState): IState => {

        if (!state) {
            return state;
        }

        if (state.lens.nodeTab.lensBranchTask) {

            const nodeLoader: INodeLoader = state.lens.nodeTab.lensBranchTask.optionLoader;
            gBranchTaskCode.disableClickSelect(nodeLoader);
        }
        else if (state.lens.nodeTab.lensBranchTreeTask) {

            const socketLoader: ISocketLoader = state.lens.nodeTab.lensBranchTreeTask.socketLoader;
            gBranchTaskCode.disableClickSelect(socketLoader);
        }
        else {
            return state;
        }

        return gStateCode.cloneState(state);;
    },

    cancelTargetClickSelect: (state: IState): IState => {

        if (!state
            || !state.lens.nodeTab.lensBranchTask) {

            return state;
        }

        const branchTask: IBranchTask = state.lens.nodeTab.lensBranchTask;
        gBranchTaskCode.disableClickSelect(branchTask.targetLoader);

        return gStateCode.cloneState(state);;
    },

    enableOptionClickSelect: (state: IState): IState => {

        if (!state) {
            return state;
        }

        if (state.lens.nodeTab.lensBranchTask) {

            const nodeLoader: INodeLoader = state.lens.nodeTab.lensBranchTask.optionLoader;
            gBranchTaskCode.enableClickSelect(nodeLoader);
        }
        else if (state.lens.nodeTab.lensBranchTreeTask) {

            const socketLoader: ISocketLoader = state.lens.nodeTab.lensBranchTreeTask.socketLoader;
            gBranchTaskCode.enableClickSelect(socketLoader);
        }
        else {
            return state;
        }

        return gStateCode.cloneState(state);;
    },

    enableTargetClickSelect: (state: IState): IState => {

        if (!state
            || !state.lens.nodeTab.lensBranchTask) {

            return state;
        }

        const branchTask: IBranchTask = state.lens.nodeTab.lensBranchTask;
        gBranchTaskCode.enableClickSelect(branchTask.targetLoader);

        return gStateCode.cloneState(state);;
    },

    changeOption: (state: IState): IState => {

        if (!state
            || !state.lens.nodeTab.lensBranchTask) {

            return state;
        }

        const branchTask: IBranchTask = state.lens.nodeTab.lensBranchTask;
        gBranchTaskCode.forceSelect(branchTask.optionLoader);

        return gStateCode.cloneState(state);;
    },

    changeTarget: (state: IState): IState => {

        if (!state
            || !state.lens.nodeTab.lensBranchTask) {

            return state;
        }

        const branchTask: IBranchTask = state.lens.nodeTab.lensBranchTask;
        gBranchTaskCode.forceSelect(branchTask.targetLoader);

        return gStateCode.cloneState(state);;
    },

    setOrder: (
        state: IState,
        input: HTMLInputElement): IState => {

        if (!state
            || !state.lens.nodeTab.lensBranchTask
            || !state.lens.nodeTab.lensBranchTask.optionLoader.node
            || !input) {

            return state;
        }

        if (U.isNumeric(input.value) === true) {

            const option: INodeBase = state.lens.nodeTab.lensBranchTask.optionLoader.node;
            let value: number = Number(input.value);

            if (value < 1) {

                value = 1;
            }

            option.order = value;
        }

        return gStateCode.cloneState(state);
    },

    setOptionText: (
        state: IState,
        payload: INodeBaseElement): IState => {

        if (!state
            || !state.lens.nodeTab.lensBranchTask) {

            return state;
        }

        const branchTask: IBranchTask = state.lens.nodeTab.lensBranchTask;
        const textarea: HTMLTextAreaElement = payload.element as HTMLTextAreaElement;

        const option: INodeBase = payload.node;
        option.option = textarea.value;

        gBranchTaskCode.validateInsert(branchTask);
        // textareaCode.setTextAreaHeight(textarea);
        state.lens.nodeTab.enableSave = true;

        return gStateCode.cloneState(state);
    },

    overwriteBranchTaskStartAndTarget: (
        state: IState,
        response: any): IStateAnyArray => {

        if (!response?.jsonData) {

            return state;
        }

        state.lens.nodeTab.saveLock = false;
        const rawTarget: any = response.jsonData.target;
        const rawLaunchSite: any = response.jsonData.launch;

        if (rawTarget
            && rawTarget.token === state.branchesState.tree.token) {

            const target: INode<IBranchUI> | null = gBranchesStateCode.findAndReLoadRegisteredNode(
                state,
                rawTarget);

            if (target) {

                state.branchesState.current = target;
                gBranchesStateCode.setLensNodeForUpdate(state);
            }
        }

        if (rawLaunchSite
            && rawLaunchSite.token === state.branchesState.tree.token) {

            gBranchesStateCode.findAndReLoadRegisteredNode(
                state,
                rawLaunchSite);
        }

        return gNodeActions.completeNodeSelection(state);
    },

    overwriteBranchTaskTarget: (
        state: IState,
        response: any): IStateAnyArray => {

        if (!response?.jsonData) {

            return state;
        }

        state.lens.nodeTab.saveLock = false;
        const rawTarget: any = response.jsonData.target;

        if (rawTarget
            && rawTarget.token === state.branchesState.tree.token) {

            const target: INode<IBranchUI> | null = gBranchesStateCode.findAndReLoadRegisteredNode(
                state,
                rawTarget);

            if (target) {

                state.branchesState.current = target;
                gBranchesStateCode.setLensNodeForUpdate(state);
            }
        }

        return gNodeActions.completeNodeSelection(state);
    },

    overwriteBranchTaskStartAndStash: (
        state: IState,
        response: any): IStateAnyArray => {

        if (!response?.jsonData) {

            return state;
        }

        state.lens.nodeTab.saveLock = false;
        const rawStash: any = response.jsonData.target;
        const rawLaunchSite: any = response.jsonData.launch;

        if (rawStash
            && rawStash.token === state.branchesState.stash.token) {

            gBranchesStateCode.findAndReLoadRegisteredNode(
                state,
                rawStash);

            state.branchesState.current = state.branchesState.stash;
            gBranchesStateCode.setLensNodeForUpdate(state);
            state.branchesState.stash.ui.showNode = true;
        }

        if (rawLaunchSite
            && rawLaunchSite.token === state.branchesState.tree.token) {

            gBranchesStateCode.findAndReLoadRegisteredNode(
                state,
                rawLaunchSite);
        }

        return gNodeActions.completeNodeSelection(state);
    },

    overwriteBranchTaskStash: (
        state: IState,
        response: any): IState => {

        if (!response?.jsonData) {

            return state;
        }

        state.lens.nodeTab.saveLock = false;

        const rawStash: any = response.jsonData.target;

        if (rawStash
            && rawStash.token === state.branchesState.stash.token) {

            gBranchesStateCode.findAndReLoadRegisteredNode(
                state,
                rawStash);

            state.branchesState.current = state.branchesState.stash;
            gBranchesStateCode.setLensNodeForUpdate(state);
            state.branchesState.stash.ui.showNode = true;
        }

        return gStateCode.cloneState(state);
    }
};

export default branchTaskActions;
