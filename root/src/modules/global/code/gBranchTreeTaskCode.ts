import IBranchTreeTask from "../../interfaces/state/tree/IBranchTreeTask";
import U from "../gUtilities";
import IState from "../../interfaces/state/IState";
import IBranchUI from "../../interfaces/state/ui/UIs/IBranchUI";
import BranchTreeTask from "../../state/tree/BranchTreeTask";
import INode from "../../interfaces/state/tree/INode";
import ITreeBase from "../../interfaces/state/tree/ITreeBase";
import ISubtreeLoader from "../../interfaces/state/tree/ISubtreeLoader";
import ISocketLoader from "../../interfaces/state/tree/ISocketLoader";
import INodeBase from "../../interfaces/state/tree/INodeBase";
import { NodeType } from "../../interfaces/enums/NodeType";
import gBranchTaskCode from "./gBranchTaskCode";
import gTreeCode from "./gTreeCode";
import { ActionType } from "../../interfaces/enums/ActionType";
import { LensStage } from "../../interfaces/enums/LensStage";
import IStageBehaviour from "../../interfaces/behaviours/IStageBehaviour";
import FailedAncestors from "../../state/tree/FailedAncestors";
import ITabSave from "../../interfaces/state/ui/tabs/ITabSave";
import gStateCode from "./gStateCode";
import gTreesStateCode from "./gTreesStateCode";
import ISubtreeSys from "../../interfaces/state/tree/ISubtreeSys";
import ITreeSys from "../../interfaces/state/tree/ITreeSys";
import IStSocket from "../../interfaces/state/tree/IStSocket";
import ISocketLoaderUI from "../../interfaces/state/ui/UIs/ISocketLoaderUI";
import IHole from "../../interfaces/state/tree/IHole";
import gHoleCode from "./gHoleCode";
import IGlobalBranchFlags from "../../interfaces/state/ui/IGlobalBranchFlags";
import GlobalBranchFlags from "../../state/ui/GlobalBranchFlags";
import INodeLoader from "../../interfaces/state/tree/INodeLoader";
import gBranchesStateCode from "./gBranchesStateCode";
import gNodeCode from "./gNodeCode";
import gSubtreeCode from "./gSubtreeCode";


