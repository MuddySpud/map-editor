import IBotsState from "../interfaces/state/IBotsState";
import IDraftsState from "../interfaces/state/IDraftsState";
import IAliasesState from "../interfaces/state/IAliasesState";
import DraftsState from "./DraftsState";
import AliasesState from "./AliasesState";


export default class BotsState implements IBotsState {

    public selectedAliasKey: string = "";
    public selectedDraftKey: string = "";
    public queuedAliasID: string = "";
    public queuedDraftID: string = "";
    public aliasesState: IAliasesState = new AliasesState();
    public draftsState: IDraftsState = new DraftsState();
}
