import Node from "./Node";
import { NodeType } from "../../interfaces/enums/NodeType";
import IStash from "../../interfaces/state/tree/IStash";


export default class Stash<T> extends Node<T> implements IStash<T> {

    constructor(
        TCreator: { new(): T; },
        token: string) {

        super(TCreator); 

        this.key = "-1";
        this.token = token;
        this.type = NodeType.Discussion;
        this.isStash = true;
        this.isStashRoot = true;
        this.option = "_";
    }
}