const gBranchTreeTaskCode = {

    isComplete: (branchTreeTask: IBranchTreeTask): boolean => {

        return U.isNullOrWhiteSpace(branchTreeTask.socketLoader.key) === false
            && U.isNullOrWhiteSpace(branchTreeTask.socketLoader.token) === false;
    },

    failedBranchToSubtreeRules: (
        state: IState,
        option: INode<IBranchUI>): boolean => {

        if (gBranchTreeTaskCode.failedLimitRules(state, option) === true) {

            return true;
        }

        if (gBranchTreeTaskCode.failedOptionRules(state, option) === true) {

            return true;
        }

        return false;
    },

    failedOptionRules: (
        state: IState,
        option: INode<IBranchUI>): boolean => {


        if (!state.lens.nodeTab.lensBranchTreeTask) {

            return false;
        }

        if (!state.lens.nodeTab.lensBranchTreeTask.socketLoader) {

            return true;
        }

        const globalBranchFlags: IGlobalBranchFlags = gBranchTreeTaskCode.getGlobalBranchFlags(state);

        if (globalBranchFlags.option === false) {
            // Then not trying to choose an option 
            return false;
        }
        else if (globalBranchFlags.option === true
            && option.ui.branchTaskOption === true) {
            // Then trying to choose an option and clicking an already selected option so return 
            return true;
        }

        // Is click select active? If not return
        const rootLoader: ISocketLoader = state.lens.nodeTab.lensBranchTreeTask.socketLoader;
        const stageBehaviour: IStageBehaviour = state.lens.nodeTab.stageBehaviour as IStageBehaviour;
        const stage: LensStage = stageBehaviour.getStage();

        if (stage === LensStage.SelectBranchTaskOption
            && !rootLoader.ui.clickSelect === true) {

            return true;
        }

        return false;
    },

    failedLimitRules: (
        state: IState,
        option: INode<IBranchUI>): boolean => {

        if (!state.lens.nodeTab.lensBranchTreeTask) {

            return false;
        }

        if (!state.lens.nodeTab.lensBranchTreeTask.subtreeLoader) {

            return true;
        }

        const globalBranchFlags: IGlobalBranchFlags = gBranchTreeTaskCode.getGlobalBranchFlags(state);

        if (globalBranchFlags.limit === false) {
            // Then not trying to choose a limit 
            return false;
        }
        else if (globalBranchFlags.limit === true
            && option.ui.branchTaskLimit === true) {
            // Then trying to choose a limit and clicking an already selected limit so return 
            return true;
        }

        if (gBranchTreeTaskCode.parentIsOptionButNotLimit(option) === true) {

            return true;
        }

        if (option.ui.branchTaskOption === true) {

            return true;
        }

        // Is click select active? If not return
        const subtreeLoader: ISubtreeLoader = state.lens.nodeTab.lensBranchTreeTask.subtreeLoader;
        const stageBehaviour: IStageBehaviour = state.lens.nodeTab.stageBehaviour as IStageBehaviour;
        const stage: LensStage = stageBehaviour.getStage();

        if (stage === LensStage.SelectBranchTaskLimit
            && !gBranchTreeTaskCode.hasClickSelectLimit(subtreeLoader)) {

            return true;
        }

        return false;
    },

    parentIsOptionButNotLimit: (option: INode<IBranchUI>): boolean => {

        // Only for use in the branchesView as a rough rule - should check keys in validation
        let parent: INode<IBranchUI> | null = option.parent;

        while (parent) {

            if (parent.ui.branchTaskLimit === true) {
                return true;
            }

            if (parent.ui.branchTaskOption === true) {
                return false;
            }

            parent = parent.parent;
        }

        return true;
    },

    hasErrors: (branchTreeTask: IBranchTreeTask): boolean => {

        return gBranchTreeTaskCode.hasOptionErrors(branchTreeTask)
            || gBranchTreeTaskCode.hasTreeErrors(branchTreeTask);
    },

    hasOptionErrors: (branchTreeTask: IBranchTreeTask): boolean => {

        if (branchTreeTask.socketLoader.errors.length > 0) {
            return true;
        }

        return false;
    },

    validateTabForSelectLimit: (
        state: IState,
        tab: ITabSave,
        stage: LensStage,
        limit: IHole<ISocketLoaderUI> | null): void => {

        // Need to validate keys here too
        if (limit
            && stage === LensStage.SelectBranchTaskLimit
            && U.isNullOrWhiteSpace(limit.key) === false) {

            const found: INode<IBranchUI> | null = gBranchesStateCode.getTreeNodeFromKey(
                state,
                limit.key as string
            );

            const errorMessage = "Key does not match any tree options";
            const errors = limit.errors;

            if (found) {

                gBranchTreeTaskCode.setupLimitAction(
                    found,
                    limit
                );

                limit.ui.recognised = true;
                tab.enableSave = true;

                for (let i = errors.length - 1; i >= 0; i--) {

                    if (errors[i] === errorMessage) {

                        errors.splice(i, 1);
                    }
                }

                return;
            }
            else if (!limit.errors.includes(errorMessage)) {

                limit.errors.push(errorMessage);
            }
        }

        if (limit) {

            limit.ui.recognised = false;
        }

        tab.enableSave = false;

        return;
    },

    validateTabForSelectBranchOption: (
        state: IState,
        tab: ITabSave,
        optionLoader: INodeLoader): void => {

        return gBranchTaskCode.validateTabForSelectBranchOption(
            state,
            tab,
            optionLoader
        );
    },

    hasTreeErrors: (branchTreeTask: IBranchTreeTask): boolean => {

        if (branchTreeTask.subtreeLoader.subtree.tree.errors.length > 0) {
            return true;
        }

        return false;
    },

    hasSubtreeErrors: (branchTreeTask: IBranchTreeTask): boolean => {

        if (branchTreeTask.subtreeLoader.subtree.errors.length > 0) {
            return true;
        }

        return false;
    },

    setOptionError: (
        branchTreeTask: IBranchTreeTask,
        error: string): void => {

        if (!branchTreeTask.socketLoader.errors.includes(error)) {
            branchTreeTask.socketLoader.errors.push(error);
        }
    },

    createBranchTreeTask: (
        state: IState,
        newTreeKey: string,
        currentTreeToken: string,
        parentTreeName: string,
        rootDiscussion: string = ''): IBranchTreeTask => {

        const branchTreeTask: IBranchTreeTask = new BranchTreeTask(
            newTreeKey,
            currentTreeToken);

        branchTreeTask.action = ActionType.ConvertBranchToSubtree;
        branchTreeTask.subtreeLoader.subtree.action = ActionType.CreateSubtree;
        branchTreeTask.subtreeLoader.subtree.tree.action = ActionType.CreateTree;
        branchTreeTask.subtreeLoader.subtree.tree.root.action = ActionType.CreateNode;
        branchTreeTask.subtreeLoader.subtree.tree.root.key = gStateCode.getFreshKey(state);
        branchTreeTask.subtreeLoader.subtree.stRoot.action = ActionType.CreateStRoot;
        branchTreeTask.subtreeLoader.subtree.stRoot.key = gStateCode.getFreshKey(state);
        branchTreeTask.subtreeLoader.ui.allDescendants = false;
        gBranchTreeTaskCode.setDefaultBranchSubtreeProperties(branchTreeTask);

        gBranchTreeTaskCode.setDefaultBranchTreeProperties(
            branchTreeTask,
            parentTreeName,
            rootDiscussion
        );

        return branchTreeTask;
    },

    setDefaultBranchTreeProperties: (
        branchTreeTask: IBranchTreeTask,
        parentTreeName: string,
        rootDiscussion: string): void => {

        const tree: ITreeSys = branchTreeTask.subtreeLoader.subtree.tree;
        tree.action = ActionType.CreateTree;
        tree.name = '';
        tree.description = `Subtree created by converting a branch in the tree: ${parentTreeName}`;
        tree.root.discussion = rootDiscussion;
        tree.tags = '';
    },

    setDefaultBranchSubtreeProperties: (branchTreeTask: IBranchTreeTask): void => {

        const subtree: ISubtreeSys = branchTreeTask.subtreeLoader.subtree;
        subtree.stRoot.text = `StRoot text`;
        subtree.stSockets = [];
    },

    isLensBranchTreeTaskDirty: (state: IState): boolean => {

        if (!state
            || !state.lens.nodeTab.lensBranchTreeTask
            || U.isNullOrWhiteSpace(state.branchesState.tree.token) === true) {

            return false;
        }


        const freshBranchTreeTask: IBranchTreeTask = new BranchTreeTask(
            gStateCode.getFreshKey(state),
            state.branchesState.tree.token as string);

        const branchTreeTask: IBranchTreeTask = state.lens.nodeTab.lensBranchTreeTask as IBranchTreeTask;
        const tree: ITreeBase = branchTreeTask.subtreeLoader.subtree.tree;
        const freshTree: ITreeBase = freshBranchTreeTask.subtreeLoader.subtree.tree;

        return branchTreeTask.socketLoader !== freshBranchTreeTask.socketLoader
            || branchTreeTask.socketLoader.key !== freshBranchTreeTask.socketLoader.key
            || branchTreeTask.socketLoader.token !== freshBranchTreeTask.socketLoader.token
            || tree.name !== freshTree.name
            || tree.title !== freshTree.title
            || tree.description !== freshTree.description
            || tree.tags === freshTree.tags;

        return false;
    },

    clearErrors: (branchTreeTask: IBranchTreeTask): void => {

        branchTreeTask.socketLoader.errors = [];
        branchTreeTask.subtreeLoader.subtree.tree.errors = [];
        branchTreeTask.subtreeLoader.failedAncestors = new FailedAncestors();
        branchTreeTask.subtreeLoader.failedDescendants = new FailedAncestors();

        branchTreeTask.subtreeLoader.subtree.stSockets.forEach((stSocket: IStSocket) => {

            stSocket.errors = [];

            stSocket.holes.forEach((hole: IHole<ISocketLoaderUI>) => {

                hole.errors = [];
            });
        });
    },

    clearBranchTreeTaskOnly: (state: IState): void => {

        gBranchTreeTaskCode.clearLimits(state);
        state.lens.nodeTab.lensBranchTreeTask = null;
    },

    clearBranchTreeTaskExtended: (state: IState): void => {

        gBranchTaskCode.clearBranchTask(state);
        gBranchTreeTaskCode.clearBranchTreeTaskOnly(state);
    },

    clearLimits: (state: IState): void => {

        state.branchesState.registered.forEach((node: INode<IBranchUI>) => {

            if (node.ui.branchTaskLimit === true) {

                node.ui.branchTaskLimit = false;
            }
        });
    },

    forceUnSelectAllLimits: (subtreeLoader: ISubtreeLoader): boolean => {

        let reset = false;

        subtreeLoader.subtree.stSockets.forEach((stSocket: IStSocket) => {

            stSocket.holes.forEach((hole: IHole<ISocketLoaderUI>) => {

                if (hole.ui.forceSet === true) {
                    hole.ui.forceSet = false;
                    reset = true;
                }
            });
        });

        return reset;
    },

    disableLimitClickSelect: (subtreeLoader: ISubtreeLoader): boolean => {

        let reset = false;

        subtreeLoader.subtree.stSockets.forEach((stSocket: IStSocket) => {

            stSocket.holes.forEach((hole: IHole<ISocketLoaderUI>) => {

                if (hole.ui.clickSelect) {
                    hole.ui.clickSelect = false;
                    reset = true;
                }
            });
        });

        return reset;
    },

    hasForceSetLimit: (subtreeLoader: ISubtreeLoader): boolean => {

        const stSockets: Array<IStSocket> = subtreeLoader.subtree.stSockets;
        let holes: Array<IHole<ISocketLoaderUI>>;
        let stSocket: IStSocket;
        let hole: IHole<ISocketLoaderUI>;

        for (let i = 0; i < stSockets.length; i++) {

            stSocket = stSockets[i];
            holes = stSocket.holes;

            for (let j = 0; j < holes.length; j++) {

                hole = holes[j];

                if (hole.ui.forceSet) {
                    return true;
                }
            }
        }

        return false;
    },

    hasClickSelectLimit: (subtreeLoader: ISubtreeLoader): boolean => {

        const stSockets: Array<IStSocket> = subtreeLoader.subtree.stSockets;
        let holes: Array<IHole<ISocketLoaderUI>>;
        let stSocket: IStSocket;
        let hole: IHole<ISocketLoaderUI>;

        for (let i = 0; i < stSockets.length; i++) {

            stSocket = stSockets[i];
            holes = stSocket.holes;

            for (let j = 0; j < holes.length; j++) {

                hole = holes[j];

                if (hole.ui.clickSelect) {
                    return true;
                }
            }
        }

        return false;
    },

    deleteForceSetLimit: (
        _state: IState,
        subtreeLoader: ISubtreeLoader): void => {

        const stSockets: Array<IStSocket> = subtreeLoader.subtree.stSockets;
        let holes: Array<IHole<ISocketLoaderUI>> = [];
        let stSocket: IStSocket;
        let hole: IHole<ISocketLoaderUI>;
        let limitIndex: number = -1;
        let stop: boolean = false;

        for (let i = 0; i < stSockets.length; i++) {

            stSocket = stSockets[i];
            holes = stSocket.holes;

            for (let j = 0; j < holes.length; j++) {

                hole = holes[j];

                if (hole.ui.forceSet) {

                    limitIndex = j;
                    stop = true;

                    break;
                }
            }

            if (stop) {
                break;
            }
        }

        if (limitIndex < 0) {
            return;
        }

        holes.splice(limitIndex, 1);
    },

    getForceSetLimit: (subtreeLoader: ISubtreeLoader): IHole<ISocketLoaderUI> | null => {

        const stSockets: Array<IStSocket> = subtreeLoader.subtree.stSockets;
        let holes: Array<IHole<ISocketLoaderUI>>;
        let stSocket: IStSocket;
        let hole: IHole<ISocketLoaderUI>;

        for (let i = 0; i < stSockets.length; i++) {

            stSocket = stSockets[i];
            holes = stSocket.holes;

            for (let j = 0; j < holes.length; j++) {

                hole = holes[j];

                if (hole.ui.forceSet) {
                    return hole;
                }
            }
        }

        return null;
    },

    getLimitKeys: (subtreeLoader: ISubtreeLoader): Array<string> => {

        const limitKeys: Array<string> = [];

        subtreeLoader.subtree.stSockets.forEach((stSocket: IStSocket) => {

            stSocket.holes.forEach((hole: IHole<ISocketLoaderUI>) => {

                if (U.isPositiveNumeric(hole.key) === true) {

                    limitKeys.push(hole.key as string);
                }
            });
        });

        return limitKeys;
    },

    getForceSetLimitSocket: (subtreeLoader: ISubtreeLoader): IStSocket | null => {

        const stSockets: Array<IStSocket> = subtreeLoader.subtree.stSockets;
        let holes: Array<IHole<ISocketLoaderUI>>;
        let stSocket: IStSocket;
        let hole: IHole<ISocketLoaderUI>;

        for (let i = 0; i < stSockets.length; i++) {

            stSocket = stSockets[i];
            holes = stSocket.holes;

            for (let j = 0; j < holes.length; j++) {

                hole = holes[j];

                if (hole.ui.forceSet) {
                    return stSocket;
                }
            }
        }

        return null;
    },

    forceSelectLimit: (
        subtreeLoader: ISubtreeLoader,
        limit: IHole<ISocketLoaderUI>): void => {

        subtreeLoader.ui.forceSetTree = false;
        subtreeLoader.ui.forceSetSubtree = false;
        subtreeLoader.ui.forceSetLimits = false;
        gBranchTreeTaskCode.forceUnSelectAllLimits(subtreeLoader);
        limit.ui.forceSet = true;
    },

    forceSelectTree: (subtreeLoader: ISubtreeLoader): void => {

        gBranchTreeTaskCode.forceUnSelectAllLimits(subtreeLoader);
        subtreeLoader.ui.forceSetTree = true;
        subtreeLoader.ui.forceSetSubtree = false;
        subtreeLoader.ui.forceSetLimits = false;
    },

    forceSelectSubtree: (subtreeLoader: ISubtreeLoader): void => {

        gBranchTreeTaskCode.forceUnSelectAllLimits(subtreeLoader);
        subtreeLoader.ui.forceSetTree = false;
        subtreeLoader.ui.forceSetSubtree = true;
        subtreeLoader.ui.forceSetLimits = false;
    },

    forceSelectLimits: (subtreeLoader: ISubtreeLoader): void => {

        gBranchTreeTaskCode.forceUnSelectAllLimits(subtreeLoader);
        subtreeLoader.ui.forceSetTree = false;
        subtreeLoader.ui.forceSetSubtree = false;
        subtreeLoader.ui.forceSetLimits = true;
    },

    enableClickSelect: (
        subtreeLoader: ISubtreeLoader,
        limit: IHole<ISocketLoaderUI>): void => {

        gBranchTreeTaskCode.disableLimitClickSelect(subtreeLoader);
        limit.ui.clickSelect = true;
    },

    highlightSelectLimit: (
        state: IState,
        branchTreeTask: IBranchTreeTask): boolean => {

        if (!state
            || !branchTreeTask) {
            return false;
        }

        const stageBehaviour: IStageBehaviour = state.lens.nodeTab.stageBehaviour as IStageBehaviour;
        const stage: LensStage = stageBehaviour.getStage();

        return stage === LensStage.SelectBranchTaskLimit
            && gBranchTreeTaskCode.hasClickSelectLimit(branchTreeTask.subtreeLoader) === true;
    },

    highlightSelectOption: (
        state: IState,
        branchTreeTask: IBranchTreeTask): boolean => {

        if (!state
            || !branchTreeTask) {
            return false;
        }

        const stageBehaviour: IStageBehaviour = state.lens.nodeTab.stageBehaviour as IStageBehaviour;
        const stage: LensStage = stageBehaviour.getStage();

        if (stage === LensStage.SelectBranchTaskLimit) {

            if (branchTreeTask.socketLoader.ui.clickSelect === true
                || gBranchTreeTaskCode.hasClickSelectLimit(branchTreeTask.subtreeLoader)) {

                return false;
            }
        }

        return false;
    },

    setUpOption: (
        state: IState,
        optionLoader: INodeLoader,
        option: INode<IBranchUI>): void => {

        gBranchTaskCode.setUpOption(
            state,
            optionLoader,
            option);

        if (state.lens.nodeTab.lensBranchTreeTask) {

            state.lens.nodeTab.lensBranchTreeTask.subtreeLoader.subtree.tree.root.discussion = option.discussion;
            state.lens.nodeTab.lensBranchTreeTask.subtreeLoader.subtree.tree.root.inputs = option.inputs; // Is this needed or correct?
        }
    },

    setUpLimit: (
        state: IState,
        option: INode<IBranchUI>): IHole<ISocketLoaderUI> | null => {

        if (!state
            || !state.lens.nodeTab.lensBranchTreeTask
            || !option) {

            return null;
        }

        const branchTreeTask: IBranchTreeTask = state.lens.nodeTab.lensBranchTreeTask as IBranchTreeTask;
        const subtreeLoader: ISubtreeLoader = branchTreeTask.subtreeLoader;
        const stSocket: IStSocket | null = gBranchTreeTaskCode.getForceSetLimitSocket(subtreeLoader);

        if (!stSocket) {

            return null;
        }

        let holes: Array<IHole<ISocketLoaderUI>> = stSocket?.holes;
        let hole: IHole<ISocketLoaderUI>;
        let index: number = -1;

        for (let i = 0; i < holes.length; i++) {

            hole = holes[i];

            if (hole.ui.forceSet) {

                index = i;

                break;
            }
        }

        if (index < 0) {

            return null;
        }

        option.ui.branchTaskLimit = true;
        hole = gHoleCode.cloneHole(option);
        holes[index] = hole;

        if (option.nodes.length === 0
            && option.type === NodeType.Discussion) {

            hole.action = ActionType.MapHoleToSocket;
        }
        else {
            hole.action = ActionType.MapLimitToSocket;
        }

        if (stSocket.ui.textFromOption === true) {
            
            stSocket.text = option.option;
        }

        // Don't need to disable clickSelect as replaced the limit that had it set...
        // branchTreeTaskCode.disableLimitClickSelect(branchTreeTask.subtreeLoader);
        // branchTreeTaskCode.clearErrors(branchTreeTask);

        return hole;
    },

    setupLimitAction: (
        option: INode<IBranchUI>,
        hole: IHole<ISocketLoaderUI>): void => {

        if (option.nodes.length === 0
            && option.type === NodeType.Discussion) {

            hole.action = ActionType.MapHoleToSocket;
        }
        else {
            hole.action = ActionType.MapLimitToSocket;
        }
    },

    validateBranchTreeTask: (state: IState): boolean => {

        const branchTreeTask: IBranchTreeTask = state.lens.nodeTab.lensBranchTreeTask as IBranchTreeTask;

        return gBranchTreeTaskCode.validate(
            state,
            branchTreeTask);
    },

    validate: (
        state: IState,
        branchTreeTask: IBranchTreeTask): boolean => {

        gBranchTreeTaskCode.clearErrors(branchTreeTask);
        gBranchTreeTaskCode.validateBranch(branchTreeTask);
        gBranchTreeTaskCode.validateOption(branchTreeTask.socketLoader);

        gHoleCode.validateLimits(
            state,
            branchTreeTask);

        gTreeCode.validateTreeBase(branchTreeTask.subtreeLoader.subtree.tree);

        return gBranchTreeTaskCode.hasErrors(branchTreeTask) === false;
    },

    checkForSubtreeNodeWarnings: (
        state: IState,
        branchTreeTask: IBranchTreeTask): void => {

        // This needs to navigate down from the subtree root and check each descendant
        // It also needs to check each limit

        branchTreeTask.subtreeLoader.warnNodes = [];

        const subtreeRoot: INode<IBranchUI> | null = gBranchesStateCode.getRegisteredNode(
            state,
            state.branchesState.tree.token,
            branchTreeTask.socketLoader.key
        );

        if (!subtreeRoot) {
            return;
        }

        const limitKeys: Array<string> = gBranchTreeTaskCode.getLimitKeys(branchTreeTask.subtreeLoader);

        gBranchTreeTaskCode.checkNodeForWarnings(
            branchTreeTask.subtreeLoader.warnNodes,
            subtreeRoot,
            limitKeys);
    },

    checkNodeForWarnings: (
        warnNodes: Array<INode<IBranchUI>>,
        node: INode<IBranchUI>,
        limitKeys: Array<string>): void => {

        if (!U.isPositiveNumeric(node.key)
            || limitKeys.includes(node.key as string) === true) {

            return;
        }

        const valid: boolean = gBranchTreeTaskCode.validateNodeBranchTreeUI(node);

        if (!valid) {
            warnNodes.push(node);
        }

        node.nodes.forEach((option: INode<IBranchUI>) => {

            gBranchTreeTaskCode.checkNodeForWarnings(
                warnNodes,
                option,
                limitKeys);
        });
    },

    validateNodeBranchTreeUI: (node: INode<IBranchUI>): boolean => {

        let success: boolean = gNodeCode.validateNodeBranchUI(node);

        // For branch tree validation ignore the node.isSocket === false
        // filter in nodeCode.validateNodeBase(node) isSocket for the parent 
        // is irrelavant for this new subtree
        if (U.isNullOrWhiteSpace(node.discussion) === true) {

            if (node.type === NodeType.Discussion
                || node.isRoot === true
                || node.isLink === true) {

                success = false;

                gNodeCode.setError(
                    node,
                    `Discussion cannot be empty unless it is marked as a limit.`
                );
            }
            else if (node.type === NodeType.Solution) {

                success = false;

                gNodeCode.setError(
                    node,
                    `Solution cannot be empty unless it is marked as a limit.`
                );
            }
            else {

                success = false;

                gNodeCode.setError(
                    node,
                    `Not a solution, discussion or root. Was: ${node.type}. Need to fix this... `
                );
            }
        }

        return success;
    },

    setError: (
        optionLoader: INodeLoader,
        error: string): void => {

        if (!optionLoader.errors.includes(error)) {
            optionLoader.errors.push(error);
        }
    },

    validateOption: (optionLoader: INodeLoader): boolean => {

        let success = true;

        if (!optionLoader.node) {

            return success;
        }

        const option: INodeBase = optionLoader.node;

        if (option.isRoot === true) {

            gBranchTreeTaskCode.setError(
                optionLoader,
                `Option cannot be a root. `
            );

            success = false;
        }
        else if (option.isPlug === true) {

            gBranchTreeTaskCode.setError(
                optionLoader,
                `Option cannot be a plug. `
            );

            success = false;
        }

        return success;
    },

    validateBranch: (branchTreeTask: IBranchTreeTask): void => {

        if (U.isNullOrWhiteSpace(branchTreeTask.socketLoader.key) === true) {

            gBranchTreeTaskCode.setError(
                branchTreeTask.socketLoader,
                `OptionKey cannot be empty. `
            );
        }

        if (U.isNullOrWhiteSpace(branchTreeTask.socketLoader.token) === true) {

            gBranchTreeTaskCode.setError(
                branchTreeTask.socketLoader,
                `OptionToken cannot be empty. `
            );
        }
    },

    clearAndValidateLimits: (
        state: IState,
        branchTreeTask: IBranchTreeTask): boolean => {

        gBranchTreeTaskCode.clearErrors(branchTreeTask);

        return gHoleCode.validateLimits(
            state,
            branchTreeTask);
    },

    getBranchTreeRequestBody: (
        state: IState,
        branchTreeTask: IBranchTreeTask): { body: any, callID: string } => {

        const subtree: ISubtreeSys = branchTreeTask.subtreeLoader.subtree as ISubtreeSys;
        const tree: ITreeSys = subtree.tree as ITreeSys;
        const treeKey = tree.key as string;

        const callID: string = gTreesStateCode.registerTreeDataRequest(
            'Branch to subtree',
            state,
            treeKey,
            branchTreeTask.action
        );

        const body: any = {
            optionKey: branchTreeTask.socketLoader.key,
            optionToken: branchTreeTask.socketLoader.token,
            action: branchTreeTask.action,
            subtree: gSubtreeCode.getSubtreeWithNewTreeForBody(subtree)
        };

        return {
            body,
            callID
        }
    },

    validateTabForLimits: (
        state: IState,
        tab: ITabSave,
        branchTreeTask: IBranchTreeTask): void => {

        const successfulValidation: boolean = gBranchTreeTaskCode.clearAndValidateLimits(
            state,
            branchTreeTask);

        tab.enableSave = branchTreeTask.subtreeLoader.ui.allDescendants;

        if (!tab.enableSave) {

            tab.enableSave = successfulValidation;
        }
    },

    getGlobalBranchFlags: (state: IState): IGlobalBranchFlags => {

        const globalBranchFlags: IGlobalBranchFlags = new GlobalBranchFlags();
        const branchTreeTask: IBranchTreeTask | null = state.lens.nodeTab.lensBranchTreeTask;

        if (branchTreeTask) {

            globalBranchFlags.option = gBranchTaskCode.highlightSelectOption(state, branchTreeTask.socketLoader);
            globalBranchFlags.limit = gBranchTreeTaskCode.highlightSelectLimit(state, branchTreeTask);
        }

        return globalBranchFlags;
    }
};

export default gBranchTreeTaskCode;