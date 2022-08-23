import IState from "../../../interfaces/state/IState";
import gStateCode from "../../../global/code/gStateCode";
import INotification from "../../../interfaces/state/notifications/INotification";
import gNotificationCode from "../../../global/code/gNotificationCode";


const notificationActions = {

    close: (
        state: IState,
        notification: INotification): IState => {

        notification.expired = true;

        return gStateCode.cloneState(state);
    },

    open: (
        state: IState,
        notification: INotification): IState => {

        gNotificationCode.showNotification(
            state,
            notification
        );

        return gStateCode.cloneState(state);
    }
};

export default notificationActions;