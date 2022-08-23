import INotification from "../../interfaces/state/notifications/INotification";
import { NotificationType } from "../../interfaces/enums/NotificationType";


export default class Notification implements INotification {

    constructor(
        key: string,
        callID: string,
        title: string,
        text: string,
        token: string | null,
        created: Date,
        type: NotificationType,
        hidden: boolean,
        actionDelegate?: any,
        link: string = '',
        payload: any = null,
        callChain: Array<string> = [],
        status: number = -1,
        response: string = "") {

        this.key = key;
        this.callID = callID;
        this.title = title;
        this.text = text;
        this.token = token;
        this.created = created;
        this.type = type;
        this.hidden = hidden;
        this.actionDelegate = actionDelegate;
        this.link = link;
        this.payload = payload;
        this.callChain = callChain;
        this.response = response;
        this.status = status;
    }

    public key: string;
    public callID: string;
    public title: string;
    public text: string;
    public token: string | null;
    public created: Date;
    public expired: boolean = false;
    public type: NotificationType;
    public hidden: boolean;
    public actionDelegate: any;
    public link: string;
    public payload: any;
    public callChain: Array<string>;
    public response: any;
    public status: number;
}
