import IShape from "../tree/IShape";
import IDataCase from "./IDataCase";


export default interface IShapeCase extends IDataCase {
    
    selectedID: string;
    shape: IShape | null;
}
