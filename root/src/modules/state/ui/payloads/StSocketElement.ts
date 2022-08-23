import IStSocketElement from "../../../interfaces/state/ui/payloads/IStSocketElement";
import IStSocket from "../../../interfaces/state/tree/IStSocket";
import ISubtreeSys from "../../../interfaces/state/tree/ISubtreeSys";
import IStageBehaviour from "../../../interfaces/behaviours/IStageBehaviour";


export default class StSocketElement implements IStSocketElement {

    constructor(
        stSocket: IStSocket | null,
        subtree: ISubtreeSys | null,
        element: HTMLElement | null,
        behaviour: IStageBehaviour | null) {
            
            this.stSocket = stSocket;
            this.subtree = subtree;
            this.element = element;
            this.behaviour = behaviour;
        }

        public stSocket: IStSocket | null;
        public subtree: ISubtreeSys | null;
        public element: HTMLElement | null;
        public behaviour: IStageBehaviour | null;
    }
    