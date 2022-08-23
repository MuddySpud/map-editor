import ITreeStatsUI from "../ui/UIs/ITreeStatsUI";


export default interface ITreeStats {

    lastEdited: Date | null;
    lastEditedBy: string | null;
    nodesCount: number | null;
    stashNodeCount: number | null;
    allNodeCount: number | null;
    solutionCount: number | null;
    discussionCount: number | null;
    linkCount: number | null;
    referenceCount: number | null;
    discussionsWithNoOptions: number | null;
    mappedHoles: number | null;
    unMappedHoles: number | null;
    size: number | null;
    
    ui: ITreeStatsUI;
}
