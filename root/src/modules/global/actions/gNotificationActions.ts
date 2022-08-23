import IState from "../../interfaces/state/IState";
import INotification from "../../interfaces/state/notifications/INotification";
import gStateCode from "../code/gStateCode";
import U from "../gUtilities";


const gNotificationActions = {

    updateNotificationKeys: (
        state: IState,
        response: any): IState => {

        if (!state
            || !response?.jsonData) {

            return state;
        }

        // This will only happen with local notifications
        const selectedKey: string = state.notifications.selectedKey ?? "";
        const selected: boolean = U.isNullOrWhiteSpace(selectedKey) === false;
        let notification: INotification | undefined;

        response.jsonData.forEach((keyPair: any) => {

            notification = state.notifications.values.find((notification: INotification) => {
                
                return notification.callID === keyPair.oldKey;
            });

            if (notification) {

                if (selected
                    && notification.key === selectedKey) {

                    state.notifications.selectedKey = keyPair.newKey;
                }

                notification.key = keyPair.newKey;
            }
        });

        return gStateCode.cloneState(state);
    }
};

export default gNotificationActions;

