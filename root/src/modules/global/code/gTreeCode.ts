import ITreeTab from "../../interfaces/state/ui/tabs/ITreeTab";
import IState from "../../interfaces/state/IState";
import ITreeSys from "../../interfaces/state/tree/ITreeSys";
import ITreeBase from "../../interfaces/state/tree/ITreeBase";
import { ActionType } from "../../interfaces/enums/ActionType";
import { NotificationType } from "../../interfaces/enums/NotificationType";
import IStringValidation from "../../interfaces/state/ui/IStringValidation";
import TreeSys from "../../state/tree/TreeSys";
import TreeBase from "../../state/tree/TreeBase";
import U from "../gUtilities";
import RegexChecks from "../../state/constants/RegexChecks";
import gTreesStateCode from "./gTreesStateCode";
import gStateCode from "./gStateCode";
import gNodeCode from "./gNodeCode";
import gLensCode from "./gLensCode";
import ITokenValidation from "../../interfaces/state/ui/ITokenValidation";
import TreeUI from "../../state/ui/UIs/TreeUI";
import ITabSave from "../../interfaces/state/ui/tabs/ITabSave";
import gStageCode from "./gStageCode";
import gTreeStatsActions from "../actions/gTreeStatsActions";
import { StageTitle } from "../../interfaces/enums/StageTitle";
import IStageBehaviour from "../../interfaces/behaviours/IStageBehaviour";
import gSubtreeCode from "./gSubtreeCode";
import gSubtreeActions from "../actions/gSubtreeActions";
import gBranchViewTreeCode from "./gBranchViewTreeCode";
import gTreesCoreActions from "../actions/gTreesCoreActions";
import gFilterCode from "./gFilterCode";
import ITreeFolder from "../../interfaces/state/tree/ITreeFolder";
import { FolderType } from "../../interfaces/enums/FolderType";
import TreeFolder from "../../state/tree/TreeFolder";
import ITreeProject from "../../interfaces/state/tree/ITreeProject";
import TreeProjectUI from "../../state/ui/UIs/TreeProjectUI";
import ISubtreeProject from "../../interfaces/state/tree/ISubtreeProject";
import SubtreeProject from "../../state/tree/SubtreeProject";


