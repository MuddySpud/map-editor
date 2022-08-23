import IState from "../../interfaces/state/IState";
import { ActionType } from "../../interfaces/enums/ActionType";
import U from "../gUtilities";
import gTreesStateCode from "./gTreesStateCode";
import ISubtreeSys from "../../interfaces/state/tree/ISubtreeSys";
import gTreeCode from "./gTreeCode";
import gStRootCode from "./gStRootCode";
import gStSocketCode from "./gStSocketCode";
import gNodeCode from "./gNodeCode";
import SubtreeSys from "../../state/tree/SubtreeSys";
import ITreeSys from "../../interfaces/state/tree/ITreeSys";
import gStateCode from "./gStateCode";
import ITreeTab from "../../interfaces/state/ui/tabs/ITreeTab";
import ITreeBase from "../../interfaces/state/tree/ITreeBase";
import ISocketTask from "../../interfaces/state/tree/ISocketTask";
import gSocketTaskCode from "./gSocketTaskCode";
import ISpreadCase from "../../interfaces/state/cases/ISpreadCase";
import IStSocket from "../../interfaces/state/tree/IStSocket";
import INode from "../../interfaces/state/tree/INode";
import IBranchUI from "../../interfaces/state/ui/UIs/IBranchUI";
import gBranchesStateCode from "./gBranchesStateCode";
import NodeBase from "../../state/tree/NodeBase";
import StSocket from "../../state/tree/StSocket";
import TreeSys from "../../state/tree/TreeSys";
import IStRoot from "../../interfaces/state/tree/IStRoot";
import StRoot from "../../state/tree/StRoot";
import INodeBase from "../../interfaces/state/tree/INodeBase";
import gLensCode from "./gLensCode";
import ILensUI from "../../interfaces/state/ui/UIs/ILensUI";
import ISearchBrief from "../../interfaces/state/Search/ISearchBrief";
import gSearchCode from "./gSearchCode";
import gSubtreeActions from "../actions/gSubtreeActions";
import gSession from "../gSession";
import LensUI from "../../state/ui/UIs/LensUI";
import { TabType } from "../../interfaces/enums/TabType";
import { StageTitle } from "../../interfaces/enums/StageTitle";


