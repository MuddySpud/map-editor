import IStageBehaviour from "../../../interfaces/behaviours/IStageBehaviour";
import IAlias from "../../../interfaces/state/bot/IAlias";
import IAliasElement from "../../../interfaces/state/ui/payloads/IAliasElement";


export default class AliasElement implements IAliasElement {

    constructor(
        alias: IAlias,
        element: HTMLElement,
        behaviour: IStageBehaviour | null) {
            
            this.alias = alias;
            this.element = element;
            this.behaviour = behaviour;
        }

    public alias: IAlias;
    public element: HTMLElement;
    public behaviour: IStageBehaviour | null;
}
