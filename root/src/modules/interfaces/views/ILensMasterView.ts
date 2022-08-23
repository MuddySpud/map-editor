import IState from "../state/IState";
import IStageBehaviour from "../behaviours/IStageBehaviour";
import { VNode } from "hyperapp-local";


export default interface ILensMasterView {
    
    getStageBehaviour(state: IState): IStageBehaviour;
    buildLensView(state: IState): VNode | null;
}
