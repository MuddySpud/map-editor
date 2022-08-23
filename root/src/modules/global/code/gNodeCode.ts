import INode from "../../interfaces/state/tree/INode";
import IBranchUI from "../../interfaces/state/ui/UIs/IBranchUI";
import gNodeTypeCode from "./gNodeTypeCode";
import BranchUI from "../../state/ui/UIs/BranchUI";
import Node from "../../state/tree/Node";
import INodeBase from "../../interfaces/state/tree/INodeBase";
import { ActionType } from "../../interfaces/enums/ActionType";
import { NodeType } from "../../interfaces/enums/NodeType";
import gOptionCode from "./gOptionCode";
import ISubtreeSys from "../../interfaces/state/tree/ISubtreeSys";
import gSubtreeCode from "./gSubtreeCode";
import U from "../gUtilities";
import gNodeCaseCode from "./gNodeCaseCode";
import LensUI from "../../state/ui/UIs/LensUI";
import ILensUI from "../../interfaces/state/ui/UIs/ILensUI";
import NodeCase from "../../state/tree/NodeCase";
import ReloadedNodeResult from "../../state/tree/ReloadedNodeResult";
import IReloadedNodeResult from "../../interfaces/state/tree/IReloadedNodeResult";
import IState from "../../interfaces/state/IState";
import gBranchesStateCode from "./gBranchesStateCode";
import NodeBase from "../../state/tree/NodeBase";
import gTreesStateCode from "./gTreesStateCode";
import gStSocketCode from "./gStSocketCode";
import INodeKeyValidation from "../../interfaces/state/ui/INodeKeyValidation";
import IStSocket from "../../interfaces/state/tree/IStSocket";
import ICacheFile from "../../interfaces/state/tree/ICacheFile";
import gFileCode from "./gFileCode";
import gReserveCode from "./gReserveCode";
import gLooperCode from "./gLooperCode";


