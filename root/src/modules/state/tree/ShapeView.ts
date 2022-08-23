import IShapeView from "../../interfaces/state/tree/IShapeView";
import ITokenCount from "../../interfaces/state/tree/ITokenCount";


export default class ShapeView implements IShapeView {

    constructor(
        subToken: string,
        subTokens: Array<ITokenCount>) {

            this.token = subToken;
            this.subTokens = subTokens;
    }

    public token: string;
    public subTokens: Array<ITokenCount>;

}
