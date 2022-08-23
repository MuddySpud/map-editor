import IState from "../../interfaces/state/IState";
import { TabType } from "../../interfaces/enums/TabType";
import gLensCode from "./gLensCode";
import gTreesStateCode from "./gTreesStateCode";
import { ActionType } from "../../interfaces/enums/ActionType";
import IPaginationDetails from "../../interfaces/state/ui/payloads/IPaginationDetails";
import NotificationsCase from "../../state/cases/NotificationsCase";
import INotificationsCase from "../../interfaces/state/cases/INotificationsCase";
import INotification from "../../interfaces/state/notifications/INotification";
import Notification from "../../state/notifications/Notification";
import U from "../gUtilities";
import INotificationsTab from "../../interfaces/state/ui/tabs/INotificationsTab";
import gTabCode from "./gTabCode";


const gNotificationsCode = {

    clearNotificationsTab: (state: IState): void => {

        state.lens.notificationsTab.display = false;
        state.lens.notificationsTab.stageBehaviour.clear();
        state.lens.notificationsTab.notificationsCase = null;
    },

    showNotificationsTab: (state: IState): void => {

        state.lens.notificationsTab.display = true;
        gLensCode.maximiseLens(state) === true;
    },

    showSelectedNotificationsTab: (state: IState): void => {

        gNotificationsCode.showNotificationsTab(state);

        gTabCode.setSelectedTab(
            state,
            TabType.Alerts);
    },

    getNotificationsRequestBody: (state: IState): { body: any, callID: string } => {
 
        const notificationsTab: INotificationsTab = state.lens.notificationsTab;

        if (!notificationsTab.notificationsCase) {

            notificationsTab.notificationsCase = new NotificationsCase(state.settings.defaultDataBatchSize);
        }

        const notificationsCase: INotificationsCase = notificationsTab.notificationsCase;
        const paginationDetails: IPaginationDetails = notificationsCase.notifications.paginationDetails;
        let treeKey: string = '';
        let token: string = '';

        if (U.isPositiveNumeric(state.lens.treeTab.lensTree?.key) === true
            && U.isNullOrWhiteSpace(state.lens.treeTab.lensTree?.token) === false) {
            // Then a tree has not been selected and can only get local notifications or notifications for all trees
            treeKey = state.lens.treeTab.lensTree?.key as string;
            token = state.lens.treeTab.lensTree?.token as string;
        }

        let action: ActionType = gNotificationsCode.getActionType(notificationsTab);

        const callID: string = gTreesStateCode.registerTreeDataRequest(
            'Get notifications',
            state,
            treeKey,
            action
        );

        const body: any = {

            start: paginationDetails.start,
            batchSize: paginationDetails.count,
            key: state.user.key,
            token: token,
            action: action
        };

        return {
            body,
            callID
        };
    },

    loadNotificationsCase: (
        rawNotifications: any[],
        notificationsCase: INotificationsCase): void => {

        if (!rawNotifications
            || rawNotifications.length === 0) {
            return;
        }

        notificationsCase.notifications.values = gNotificationsCode.loadNotifications(rawNotifications);
    },

    getActionType: (notificationsTab: INotificationsTab): ActionType => {

        if (notificationsTab.local === true) {

            return ActionType.GetLocalTreeNotifications;
        }

        if (notificationsTab.allTrees === true) {

            if (notificationsTab.allUsers === true) {

                return ActionType.GetAllNotifications;
            }
            else {
                return ActionType.GetUserNotifications;
            }
        }
        else if (notificationsTab.allUsers === true) {

            return ActionType.GetTreeNotifications;
        }
        else if (notificationsTab.allUsers === false) {

            return ActionType.GetUserTreeNotifications;
        }

        return ActionType.None;
    },

    loadNotifications: (rawNotifications: any[]): Array<INotification> => {

        const notifications: Array<INotification> = [];

        if (!rawNotifications
            || rawNotifications.length === 0) {

            return notifications;
        }

        let notification: INotification | null;

        rawNotifications.forEach((rawNotification: any) => {

            notification = gNotificationsCode.loadNotification(rawNotification);

            if (notification) {
                notifications.push(notification);
            }
        });

        return notifications;
    },

    loadNotification: (rawNotification: any): INotification | null => {

        if (!rawNotification) {
            return null;
        }

        const notification: INotification = new Notification(
            rawNotification.key,
            rawNotification.callID,
            rawNotification.title,
            rawNotification.text,
            rawNotification.created,
            rawNotification.type,
            rawNotification.hidden,
            rawNotification.actionDelegate);

        return notification;
    }
};

export default gNotificationsCode;

