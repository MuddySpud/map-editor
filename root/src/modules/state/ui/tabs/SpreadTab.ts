import ISpreadTab from "../../../interfaces/state/ui/tabs/ISpreadTab";
import IStageBehaviour from "../../../interfaces/behaviours/IStageBehaviour";
import gStageCode from "../../../global/code/gStageCode";
import ISpreadCase from "../../../interfaces/state/cases/ISpreadCase";


export default class SpreadTab implements ISpreadTab {

    public display: boolean = false;
    
    public spreadCase: ISpreadCase | null = null;
    public stageBehaviour: IStageBehaviour = gStageCode.buildSubtreeSpreadStages();
}
