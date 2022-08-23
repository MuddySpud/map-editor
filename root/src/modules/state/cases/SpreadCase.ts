import ISpreadCase from "../../interfaces/state/cases/ISpreadCase";
import ISpread from "../../interfaces/state/tree/ISpread";


export default class SpreadCase implements ISpreadCase {

    public fresh: boolean = true;
    public selectedID: string = "";
    public spread: ISpread | null = null;
}

