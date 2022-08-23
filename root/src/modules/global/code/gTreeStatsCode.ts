import IState from "../../interfaces/state/IState";
import TreeStats from "../../state/tree/TreeStats";
import ITreeStats from "../../interfaces/state/tree/ITreeStats";


const gTreeStatsCode = {

    loadTreeTabStats: (
        state: IState,
        jsonData: any): void => {

        if (!jsonData) {

            return;
        }

        state.lens.treeTab.stats = gTreeStatsCode.loadTreeStats(jsonData);
    },

    loadTreeStats: (jsonData: any): ITreeStats => {

        const treeStats: ITreeStats = new TreeStats();

        if (!jsonData) {

            return treeStats;
        }

        const stats: any = jsonData;

        treeStats.discussionCount = stats.discussionCount;
        treeStats.discussionsWithNoOptions = stats.discussionsWithNoOptions;
        treeStats.mappedHoles = stats.mappedHoles;
        treeStats.unMappedHoles = stats.unMappedHoles;
        treeStats.linkCount = stats.linkCount;
        treeStats.nodesCount = stats.nodeCount;
        treeStats.stashNodeCount = stats.stashNodeCount;
        treeStats.allNodeCount = stats.allNodeCount;
        treeStats.referenceCount = stats.referenceCount;
        treeStats.solutionCount = stats.solutionCount;
        treeStats.size = stats.documentsSize;
        treeStats.lastEdited = stats.lastEdited;
        treeStats.lastEditedBy = stats.lastEditedBy;

        return treeStats;
    }
};

export default gTreeStatsCode;

