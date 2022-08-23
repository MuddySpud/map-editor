import INodeBase from "./INodeBase";


export default interface IReloadedNodeResult {

    newRawOptions: any[];
    deletedOptions: Array<INodeBase>;
}
