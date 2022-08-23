import INode from "../../interfaces/state/tree/INode";
import IBranchUI from "../../interfaces/state/ui/UIs/IBranchUI";
import gNodeCode from "./gNodeCode";
import IState from "../../interfaces/state/IState";
import gRootCode from "./gRootCode";
import gBranchesStateCode from "./gBranchesStateCode";


const buildBranchesAndExpand = (
    state: IState,
    node: INode<IBranchUI>,
    loadedNodes: Array<INode<IBranchUI>>,
    expand: boolean = true): INode<IBranchUI> | null => {

    let selectedNode: INode<IBranchUI> | null = null;
    let selected: INode<IBranchUI> | null = null;
    let shellOption: INode<IBranchUI>;
    let fullOption: INode<IBranchUI> | null;

    const collapseNode = () => {

        node.nodes = [];
        node.ui.loaded = false;
        node.ui.expanded = false;
        node.ui.selected = false;
        node.ui.dummy = false;
        node.ui.hole = false;
    };

    for (let i = 0; i < node.nodes.length; i++) {

        shellOption = node.nodes[i];

        // Find the full option that matches the shell option
        fullOption = gBranchesStateCode.getRegisteredNode(
            state,
            node.token,
            shellOption.key);

        if (!fullOption) {
            // As one of its children wasn't loaded by the view 
            // need to collapse it so it can be loaded by expanding.
            // Remove all children

            // If this happens with the root then throw an error and will try and fix it.
            if (node.isRoot === true) {

                gRootCode.setOptionFailedToLoadError(
                    node,
                    shellOption.key
                );
            }

            collapseNode();

            break;
        }

        // Replace the node's shell option with the full option.
        node.nodes[i] = fullOption;
        fullOption.parent = node;

        // Treat the option as a node and build full options for its shell options

        if (node.ui.freshLoad === true) {

            selected = buildBranchesAndExpand(
                state,
                fullOption,
                loadedNodes,
                expand);
        }

        if (selected) {

            if (selectedNode
                && selectedNode.key !== selected.key) {
                throw new Error("There seems to be more than one selected node in this view...");
            }

            selectedNode = selected;
        }
    }

    // Sort the options so they display by order
    node.nodes.sort(gNodeCode.nodeOrderCompare);

    if (expand) {

        gNodeCode.expandChildren(node);
    }

    // If this is the selected node - mark it
    if (node.ui.selected) {

        selectedNode = node;
    }

    return selectedNode;
};

// Need to get the treeKey from the url
const gInitialiseTree = {

    buildTree: (
        state: IState,
        loadedNodes: Array<INode<IBranchUI>>): INode<IBranchUI> | null => {

        if (loadedNodes.length === 0) {

            return null;
        }

        // The first node is the root
        const root = loadedNodes[0];

        if (!root
            || !root.isRoot) {

            throw new Error(`The first loadedNode must be the root.`);
        }

        let selected: INode<IBranchUI> | null = gInitialiseTree.buildBranchesAndExpand(
            state,
            root,
            loadedNodes
        );

        state.branchesState.tree.root = root;

        return selected;
    },

    buildBranches: (
        state: IState,
        node: INode<IBranchUI>,
        loadedNodes: Array<INode<IBranchUI>>): INode<IBranchUI> | null => {

        return gInitialiseTree.buildBranchesAndExpand(
            state,
            node,
            loadedNodes,
            false
        );
    },

    buildBranchesAndExpand: (
        state: IState,
        node: INode<IBranchUI>,
        loadedNodes: Array<INode<IBranchUI>>,
        expand: boolean = true): INode<IBranchUI> | null => {

        loadedNodes.forEach((node: INode<IBranchUI>) => {

            node.ui.freshLoad = true;
        });

        const selected: INode<IBranchUI> | null = buildBranchesAndExpand(
            state,
            node,
            loadedNodes,
            expand
        );

        let selectedCount: number = 0;

        state.branchesState.registered.forEach((node: INode<IBranchUI>) => {

            if (node.ui.freshLoad === true) {

                node.ui.freshLoad = false;
            }

            if (node.ui.selected === true) {

                ++selectedCount;
            }
        });

        if (selectedCount > 1) {

            throw new Error(`There were ${selectedCount} selected nodes.`);
        }

        return selected;
    }
};

export default gInitialiseTree;

