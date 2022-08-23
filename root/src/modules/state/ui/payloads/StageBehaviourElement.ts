import IStageBehaviourElement from "../../../interfaces/state/ui/payloads/IStageBehaviourElement";
import IStageBehaviour from "../../../interfaces/behaviours/IStageBehaviour";


export default class StageBehaviourElement implements IStageBehaviourElement {

    constructor(
        stageBehaviour: IStageBehaviour,
        divElement: HTMLDivElement) {
            
            this.stageBehaviour = stageBehaviour;
            this.divElement = divElement;
        }

    public stageBehaviour: IStageBehaviour;
    public divElement: HTMLDivElement;
}
