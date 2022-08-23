import ISpread from "../tree/ISpread";
import IDataCase from "./IDataCase";


export default interface ISpreadCase extends IDataCase {
    
    selectedID: string;
    spread: ISpread | null;
}
