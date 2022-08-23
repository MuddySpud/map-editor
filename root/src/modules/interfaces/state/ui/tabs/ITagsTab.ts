import IStageBehaviour from "../../../behaviours/IStageBehaviour";
import ITagsCase from "../../cases/ITagsCase";


export default interface ITagsTab {

    display: boolean;
    tagsCase: ITagsCase | null;
    stageBehaviour: IStageBehaviour;
}