const gSubtreeCode = {

    convertToSubtree: (rawSubtree: any): ISubtreeSys | null => {

        if (!rawSubtree) {

            return null;
        }

        const buildTree = (
            rawTree: any,
            rawRoot: any): ITreeSys => {

            if (!rawTree) {

                throw new Error("RawTree was null");
            }

            if (!rawRoot) {

                throw new Error("RawRoot was null");
            }

            const tree = new TreeSys(rawTree.key);
            tree.r = rawTree.r;
            tree.created = rawTree.created;
            tree.description = rawTree.description;
            tree.notes = rawTree.notes;
            tree.name = rawTree.name;
            tree.title = rawTree.title;
            tree.owner = rawTree.owner;
            tree.token = rawTree.treeToken;
            tree.tags = U.joinByNewLine(rawTree.tags);
            tree.isBot = rawTree.isBot === true;
            tree.isFlat = rawTree.isFlat === true;
            tree.isLoop = rawTree.isLoop === true;
            tree.allowDiscussionPlugins = rawTree.allowDiscussionPlugins ?? false;
            tree.allowOptionPlugins = rawTree.allowOptionPlugins ?? true;
            tree.allowDiscussionPluginAudio = rawTree.allowDiscussionPluginAudio ?? false;
            tree.folders = rawTree.folderJson;

            tree.isSubtree = rawTree.isSubtree === true;
            tree.deleteLock = rawTree.deleteLock === true;

            tree.root = buildRoot(rawRoot);

            return tree;
        };

        const buildRoot = (rawRoot: any): INodeBase => {

            const root = new NodeBase();
            root.key = rawRoot.key;
            root.r = rawRoot.r;
            root.token = rawRoot.token;
            root.discussion = rawRoot.discussion;
            root.inputs = rawRoot.inputs;

            return root;
        };

        const buildStRoot = (rawStRoot: any): IStRoot => {

            const stRoot = new StRoot();
            stRoot.key = rawStRoot.key;
            stRoot.r = rawStRoot.r;
            stRoot.text = rawStRoot.text;
            stRoot.token = rawStRoot.token;

            return stRoot;
        };

        const buildSockets = (
            subtree: ISubtreeSys,
            rawSockets: any[]): void => {

            if (!rawSockets
                || rawSockets.length === 0) {

                return;
            }

            let stSocket: IStSocket;

            rawSockets.forEach((rawSocket: any) => {

                stSocket = new StSocket(rawSocket.key);
                stSocket.r = rawSocket.r;
                stSocket.text = rawSocket.text;
                subtree.stSockets.push(stSocket);
            });
        };

        const tree: ITreeSys = buildTree(
            rawSubtree.tree,
            rawSubtree.root);

        const stRoot: IStRoot = buildStRoot(rawSubtree.stRoot);

        const subtree = new SubtreeSys(
            tree,
            stRoot);

        buildSockets(
            subtree,
            rawSubtree.stSockets);

        return subtree;
    },

    cloneSubtree: (inputSubtree: ISubtreeSys | null): ISubtreeSys | null => {

        if (!inputSubtree
            || !inputSubtree.tree
            || !U.isPositiveNumeric(inputSubtree.tree.key)) {

            return null;
        }

        const inputTree = inputSubtree.tree;
        const inputStRoot = inputSubtree.stRoot;
        const inputSockets = inputSubtree.stSockets;

        const tree: ITreeSys = gTreeCode.cloneTree(inputTree) as ITreeSys;

        const stRoot: IStRoot = new StRoot();
        stRoot.key = inputStRoot.key;
        stRoot.r = inputStRoot.r;
        stRoot.text = inputStRoot.text;
        stRoot.token = inputStRoot.token;

        const link: ISubtreeSys = new SubtreeSys(
            tree,
            stRoot);

        let stSocket: IStSocket | null;

        inputSockets.forEach((inputSocket: IStSocket) => {

            stSocket = gStSocketCode.cloneSocket(inputSocket);

            if (stSocket !== null) {

                link.stSockets.push(stSocket);
            }
        });

        return link;
    },

    isNewSubtreeValid: (subtree: ISubtreeSys): boolean => {

        if (!subtree) {

            return false;
        }

        gSubtreeCode.clearErrors(subtree);
        const stRootValid = gStRootCode.validateStRoot(subtree.stRoot);
        const stSocketsValid = gStSocketCode.validateStSockets(subtree.stSockets);

        return subtree.errors.length === 0
            && stRootValid
            && stSocketsValid;
    },

    pushSubtreeDeleteToTabs: (
        state: IState,
        deletedSubtreeTreeKey: string): void => {

        const socketTask: ISocketTask | null = state.lens.nodeTab.lensSocketTask;

        if (socketTask?.lensSubtree?.tree.key === deletedSubtreeTreeKey) {

            gSocketTaskCode.clearSocketTask(state);
        }

        const spreadCase: ISpreadCase | null = state.lens.spreadTab.spreadCase;

        if (spreadCase?.spread?.tree.key === deletedSubtreeTreeKey) {

            gLensCode.clearTab(
                state,
                TabType.Spread
            );
        }
    },

    validateTab: (state: IState): boolean => {

        const valid: boolean = gTreesStateCode.lensSubtreeIsValidDirty(state);
        state.lens.treeTab.enableSave = valid;

        return valid;
    },

    clearErrors: (subtree: ISubtreeSys): void => {

        subtree.errors = new Array<string>();
    },

    setError: (
        subtree: ISubtreeSys,
        error: string): void => {

        if (!subtree.errors.includes(error)) {

            subtree.errors.push(error);
        }
    },

    validateSubtreeSys: (subtree: ISubtreeSys): boolean => {

        if (subtree.action === ActionType.DeleteSubtree) {
            // Don't need to validate anything for a delete.
            return true;
        }

        gSubtreeCode.clearErrors(subtree);
        const treeValid = gTreeCode.validateTreeSys(subtree.tree);
        const stRootValid = gStRootCode.validateStRoot(subtree.stRoot);
        const stSocketsValid = gStSocketCode.validateStSockets(subtree.stSockets);

        return subtree.errors.length === 0
            && treeValid
            && stRootValid
            && stSocketsValid;
    },

    isLenSubtreeDirty: (state: IState): boolean => {

        if (!state
            || !state.lens.treeTab.lensSubtree
            || !state.lens.treeTab.ghostSubtree) {

            return false;
        }

        return gSubtreeCode.checkSubtreeSysMatchExactly(
            state.lens.treeTab.lensSubtree,
            state.lens.treeTab.ghostSubtree) === false;
    },

    checkSubtreeSysMatchExactly: (
        subtree1: ISubtreeSys,
        subtree2: ISubtreeSys): boolean => {

        if (!subtree1
            || !subtree2) {

            return false;
        }

        const treesMatch: boolean = gTreeCode.checkTreeSysMatchExactly(
            subtree1.tree,
            subtree2.tree
        );

        if (!treesMatch) {

            return false;
        }

        const rootsMatch: boolean = gNodeCode.checkNodesMatch(
            subtree1.tree.root,
            subtree2.tree.root
        );

        if (!rootsMatch) {

            return false;
        }

        const stRootsMatch: boolean = gStRootCode.checkStRootsMatch(
            subtree1.stRoot,
            subtree2.stRoot
        );

        if (!stRootsMatch) {

            return false;
        }

        const stSocketsMatch: boolean = gStSocketCode.checkStSocketListMatch(
            subtree1.stSockets,
            subtree2.stSockets
        );

        if (!stSocketsMatch) {

            return false;
        }

        return true;
    },

    createLensSubtree: (state: IState): void => {

        if (!state
            || !state.lens.treeTab.lensTree
            || U.isNullOrWhiteSpace(state.lens.treeTab.lensTree.key) === true) {
            return;
        }

        const tree: ITreeSys = gTreeCode.cloneTree(state.lens.treeTab.lensTree) as ITreeSys;
        const subtree: ISubtreeSys = SubtreeSys.newSubtreeFromTree(tree);
        subtree.stRoot.key = gStateCode.getFreshKey(state);
        subtree.stRoot.text = `StRoot for: ${tree.token}`;
        subtree.stRoot.action = ActionType.CreateStRoot;
        subtree.action = ActionType.CreateSubtree;
        state.lens.treeTab.ghostSubtree = subtree;
        state.lens.treeTab.lensSubtree = gSubtreeCode.cloneSubtreeSys(subtree);
    },

    setupCreateSubtreeLink: (
        state: IState,
        lensNode: INode<ILensUI>): void => {

        const tree = new TreeSys(gStateCode.getFreshKey(state));
        lensNode.link = SubtreeSys.newSubtreeFromTree(tree);

        const brief: ISearchBrief = gSearchCode.buildSubtreeSearchBrief(
            state,
            gSubtreeActions.linkToSubtree,
            lensNode);

        if (brief.searchTerms.length === 1
            && U.isNullOrWhiteSpace(brief.searchTerms[0].text) === true) {

            gSession.setFocusFilter(`#searchText_${brief.searchTerms[0].key}`);
        }
    },

    setupEditSubtreeLink: (state: IState): void => {

        state.lens.nodeTab.stageBehaviour.stages.replacement = StageTitle.LensEditSubtreeLink;
    },

    getsubtreeForDELETE: (
        state: IState,
        tree: ITreeBase): any => {

        const callID: string = gTreesStateCode.registerTreeDataRequest(
            'Delete subtree',
            state,
            tree.key as string,
            ActionType.DeleteSubtree
        );

        let body: any = {
            key: tree.key,
            r: tree.r,
            token: tree.token,
            action: ActionType.DeleteSubtree
        };

        return {
            body,
            callID
        };
    },

    clearTreeTabSubtree: (state: IState): void => {

        const treeTab: ITreeTab = state.lens.treeTab;
        treeTab.lensSubtree = null;
        treeTab.ghostSubtree = null;
        treeTab.saveLock = false;
        treeTab.enableSave = true;
    },

    clearHolesOfPlugs: (
        state: IState,
        clearedHoles: Array<string>): void => {

        if (U.isNullOrWhiteSpace(state.branchesState.tree.token) === false) {

            const token: string = state.branchesState.tree.token as string;

            clearedHoles.forEach((holeID: string) => {

                const found: INode<IBranchUI> | null = gBranchesStateCode.getRegisteredNode(
                    state,
                    token,
                    holeID);

                if (found) {

                    found.isSocket = false;
                    found.ui.expanded = false;
                    found.socketHole = null;
                }
            });
        }
    },

    clearAllMappedHoles: (state: IState): void => {

        state.branchesState.registered.forEach((node: INode<IBranchUI>) => {

            if (node.isSocket === true) {

                node.isSocket = false;
                node.ui.expanded = false;
                node.socketHole = null;
            }
        });
    },

    updateAllMappedHoles: (
        state: IState,
        rawSocketHoles: Array<any>): void => {

        if (!rawSocketHoles
            || rawSocketHoles.length === 0) {
            return;
        }

        let rawSocketHole: any;

        state.branchesState.registered.forEach((node: INode<IBranchUI>) => {

            if (node.key) {

                rawSocketHole = rawSocketHoles.find(socketHole => socketHole.holeKey === node.key);

                if (rawSocketHole) {

                    node.isSocket = true;
                    node.socketHole = gStSocketCode.convertToSocketHole(rawSocketHole);
                }
                else if (node.isSocket === true) {

                    node.isSocket = false;
                    node.ui.expanded = false;
                    node.socketHole = null;
                }
            }
        });
    },

    cloneSubtreeSys: (input: ISubtreeSys): ISubtreeSys | null => {

        if (!input) {

            return null;
        }

        const tree: ITreeSys = gTreeCode.cloneTree(input.tree) as ITreeSys;
        const subtree: ISubtreeSys = SubtreeSys.newSubtreeFromTree(tree);
        subtree.action = input.action;
        subtree.stRoot = gStRootCode.cloneStRoot(input.stRoot);
        subtree.stSockets = gStSocketCode.cloneStSockets(input.stSockets);

        return subtree;
    },

    setupSubtreeSysForCreateSubtreeAndLink: (state: IState): void => {

        if (!state) {
            return;
        }

        const lensNode: INode<LensUI> | null = state.lens.nodeTab.lensNode;

        if (!lensNode) {
            return;
        }

        const tree = new TreeSys(gStateCode.getFreshKey(state));
        tree.name = '';
        tree.description = `Subtree and link created concurrently in tree: ${state.branchesState.tree.name}`;
        tree.root.discussion = 'Root discussion....';
        tree.tags = '';
        tree.action = ActionType.CreateTree;

        tree.root.key = gStateCode.getFreshKey(state);
        tree.root.action = ActionType.CreateNode;

        lensNode.link = SubtreeSys.newSubtreeFromTree(tree);
        lensNode.link.action = ActionType.CreateSubtree;
        lensNode.link.stRoot.key = gStateCode.getFreshKey(state);
        lensNode.link.stRoot.text = `StRoot text`;
        lensNode.link.stRoot.action = ActionType.CreateStRoot;
    },

    getLoadSubtreeBody: (subtree: ISubtreeSys): { body: any, callID: string } => {

        const treeKey: string = subtree.tree.key as string;
        const rootKey: string = subtree.tree.root.key as string;

        const body: any = {

            tree: {
                key: treeKey,
                r: subtree.tree.r,
                token: subtree.tree.token,
                name: subtree.tree.name,
                action: subtree.tree.action,
                root: {
                    key: rootKey,
                    r: subtree.tree.root.r,
                    discussion: subtree.tree.root.discussion,
                    action: subtree.tree.root.action
                }
            },
            action: subtree.action,
            stRoot: gStRootCode.getRootBody(subtree.stRoot),
            stSockets: gStSocketCode.getSocketsBody(subtree.stSockets),
        };

        return body;
    },

    getLoadSubtreeRequestBody: (
        state: IState,
        subtree: ISubtreeSys): { body: any, callID: string } => {

        const treeKey: string = subtree.tree.key as string;
        const body = gSubtreeCode.getLoadSubtreeBody(subtree);

        const callID: string = gTreesStateCode.registerTreeDataRequest(
            'Save subtree',
            state,
            treeKey,
            subtree.action
        );

        return {
            body,
            callID
        };
    },

    getSubtreeKeyRequestBody: (
        state: IState,
        tree: ITreeBase): { body: any, callID: string } => {

        const callID: string = gTreesStateCode.registerTreeDataRequest(
            'Get subtree',
            state,
            tree.key as string,
            ActionType.GetSubtree
        );

        const body: any = {
            key: tree.key,
            token: tree.token,
            action: ActionType.GetSubtree
        };

        return {
            body,
            callID
        };
    },

    getRefreshSubtreeRequestBody: (state: IState): { body: any, callID: string, callChain: Array<string>, success: boolean } => {

        const tree: ITreeSys = state.lens.treeTab.lensTree as ITreeSys;

        const callID: string = gTreesStateCode.registerTreeDataRequest(
            'Get subtree',
            state,
            tree.key as string,
            ActionType.RefreshSubtree
        );

        const body: any = {
            key: tree.key,
            token: tree.token,
            action: ActionType.RefreshSubtree
        };

        return {
            body,
            callID,
            callChain: [],
            success: true
        };
    },

    getSubtreeWithNewTreeForBody: (subtree: ISubtreeSys): any => {

        const tree: ITreeSys = subtree.tree as ITreeSys;
        const root: INodeBase = tree.root as INodeBase;
        const treeKey = tree.key as string;

        const body: any = {

            tree: {
                key: treeKey,
                name: tree.name,
                title: tree.title,
                description: tree.description,
                notes: tree.notes,
                tags: U.splitByNewLineAndOrder(tree.tags),
                action: tree.action,

                root: {
                    key: root.key,
                    discussion: root.discussion,
                    inputs: root.inputs,
                    action: root.action
                }
            },

            action: subtree.action,
            stRoot: gStRootCode.getRootBody(subtree.stRoot),
            stSockets: gStSocketCode.getSocketsBody(subtree.stSockets),
        };

        return body;
    },

    loadSocketTaskSockets: (
        state: IState,
        rawSubtree: any): void => {

        if (!state
            || !rawSubtree
            || !state.lens.nodeTab.lensSocketTask) {
            return;
        }

        const rawSockets: any[] = rawSubtree.stSockets;
        const rawRoot: any[] = rawSubtree.stRoot;
        const socketTask: ISocketTask = state.lens.nodeTab.lensSocketTask;
        socketTask.ghostSubtree.stRoot = gStRootCode.loadStRoot(rawRoot);
        socketTask.ghostSubtree.stSockets = gStSocketCode.loadStSockets(rawSockets);
        socketTask.lensSubtree = gSubtreeCode.cloneSubtreeSys(socketTask.ghostSubtree) as ISubtreeSys;

        if (socketTask.lensSubtree.stSockets.length === 0) {

            socketTask.ui.newSocket = true;

            socketTask.selectedSocket = gSocketTaskCode.autoAddStSocketToTask(
                state,
                socketTask
            );
        }

        if (U.isNullOrWhiteSpace(socketTask.selectedSocket?.key) === false) {

            const selectedKey: string = socketTask.selectedSocket?.key as string;
            let selectedStSocket: IStSocket | undefined;

            if (U.isNegativeNumeric(selectedKey) === true) {

                const selectedText: string = socketTask.selectedSocket?.text as string;

                selectedStSocket = socketTask.lensSubtree.stSockets.find((stSocket: IStSocket) => {

                    return stSocket.text === selectedText;
                });
            }
            else {
                selectedStSocket = socketTask.lensSubtree.stSockets.find((stSocket: IStSocket) => {

                    return stSocket.key === selectedKey;
                });
            }

            if (selectedStSocket) {

                selectedStSocket.ui.selected = true;
                socketTask.selectedSocket = selectedStSocket;
            }

            if (socketTask.ui.newSocket === true) {
                // Add socket to be mapped to the hole
                socketTask.selectedSocket = gSocketTaskCode.autoAddStSocketToTask(
                    state,
                    socketTask
                );
            }

            return;
        }
        else {
            socketTask.ui.newSocket = false;
        }
    },

    loadSubtreeSys: (
        _state: IState,
        rawSubtree: any): ISubtreeSys | null => {

        if (!rawSubtree
            || !rawSubtree.tree
            || U.isNullOrWhiteSpace(rawSubtree.tree.key) === true) {

            return null;
        }

        const loadedTree: ITreeSys | null = gTreeCode.loadTreeSys(rawSubtree.tree);

        if (!loadedTree) {

            return null;
        }

        const tree: ITreeSys = gTreeCode.cloneTree(loadedTree) as ITreeSys;
        const subtree: ISubtreeSys = SubtreeSys.newSubtreeFromTree(tree);
        subtree.stRoot = gStRootCode.loadStRoot(rawSubtree.stRoot);
        subtree.stSockets = gStSocketCode.loadStSockets(rawSubtree.stSockets);

        return subtree;
    },

    loadLensSubtreeRaw: (
        state: IState,
        rawSubtree: any): ISubtreeSys | null => {

        const loadedSubtree: ISubtreeSys | null = gSubtreeCode.loadSubtreeSys(
            state,
            rawSubtree
        );

        state.lens.treeTab.holes = gNodeCode.loadNodesShallow(rawSubtree.flaws);

        return gSubtreeCode.loadLensSubtree(
            state,
            loadedSubtree
        );
    },

    loadLensSubtree: (
        state: IState,
        subtree: ISubtreeSys | null): ISubtreeSys | null => {

        if (!subtree) {

            return null;
        }

        gTreeCode.loadLensTree(
            state,
            subtree.tree
        );

        const sameTree: boolean =
            U.isPositiveNumeric(subtree.tree.key) === true
            && subtree.tree.key === state.lens.treeTab.ghostSubtree?.tree.key;

        state.lens.treeTab.ghostSubtree = subtree;
        const clonedSubtree: ISubtreeSys | null = gSubtreeCode.cloneSubtreeSys(subtree);
        const lensSubtree: ISubtreeSys | null = state.lens.treeTab.lensSubtree;
        let found: IStSocket | undefined;

        if (lensSubtree
            && clonedSubtree
            && sameTree === true) {

            clonedSubtree.ui = lensSubtree.ui;
            clonedSubtree.tree.ui = lensSubtree.tree.ui;

            lensSubtree.stSockets.forEach((stSocket: IStSocket) => {

                found = clonedSubtree.stSockets.find((socket: IStSocket) => socket.key === stSocket.key);

                if (found) {

                    found.ui = stSocket.ui;
                }
            });
        }

        state.lens.treeTab.lensSubtree = clonedSubtree;

        if (state.lens.treeTab.lensSubtree !== null) {

            state.lens.treeTab.lensTree = state.lens.treeTab.lensSubtree.tree;
        }

        return subtree;
    },

    subtreeIsValidDirty: (
        subtree: ISubtreeSys,
        ghostSubtree: ISubtreeSys): boolean => {

        if (!subtree) {

            return false;
        }

        if (!gSubtreeCode.validateSubtreeSys(subtree)) {

            return false;
        }

        return gSubtreeCode.checkSubtreeSysMatchExactly(
            ghostSubtree,
            subtree) === false;
    }
};

export default gSubtreeCode;

