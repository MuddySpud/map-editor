import IAncestorKey from "./IAncestorKey";


export default interface IFailedAncestors {

    completed: boolean;
    ancestorKeys: Array<IAncestorKey>;
}
