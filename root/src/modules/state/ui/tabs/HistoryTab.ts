import IHistoryTab from "../../../interfaces/state/ui/tabs/IHistoryTab";
import IStageBehaviour from "../../../interfaces/behaviours/IStageBehaviour";
import gStageCode from "../../../global/code/gStageCode";
import IHistoryCase from "../../../interfaces/state/cases/IHistoryCase";


export default class HistoryTab implements IHistoryTab {

    public display: boolean = false;
    
    public historyCase: IHistoryCase | null = null;
    public stageBehaviour: IStageBehaviour = gStageCode.buildTreeHistoryStages();
}