const gTreeCode = {

    getPublishTreeRequestBody: (
        state: IState,
        treeKey: string,
        token: string): { body: any, callID: string } => {

        const callID: string = gTreesStateCode.registerTreeDataRequest(
            'Publish tree',
            state,
            treeKey,
            ActionType.PublishTree
        );

        const body: any = {
            key: treeKey,
            token: token,
            action: ActionType.PublishTree
        };

        return {
            body,
            callID
        };
    },

    onSelectTreeTab: (state: IState): void => {

        if (!state) {
            return;
        }

        const stageBehaviour: IStageBehaviour = state.lens.treeTab.stageBehaviour as IStageBehaviour;
        const stageName: StageTitle = stageBehaviour.stages.name;

        if (stageName === StageTitle.LensTreeHub
            && state.lens.treeTab.lensTree
            && state.lens.treeTab.lensTree.ui.nodesChanged === true) {

            gStateCode.AddReLoadDataEffectImmediate(
                state,
                `refreshTreeStats`,
                state.lens.treeTab.lensTree.token,
                `${state.settings.apiUrl}/Tree/Stats`,
                gTreeCode.getRefreshTreeStatsRequestBody,
                gTreeStatsActions.refreshTreeStats
            );
        }
        else if (stageName === StageTitle.LensSubtreeHub
            && state.lens.treeTab.lensSubtree
            && state.lens.treeTab.lensSubtree.tree.ui.nodesChanged === true) {

            gStateCode.AddReLoadDataEffectImmediate(
                state,
                `reLoadSubtree`,
                state.lens.treeTab.lensSubtree.tree.token,
                `${state.settings.apiUrl}/Subtree/Details`,
                gSubtreeCode.getRefreshSubtreeRequestBody,
                gSubtreeActions.loadSubtree
            );

            gStateCode.AddReLoadDataEffectImmediate(
                state,
                `refreshTreeStats`,
                state.lens.treeTab.lensSubtree.tree.token,
                `${state.settings.apiUrl}/Tree/Stats`,
                gTreeCode.getRefreshTreeStatsRequestBody,
                gTreeStatsActions.refreshTreeStats
            );
        }
    },

    setLensTreeNodeChanges: (state: IState): void => {

        if (!state
            || !state.branchesState.tree
            || !state.lens.treeTab.lensTree
            || state.branchesState.tree.key !== state.lens.treeTab.lensTree.key) {
            return;
        }

        state.lens.treeTab.lensTree.ui.nodesChanged = true;

        if (!state.lens.treeTab.lensSubtree) {
            return;
        }

        state.lens.treeTab.lensSubtree.tree.ui.nodesChanged = true;;
    },

    prepareForHub: (state: IState): void => {

        gTreesStateCode.setLensTreeForUpdate(state);
        state.lens.treeTab.stageBehaviour = gStageCode.buildTreeHubStages();
    },

    convertToTreeSys: (tree: ITreeBase): ITreeSys => {

        const treeBase: any = tree;
        treeBase.ui = new TreeUI();

        return treeBase as ITreeSys;
    },

    convertToTreeProject: (tree: ITreeBase): ITreeProject => {

        const treeBase: any = tree;
        treeBase.ui = new TreeProjectUI();

        return treeBase as ITreeProject;
    },

    convertBranchesTreeToTreeSys: (state: IState): ITreeSys => {

        return gTreeCode.convertToTreeSys(state.branchesState.tree);
    },

    updateAllOpenTrees: (
        state: IState,
        tree: ITreeSys | null): void => {

        if (!tree) {
            return;
        }

        // Update tree in trees
        gTreesStateCode.updateTree(
            state,
            tree
        );

        // Update branchesView tree
        gBranchViewTreeCode.updateTree(
            state,
            tree)
    },

    reloadTrees: (state: IState): void => {

        gStateCode.AddReLoadDataEffect(
            state,
            `reLoadAllTrees`,
            null,
            `${state.settings.apiUrl}/Filter/Trees`,
            gFilterCode.getTreesAutoFilterRequestBody,
            gTreesCoreActions.loadViewOrBuildFresh
        );
    },

    reloadTreeStats: (state: IState): void => {

        if (U.isPositiveNumeric(state.treesState.selectedKey)) {

            gStateCode.AddReLoadDataEffect(
                state,
                `reLoadTreeStats`,
                null,
                `${state.settings.apiUrl}/Tree/Stats`,
                gTreeCode.getLensLoadTreeStatsRequestBody,
                gTreeStatsActions.loadTreeStats
            );
        }
    },

    overWriteLensTreeWithNotice: (
        state: IState,
        rawTree: any,
        notice: string): ITreeSys | null => {

        if (!rawTree?.jsonData) {

            return null;
        }

        gLensCode.checkResponse(
            state,
            rawTree.jsonData
        );

        state.lens.treeTab.saveLock = false;

        const loadedTree: ITreeSys | null = gTreeCode.loadLensTreeFromRaw(
            state,
            rawTree
        );

        if (!loadedTree) {

            return null;
        }

        if (U.isPositiveNumeric(loadedTree.key) === true) {

            state.treesState.selectedKey = loadedTree.key as string;
        }

        gStateCode.addNotification(
            state,
            notice,
            `Key: ${loadedTree.key}, 
Name: ${loadedTree.name}.`,
            loadedTree.token,
            NotificationType.Info
        );

        state.lens.treeTab.enableSave = true;

        return loadedTree;
    },

    loadLensTreeFromRaw: (
        state: IState,
        rawTree: any): ITreeSys | null => {

        const loadedTree: ITreeSys | null = gTreeCode.loadTreeSys(rawTree);

        return gTreeCode.loadLensTree(
            state,
            loadedTree
        );
    },

    loadLensTree: (
        state: IState,
        tree: ITreeSys | null): ITreeSys | null => {

        if (!tree) {

            return null;
        }

        gTreeCode.checkResponseTree(tree);

        const clearChildTreeTabs: boolean =
            U.isPositiveNumeric(tree?.key) === true
            && state.lens.treeTab.ghostTree?.key === tree?.key;

        gTreeCode.checkSafeTreeSwap(
            state,
            tree
        );

        if (clearChildTreeTabs === true) {

            gLensCode.clearChildTreeTabs(
                state,
                tree?.key);
        }

        gTreeCode.updateAllOpenTrees(
            state,
            tree);

        return tree;
    },

    checkSafeTreeSwap: (
        state: IState,
        tree: ITreeSys | null): void => {

        // Do trees have the same key?
        // If they don't then ghost tree etc must be null
        // If they do - does the lenstree match the new tree - if not why not?
        // If it doesn't and the lenstree does not match the ghost tree at the same point then keep the edit tree's values if we are in the editing tab
        // If not flag an error

        if (!state
            || !tree) {
            return;
        }

        const loadingKey: string | null = state.lens.treeTab.loadingKey;
        state.lens.treeTab.loadingKey = null;

        // console.log(`loadingKey: ${loadingKey}`);

        if (U.isPositiveNumeric(loadingKey) === true) {
            // Then the tree exists

            // console.log(`In positive loading key`);

            const success: boolean = gTreeCode.checkExistingTreeSwap(
                state,
                tree,
                loadingKey as string);

            if (success) {
                return;
            }
        }
        else if (U.isNegativeNumeric(loadingKey) === true) {
            // Then is a new tree

            // console.log(`In negative loading key`);

            const success: boolean = gTreeCode.checkNewTreeSwap(
                state,
                tree);

            if (success) {

                // console.log(`checkSafeTreeSwap succes === true`); // uncomment this if it failing on new tree for no reason...

                return;
            }
        }
        else {
            throw new Error("LoadingKey has not been set");
        }

        // Need to know what to do at this point
        // Do we ask the user if they want to refresh?
        // Discard?
        // Get the user to refresh themselves?
        throw new Error("The lens tree did not match the loaded tree");
    },

    checkExistingTreeSwap: (
        state: IState,
        tree: ITreeSys,
        loadingKey: string): boolean => {

        if (tree.key !== loadingKey) {

            throw new Error("The loaded tree does not match the loadingKey");
        }

        if (loadingKey !== state.treesState.selectedKey) {

            throw new Error("The loadingKey does not match the selectedKey");
        }

        if (!state.lens.treeTab.ghostTree) {
            // Then this is the first load
            state.lens.treeTab.ghostTree = tree;
            state.lens.treeTab.lensTree = gTreeCode.cloneTree(tree);

            return true;
        }

        if (!state.lens.treeTab.lensTree) {

            throw new Error("The lens tree was null");
        }

        if (gTreeCode.isLensTreeDirty(state) === false) {

            state.lens.treeTab.ghostTree = tree;
            state.lens.treeTab.lensTree = gTreeCode.cloneTree(tree);

            return true;
        }

        const loadedAndLensTreesMatch: boolean = gTreeCode.checkTreeImmutablesMatch(
            state.lens.treeTab.lensTree,
            tree
        );

        if (loadedAndLensTreesMatch === true) {

            state.lens.treeTab.ghostTree = tree;
            state.lens.treeTab.lensTree = gTreeCode.cloneTree(tree);

            return true;
        }

        // Nhat do we do if the lensTree is dirty and lensTree doesn't match the loaded tree?
        // Do we swap?
        return false;
    },

    checkNewTreeSwap: (
        state: IState,
        tree: ITreeSys): boolean => {

        // console.log("In checkNewTreeSwap");

        if (!state.lens.treeTab.lensTree) {

            throw new Error("The lens tree was null");
        }

        const match = gTreeCode.checkTreeSysEditsMatch(
            state.lens.treeTab.lensTree,
            tree);

        if (match === true) {

            // console.log(`Match === true`);

            state.lens.treeTab.ghostTree = tree;
            state.lens.treeTab.lensTree = gTreeCode.cloneTree(tree);

            return true;
        }

        return false;
    },

    setSelectedTreeKey: (
        state: IState,
        treeKey: string): void => {

        state.treesState.selectedKey = treeKey;
    },

    checkResponseTree: (tree: ITreeSys | null): void => {

        if (!tree
            || U.isNullOrWhiteSpace(tree.key) === true
            || U.isNullOrWhiteSpace(tree.token) === true
            || U.isNullOrWhiteSpace(tree.name) === true
            || !tree.created) {

            throw new Error("Response tree was not complete.");
        }
    },

    createLensTree: (state: IState): void => {

        if (!state
            || U.isNullOrWhiteSpace(state.treesState.selectedKey) === true) {
            return;
        }

        const tree: ITreeSys = new TreeSys(state.treesState.selectedKey);
        tree.action = ActionType.CreateTree;
        state.lens.treeTab.ghostTree = tree;
        state.lens.treeTab.lensTree = gTreeCode.cloneTree(tree);
    },

    createCloneLensTree: (state: IState): void => {

        if (!state
            || U.isNullOrWhiteSpace(state.treesState.selectedKey) === true) {
            return;
        }

        const tree: ITreeSys = new TreeSys(gStateCode.getFreshKey(state));
        tree.action = ActionType.CloneTree;
        tree.description = `Cloned from the tree: ${state.lens.treeTab.ghostTree?.name}`;
        tree.token = state.lens.treeTab.ghostTree?.token as string;
        state.lens.treeTab.cloneOriginalTree = state.lens.treeTab.ghostTree;
        state.lens.treeTab.ghostTree = tree;
        state.lens.treeTab.lensTree = gTreeCode.cloneTree(tree);
    },

    loadTreeSys: (rawTree: any): ITreeSys | null => {

        const tree: ITreeBase | null = gTreeCode.loadTreeShallow(rawTree);

        if (!tree) {

            return null;
        }

        const treeSys: ITreeSys = gTreeCode.convertToTreeSys(tree);
        treeSys.isBot = rawTree.isBot;
        treeSys.isSubtree = rawTree.isSubtree;
        treeSys.deleteLock = rawTree.deleteLock;

        const root = gNodeCode.loadNode(rawTree.root);

        if (root) {

            treeSys.root = root;
        }

        return treeSys;
    },

    loadTreeProject: (rawTree: any): ITreeProject | null => {

        const tree: ITreeBase | null = gTreeCode.loadTreeShallow(rawTree);

        if (!tree) {

            return null;
        }

        const treeProject: ITreeProject = gTreeCode.convertToTreeProject(tree);
        treeProject.isBot = rawTree.isBot;
        treeProject.isSubtree = rawTree.isSubtree;
        treeProject.deleteLock = rawTree.deleteLock;

        treeProject.aux = gTreeCode.parseTreeFolderJson(tree.folders);
        treeProject.subtrees = gTreeCode.loadSubtreeFolders(rawTree.subtrees);

        const root = gNodeCode.loadNode(rawTree.root);

        if (root) {

            treeProject.root = root;
        }

        treeProject.ui.loaded = true;

        return treeProject;
    },

    loadSubtreeProject: (rawTree: any): ISubtreeProject | null => {

        const treeproject: ITreeProject | null = gTreeCode.loadTreeProject(rawTree);

        if (!treeproject) {

            return null;
        }

        const subtreeProject: ISubtreeProject = treeproject as ISubtreeProject;
        subtreeProject.hasChildren = subtreeProject.subtrees.length > 0;

        return subtreeProject;
    },

    loadSubtreeFolders: (subtrees: any[]): Array<ISubtreeProject> => {

        if (!subtrees
            || !subtrees.length
            || subtrees.length === 0) {

            return [];
        }

        const subtreeFolders: Array<ISubtreeProject> = [];
        let subtreeFolder: ISubtreeProject;

        subtrees.forEach((subtree: any) => {

            subtreeFolder = new SubtreeProject(subtree.key);
            subtreeFolder.name = subtree.name;
            subtreeFolder.token = subtree.token;
            subtreeFolder.hasChildren = subtree.hasChildren;
            subtreeFolder.isSubtree = true;

            subtreeFolders.push(subtreeFolder);
        });

        return subtreeFolders;
    },

    loadTreeShallow: (rawTree: any): ITreeBase | null => {

        if (!rawTree
            || U.isNullOrWhiteSpace(rawTree.key) === true) {

            return null;
        }

        const tree: ITreeBase = new TreeBase();

        tree.key = rawTree.key;
        tree.r = rawTree.r;
        tree.token = rawTree.token;
        tree.name = rawTree.name;
        tree.title = rawTree.title;
        tree.description = rawTree.description;
        tree.notes = rawTree.notes;
        tree.owner = rawTree.owner;
        tree.isFlat = rawTree.isFlat;
        tree.isLoop = rawTree.isLoop;
        tree.allowDiscussionPlugins = rawTree.allowDiscussionPlugins ?? false;
        tree.allowOptionPlugins = rawTree.allowOptionPlugins ?? true;
        tree.allowDiscussionPluginAudio = rawTree.allowDiscussionPluginAudio ?? false;
        tree.created = rawTree.created;
        tree.tags = U.joinByNewLine(rawTree.tags);
        tree.action = rawTree.action;
        tree.folders = rawTree.folderJson;

        return tree;
    },

    loadTreesShallow: (rawTrees: any[]): Array<ITreeBase> => {

        const trees: Array<ITreeBase> = [];

        if (!rawTrees) {
            return trees;
        }

        let tree: ITreeBase | null;

        rawTrees.forEach((rawTree: any) => {

            tree = gTreeCode.loadTreeShallow(rawTree);

            if (tree) {

                trees.push(tree);
            }
        });

        return trees;
    },

    cloneTree: (input: ITreeSys): ITreeSys | null => {

        if (!input
            || U.isNullOrWhiteSpace(input.key) === true) {
            return null;
        }

        const tree: ITreeSys = new TreeSys(input.key as string);

        tree.r = input.r;
        tree.token = input.token;
        tree.name = input.name;
        tree.title = input.title;
        tree.description = input.description;
        tree.notes = input.notes;
        tree.isBot = input.isBot;
        tree.owner = input.owner;
        tree.isFlat = input.isFlat;
        tree.isLoop = input.isLoop;
        tree.allowDiscussionPlugins = input.allowDiscussionPlugins ?? false;
        tree.allowOptionPlugins = input.allowOptionPlugins ?? true;
        tree.allowDiscussionPluginAudio = input.allowDiscussionPluginAudio ?? false;
        tree.created = input.created;
        tree.folders = input.folders;
        tree.isSubtree = input.isSubtree;
        tree.deleteLock = input.deleteLock;
        tree.tags = input.tags;
        tree.action = input.action;

        if (input.root) {

            tree.root = gNodeCode.cloneNodeAndOptions(
                input.root,
                false);
        }

        return tree;
    },

    updateTreeSys: (
        original: ITreeSys,
        template: ITreeSys): void => {

        if (!original
            || !template
            || U.isNullOrWhiteSpace(template.key) === true) {
            return;
        }

        gTreeCode.updateTreeBase(
            original,
            template
        );

        original.isBot = template.isBot;
        original.isSubtree = template.isSubtree;
        original.deleteLock = template.deleteLock;
    },

    updateTreeBase: (
        original: ITreeBase,
        template: ITreeBase): void => {

        if (!original
            || !template
            || U.isNullOrWhiteSpace(template.key) === true) {
            return;
        }

        original.r = template.r;
        original.token = template.token;
        original.name = template.name;
        original.title = template.title;
        original.description = template.description;
        original.notes = template.notes;
        original.owner = template.owner;
        original.isFlat = template.isFlat;
        original.isLoop = template.isLoop;
        original.allowDiscussionPlugins = template.allowDiscussionPlugins ?? false;
        original.allowOptionPlugins = template.allowOptionPlugins ?? true;
        original.allowDiscussionPluginAudio = template.allowDiscussionPluginAudio ?? false;
        original.created = template.created;
        original.folders = template.folders;
        original.tags = template.tags;
    },

    prepareForSwitchTrees: (state: IState): void => {

        const treeTab: ITreeTab = state.lens.treeTab;
        treeTab.enableSave = true;
        treeTab.saveLock = false;
    },

    resetEdits: (state: IState): void => {

        const treeTab: ITreeTab = state.lens.treeTab;
        treeTab.lensTree = treeTab.ghostTree;
        treeTab.enableSave = true;
        treeTab.saveLock = false;

        if (treeTab.lensTree) {

            treeTab.lensTree.action = ActionType.None;
        }
    },

    clearTreeTab: (state: IState): void => {

        const treeTab: ITreeTab = state.lens.treeTab;
        treeTab.lensTree = null;
        treeTab.ghostTree = null;
        treeTab.cloneOriginalTree = null;
        treeTab.lensSubtree = null;
        treeTab.ghostSubtree = null;
        treeTab.display = false;
        state.treesState.selectedKey = "";
        treeTab.saveLock = false;
        treeTab.enableSave = true;
        treeTab.holes = [];
        treeTab.stats = null;
    },

    isLensTreeDirty: (state: IState): boolean => {

        // This does not check the tree roots...
        if (!state
            || !state.lens.treeTab.lensTree
            || !state.lens.treeTab.ghostTree) {

            return false;
        }

        return gTreeCode.checkTreeSysMatchExactly(
            state.lens.treeTab.lensTree,
            state.lens.treeTab.ghostTree) === false;
    },

    checkTreeSysMatchExactly: (
        tree1: ITreeSys,
        tree2: ITreeSys): boolean => {

        return gTreeCode.checkTreeBasesMatchExactly(
            tree1,
            tree2
        );
    },

    checkTreeBasesMatchExactly: (
        tree1: ITreeBase,
        tree2: ITreeBase): boolean => {

        const propMatch: boolean = gTreeCode.checkTreeBasesMatch(
            tree1,
            tree2
        );

        if (!propMatch) {

            return false;
        }

        const same: boolean = tree1.r === tree2.r;

        return same;
    },

    checkTreeSysMatch: (
        tree1: ITreeSys,
        tree2: ITreeSys): boolean => {

        return gTreeCode.checkTreeBasesMatch(
            tree1,
            tree2
        );
    },

    checkTreeSysEditsMatch: (
        tree1: ITreeSys,
        tree2: ITreeSys): boolean => {

        // console.log("In checkNewTreeSwap");

        return gTreeCode.checkTreeBasesEditsMatch(
            tree1,
            tree2
        );
    },

    checkTreeBasesMatch: (
        tree1: ITreeBase,
        tree2: ITreeBase): boolean => {

        if (!tree1
            || !tree2) {

            return false;
        }

        if (tree1.key !== tree2.key
            || tree1.name !== tree2.name
            || tree1.title !== tree2.title
            || tree1.description !== tree2.description
            || tree1.token !== tree2.token
            || tree1.created !== tree2.created
            || tree1.owner !== tree2.owner
            || tree1.isFlat !== tree2.isFlat
            || tree1.isLoop !== tree2.isLoop
            || tree1.allowDiscussionPlugins !== tree2.allowDiscussionPlugins
            || tree1.allowOptionPlugins !== tree2.allowOptionPlugins
            || tree1.allowDiscussionPluginAudio !== tree2.allowDiscussionPluginAudio
            || tree1.folders !== tree2.folders
            || (U.joinByNewLine(U.splitByNewLineAndOrder(tree1.tags))
                !== U.joinByNewLine(U.splitByNewLineAndOrder(tree2.tags)))) {

            return false;
        }

        return true;
    },

    checkTreeImmutablesMatch: (
        tree1: ITreeBase,
        tree2: ITreeBase): boolean => {

        if (!tree1
            || !tree2) {

            return false;
        }

        if (tree1.key !== tree2.key
            || tree1.token !== tree2.token
            || tree1.created !== tree2.created
            || tree1.owner !== tree2.owner
            || tree1.isFlat !== tree2.isFlat
            || tree1.isLoop !== tree2.isLoop) {

            return false;
        }

        return true;
    },

    checkTreeBasesEditsMatch: (
        tree1: ITreeBase,
        tree2: ITreeBase): boolean => {

        // console.log("In checkNewTreeSwap");

        if (!tree1
            || !tree2) {

            return false;
        }

        //         console.log(`In checkTreeBasesEditsMatch
        // tree1.name = ${tree1.name}
        // tree2.name = ${tree2.name}
        // tree1.description = ${tree1.description}
        // tree2.description = ${tree2.description}
        // tree1.tags = ${tree1.tags}
        // tree2.tags = ${tree2.tags}
        // `);

        if (tree1.name !== tree2.name
            || tree1.description !== tree2.description
            || tree1.tags !== tree2.tags) {

            // console.log("Return true");

            return false;
        }

        // console.log("Return false");

        return true;
    },

    clearTreeBaseErrors: (tree: ITreeBase): void => {

        tree.errors = new Array<string>();
    },

    clearTreeSysErrors: (tree: ITreeSys): void => {

        gTreeCode.clearTreeBaseErrors(tree);
        gNodeCode.clearErrors(tree.root);
    },

    setError: (
        tree: ITreeBase,
        error: string): void => {

        if (!tree.errors.includes(error)) {

            tree.errors.push(error);
        }
    },

    validateTabForNewTree: (
        state: IState,
        tab: ITabSave,
        tree: ITreeBase): void => {

        tab.enableSave = gTreeCode.isNewTreeValid(
            state,
            tree);
    },

    validateTreeNameGhost: (state: IState): boolean => {

        return gTreeCode.validateTreeName(
            state,
            state.lens.treeTab.lensTree as ITreeBase,
            state.lens.treeTab.ghostTree as ITreeBase
        );
    },

    validateTreeName: (
        state: IState,
        tree: ITreeBase,
        ghostTree: ITreeBase | null = null): boolean => {

        if (!state
            || !tree) {

            return false;
        }

        const treeNameValidation: IStringValidation = state.lens.validationResults.treeName;

        if (treeNameValidation.value.length > 0
            && treeNameValidation.value === tree.name
            && treeNameValidation.success === false) {

            if (!ghostTree) {

                gTreeCode.setError(
                    tree,
                    `Name already exists. `
                );
            }
            else if (ghostTree.name !== tree.name) {

                gTreeCode.setError(
                    tree,
                    `Name already exists. `
                );
            }

            return false;
        }

        return true;
    },

    isNewTreeValid: (
        state: IState,
        tree: ITreeBase): boolean => {

        return gTreeCode.validateTreeName(state, tree)
            && gTreeCode.validateTreeBase(tree);
    },

    getTokenErrors: (
        state: IState,
        token: string): Array<string> => {

        if (!state) {

            return [];
        }

        if (U.isNullOrWhiteSpace(token) === true) {

            return ["Token cannot be empty"];
        }

        const tokenValidation: ITokenValidation = state.lens.validationResults.treeToken;

        if (tokenValidation.value === token
            && tokenValidation.success === false) {

            return ["Token does not match any existing trees"];
        }

        return [];
    },

    getTokenSelection: (
        state: IState,
        token: string): Array<ITreeBase> => {

        if (!state) {

            return [];
        }

        const tokenValidation: ITokenValidation = state.lens.validationResults.treeToken;

        if (tokenValidation.value === token) {

            return tokenValidation.matching;
        }

        return [];
    },

    getAllTreesRequestBody: (state: IState): { body: any, callID: string } => {

        const callID: string = gTreesStateCode.registerTreeDataRequest(
            'Get trees',
            state,
            "",
            ActionType.GetTrees
        );

        const body: any = {
            start: state.treesState.paginationDetails.start,
            batchSize: state.treesState.paginationDetails.count,
            action: ActionType.GetTrees
        };

        return {
            body,
            callID
        };
    },

    getFilterTreesRequestBody: (state: IState): { body: any, callID: string } => {

        const callID: string = gTreesStateCode.registerTreeDataRequest(
            'Filter trees',
            state,
            "",
            ActionType.FilterTrees
        );

        const body: any = {
            start: state.treesState.paginationDetails.start,
            batchSize: state.treesState.paginationDetails.count,
            action: ActionType.FilterTrees
        };

        return {
            body,
            callID
        };
    },

    getTreeRequestBody: (
        state: IState,
        tree: ITreeBase): { body: any, callID: string } => {

        const callID: string = gTreesStateCode.registerTreeDataRequest(
            'Save tree',
            state,
            tree.key as string,
            tree.action
        );

        let body: any = {
            key: tree.key,
            r: tree.r,
            name: tree.name,
            title: tree.title,
            description: tree.description,
            notes: tree.notes,
            token: tree.token,
            owner: tree.owner,
            isFlat: tree.isFlat,
            isLoop: tree.isLoop,
            allowDiscussionPlugins: tree.allowDiscussionPlugins,
            allowOptionPlugins: tree.allowOptionPlugins,
            allowDiscussionPluginAudio: tree.allowDiscussionPluginAudio,
            folders: tree.folders,
            tags: U.splitByNewLineAndOrder(tree.tags),
            action: tree.action.toString()
        };

        return {
            body,
            callID
        };
    },

    stripTreeFolders: (folders: Array<ITreeFolder>): any[] => {

        const results: any[] = [];
        let result: any;

        folders.forEach((folder: ITreeFolder) => {

            result = {
                n: folder.name
            };

            if (folder.type === FolderType.Tree) {

                result.k = folder.key;
            }
            else if (folder.type === FolderType.Folder
                && folder.folders.length > 0) {

                result.f = gTreeCode.stripTreeFolders(folders);
            }
            else {
                alert(`Not coded for folderType: ${folder.folders}`);
            }

            results.push(result);
        });

        return results;
    },

    getTreeFolderJson: (folders: Array<ITreeFolder>): string => {

        const result: any[] = gTreeCode.stripTreeFolders(folders);

        return JSON.stringify(result);
    },

    parseTreeFolderJson: (folderJson: string): Array<ITreeFolder> => {

        if (U.isNullOrWhiteSpace(folderJson)) {

            return [];
        }
        const foldersRaw: any[] = JSON.parse(folderJson);

        return gTreeCode.buildTreeFolder(foldersRaw);
    },

    buildTreeFolder: (rawFolders: any[]): Array<ITreeFolder> => {

        const folders: Array<ITreeFolder> = [];
        let folder: ITreeFolder;

        rawFolders.forEach((rawFolder: any) => {

            folder = new TreeFolder(rawFolder.n);

            if (!U.isPositiveNumeric(rawFolder.k)) {

                folder.key = rawFolder.k;
                folder.type = FolderType.Tree;
            }
            else {
                folder.type = FolderType.Folder;

                if (rawFolder.f
                    && rawFolder.f.length > 0) {

                    folder.folders = gTreeCode.buildTreeFolder(rawFolder.f);
                }
            }

            folders.push(folder);
        });

        return folders;
    },

    getDeleteTreeRequestBody: (
        state: IState,
        tree: ITreeBase): { body: any, callID: string } => {

        const callID: string = gTreesStateCode.registerTreeDataRequest(
            'Delete tree',
            state,
            tree.key as string,
            ActionType.DeleteTree
        );

        const body: any = {
            key: tree.key,
            r: tree.r,
            token: tree.token,
            action: tree.action.toString()
        };

        return {
            body,
            callID
        };
    },

    getTreeKeyRequestBody: (
        state: IState,
        treeKey: string): { body: any, callID: string } => {

        const callID: string = gTreesStateCode.registerTreeDataRequest(
            'Get tree',
            state,
            treeKey,
            ActionType.GetTree
        );

        const body: any = {
            key: treeKey,
            action: ActionType.GetTree
        };

        return {
            body,
            callID
        };
    },

    getTreeProjectRequestBody: (
        state: IState,
        treeKey: string): { body: any, callID: string } => {

        const callID: string = gTreesStateCode.registerTreeDataRequest(
            'Get tree project',
            state,
            treeKey,
            ActionType.GetTreeProject
        );

        const body: any = {
            key: treeKey,
            action: ActionType.GetTreeProject
        };

        return {
            body,
            callID
        };
    },

    getTreeValidationRequestBody: (
        state: IState,
        treeKey: string,
        token: string,
        isSubtree: boolean): { body: any, callID: string } => {

        const callID: string = gTreesStateCode.registerTreeDataRequest(
            'Validate tree',
            state,
            treeKey,
            ActionType.ValidateTree
        );

        const body: any = {
            key: treeKey,
            token: token,
            action: isSubtree === true ? ActionType.ValidateSubtree : ActionType.ValidateTree
        };

        return {
            body,
            callID
        };
    },

    getRefreshTreeStatsRequestBody: (state: IState): { body: any, callID: string, callChain: Array<string>, success: boolean } => {

        const treeKey: string = state.lens.treeTab.lensTree?.key as string;

        const callID: string = gTreesStateCode.registerTreeDataRequest(
            'Refresh tree stats',
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

    getLoadTreeStatsRequestBody: (
        state: IState,
        treeKey: string): { body: any, callID: string, callChain: Array<string>, success: boolean } => {

        const callID: string = gTreesStateCode.registerTreeDataRequest(
            'Get tree stats',
            state,
            treeKey,
            ActionType.GetTreeStats
        );

        const body: any = {
            key: treeKey,
            action: ActionType.GetTreeStats
        };

        return {
            body,
            callID,
            callChain: [],
            success: true
        };
    },

    getLensLoadTreeStatsRequestBody: (state: IState): { body: any, callID: string, callChain: Array<string>, success: boolean } => {

        return gTreeCode.getLoadTreeStatsRequestBody(
            state,
            state.treesState.selectedKey
        );
    },

    getValidateTreeNameRequestBody: (
        state: IState,
        name: string): { body: any, callID: string } => {

        const callID: string = gTreesStateCode.registerTreeDataRequest(
            'Validate tree name',
            state,
            '',
            ActionType.ValidateTreeName
        );

        const body: any = {
            name: name,
            action: ActionType.ValidateTreeName
        };

        return {
            body,
            callID
        };
    },

    getTreeForCLONE: (state: IState): { body: any, callID: string } => {

        const treeTab: ITreeTab = state.lens.treeTab;

        const callID: string = gTreesStateCode.registerTreeDataRequest(
            'Clone tree',
            state,
            treeTab.lensTree?.key as string,
            ActionType.CloneTree
        );

        const lensTree: ITreeSys = treeTab.lensTree as ITreeSys;
        const ghostTree: ITreeSys = treeTab.ghostTree as ITreeSys;

        let body: any = {
            cloneName: lensTree.name,
            cloneTitle: lensTree.title,
            cloneDescription: lensTree.description,
            cloneTags: U.splitByNewLine(lensTree.tags),
            originalToken: ghostTree.token,
            originalR: ghostTree.r,
            action: lensTree.action.toString()
        };

        return {
            body,
            callID
        };
    },

    validateLensTree: (state: IState): boolean => {

        const valid: boolean = gTreesStateCode.lensTreeIsValidDirty(state);
        state.lens.treeTab.enableSave = valid;

        return valid;
    },

    validateTreeSys: (tree: ITreeSys): boolean => {

        const treeValid: boolean = gTreeCode.validateTreeBase(tree);
        const rootValid: boolean = gNodeCode.validateRoot(tree.root);

        return treeValid
            && rootValid;
    },

    validateTreeBase: (tree: ITreeBase): boolean => {

        if (tree.action === ActionType.DeleteTree) {
            // Don't need to validate anything for a delete.
            return true;
        }

        gTreeCode.clearTreeBaseErrors(tree);

        if (U.isNullOrWhiteSpace(tree.name) === true) {

            gTreeCode.setError(
                tree,
                `Name cannot be empty. `
            );
        }
        else if (RegexChecks.treeName.test(tree.name) === false) {

            gTreeCode.setError(
                tree,
                `Name can only consist of letters, digits, underscore and hyphen. `
            );
        }

        if (U.isNullOrWhiteSpace(tree.key) === true) {

            gTreeCode.setError(
                tree,
                `Key cannot be empty. `
            );
        }

        if (tree.action === ActionType.UpdateTree
            && U.isNullOrWhiteSpace(tree.token) === true) {
            // Don't need to validate token for a create.

            gTreeCode.setError(
                tree,
                `Token cannot be empty. `
            );
        }

        return tree.errors.length === 0;
    },

    loadTrees: (rawTrees: any[]): Array<ITreeSys> => {

        const trees: Array<ITreeSys> = [];

        if (!rawTrees
            || rawTrees.length === 0) {

            return trees;
        }

        let tree: ITreeSys | null;

        rawTrees.forEach((rawTree: any) => {

            tree = gTreeCode.loadTreeSys(rawTree);

            if (tree) {
                trees.push(tree);
            }
        });

        return trees;
    },

    getTreeFromState: (
        state: IState,
        treeKey: string): ITreeSys | null => {

        if (!state
            || state.treesState.trees.length === 0) {

            return null;
        }

        const trees: Array<ITreeSys> = state.treesState.trees;

        const tree: ITreeSys | undefined = trees.find((tree: ITreeSys) => {

            return tree.key === treeKey;
        });

        if (tree) {

            return tree;
        }

        return null;
    }
};

export default gTreeCode;

