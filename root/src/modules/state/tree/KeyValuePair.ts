import IKeyValuePair from "../../interfaces/state/tree/IKeyValuePair";


export default class KeyValuePair implements IKeyValuePair {

    constructor(
        key: string,
        value: string) {
            this.key = key;
            this.value = value;
        }

    public key: string;
    public value: string;
}
