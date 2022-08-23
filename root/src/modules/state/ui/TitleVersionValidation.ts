import ITitleVersionValidation from "../../interfaces/state/ui/ITitleVersionValidation";


export default class TitleVersionValidation implements ITitleVersionValidation {

    public title: string = '';
    public version: string = '';
    public success: boolean = false;
}
