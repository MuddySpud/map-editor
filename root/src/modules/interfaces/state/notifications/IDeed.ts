import { ActionType } from "../../enums/ActionType";


export default interface IDeed {
    id: string | null;
    action: ActionType;
    url: string | null;
    itemKey: string | null;
    itemToken: string | null;
    body: string | null;
    created: Date | null;
}
