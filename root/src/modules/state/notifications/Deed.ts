import IDeed from "../../interfaces/state/notifications/IDeed";
import { ActionType } from "../../interfaces/enums/ActionType";


export default class Deed implements IDeed {

    public id: string | null = null;
    public action: ActionType = ActionType.None;
    public url: string | null = null;
    public itemKey: string | null = null;
    public itemToken: string | null = null;
    public body: string | null = null;
    public created: Date | null = null;
}
