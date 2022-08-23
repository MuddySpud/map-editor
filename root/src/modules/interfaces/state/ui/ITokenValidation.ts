import ITreeBase from "../tree/ITreeBase";

export default interface ITokenValidation
 {
    value: string;
    success: boolean;
    matching: Array<ITreeBase>;
}
