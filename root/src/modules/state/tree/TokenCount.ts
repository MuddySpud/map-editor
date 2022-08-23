import ITokenCount from "../../interfaces/state/tree/ITokenCount";


export default class TokenCount implements ITokenCount {

    constructor(
        token: string,
        count: number) {

        this.token = token;
        this.count = count;
    }

    public token: string;
    public count: number;
}
