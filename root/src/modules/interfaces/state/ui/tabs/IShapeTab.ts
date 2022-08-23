import IStageBehaviour from "../../../behaviours/IStageBehaviour";
import IShapeCase from "../../cases/IShapeCase";


export default interface IShapeTab {

    display: boolean;
    shapeCase: IShapeCase | null;
    stageBehaviour: IStageBehaviour;
}
