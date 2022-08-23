import IStageBehaviour from "../../../behaviours/IStageBehaviour";
import ISpreadCase from "../../cases/ISpreadCase";


export default interface ISpreadTab {

    display: boolean;
    spreadCase: ISpreadCase | null;
    stageBehaviour: IStageBehaviour;
}
