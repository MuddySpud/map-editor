import ITokenKey from "../../../interfaces/state/ui/payloads/ITokenKey";


export default class TokenKey implements ITokenKey {

    constructor(
        token: string,
        key: string) {
            
            this.token = token;
            this.key = key;
        }

    public token: string;
    public key: string;
}
