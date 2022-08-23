import ITokenValidation from "../../interfaces/state/ui/ITokenValidation";
import ITreeBase from "../../interfaces/state/tree/ITreeBase";


export default class TokenValidation implements ITokenValidation {

    public value: string = '';
    public success: boolean = false;
    public matching: Array<ITreeBase> = [];
}
