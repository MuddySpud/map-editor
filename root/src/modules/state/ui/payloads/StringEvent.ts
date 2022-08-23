import IStringEvent from "../../../interfaces/state/ui/payloads/IStringEvent";


export default class StringEvent implements IStringEvent {
    
    constructor(
        value: string,
        event: Event) {
            this.value = value;
            this.event = event;
        }

    public value: string;
    public event: Event;
}
