import IImageUrlJson from "../interfaces/IImageUrlJson";
import { OptionType } from "../../../../../interfaces/enums/OptionType";
import { ActionType } from "../../../../../interfaces/enums/ActionType";


export default class ImageUrlJson implements IImageUrlJson {

    constructor(
        text: string = "",
        fileID: string = "",
        fileName: string = "") {

        this.text = text;
        this.fileID = fileID;
        this.fileName = fileName;
    }

    public type: OptionType = OptionType.ImageUrlJson;
    public error: string = "";
    public text: string;
    public action: ActionType = ActionType.None;
    public fileName: string;
    public id: string = "";
    public fileID: string;
    public enableChildOptionImages: boolean = false;
    public uploading: boolean = false;
    public enableImages: boolean = true;
}
