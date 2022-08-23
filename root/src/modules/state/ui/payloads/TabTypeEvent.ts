import ITabTypeEvent from "../../../interfaces/state/ui/payloads/ITabTypeEvent";
import { TabType } from "../../../interfaces/enums/TabType";


export default class TabTypeEvent implements ITabTypeEvent {
    
    constructor(
        tabType: TabType,
        event: Event) {
            
            this.tabType = tabType;
            this.event = event;
        }

    public tabType: TabType;
    public event: Event;
}
