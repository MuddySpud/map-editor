import IState from "../../interfaces/state/IState";
import gTreeCode from "./gTreeCode";
import ILens from "../../interfaces/state/ui/ILens";
import { TabType } from "../../interfaces/enums/TabType";
import { ActionType } from "../../interfaces/enums/ActionType";
import Request from "../../state/notifications/Request";
import gLensCode from "./gLensCode";
import U from "../gUtilities";
import gSubtreeCode from "./gSubtreeCode";
import gTabCode from "./gTabCode";
import ITreeSys from "../../interfaces/state/tree/ITreeSys";


// This is where all alerts to data changes should be made
const gTreesStateCode = {

    loadTrees: (
        state: IState,
        rawTrees: any): void => {

        if (!rawTrees) {

            return;
        }

        state.treesState.trees = gTreeCode.loadTrees(rawTrees.values);
        state.treesState.paginationDetails.totalItems = rawTrees.tota ?? 0;
        state.treesState.treesCount = rawTrees.total ?? 0;
        state.treesState.treesCount = state.treesState.treesCount < 0 ? 0 : state.treesState.treesCount;
    },

    updateTree: (
        state: IState,
        tree: ITreeSys): void => {

        const foundTree: ITreeSys | undefined = state.treesState.trees.find((treeSys: ITreeSys) => treeSys.key === tree.key);

        if (foundTree) {

            gTreeCode.updateTreeSys(
                foundTree,
                tree);
        }
    },

    registerTreeDataRequest: (
        name: string,
        state: IState,
        treeKey: string,
        action: ActionType): string => {

        const callID: string = U.generateGuid();

        state.treesState.openRequests.push(
            new Request(
                name,
                treeKey,
                callID,
                action,
                new Date(Date.now()),
                null
            )
        );

        return callID;
    },

    registerNodeDataRequest: (
        _name: string,
        _state: IState,
        _treeKey: string,
        _action: ActionType,
        _nodeKey: string): string => {

        const callID: string = U.generateGuid();

        // Don't save node requests for the time being

        return callID;
    },

    registerDataRequest: (
        _name: string,
        _state: IState,
        _treeKey: string,
        _action: ActionType): string => {

        const callID: string = U.generateGuid();

        // Don't save node requests for the time being

        return callID;
    },

    clearLensTrees: (state: IState): void => {

        state.lens.treeTab.ghostTree = null;
        state.lens.treeTab.cloneOriginalTree = null;
        state.lens.treeTab.lensTree = null;

        // Should these also be nulled????
        state.lens.treeTab.ghostSubtree = null;
        state.lens.treeTab.lensSubtree = null;
    },

    setLensTreeForUpdate: (state: IState): void => {

        const lens: ILens = state.lens;
        lens.treeTab.display = true;
        gLensCode.maximiseLens(state);

        gTabCode.setSelectedTab(
            state,
            TabType.Tree);
    },

    lensTreeTabDataIsValidDirty: (state: IState): boolean => {

        if (state.lens.treeTab.lensSubtree) {

            return gTreesStateCode.lensSubtreeIsValidDirty(state);
        }

        // if (state.lens.treeTab.lensBot) {

        //     return treesStateCode.lensSubtreeIsValidDirty(state);
        // }

        return gTreesStateCode.lensTreeIsValidDirty(state);
    },

    lensTreeIsValidDirty: (state: IState): boolean => {

        // This does not check to see if tree roots are dirty
        if (!state.lens.treeTab.lensTree) {

            return false;
        }

        if (!gTreeCode.validateTreeBase(state.lens.treeTab.lensTree)) {

            return false;
        }

        if (!gTreeCode.validateTreeNameGhost(state)) {

            return false;
        }

        if (!gTreeCode.isLensTreeDirty(state)) {

            return false;
        }

        return true;
    },

    lensSubtreeIsValidDirty: (state: IState): boolean => {

        if (!state.lens.treeTab.lensSubtree) {

            return false;
        }

        if (!gSubtreeCode.validateSubtreeSys(state.lens.treeTab.lensSubtree)) {

            return false;
        }

        if (!gSubtreeCode.isLenSubtreeDirty(state)) {

            return false;
        }

        return true;
    }
};

export default gTreesStateCode;

