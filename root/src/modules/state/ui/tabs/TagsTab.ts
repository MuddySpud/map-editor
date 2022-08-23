import ITagsTab from "../../../interfaces/state/ui/tabs/ITagsTab";
import IStageBehaviour from "../../../interfaces/behaviours/IStageBehaviour";
import gStageCode from "../../../global/code/gStageCode";
import ITagsCase from "../../../interfaces/state/cases/ITagsCase";


export default class TagsTab implements ITagsTab {

    public display: boolean = false;
    
    public tagsCase: ITagsCase | null = null;
    public stageBehaviour: IStageBehaviour = gStageCode.buildTreeTagsStages();
}
