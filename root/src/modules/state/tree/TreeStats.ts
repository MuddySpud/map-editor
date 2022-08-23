import ITreeStats from "../../interfaces/state/tree/ITreeStats";
import ITreeStatsUI from "../../interfaces/state/ui/UIs/ITreeStatsUI";
import TreeStatsUI from "../ui/UIs/TreeStatsUI";


export default class TreeStats implements ITreeStats {

    public lastEdited: Date | null = null;
    public lastEditedBy: string | null = null;
    public nodesCount: number | null = null;
    public stashNodeCount: number | null = null;
    public allNodeCount: number | null = null;
    public solutionCount: number | null = null;
    public discussionCount: number | null = null;
    public linkCount: number | null = null;
    public referenceCount: number | null = null;;
    public discussionsWithNoOptions: number | null = null;
    public mappedHoles: number | null = null;
    public unMappedHoles: number | null = null;
    public size: number | null = null;

    public ui: ITreeStatsUI = new TreeStatsUI();
}
