import IAliasesState from "./IAliasesState";
import IDraftsState from "./IDraftsState";


export default interface IBotsState {
    
    selectedAliasKey: string;
    selectedDraftKey: string;
    queuedAliasID: string;
    queuedDraftID: string;
    aliasesState: IAliasesState;
    draftsState: IDraftsState;
}

