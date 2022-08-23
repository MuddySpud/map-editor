import ISpreadView from "../../interfaces/state/tree/ISpreadView";
import ITokenCount from "../../interfaces/state/tree/ITokenCount";


export default class SpreadView implements ISpreadView {

    constructor(
        subToken: string,
        tokens: Array<ITokenCount>) {

            this.subToken = subToken;
            this.tokens = tokens;
    }

    public subToken: string;
    public tokens: Array<ITokenCount>;

}
