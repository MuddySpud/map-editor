import { h, VNode } from "hyperapp-local";

import notificationViews from "./notificationViews";
import IState from "../../../interfaces/state/IState";
import INotification from "../../../interfaces/state/notifications/INotification";
import { NotificationType } from "../../../interfaces/enums/NotificationType";

import '../scss/index.scss';


const notificationsViews = {

    buildNotificationsView: (
        state: IState,
        notifications: Array<INotification>): VNode | null => {

        if (!state.settings.showAllNotifications
            || notifications.length === 0) {

            return null;
        }

        const notificationViewList: any[] = [];
        let notification: INotification;
        let notificationView: any = null;
        let i = notifications.length - 1;
        let counter = 0;

        // Only show the last 2 notifications
        while (i >= 0
            && counter < 2) {

            notification = notifications[i];
            notificationView = notificationViews.buildNotificationView(notification);

            if (notification.hidden === false
                && notification.expired === false
                && notification.type !== NotificationType.Error
                && notification.type !== NotificationType.ErrorAndAction) {

                counter++;
                notificationViewList.push(notificationView);
            }

            i--;
        }

        const notificationsView: VNode =

            h("div", { class: "alerts" }, [
                h("div", { class: "alerts-box" }, [
                    h("ul", {}, notificationViewList)
                ])
            ]);

        return notificationsView;
    }
};

export default notificationsViews;

