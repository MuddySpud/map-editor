import NodeBase from "./NodeBase";
import IHole from "../../interfaces/state/tree/IHole";


export default class Hole<T> extends NodeBase implements IHole<T> {

    constructor(TCreator: { new (): T; }) {
        super();
        this.ui = new TCreator();
    }

    public ui: T;
}
