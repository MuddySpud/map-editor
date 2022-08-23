import IShapeTab from "../../../interfaces/state/ui/tabs/IShapeTab";
import IStageBehaviour from "../../../interfaces/behaviours/IStageBehaviour";
import gStageCode from "../../../global/code/gStageCode";
import IShapeCase from "../../../interfaces/state/cases/IShapeCase";


export default class ShapeTab implements IShapeTab {

    public display: boolean = false;
    
    public shapeCase: IShapeCase | null = null;
    public stageBehaviour: IStageBehaviour = gStageCode.buildSubtreeShapeStages();
}
