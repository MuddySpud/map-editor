import IOptionSelect from "../../../interfaces/state/ui/payloads/IOptionSelect";
import INodeBase from "../../../interfaces/state/tree/INodeBase";


export default class OptionSelect implements IOptionSelect {

    constructor(
        option: INodeBase,
        select: HTMLSelectElement) {
            
            this.option = option;
            this.select = select;
        }

    public option: INodeBase;
    public select: HTMLSelectElement;
}
