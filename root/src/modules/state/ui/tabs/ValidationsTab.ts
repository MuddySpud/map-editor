import IValidationsTab from "../../../interfaces/state/ui/tabs/IValidationsTab";
import IStageBehaviour from "../../../interfaces/behaviours/IStageBehaviour";
import gStageCode from "../../../global/code/gStageCode";
import IValidationCase from "../../../interfaces/state/cases/IValidationCase";


export default class ValidationsTab implements IValidationsTab {

    public display: boolean = false;
    
    public validationCase: IValidationCase | null = null;
    public stageBehaviour: IStageBehaviour = gStageCode.buildValidationStages();
}
