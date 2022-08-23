import { NotificationType } from "../../enums/NotificationType";


export default interface INotification {
    key: string;
    callID: string;
    title: string;
    text: string;
    token: string | null;
    created: Date;
    expired: boolean;
    type: NotificationType;
    hidden: boolean;
    actionDelegate: any;
    link: string;
    payload: any;
    callChain: Array<string>;
}
