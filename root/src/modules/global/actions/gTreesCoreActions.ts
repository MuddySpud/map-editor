import IState from "../../interfaces/state/IState";
import IStateAnyArray from "../../interfaces/state/IStateAnyArray";
import gStateCode from "../code/gStateCode";
import gTreesStateCode from "../code/gTreesStateCode";
import U from "../gUtilities";
import gStageCode from "../code/gStageCode";
import gTreeEffects from "../effects/gTreeEffects";
import gTreeCode from "../code/gTreeCode";
import { ActionType } from "../../interfaces/enums/ActionType";
import ITreeTab from "../../interfaces/state/ui/tabs/ITreeTab";
import gSession from "../gSession";
import Filters from "../../state/constants/Filters";
import gSubtreeEffects from "../effects/gSubtreeEffects";
import { LensActionType } from "../../interfaces/enums/LensActionType";
import gHubActions from "../hubs/gHubActions";
import gLensCode from "../code/gLensCode";
import { LensStage } from "../../interfaces/enums/LensStage";
import gHistoryCode from "../code/gHistoryCode";
import gShapeCode from "../code/gShapeCode";
import gTagsCode from "../code/gTagsCode";
import gSpreadCode from "../code/gSpreadCode";
import ITreeSys from "../../interfaces/state/tree/ITreeSys";
import gSubtreeCode from "../code/gSubtreeCode";
import gFilterCode from "../code/gFilterCode";
import ITreeStats from "../../interfaces/state/tree/ITreeStats";


