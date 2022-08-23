import IStageBehaviour from "../../../behaviours/IStageBehaviour";
import IValidationCase from "../../cases/IValidationCase";


export default interface IValidationsTab {

    display: boolean;
    validationCase: IValidationCase | null;
    stageBehaviour: IStageBehaviour;
}