const gNodeCode = {

    getRefreshNodeTreeStatsRequestBody: (state: IState): { body: any, callID: string, callChain: Array<string>, success: boolean } => {

        const treeKey: string = state.lens.nodeTab.lensNode?.link?.tree.key as string;

        const callID: string = gTreesStateCode.registerTreeDataRequest(
            'Refresh node tree stats',
            state,
            treeKey,
            ActionType.RefreshTreeStats
        );

        const body: any = {
            key: treeKey,
            action: ActionType.RefreshTreeStats
        };

        return {
            body,
            callID,
            callChain: [],
            success: true
        };
    },

    getRefreshNodeRequestBody: (
        state: IState,
        nodeKey: string): { body: any, callID: string } => {

        const callID: string = gTreesStateCode.registerNodeDataRequest(
            'Refresh node',
            state,
            state.branchesState.tree.key as string,
            ActionType.RefreshNode,
            nodeKey
        );

        const body: any = {

            key: nodeKey,
            token: state.branchesState.tree.token,
            action: ActionType.RefreshNode
        };

        return {
            body,
            callID
        };
    },

    getNodeForOptionsRequestBody: (
        state: IState,
        nodeKey: string): { body: any, callID: string } => {

        const callID: string = gTreesStateCode.registerNodeDataRequest(
            'Get options',
            state,
            state.branchesState.tree.key as string,
            ActionType.GetOptions,
            nodeKey
        );

        const body: any = {

            key: nodeKey,
            token: state.branchesState.tree.token,
            action: ActionType.GetOptions,
        };

        return {
            body,
            callID
        };
    },

    getLoadNodeOptionsAndParentRequestBody: (
        state: IState,
        nodeKey: string): { body: any, callID: string } => {

        const callID: string = gTreesStateCode.registerNodeDataRequest(
            'Get options and parent',
            state,
            state.branchesState.tree.key as string,
            ActionType.GetOptionsAndParent,
            nodeKey
        );

        const body: any = {

            key: nodeKey,
            token: state.branchesState.tree.token,
            action: ActionType.GetOptionsAndParent
        };

        return {
            body,
            callID
        };
    },

    hasNoExistingOptions(node: INodeBase): boolean {

        if (node.nodes.length === 0) {

            return true;
        }

        const options: Array<INodeBase> = node.nodes;

        for (let i = 0; i < options.length; i++) {

            if (options[i].action !== ActionType.CreatePlug) {

                return false;
            }
        }

        return true;
    },

    getNodeForPost: (
        state: IState,
        input: INodeBase): { body: any, callID: string } => {

        const buildRawNode = (node: INodeBase): INodeBase => {

            let rawNode: any = {
                key: node.key,
                r: node.r,
                option: node.option,
                discussion: node.discussion,
                inputs: node.inputs,
                type: node.type.toString(),
                token: node.token,
                order: node.order,
                action: node.action.toString(),
            };

            if (node.bin) {

                rawNode.bin = JSON.parse(JSON.stringify(node.bin))
            }

            if (node.isEntry === true) {

                rawNode.isEntry = true;
            }

            if (node.isParentRoot === true) {

                rawNode.isParentRoot = true;
            }

            if (node.isHidden === true) {

                rawNode.isHidden = true;
            }

            if (node.looper.isLoopHole === true) {

                rawNode.isLoopHole = true;
            }

            if (node.looper.isLoopRoot === true) {

                rawNode.isLoopRoot = true;
            }

            if (!U.isNullOrWhiteSpace(node.looper.loopRepeatText)) {

                rawNode.loopRepeatText = node.looper.loopRepeatText;
            }

            if (node.isParentSilentRoot === true) {

                rawNode.isParentSilentRoot = true;
            }

            if (node.isSocket === true) {

                rawNode.isSocket = true;
            }

            if (node.isStash === true) {

                rawNode.isStash = true;
            }

            if (node.isStashRoot === true) {

                rawNode.isStashRoot = true;
            }

            if (node.isRoot === true) {

                rawNode.isRoot = true;
            }

            if (node.isSilentRoot === true) {

                rawNode.isSilentRoot = true;
            }

            if (node.isPlug === true) {

                rawNode.isPlug = true;
            }

            if (node.isLink === true) {

                rawNode.isLink = true;
            }

            if (node.link) {

                rawNode.stRootKey = node.link.stRoot.key;
            }

            if (node.plug) {

                rawNode.stSocketKey = node.plug.key;
            }

            if (node.reserve
                && node.reserve.wayPoint) {

                rawNode.reserve = {};
                rawNode.reserve.wayPoint = {};
                rawNode.reserve.wayPoint.title = node.reserve.wayPoint.title;

                if (!U.isNullOrWhiteSpace(node.reserve.wayPoint.description)) {

                    rawNode.reserve.wayPoint.description = node.reserve.wayPoint.description;
                }
            }

            if (node.files.length > 0) {

                buildRawFiles(
                    rawNode,
                    node.files
                );
            }

            return rawNode;
        };

        const buildRawFiles = (
            rawNode: any,
            files: Array<ICacheFile>) => {

            // Whatever files are attached to this node in the database are removed if they aren't in this collection.
            // It needs to be fully populated on every save

            const rawFiles: any[] = [];
            let rawFile: any = null;
            let file: ICacheFile;

            for (let i = 0; i < files.length; i++) {

                file = files[i];

                rawFile = {
                    id: file.id,
                    r: file.r,
                    fileID: file.fileID,
                    fileName: file.fileName,
                    action: file.action,
                };

                rawFiles.push(rawFile);
            }

            rawNode.files = rawFiles;
        };

        const buildRawOptions = (rawNode: any): void => {

            const options: Array<INodeBase> = input.nodes;
            const rawOptions: any[] = [];

            if (options
                && options.length > 0) {

                let rawOption = null;
                let option = null;

                for (let i = 0; i < options.length; i++) {

                    option = options[i];

                    if ((option.action === ActionType.DeleteNode
                        || option.action === ActionType.DeletePlug)
                        && U.isNegativeNumeric(option.key) === true) {
                        continue;
                    }

                    rawOption = buildRawNode(options[i]);
                    rawOptions.push(rawOption);
                }
            }

            rawNode.nodes = rawOptions;
        };

        const body: any = buildRawNode(input);
        buildRawOptions(body);

        const callID: string = gTreesStateCode.registerNodeDataRequest(
            'Save node and options',
            state,
            state.branchesState.tree.key as string,
            input.action,
            input.key as string
        );

        return {
            body,
            callID
        };
    },

    getSubtreeAndLinkNodeForPost: (
        state: IState,
        input: INodeBase): { body: any, callID: string } => {

        const rawNode: any = gNodeCode.getNodeForPost(
            state,
            input);

        const inputSubtree: ISubtreeSys = input.link as ISubtreeSys;
        const subtree: any = gSubtreeCode.getSubtreeWithNewTreeForBody(inputSubtree);

        const callID: string = gTreesStateCode.registerNodeDataRequest(
            'Create subtree and link to node',
            state,
            state.branchesState.tree.key as string,
            inputSubtree.action,
            input.key as string
        );

        const body: any = {
            node: rawNode,
            subtree: subtree,
            action: inputSubtree.action
        };

        return {
            body,
            callID
        };
    },

    isNodeKeyValid: (
        state: IState,
        token: string,
        key: string): Array<string> => {

        if (!state
            || U.isNullOrWhiteSpace(token) === true
            || U.isNullOrWhiteSpace(key) === true) {

            return [];
        }

        const nodeKeyValidation: INodeKeyValidation = state.lens.validationResults.nodeKey;

        if (nodeKeyValidation.token === token
            && nodeKeyValidation.key === key
            && nodeKeyValidation.success === false) {

            return [`The node key does not exist`];
        }

        return [];
    },

    nodeOrderCompare: (
        node1: INodeBase,
        node2: INodeBase): number => {

        if (node1.order < node2.order) {

            return -1;
        }
        if (node1.order > node2.order) {

            return 1;
        }

        return 0;
    },

    cloneNodeAndParentAndOptions: (node: INodeBase): INode<IBranchUI> => {

        const output: INode<IBranchUI> = gNodeCode.shallowCloneNode(
            BranchUI,
            node);

        output.nodes = gNodeCode.cloneNodeOptionsForUI(
            BranchUI,
            node,
            output);

        output.case = gNodeCaseCode.cloneCase(node);

        if (node.parent) {

            output.parent = gNodeCode.shallowCloneNode(
                BranchUI,
                node.parent);
        }

        return output;
    },

    cloneNodeAndParentAndOptionsForLens: (node: INodeBase): INode<LensUI> => {

        const output: INode<LensUI> = gNodeCode.shallowCloneNode(
            LensUI,
            node);

        output.nodes = gNodeCode.cloneNodeOptionsForUI(
            LensUI,
            node,
            output);

        output.case = gNodeCaseCode.cloneCase(node);

        if (node.parent) {

            output.parent = gNodeCode.shallowCloneNode(
                LensUI,
                node.parent);
        }

        return output;
    },

    cloneNodeAndOptions: (
        node: INodeBase,
        cloneLink: boolean = true): INodeBase => {

        const output: INodeBase = gNodeCode.cloneNodeBase(
            node,
            cloneLink);

        output.nodes = gNodeCode.cloneNodeOptions(
            node,
            output,
            cloneLink);

        return output;
    },

    cloneNodeOptions: (
        nodeToCopy: INodeBase,
        parent: INodeBase,
        cloneLink: boolean = true): Array<INodeBase> => {

        let option: INodeBase;
        let clone: INodeBase;
        const clones: Array<INodeBase> = [];

        // Options should have been sorted when loaded - so don't need to do it again...
        for (let i = 0; i < nodeToCopy.nodes.length; i++) {

            option = nodeToCopy.nodes[i];

            clone = gNodeCode.cloneNodeBase(
                option,
                cloneLink);

            clone.parent = parent;
            // there is a bug elsewhere that sets order to i, 
            // When that is fixed can remove the line below...
            // clone.order = i + 1;
            clones.push(clone);
        }

        return clones;
    },

    cloneNodeOptionsForUI: <T>(
        TCreator: { new(): T; },
        nodeToCopy: INodeBase,
        parent: INode<T>,
        cloneLink: boolean = true): Array<INode<T>> => {

        let option: INodeBase;
        let clone: INode<T>;
        const clones: Array<INode<T>> = [];

        // Options should have beeb sorted when loaded - so don't need to do it again...
        for (let i = 0; i < nodeToCopy.nodes.length; i++) {

            option = nodeToCopy.nodes[i];

            clone = gNodeCode.shallowCloneNode(
                TCreator,
                option,
                cloneLink);

            clone.parent = parent;
            // there is a bug elsewhere that sets order to i, 
            // When that is fixed can remove the line below...
            // clone.order = i + 1;
            clones.push(clone);
        }

        return clones;
    },

    shallowCloneNode: <T>(
        TCreator: { new(): T; },
        inputNode: INodeBase,
        cloneLink: boolean = true): INode<T> => {

        const output: INodeBase = gNodeCode.cloneNodeBase(
            inputNode,
            cloneLink
        );

        const castOutput: INode<T> = output as INode<T>;
        castOutput.ui = new TCreator();

        return castOutput;
    },

    cloneNodeBase: (
        inputNode: INodeBase,
        cloneLink: boolean = true): INodeBase => {

        const output: INodeBase = new NodeBase();
        output.action = inputNode.action;
        output.key = inputNode.key;
        output.r = inputNode.r;
        output.option = inputNode.option;
        output.discussion = inputNode.discussion;
        output.inputs = inputNode.inputs;
        output.type = inputNode.type;
        output.token = inputNode.token;
        output.order = inputNode.order;
        output.isVirtual = inputNode.isVirtual;
        output.isHidden = inputNode.isHidden;
        output.isEntry = inputNode.isEntry;
        output.isStash = inputNode.isStash;
        output.isStashRoot = inputNode.isStashRoot;
        output.isRoot = inputNode.isRoot;
        output.isSilentRoot = inputNode.isSilentRoot;
        output.isParentRoot = inputNode.isParentRoot;
        output.isHidden = inputNode.isHidden;
        output.isParentSilentRoot = inputNode.isParentSilentRoot;
        output.isSocket = inputNode.isSocket;
        output.isPlug = inputNode.isPlug;
        output.isLink = inputNode.isLink;
        output.files = gFileCode.cloneFiles(inputNode.files);
        output.looper = gLooperCode.cloneLooper(inputNode.looper);

        output.reserve = JSON.parse(JSON.stringify(inputNode.reserve));

        if (inputNode.bin) {

            output.bin = JSON.parse(JSON.stringify(inputNode.bin));
        }

        if (cloneLink === true) {

            output.link = gSubtreeCode.cloneSubtree(inputNode.link);
            output.plug = gStSocketCode.cloneSocket(inputNode.plug);
        }

        return output;
    },

    checkNodeIDsMatch: (
        node: INodeBase | null | undefined,
        rawNode: any): boolean => {

        if (!node
            || !rawNode) {

            return false;
        }

        if (node.key === rawNode.key
            && node.token === rawNode.token) {

            return true;
        }

        return false;
    },

    validateNodeBase: (node: INodeBase): boolean => {

        if (node.action === ActionType.DeleteNode
            || node.isHidden === true) {
            // Don't need to validate anything for a delete.
            return true;
        }

        gNodeCode.clearErrors(node);

        if (U.isNullOrWhiteSpace(node.discussion) === true
            && node.isSocket === false) {

            if (node.type === NodeType.Discussion
                || node.isRoot === true
                || node.isLink === true) {

                gNodeCode.setError(
                    node,
                    `Discussion cannot be empty. `
                );
            }
            else if (node.type === NodeType.Solution) {

                gNodeCode.setError(
                    node,
                    `Solution cannot be empty. `
                );
            }
            else {
                gNodeCode.setError(
                    node,
                    `Not a solution, discussion or root. Was: ${node.type}. Need to fix this... `
                );
            }
        }

        if (!node.isRoot
            && node.isSilentRoot === true) {

            gNodeCode.setError(
                node,
                `Only a root can be silent. Node: ${node}. Need to fix this... `
            );
        }

        if (U.isNullOrWhiteSpace(node.option) === true) {

            gNodeCode.setError(
                node,
                `Option cannot be empty. `
            );
        }

        if (U.isNullOrWhiteSpace(node.key) === true) {

            gNodeCode.setError(
                node,
                `Key cannot be empty. `
            );
        }

        if (U.isNullOrWhiteSpace(node.token) === true) {

            gNodeCode.setError(
                node,
                `Token cannot be empty. `
            );
        }

        if (node.order < 1) {

            gNodeCode.setError(
                node,
                `Order cannot be less than 1.`
            );
        }

        if (node.type !== NodeType.Discussion
            && node.type !== NodeType.Solution
            && !node.isRoot !== true) {

            gNodeCode.setError(
                node,
                `Cannot have a type of ${node.type}.`
            );
        }

        let success = node.errors.length === 0;

        if (node.reserve.wayPoint) {

            if (U.isNullOrWhiteSpace(node.reserve.wayPoint.title)) {

                const error = "A wayPoint cannot have a blank title.";

                if (!node.reserve.wayPoint.errors.includes(error)) {

                    node.reserve.wayPoint.errors.push(error);
                    success = false;
                }
            }
        }

        let option: INodeBase;
        let distinctOptions: any = {};
        let length: number = node.nodes.length;
        let order: number = 0;

        for (let i = 0; i < length; i++) {

            option = node.nodes[i];

            if (option.isHidden === true) {
                continue;
            }

            if (option.action !== ActionType.DeleteNode
                && option.action !== ActionType.DeletePlug) {

                option.order = ++order;
            }

            success = gOptionCode.validateOption(
                option,
                length
            ) && success;

            if (option.action === ActionType.DeleteNode
                || option.action === ActionType.DeletePlug) {
                continue;
            }

            if (node.isSilentRoot === true
                && !option.isParentSilentRoot) {

                success = false;

                gNodeCode.setError(
                    option,
                    "Option not marked as isParentSilentRoot when the node is marked as isSIlentRoot.");
            }
            else if (!node.isSilentRoot
                && option.isParentSilentRoot === true) {

                success = false;

                gNodeCode.setError(
                    option,
                    "Option is marked as isParentSilentRoot when the node is not marked as isSIlentRoot.");
            }

            // Check that the options are unique for this node
            if (distinctOptions[option.option] === true) {

                distinctOptions[option.option] = false;
            }
            else if (distinctOptions[option.option] == null) {
                distinctOptions[option.option] = true;
            }
        }

        for (let i = 0; i < length; i++) {

            option = node.nodes[i];

            if (!option.isHidden
                && distinctOptions[option.option] === false) {

                success = false;

                gNodeCode.setError(
                    option,
                    "Duplicate option.");
            }
        }

        success = success
            && window.TreeSolve.discussionPlugins.validate(node);

        success = success
            && window.TreeSolve.optionsPlugins.validate(node);


        return success;
    },

    validateNodeBranchUI: (node: INode<IBranchUI>): boolean => {

        let success: boolean = true;

        if (node.type === NodeType.Discussion
            && node.nodes.length === 0
            && U.isNullOrWhiteSpace(node.discussion) === false
            && node.ui.loaded === true) {

            success = false;

            gNodeCode.setError(
                node,
                `A discussion must have at least one option. `
            );
        }

        return success
            && gNodeCode.validateNodeBase(node);
    },

    validateNodeLensUI: (
        _state: IState,
        node: INode<ILensUI>): boolean => {

        let success: boolean = true;

        if (node.type === NodeType.Discussion
            && !node.isLink
            && U.isNullOrWhiteSpace(node.discussion) === false) {

            if (node.nodes.length === 0) {

                success = false;

                gNodeCode.setError(
                    node,
                    `A discussion must have at least one option. `
                );
            }
            else {

                let optionsAllDeleted = true;

                for (let i = 0; i < node.nodes.length; i++) {

                    if (node.nodes[i].action !== ActionType.DeleteNode) {

                        optionsAllDeleted = false;

                        break;
                    }
                }

                if (optionsAllDeleted) {

                    success = false;

                    gNodeCode.setError(
                        node,
                        `A discussion must have at least one option not marked for deletion. `
                    );
                }
            }
        }

        return success
            && gNodeCode.validateNodeBase(node);
    },

    validateRoot: (node: INodeBase): boolean => {

        let success: boolean = true;

        if (node.type === NodeType.Discussion
            && node.nodes.length === 0
            && U.isNullOrWhiteSpace(node.discussion) === false) {

            success = false;

            gNodeCode.setError(
                node,
                `The root must have at least one option. `
            );
        }

        return success
            && gNodeCode.validateNodeBase(node);
    },

    setError: (
        node: INodeBase,
        error: string): void => {

        if (!node.errors.includes(error)) {

            node.errors.push(error);
        }
    },

    clearErrors: (node: INodeBase): void => {

        node.errors = [];

        if (node.reserve.wayPoint) {

            node.reserve.wayPoint.errors = [];
        }
    },

    setNodeAndChildrenAsDelete: (
        state: IState,
        node: INode<ILensUI>): void => {

        // delete is just removing the text from discussion
        // node.discussion = "";
        node.action = ActionType.DeleteNode;
        node.discussion = "";
        node.type = NodeType.Discussion;
        node.isLink = false;
        node.inputs = "";
        node.isSocket = false;
        node.isEntry = false;

        window.TreeSolve.discussionPlugins.cleanUpForDeleteNode(
            state,
            node
        );

        node.nodes.forEach(n => {

            n.action = ActionType.DeleteNode;
        });
    },

    checkNodesAndSetActions: (
        newNode: INodeBase,
        oldNode: INodeBase): boolean => {

        let noChanges: boolean = true;

        const checkNodePropertiesForMatch = (
            newie: INodeBase,
            oldie: INodeBase): boolean => {

            if (newie.action === ActionType.DeleteNode) {

                return false;
            }

            // Don't check parents
            let match = newie.key === oldie.key
                && newie.r === oldie.r
                && newie.discussion === oldie.discussion
                && newie.inputs === oldie.inputs
                && newie.isEntry === oldie.isEntry
                && newie.isSocket === oldie.isSocket
                && newie.isPlug === oldie.isPlug
                && newie.isLink === oldie.isLink
                && newie.option === oldie.option
                && newie.order === oldie.order
                && newie.isParentRoot === oldie.isParentRoot
                && newie.isHidden === oldie.isHidden
                && newie.token === oldie.token
                && newie.type === oldie.type
                && gLooperCode.checkLoopersMatch(newie.looper, oldie.looper);


            const optionPluginsNotChanged = window.TreeSolve.optionsPlugins.checkForNoChanges(newie);
            match = match && optionPluginsNotChanged;
            noChanges = noChanges && match;

            return match;
        };

        const isNewNode = (
            newie: INodeBase,
            _oldie: INodeBase): boolean => {

            if (U.isNegativeNumeric(newie.key) === true) {

                newie.action = ActionType.CreateNode;
                noChanges = false;

                return true;
            }

            return false;
        };

        const setNodeAction = (
            newie: INodeBase,
            oldie: INodeBase): void => {

            if (isNewNode(newie, oldie) === true) {
                return;
            }

            if (checkNodePropertiesForMatch(newie, oldie) === false
                && newie.action !== ActionType.UpdateSubtreeLink
                && newie.action !== ActionType.CreateSubtreeLink
                && newie.action !== ActionType.CreateSubtreeAndLink) {

                newie.action = ActionType.UpdateNode;
            }
        };

        const checkChildrenForChanges = (): void => {

            noChanges = noChanges
                && newNode.nodes.length === oldNode.nodes.length;

            let newOptions: Array<INodeBase> = newNode.nodes;
            let oldOptions: Array<INodeBase> = oldNode.nodes;
            let newOption: INodeBase;
            let oldOption: INodeBase | null | undefined;

            for (let i = 0; i < newOptions.length; i++) {

                newOption = newOptions[i];

                if (newOption.action === ActionType.DeleteNode) {

                    noChanges = false;

                    continue;
                }

                oldOption = oldOptions.find((o: INodeBase) => {

                    return o.key === newOption.key;
                });

                if (!oldOption) {

                    if (newOption.action !== ActionType.CreatePlug) {

                        newOption.action = ActionType.CreateNode;
                    }

                    noChanges = false;
                }
                else {
                    setNodeAction(newOption, oldOption);
                }
            }
        };

        setNodeAction(newNode, oldNode);
        checkChildrenForChanges();

        // Are the nodes the same
        return noChanges === true;
    },

    checkNodesMatch: (
        node1: INodeBase,
        node2: INodeBase): boolean => {

        const checkNodePropertiesForMatch = (
            nodeA: INodeBase,
            nodeB: INodeBase): boolean => {

            // Don't check parents
            if (nodeA.key !== nodeB.key
                || nodeA.r !== nodeB.r
                || nodeA.discussion !== nodeB.discussion
                || nodeA.inputs !== nodeB.inputs
                || nodeA.isEntry !== nodeB.isEntry
                || nodeA.isSocket !== nodeB.isSocket
                || nodeA.isPlug !== nodeB.isPlug
                || nodeA.isLink !== nodeB.isLink
                || nodeA.option !== nodeB.option
                || nodeA.order !== nodeB.order
                || nodeA.isParentRoot !== nodeB.isParentRoot
                || nodeA.isHidden !== nodeB.isHidden
                || nodeA.token !== nodeB.token
                || nodeA.type !== nodeB.type
                || !gLooperCode.checkLoopersMatch(nodeA.looper, nodeB.looper)) {

                return false;
            }

            if (nodeA.reserve.wayPoint
                && !nodeB.reserve.wayPoint) {

                return false;
            }
            else if (!nodeA.reserve.wayPoint
                && nodeB.reserve.wayPoint) {

                return false;
            }

            if (nodeA.reserve.wayPoint
                && nodeB.reserve.wayPoint) {

                if (nodeA.reserve.wayPoint.title !== nodeB.reserve.wayPoint.title
                    || nodeA.reserve.wayPoint.description !== nodeB.reserve.wayPoint.description) {

                    return false;
                }
            }

            return checkLinkPropertiesForMatch(
                nodeA.link,
                nodeB.link);
        };

        const checkLinkPropertiesForMatch = (
            linkA: ISubtreeSys | null,
            linkB: ISubtreeSys | null): boolean => {

            if (!linkA && !linkB) {

                return true;
            }

            if ((linkA && !linkB)
                || (!linkA && linkB)) {

                return false;
            }

            const linkAA: ISubtreeSys = linkA as ISubtreeSys;
            const linkBB: ISubtreeSys = linkB as ISubtreeSys;

            if ((linkAA.tree && !linkBB.tree)
                || (!linkAA.tree && linkBB.tree)
                || (linkAA.tree.root && !linkBB.tree.root)
                || (!linkAA.tree.root && linkBB.tree.root)
                || (linkAA.stRoot && !linkBB.stRoot)
                || (!linkAA.stRoot && linkBB.stRoot)
                || (linkAA.stSockets && !linkBB.stSockets)
                || (!linkAA.stSockets && linkBB.stSockets)
                || (linkAA.stSockets.length !== linkBB.stSockets.length)) {

                return false;
            }

            if (linkAA.tree.key !== linkBB.tree.key
                || linkAA.tree.created !== linkBB.tree.created
                || linkAA.tree.description !== linkBB.tree.description
                || linkAA.tree.name !== linkBB.tree.name
                || linkAA.tree.title !== linkBB.tree.title
                || linkAA.tree.owner !== linkBB.tree.owner
                || linkAA.tree.token !== linkBB.tree.token
                || linkAA.tree.created !== linkBB.tree.created
                || linkAA.tree.tags !== linkBB.tree.tags) {

                return false;
            }

            if (!checkNodePropertiesForMatch(
                linkAA.tree.root,
                linkBB.tree.root)) {

                return false;
            }

            if (linkAA.stRoot.key !== linkBB.stRoot.key) {

                return false;
            }

            const socketsAA = linkAA.stSockets;
            const socketsBB = linkAA.stSockets;
            const socketsLength = linkAA.stSockets.length;

            for (let i = 0; i < socketsLength; i++) {

                if (!checkSocketPropertiesForMatch(
                    socketsAA[i],
                    socketsBB[i])) {

                    return false;
                }
            }

            return true;
        };

        const checkSocketPropertiesForMatch = (
            socketA: IStSocket,
            socketB: IStSocket): boolean => {

            // Don't check parents
            if (socketA.key !== socketB.key
                || socketA.text !== socketB.text) {

                return false;
            }

            if (socketA.key !== socketB.key) {

                return false;
            }

            return true;
        };

        const isSingleBlankOption = (): boolean => {

            let option: INodeBase;

            if (node1.nodes.length === 1
                && node2.nodes.length === 0) {

                option = node1.nodes[0];
            }
            else if (node1.nodes.length === 0
                && node2.nodes.length === 1) {

                option = node1.nodes[0];
            }
            else {
                return false;
            }

            // If one node has zero options and the other node has a single option.
            // check to see if the option is blank

            return gOptionCode.isBlankOption(option);
        };

        const checkChildrenForChanges = (): boolean => {

            if (node1.nodes.length !== node2.nodes.length) {

                if (isSingleBlankOption()) {
                    return true;
                }

                return false;
            }

            let optionAs: Array<INodeBase> = node1.nodes;
            let optionBs: Array<INodeBase> = node2.nodes;
            let optionA: INodeBase;
            let optionB: INodeBase | null | undefined;

            for (let i = 0; i < optionAs.length; i++) {

                optionA = optionAs[i];

                optionB = optionBs.find((o: INodeBase) => {
                    return o.key === optionA.key;
                });

                if (!optionB) {
                    return false;
                }

                if (!checkNodePropertiesForMatch(optionA, optionB)) {
                    return false;
                }

                // If one option is marked as deleted and other not so marked
                if (optionA.action !== optionB.action
                    && (optionA.action === ActionType.DeleteNode
                        || optionB.action === ActionType.DeleteNode)) {
                    return false;
                }
            }

            return true;
        };

        if (!checkNodePropertiesForMatch(node1, node2)) {

            return false;
        }

        if (!checkChildrenForChanges()) {

            return false;
        }

        return true;
    },

    reLoadNode: (
        node: INode<IBranchUI>,
        rawNode: any): IReloadedNodeResult => {

        gNodeCode.reLoadNodeShallow(node, rawNode);
        const newRawOptions: any[] = gOptionCode.reLoadOptions(node, rawNode);
        const deletedOptions: Array<INodeBase> = gNodeCode.removeDeletedChildren(node, rawNode);

        return new ReloadedNodeResult(
            newRawOptions,
            deletedOptions
        );
    },

    loadNode: (rawNode: any): INode<IBranchUI> | null => {

        let node: INode<IBranchUI> | null = gNodeCode.loadNodeShallow(rawNode);

        if (node) {

            node.nodes = gOptionCode.loadOptions(
                rawNode.nodes,
                node);

            node.nodes.sort(gNodeCode.nodeOrderCompare);
        }

        return node;
    },

    removeDeletedChildren: (
        node: INodeBase,
        rawNode: any): Array<INodeBase> => {

        if (!rawNode.nodes) {
            // Then no information sent from database for this...
            return [];
        }

        const rawOptions = rawNode.nodes;
        const options: Array<INodeBase> = node.nodes;
        let option: INodeBase;
        let rawOption: any = null;
        let spliced: Array<INodeBase> = [];
        const deleted: Array<INodeBase> = [];

        for (let i = options.length - 1; i >= 0; i--) {

            option = options[i];

            rawOption = rawOptions.find((ro: any) => {
                return ro.key === option.key;
            });

            if (!rawOption) {
                spliced = options.splice(i, 1);
                deleted.push(...spliced);
            }
        }

        return deleted;
    },

    loadNodeShallow: (rawNode: any): INode<IBranchUI> | null => {

        if (!rawNode) {
            return null;
        }

        let node: INode<IBranchUI> = new Node<IBranchUI>(BranchUI);

        node.key = rawNode.key;
        node.token = rawNode.token;

        gNodeCode.reLoadNodeShallow(
            node,
            rawNode
        );

        return node;
    },

    loadNodesShallow: (rawNodes: any[]): Array<INodeBase> => {

        const nodes: Array<INodeBase> = [];

        if (!rawNodes
            || rawNodes.length === 0) {

            return nodes;
        }

        let node: INodeBase | null;

        rawNodes.forEach((rawNode: any) => {

            node = gNodeCode.loadNodeShallow(rawNode);

            if (node) {
                nodes.push(node);
            }
        });

        return nodes;
    },

    reLoadNodeShallow: (
        node: INode<IBranchUI>,
        rawNode: any) => {

        if (!rawNode) {
            return;
        }

        node.r = rawNode.r;
        node.option = rawNode.option;
        node.discussion = rawNode.discussion;
        node.inputs = rawNode.inputs;
        node.type = gNodeTypeCode.getNodeType(rawNode);
        node.order = rawNode.order;
        node.isVirtual = rawNode.isVirtual === true;
        node.isHidden = rawNode.isHidden === true;
        node.isEntry = rawNode.isEntry === true;
        node.isStash = rawNode.isStash === true;
        node.isStashRoot = rawNode.isStashRoot === true;
        node.isRoot = rawNode.isRoot === true;
        node.isSilentRoot = rawNode.isSilentRoot === true;
        node.isHidden = rawNode.isHidden === true;
        node.isParentRoot = rawNode.isParentRoot === true;
        node.isParentSilentRoot = rawNode.isParentSilentRoot === true;
        node.isSocket = rawNode.isSocket === true;
        node.isPlug = rawNode.isPlug === true;
        node.isLink = rawNode.isLink === true;
        node.looper.isLoopHole = rawNode.isLoopHole === true;
        node.looper.isLoopRoot = rawNode.isLoopRoot === true;
        node.looper.loopRepeatText = rawNode.loopRepeatText ?? "";
        node.socketHole = gStSocketCode.convertToSocketHole(rawNode.socketHole);
        node.link = gSubtreeCode.convertToSubtree(rawNode.link);
        node.plug = gStSocketCode.convertToStSocket(rawNode.plug);
        node.bin = rawNode.bin;
        node.files = gFileCode.convertToCacheFiles(rawNode.files);
        node.reserve = gReserveCode.convertToReserve(rawNode.reserve);
    },

    overWriteNode: (
        node: INode<IBranchUI>,
        input: INode<IBranchUI>) => {

        if (!input) {
            return;
        }

        node.r = input.r;
        node.option = input.option;
        node.discussion = input.discussion;
        node.inputs = input.inputs;
        node.type = input.type;
        node.order = input.order;
        node.isVirtual = input.isVirtual === true;
        node.isHidden = input.isHidden === true;
        node.isEntry = input.isEntry === true;
        node.isStash = input.isStash === true;
        node.isStashRoot = input.isStashRoot === true;
        node.isRoot = input.isRoot === true;
        node.isSilentRoot = input.isSilentRoot === true;
        node.isParentSilentRoot = input.isParentSilentRoot === true;
        node.isSocket = input.isSocket === true;
        node.isPlug = input.isPlug === true;
        node.isLink = input.isLink === true;
        node.socketHole = input.socketHole;
        node.link = input.link;
        node.plug = input.plug;
        node.bin = input.bin;
        node.files = input.files;
        node.reserve = input.reserve;

        if (input.ui.loaded === true) {

            node.nodes = input.nodes;
        }
        // don't copy over parent, token, stash, errors etc
    },

    loadCompoundNode: (rawCompoundNode: any): INode<IBranchUI> | null => {

        if (!rawCompoundNode
            || !rawCompoundNode.node) {

            return null;
        }

        const nodebase: INodeBase = gNodeCode.loadNodeShallow(rawCompoundNode.node) as INodeBase;

        const node: INode<IBranchUI> = nodebase as INode<IBranchUI>;
        node.ui = new BranchUI();
        let option: INode<IBranchUI>;

        if (rawCompoundNode.cKeys) {

            node.ui.loaded = true;

            rawCompoundNode.cKeys.forEach((optionKey: string) => {

                option = new Node<BranchUI>(BranchUI);
                option.key = optionKey;
                node.nodes.push(option);
            });
        }

        if (rawCompoundNode.t === "e") {

            if (node.discussion.length > 0) {
                // Can only expand if is selected or has a discussion
                node.ui.expanded = true;
                // node.ui.loaded = true;
            }
        }

        if (rawCompoundNode.t === "s") {

            node.ui.selected = true;
            node.ui.expanded = true;
            // node.ui.loaded = true;
        }

        if (node.type === NodeType.Solution
            || node.isSocket === true) {

            node.ui.loaded = true;
        }

        return node;
    },

    showNode: (
        state: IState,
        token: string,
        key: string,
        showOption: boolean = false): INode<IBranchUI> | null => {

        if (!state
            || U.isPositiveNumeric(key) === false
            || U.isNullOrWhiteSpace(token) === true) {

            return null;
        }

        const found: INode<IBranchUI> | null = gBranchesStateCode.getRegisteredNode(
            state,
            token,
            key
        );

        if (!found) {

            return null;
        }

        if (showOption === true) {

            found.ui.showOption = true;
        }
        else {
            found.ui.showNode = true;
        }

        let node: INode<IBranchUI> | null = found.parent;

        while (node) {

            gNodeCode.expandChildren(node);
            node = node.parent;
        }

        return found;
    },

    getSafeOptionsLength: (options: Array<INodeBase>): number => {

        let counter: number = 0;

        for (let i = 0; i < options.length; i++) {

            if (!options[i].isHidden) {

                counter++;
            }
        }

        return counter;
    },

    hasError: (option: INode<IBranchUI>): boolean => {

        let error: boolean = false;

        if (!option.isSocket) {

            if (U.isNullOrWhiteSpace(option.discussion) === true) {

                error = true;
            }
            else if (option.type === NodeType.Discussion
                && option.nodes.length === 0
                && option.ui.loaded === true) {

                error = true;
            }
        }

        return error;
    },

    expandDescendants: (node: INode<IBranchUI>): boolean => {

        return gNodeCode.checkDescendantsLoaded(
            node,
            true
        );
    },

    checkDescendantsLoaded: (
        node: INode<IBranchUI>,
        expand: boolean = false): boolean => {

        if (!node.ui.loaded) {

            return true;
        }

        if (expand === true) {

            gNodeCode.expandChildren(node);
        }

        let reLoad: boolean = false;
        let option: INode<IBranchUI>;

        for (let i = 0; i < node.nodes.length; i++) {

            option = node.nodes[i];

            reLoad = gNodeCode.checkDescendantsLoaded(
                option,
                expand);

            if (reLoad) {

                return true;
            }
        };

        return false;
    },

    expandChildren: (node: INode<IBranchUI>): boolean => {

        if (node.nodes.length > 0
            || node.type === NodeType.Solution
            || node.isSocket === true) {

            node.ui.expanded = true;

            return true;
        }

        return false;
    },

    expandDummy: (node: INode<IBranchUI>): void => {

        node.ui.expanded = true;
        node.ui.dummy = true;
    },

    convertToLensUI: (node: INodeBase): INode<ILensUI> => {

        const nodeLensUI: INode<ILensUI> = node as INode<ILensUI>;
        nodeLensUI.ui = new LensUI();

        if (!nodeLensUI.case) {

            nodeLensUI.case = new NodeCase();
        }

        return nodeLensUI;
    },

    convertToBranchUI: (node: INodeBase): INode<IBranchUI> => {

        const nodeBranchUI: INode<IBranchUI> = node as INode<IBranchUI>;
        nodeBranchUI.ui = new BranchUI();

        if (!nodeBranchUI.case) {

            nodeBranchUI.case = new NodeCase();
        }

        return nodeBranchUI;
    },

    validateTab: (state: IState): boolean => {

        let valid = false;

        if (state.lens.nodeTab.lensNode
            && state.lens.nodeTab.lensNode.ui.raw === true) {

            gNodeCode.clearErrors(state.lens.nodeTab.lensNode);
        }
        else {
            valid = gBranchesStateCode.lensNodeIsValidDirty(state);
        }

        state.lens.nodeTab.enableSave = valid;

        return valid;
    }
};

export default gNodeCode;

