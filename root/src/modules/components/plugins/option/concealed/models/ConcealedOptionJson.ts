import { OptionType } from "../../../../../interfaces/enums/OptionType";
import { ActionType } from "../../../../../interfaces/enums/ActionType";
import IConcealedOptionJson from "../interfaces/IConcealedOptionJson";


export default class ConcealedOptionJson implements IConcealedOptionJson {

    constructor(
        script: string,
        comment: string = "") {

        this.script = script;
        this.comment = comment;
    }

    public type: OptionType = OptionType.ConcealedJson;
    public error: string = "";
    public script: string;
    public comment: string;
    public action: ActionType = ActionType.None;
}
