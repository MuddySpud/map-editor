import IStageBehaviour from "../../../behaviours/IStageBehaviour";
import { TabType } from "../../../enums/TabType";


export default interface ITabSave {

    type: TabType;
    enableSave: boolean;
    saveLock: boolean;
    stageBehaviour: IStageBehaviour;
}
