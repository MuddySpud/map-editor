import IState from "../../interfaces/state/IState";
import gStateCode from "../code/gStateCode";
import ITreeBase from "../../interfaces/state/tree/ITreeBase";
import TreeBase from "../../state/tree/TreeBase";
import ISearchCase from "../../interfaces/state/Search/ISearchCase";
import U from "../gUtilities";
import ISearchBrief from "../../interfaces/state/Search/ISearchBrief";
import INodeBase from "../../interfaces/state/tree/INodeBase";
import NodeBase from "../../state/tree/NodeBase";


const gSearchTreeActions = {

    selectTree: (
        state: IState,
        searchCase: ISearchCase): IState => {

        if (!state
            || !searchCase
            || !searchCase.brief
            || U.isNullOrWhiteSpace(searchCase.brief.selectedKey) === true) {
            return state;
        }

        const searchBrief: ISearchBrief = searchCase.brief as ISearchBrief;
        const trees: Array<ITreeBase> = searchBrief.treeResults.results;

        const index: number = trees.findIndex((t: ITreeBase) => t.key === searchBrief.selectedKey);
        searchBrief.subtreeResults.selectedIndex = index;

        return gStateCode.cloneState(state);
    },

    buildTreeResults: (
        state: IState,
        response: any): IState => {

        if (!state
            || !state.lens.nodeTab.lensNode
            || !state.lens.nodeTab.lensNode.ui.subtreeSearch.brief
            || !response?.jsonData) {
                
            return state;
        }

        const buildTree = (rawTree: any): ITreeBase => {

            tree = new TreeBase();
            tree.key = rawTree.key;
            tree.r = rawTree.r;
            tree.created = rawTree.created;
            tree.description = rawTree.description;
            tree.notes = rawTree.notes;
            tree.name = rawTree.name;
            tree.title = rawTree.title;
            tree.owner = rawTree.owner;
            tree.isFlat = rawTree.isFlat;
            tree.isLoop = rawTree.isLoop;
            tree.allowDiscussionPlugins = rawTree.allowDiscussionPlugins ?? false;
            tree.allowOptionPlugins = rawTree.allowOptionPlugins ?? true;
            tree.allowDiscussionPluginAudio = rawTree.allowDiscussionPluginAudio ?? false;
            tree.folders = rawTree.folderJson;
            tree.token = rawTree.treeToken;
            tree.tags = U.joinByNewLine(rawTree.tags);

            return tree;
        };

        const buildRoot = (rawRoot: any): INodeBase => {

            root = new NodeBase();
            root.key = rawRoot.key;
            root.r = rawRoot.r;
            root.token = rawRoot.token;
            root.discussion = rawRoot.discussion;
            root.inputs = rawRoot.inputs;

            return root;
        };

        let trees: Array<ITreeBase> = [];
        let tree: ITreeBase;
        let root: INodeBase;

        response.values.forEach((result: any) => {

            tree = buildTree(result.tree);
            root = buildRoot(result.root);

            trees.push(tree);
        });

        state.lens.nodeTab.lensNode.ui.subtreeSearch.brief.treeResults.results = trees;

        return gStateCode.cloneState(state);
    }
};

export default gSearchTreeActions;
