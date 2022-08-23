import IShapeCase from "../../interfaces/state/cases/IShapeCase";
import IShape from "../../interfaces/state/tree/IShape";


export default class ShapeCase implements IShapeCase {

    public fresh: boolean = true;
    public selectedID: string = "";
    public shape: IShape | null = null;
}

