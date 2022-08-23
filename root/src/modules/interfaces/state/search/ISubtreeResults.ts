import ISubtreeSys from "../tree/ISubtreeSys";


export default interface ISubtreeResults {

    selectedIndex: number;
    selectedExpanded: boolean;
    results: Array<ISubtreeSys>;
}
