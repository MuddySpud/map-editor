import IState from "../../interfaces/state/IState";
import INode from "../../interfaces/state/tree/INode";
import IBranchUI from "../../interfaces/state/ui/UIs/IBranchUI";
import ILensUI from "../../interfaces/state/ui/UIs/ILensUI";
import gNodeCode from "./gNodeCode";
import INodeBase from "../../interfaces/state/tree/INodeBase";
import { ActionType } from "../../interfaces/enums/ActionType";
import gSession from "../gSession";
import gViewCode from "./gViewCode";
import gStageCode from "./gStageCode";
import { NodeType } from "../../interfaces/enums/NodeType";
import gOptionCode from "./gOptionCode";
import U from "../gUtilities";
import IViewSettings from "../../interfaces/state/user/IViewSettings";
import ViewSettings from "../../state/user/ViewSettings";
import UserView from "../../state/user/UserView";
import IUserView from "../../interfaces/state/user/IUserView";
import { TabType } from "../../interfaces/enums/TabType";
import INodeAlts from "../../interfaces/state/tree/INodeAlts";
import IKeyValuePair from "../../interfaces/state/tree/IKeyValuePair";
import IReloadedNodeResult from "../../interfaces/state/tree/IReloadedNodeResult";
import Filters from "../../state/constants/Filters";
import gLensCode from "./gLensCode";
import gSubtreeCode from "./gSubtreeCode";
import { StageTitle } from "../../interfaces/enums/StageTitle";
import gTabCode from "./gTabCode";
import gTreesStateCode from "./gTreesStateCode";