const gTreesCoreActions = {

    reloadTrees: (state: IState): IState => {

        gTreeCode.reloadTrees(state);
        gTreeCode.reloadTreeStats(state);

        return gStateCode.cloneState(state);
    },

    reloadTreesAndClearStats: (state: IState): IState => {

        gTreeCode.reloadTrees(state);
        state.lens.treeTab.stats = null;

        return gStateCode.cloneState(state);
    },

    loadViewOrBuildFresh: (
        state: IState,
        response: any): IStateAnyArray => {

        if (!response?.jsonData) {

            return state;
        }

        gLensCode.checkResponse(
            state,
            response.jsonData
        );

        if (!gFilterCode.checkResponseCurrent(state, response.jsonData)) {

            return gStateCode.cloneState(state);
        }

        gTreesStateCode.loadTrees(
            state,
            response.jsonData);

        state.loading = false;

        if (U.isPositiveNumeric(state.treesState.selectedKey) === true) {

            if (state.lens.treeTab.stageBehaviour.getStage() === LensStage.None) {

                return gTreesCoreActions.completeTreeSelection(
                    state,
                    LensActionType.ShowTreeHub);
            }
        }

        return gStateCode.cloneState(state);
    },

    completeTreeSelection: (
        state: IState,
        lensActionType: LensActionType): IStateAnyArray => {

        gTreeCode.prepareForSwitchTrees(state);
        state.treesState.selectedKey = state.treesState.queuedKey;

        if (lensActionType === LensActionType.ViewBranches) {

            return gHubActions.showTreeBranches(
                state,
                state.treesState.selectedKey);
        }
        else if (lensActionType === LensActionType.ViewProject) {

            return gHubActions.showTreeProject(
                state,
                state.treesState.selectedKey);
        }
        else if (lensActionType === LensActionType.ShowSubtreeHub) {

            return gTreesCoreActions.setupForSubtreeHubOrCreate(state);
        }
        else if (lensActionType === LensActionType.ShowBotHub) {

            return gTreesCoreActions.setupForBotHub(state);
        }
        else if (lensActionType === LensActionType.ShowTreeEditor) {

            return gTreesCoreActions.setupForEditTree(state);
        }

        gTreesStateCode.clearLensTrees(state);

        if (lensActionType === LensActionType.ShowTreeHub) {

            return gTreesCoreActions.setupForHub(state);
        }
        else if (lensActionType === LensActionType.CreateTree) {

            return gTreesCoreActions.setupForCreateTree(state);
        }

        return gTreesCoreActions.setupForHub(state);
    },

    setupForHub: (state: IState): IStateAnyArray => {

        let loadTree: boolean = state.treesState.selectedKey !== state.lens.treeTab.lensTree?.key;
        gTreeCode.prepareForHub(state);

        if (!loadTree) {

            return [
                gStateCode.cloneState(state),
                gTreeEffects.getTreeStats(state)
            ];
        }

        state.lens.treeTab.loadingKey = state.treesState.selectedKey;

        return [
            state, // return state as re-draw will happen with tree load
            gTreeEffects.getTreeStats(state),
            gTreeEffects.getTree(state)
        ];
    },

    setupForSubtreeHubOrCreate: (state: IState): IStateAnyArray => {

        let tree: ITreeSys | null = state.lens.treeTab.lensTree;

        if (state.treesState.selectedKey !== tree?.key
            && U.isPositiveNumeric(state.treesState.selectedKey) === true) {

            tree = gTreeCode.getTreeFromState(
                state,
                state.treesState.selectedKey
            );
        }

        if (!tree) {
            // Can't do anything as have no key
            throw new Error("Need a treeKey to load a subtree");
        }

        if (!tree.isSubtree) {

            return gTreesCoreActions.setupForCreateSubtree(state);
        }

        return gTreesCoreActions.setupForSubtreeHub(
            state,
            tree);
    },

    setupForSubtreeHub: (
        state: IState,
        lensTree: ITreeSys): IStateAnyArray => {

        const treeTab: ITreeTab = state.lens.treeTab;
        const stats: ITreeStats | null = treeTab.stats;

        let loadSubtree: boolean = state.treesState.selectedKey !== treeTab.lensSubtree?.tree.key;
        gTreesStateCode.setLensTreeForUpdate(state);
        treeTab.stageBehaviour = gStageCode.buildSubtreeHubStages();

        let stateArray: IStateAnyArray = [
            state // return state as re-draw will happen with subtree load
        ];

        if (!stats) {
            // Redraw straight away
            stateArray[1] = gTreeEffects.getTreeStats(state);
        }

        if (!loadSubtree) {

            stateArray[0] = gStateCode.cloneState(state);

            return stateArray;
        }

        stateArray.push(
            gSubtreeEffects.getSubtree(
                state,
                lensTree)
        );

        state.lens.treeTab.loadingKey = state.treesState.selectedKey;

        return stateArray;
    },

    setupForBotHub: (state: IState): IStateAnyArray => {

        gTreesStateCode.setLensTreeForUpdate(state);
        state.lens.treeTab.stageBehaviour = gStageCode.buildPublishHubStages();

        return gStateCode.cloneState(state);
    },

    setupForCreateTree: (state: IState): IState => {

        gTreesStateCode.setLensTreeForUpdate(state);
        gTreeCode.createLensTree(state);
        state.lens.treeTab.stageBehaviour = gStageCode.buildCreateTreeStages();
        gSession.setFocusFilter(Filters.treeNameFocusFilter);

        return gStateCode.cloneState(state);
    },

    setupForEditTree: (state: IState): IStateAnyArray => {

        // The tree should have already been set up for the hub
        let loadTree: boolean = state.treesState.selectedKey !== state.lens.treeTab.lensTree?.key;
        const treeTab: ITreeTab = state.lens.treeTab;
        gTreesStateCode.setLensTreeForUpdate(state);
        gSession.setFocusFilter(Filters.treeNameFocusFilter);

        if (treeTab.lensTree) {

            treeTab.lensTree.action = ActionType.UpdateTree;
        }

        treeTab.stageBehaviour = gStageCode.buildEditTreeStages();

        if (!loadTree) {

            return gStateCode.cloneState(state);
        }

        state.lens.treeTab.loadingKey = state.treesState.selectedKey;

        return [
            gStateCode.cloneState(state),
            gTreeEffects.getTree(state)
        ];
    },

    setupForEditSubtree: (state: IState): IState => {

        const treeTab: ITreeTab = state.lens.treeTab;

        // The tree should have already been set up for the hub
        let loadSubtree: boolean = state.treesState.selectedKey !== treeTab.lensSubtree?.tree.key;

        gTreesStateCode.setLensTreeForUpdate(state);
        state.lens.treeTab.loadingKey = state.treesState.selectedKey;

        if (treeTab.lensSubtree) {

            treeTab.lensSubtree.action = ActionType.UpdateSubtree;
        }

        treeTab.stageBehaviour = gStageCode.buildEditSubtreeStages();

        if (!loadSubtree) {

            return gStateCode.cloneState(state);
        }

        treeTab.loadingKey = state.treesState.selectedKey;

        return gStateCode.cloneState(state);
    },

    setupForCreateSubtree: (state: IState): IState => {

        gTreesStateCode.setLensTreeForUpdate(state);
        gSubtreeCode.createLensSubtree(state);
        state.lens.treeTab.stageBehaviour = gStageCode.buildCreateSubtreeStages();
        gSession.setFocusFilter(Filters.treeNameFocusFilter);

        return gStateCode.cloneState(state);
    },

    setupForClone: (state: IState): IState => {

        // The tree should have already been set up for the hub
        const treeTab: ITreeTab = state.lens.treeTab;
        gTreesStateCode.setLensTreeForUpdate(state);
        gTreeCode.createCloneLensTree(state);
        treeTab.stageBehaviour = gStageCode.buildCloneTreeStages();

        return gStateCode.cloneState(state);
    },

    setupForHistory: (state: IState): IState => {

        // The tree should have already been set up for the hub
        gHistoryCode.showHistoryTab(state);
        state.lens.historyTab.stageBehaviour = gStageCode.buildTreeHistoryStages();

        return gStateCode.cloneState(state);
    },

    setupForSubtreeShape: (state: IState): IState => {

        // The tree should have already been set up for the hub
        gShapeCode.showShapeTab(state);
        state.lens.shapeTab.stageBehaviour = gStageCode.buildSubtreeShapeStages();

        return gStateCode.cloneState(state);
    },

    setupForSubtreeSpread: (state: IState): IState => {

        // The tree should have already been set up for the hub
        gSpreadCode.showSpreadTab(state);
        state.lens.spreadTab.stageBehaviour = gStageCode.buildSubtreeSpreadStages();

        return gStateCode.cloneState(state);
    },

    setupForTags: (state: IState): IState => {

        // The tree should have already been set up for the hub
        gTagsCode.showTagsTab(state);
        state.lens.tagsTab.stageBehaviour = gStageCode.buildTreeTagsStages();

        return gStateCode.cloneState(state);
    }
};

export default gTreesCoreActions;
