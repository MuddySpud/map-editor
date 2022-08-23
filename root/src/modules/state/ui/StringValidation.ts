import IStringValidation from "../../interfaces/state/ui/IStringValidation";


export default class StringValidation implements IStringValidation {

    public value: string = '';
    public success: boolean = false;
}