// This is where all alerts to data changes should be made
const gBranchesStateCode = {

    cacheAndSetCurrentNodeFromOption: (
        state: IState,
        option: INode<IBranchUI>): void => {

        state.branchesState.current = option;

        // TODO is this necessary?
        return gBranchesStateCode.registerNode(
            state,
            option
        );
    },

    incrementBranchesDepth: (
        state: IState,
        depth: number): number => {

        depth++;

        if (state.branchesState.maxBranchDepth < depth) {

            state.branchesState.maxBranchDepth = depth;
        }

        return depth;
    },

    registerNode: (
        state: IState,
        node: INode<IBranchUI>): void => {

        let index = state.branchesState.registered.findIndex((registeredNode: INode<IBranchUI>) => {

            return registeredNode.key === node.key;
        });

        if (index === -1) {

            state.branchesState.registered.push(node);
        }
        else {
            state.branchesState.registered[index] = node;
        }
    },

    getTreeNodeFromKey: (
        state: IState,
        key: string): INode<IBranchUI> | null => {

        const checkIfNodeOptionsMatchKey = (
            nodes: Array<INode<IBranchUI>>,
            key: string): INode<IBranchUI> | null => {

            let node: INode<IBranchUI>;
            let child: INode<IBranchUI> | null;

            for (let i = 0; i < nodes.length; i++) {

                node = nodes[i];

                if (node.key === key) {

                    return node;
                }

                child = checkIfNodeOptionsMatchKey(
                    nodes[i].nodes,
                    key
                );

                if (child) {

                    return child;
                }
            }

            return null;
        };

        return checkIfNodeOptionsMatchKey(
            state.branchesState.tree.root.nodes,
            key
        );
    },

    setLensNodeForUpdate: (
        state: IState,
        nodeType?: NodeType): INode<ILensUI> => {

        state.branchesState.selected = state.branchesState.current;

        const lensNode = gBranchesStateCode.buildLensNode(
            state,
            nodeType
        );

        gTabCode.setSelectedTab(
            state,
            TabType.Node
        );

        gSession.setFocusFilter(Filters.discussionFocusFilter);
        state.lens.nodeTab.stageBehaviour = gStageCode.buildStages(state);

        if (state.lens.nodeTab.stageBehaviour.stages.name === StageTitle.LensCreateSubtreeAndLink) {

            gSubtreeCode.setupSubtreeSysForCreateSubtreeAndLink(state);
        }

        return lensNode;
    },

    buildLensNode: (
        state: IState,
        nodeType?: NodeType): INode<ILensUI> => {

        state.lens.nodeTab.saveLock = false;
        const lensNode: INode<ILensUI> = gNodeCode.cloneNodeAndParentAndOptionsForLens(state.branchesState.selected as INodeBase);
        lensNode.action = ActionType.UpdateNode;

        window.TreeSolve.optionsPlugins.reHydrate(
            state,
            lensNode
        );

        if (nodeType) {

            lensNode.type = nodeType;
            const stageName: string = state.lens.nodeTab.stageBehaviour.stages.name;

            if (stageName === StageTitle.LensCreateSubtreeLink
                || stageName === StageTitle.LensCreateSubtreeAndLink) {

                lensNode.isLink = true;

                if (!lensNode.link) {

                    gSubtreeCode.setupCreateSubtreeLink(
                        state,
                        lensNode
                    );
                }
            }
            else {
                lensNode.isLink = false;
            }
        }
        else if (lensNode.isLink) {

            gSubtreeCode.setupEditSubtreeLink(state);
        }

        lensNode.ui.raw = true;
        state.lens.nodeTab.lensNode = lensNode;

        if ((lensNode.type === NodeType.Discussion
            || lensNode.isRoot === true)
            && lensNode.nodes.length === 0) {
            // Create an empty one so at least a single blank option is displayed ready to enter text
            const newOption: INode<ILensUI> = gOptionCode.createLensUIOption(state);
            newOption.parent = lensNode;
            lensNode.nodes.push(newOption);
        }

        return lensNode;
    },

    clearLensNode: (state: IState): void => {

        if (!state) {
            return;
        }

        gBranchesStateCode.deselectAllNodes(state);
        gBranchesStateCode.hideAllDummyControls(state);
        gBranchesStateCode.hideAllBranchUIControls(state);
        state.lens.nodeTab.lensNode = null;
        state.lens.nodeTab.treeStats = null;
        state.lens.nodeTab.saveLock = false;
        state.branchesState.selected = null;
    },

    clearNodeLensBehaviours: (state: IState): void => {

        if (!state) {
            return;
        }

        state.lens.nodeTab.stageBehaviour.clear();
        state.lens.nodeTab.altsStageBehaviour.clear();
    },

    deselectAllNodes: (state: IState): void => {

        state.branchesState.registered.forEach((node: INode<IBranchUI>) => {

            if (node.ui.selected === true) {

                node.ui.selected = false;

                if (U.isNullOrWhiteSpace(node.discussion) === true
                    && node.isSocket === false) {

                    node.ui.expanded = false;
                }
            }
        });

        state.branchesState.stash.ui.selected = false;
    },

    lensNodeIsValidDirty: (state: IState): boolean => {

        if (!gBranchesStateCode.validateLensNode(state)) {

            return false;
        }

        if (!gBranchesStateCode.isLensNodeDirty(state)) {

            return false;
        }

        return true;
    },

    isLensNodeDirty: (state: IState): boolean => {

        const lensNode: INode<ILensUI> = state.lens.nodeTab.lensNode as INode<ILensUI>;
        const selectedNode: INodeBase = state.branchesState.selected as INodeBase;

        if (!lensNode) {

            return false;
        }

        let match = gNodeCode.checkNodesMatch(
            lensNode,
            selectedNode);

        if (!match) {

            return true;
        }

        match = window.TreeSolve.discussionPlugins.checkMatch(
            state,
            lensNode);

        if (!match) {

            return true;
        }

        match = window.TreeSolve.optionsPlugins.checkMatch(
            state,
            lensNode);

        return match === false;
    },

    findAndReLoadRegisteredNode: (
        state: IState,
        rawNode: any): INode<IBranchUI> | null => {

        if (!rawNode) {
            return null;
        }

        const registeredNode: INode<IBranchUI> | null = gBranchesStateCode.getRegisteredNode(
            state,
            rawNode.token,
            rawNode.key
        );

        if (!registeredNode) {
            return null;
        }

        registeredNode.ui.loaded = true;

        const reloadedNodeResult: IReloadedNodeResult = gNodeCode.reLoadNode(
            registeredNode,
            rawNode);

        gBranchesStateCode.loadAndRegisterNewOptions(
            state,
            registeredNode,
            reloadedNodeResult);

        gBranchesStateCode.unRegisterDeletedOptions(
            state,
            reloadedNodeResult);

        registeredNode.nodes.sort(gNodeCode.nodeOrderCompare);
        const lensNode: INode<ILensUI> = state.lens.nodeTab.lensNode as INode<ILensUI>;

        if (lensNode
            && lensNode.key === registeredNode.key
            && lensNode.token === registeredNode.token) {

            gBranchesStateCode.setLensNodeForUpdate(state);
        }

        return registeredNode;
    },

    unRegisterDeletedOptions: (
        state: IState,
        reloadedNodeResult: IReloadedNodeResult): void => {

        reloadedNodeResult.deletedOptions.forEach((deletedOption: INodeBase) => {

            gBranchesStateCode.findAndRemoveUnRegistered(
                state,
                deletedOption
            );
        });
    },

    registerLoadedNodes: (
        state: IState,
        loadedNodes: Array<INode<IBranchUI>>): Array<INode<IBranchUI>> => {

        const registeredLoadedNodes: Array<INode<IBranchUI>> = [];

        loadedNodes.forEach((loadedNode: INode<IBranchUI>) => {

            const registeredNode: INode<IBranchUI> | null = gBranchesStateCode.getRegisteredNode(
                state,
                loadedNode.token,
                loadedNode.key
            );

            if (registeredNode) {

                gNodeCode.overWriteNode(
                    registeredNode,
                    loadedNode
                );

                if (loadedNode.ui.loaded === true) {

                    registeredNode.ui.loaded = true;
                }

                if (loadedNode.ui.registered === true) {

                    registeredNode.ui.registered = true;
                }

                registeredLoadedNodes.push(registeredNode);
            }
            else {
                state.branchesState.registered.push(loadedNode);
                registeredLoadedNodes.push(loadedNode);
            }
        });

        return registeredLoadedNodes;
    },

    loadAndRegisterNewOptions: (
        state: IState,
        node: INode<IBranchUI>,
        reloadedNodeResult: IReloadedNodeResult): Array<INode<IBranchUI>> => {

        let result: INode<IBranchUI> | null;
        let registeredOption: INode<IBranchUI>;
        let newOptions: Array<INode<IBranchUI>> = [];

        reloadedNodeResult.newRawOptions.forEach((newRawOption: any) => {

            result = gBranchesStateCode.findAndReLoadRegisteredNode(
                state,
                newRawOption
            );

            if (result) {

                registeredOption = result;

                if (registeredOption.parent) {

                    const index: number = registeredOption.parent.nodes.findIndex((sibling: INodeBase) => {

                        return sibling.key === registeredOption.key
                            && sibling.token === registeredOption.token;
                    });

                    if (index > -1) {
                        registeredOption.parent.nodes.splice(index, 1);
                    }
                }

                registeredOption.parent = node;
                newOptions.push(registeredOption);
                node.nodes.push(registeredOption);
                registeredOption.parent = node;
            }
            else {

                result = gNodeCode.loadNodeShallow(newRawOption);

                if (result) {

                    registeredOption = result;
                    state.branchesState.registered.push(registeredOption);
                    registeredOption.ui.registered = true;
                    newOptions.push(registeredOption);
                    node.nodes.push(registeredOption);
                    registeredOption.parent = node;
                }
            }
        });

        return newOptions;
    },

    findAndRemoveUnRegistered: (
        state: IState,
        node: INodeBase): void => {

        const index: number = state.branchesState.registered.findIndex((reg: INode<IBranchUI>) => {

            return node.key === reg.key
                && node.token === reg.token;
        });

        if (index > -1) {

            state.branchesState.registered.splice(index, 1);
        }
    },

    getRegisteredNode: (
        state: IState,
        token: string | null,
        nodeKey: string | null): INode<IBranchUI> | null => {

        if (U.isNullOrWhiteSpace(token) === true
            || U.isNullOrWhiteSpace(nodeKey) === true) {

            return null;
        }

        const registered: INode<IBranchUI> | undefined = state.branchesState.registered.find((reg: INode<IBranchUI>) => {

            return nodeKey === reg.key
                && token === reg.token;
        });

        if (!registered) {

            return null;
        }

        return registered;
    },

    validateLensNode: (state: IState): boolean => {

        if (!state.lens.nodeTab.lensNode) {

            alert(`state.lens.nodeTab.lensNode cannot be null`);
        }

        const lensNode = state.lens.nodeTab.lensNode as INode<ILensUI>;

        if (lensNode.isStash === true) {

            return true;
        }

        return gNodeCode.validateNodeLensUI(
            state,
            lensNode);
    },

    showViewSettings: (state: IState): void => {

        const live: IUserView = state.branchesState.viewSettings.live as IUserView;
        const lensLive: IUserView = new UserView(live.name);
        lensLive.token = live.token;
        lensLive.created = live.created;
        lensLive.lastModified = live.lastModified;

        const lensViewSettings = new ViewSettings();
        lensViewSettings.live = lensLive;

        lensViewSettings.views = [];
        let lensView: IUserView;

        state.branchesState.viewSettings.views.forEach(view => {

            lensView = new UserView(view.name);
            lensView.token = view.token;
            lensView.created = view.created;
            lensView.lastModified = view.lastModified;
            lensViewSettings.views.push(lensView);
        });

        state.lens.viewSettingsTab.lensViewSettings = lensViewSettings;
        gLensCode.maximiseLens(state) === true;

        gTabCode.setSelectedTab(
            state,
            TabType.UserViews);
    },

    getLiveCache: (state: IState): any => {

        const viewSettings: IViewSettings = state.lens.viewSettingsTab.lensViewSettings as IViewSettings;

        return {
            key: viewSettings.live.key,
            r: viewSettings.live.r,
            name: "live",
            token: state.branchesState.tree.token,
            userKey: state.user.key,
            action: ActionType.ClearLiveUserView
        };
    },

    getLiveViewForPUT: (state: IState): { body: any, callID: string, callChain: Array<string>, success: boolean } => {

        const root: INode<IBranchUI> = state.branchesState.tree.root;
        const viewNodes: Array<any> = [];

        gViewCode.getView(
            root,
            viewNodes);

        const cache = JSON.stringify(viewNodes);

        const body: any = {
            name: `live`,
            view: cache,
            userKey: state.user.key,
            token: state.branchesState.tree.token,
            action: ActionType.UpdateUserView
        };

        const callID: string = gTreesStateCode.registerDataRequest(
            'Cache user view',
            state,
            state.branchesState.tree.key as string,
            ActionType.UpdateUserView
        );

        return {
            body,
            callID,
            callChain: [],
            success: true
        };
    },

    getAltsCache: (state: IState): { body: any, callID: string } => {

        const callID: string = gTreesStateCode.registerNodeDataRequest(
            'Get node alts',
            state,
            state.branchesState.tree.key as string,
            ActionType.GetNodeAlts,
            state.lens.nodeTab.lensNode?.key as string
        );

        const lensNode: INode<ILensUI> = state.lens.nodeTab.lensNode as INode<ILensUI>;
        const nodeAlts: INodeAlts = lensNode.case.alts as INodeAlts;
        const alts: string[] = [];

        nodeAlts.alts.forEach((a: IKeyValuePair) => {

            if (U.isNullOrWhiteSpace(a.value) === false) {

                alts.push(a.value);
            }
        });

        const body: any = {
            key: nodeAlts.key,
            r: nodeAlts.r,
            token: state.branchesState.tree.token,
            nodeKey: lensNode.key,
            alts: alts
        };

        return {
            body,
            callID
        }
    },

    hideAllBranchUIControls: (state: IState): boolean => {

        let refresh: boolean = false;

        state.branchesState.registered.forEach((node: INode<IBranchUI>) => {

            if (node.ui.branchViewNodeControls === true) {

                refresh = true;
                node.ui.expanded = false;
                node.ui.branchViewNodeControls = false;
            }

            if (node.ui.info === true) {

                node.ui.info = false;
            }

            if (node.ui.branchViewOptionControls === true) {

                node.ui.branchViewOptionControls = false;
            }

            if (node.ui.loadInBranchUIOptionControls === true) {

                node.ui.loadInBranchUIOptionControls = false;
            }

            if (node.ui.blurring === true) {

                node.ui.blurring = false;
            }
        });

        return refresh;
    },

    hideAllDummyControls: (state: IState): boolean => {

        let refresh: boolean = false;

        state.branchesState.registered.forEach((node: INode<IBranchUI>) => {

            if (node.ui.dummy === true) {

                node.ui.dummy = false;
                // node.ui.hole = false;
                node.ui.expanded = false;
            }
        });

        return refresh;
    },

    ancestorKeyMatchesKey: (
        node: INodeBase,
        key: string): boolean => {

        let ancestor: INodeBase | null = node;

        while (ancestor) {

            if (ancestor.key === key) {

                return true;
            }

            ancestor = ancestor.parent;
        }

        return false;
    }
};

export default gBranchesStateCode;

