import IKeyValuePair from "./IKeyValuePair";


export default interface INodeAlts {

    key: string;
    r: string;
    alts: Array<IKeyValuePair>;
}
