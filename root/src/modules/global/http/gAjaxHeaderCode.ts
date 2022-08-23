import { ActionType } from "../../interfaces/enums/ActionType";
import IState from "../../interfaces/state/IState";


const gAjaxHeaderCode = {

    buildHeaders: (
        state: IState,
        callID: string,
        action: ActionType): Headers => {

        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('X-CSRF', '1');
        headers.append('SubscriptionID', state.subscriptionState.subscriptionID);
        headers.append('CallID', callID);
        headers.append('Action', action);

        return headers;
    }
};

export default gAjaxHeaderCode;

