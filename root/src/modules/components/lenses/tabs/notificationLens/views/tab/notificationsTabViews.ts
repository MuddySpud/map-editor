import { h, VNode } from "hyperapp-local";

import gTooltipActions from "../../../../../../global/actions/gTooltipActions";
import INotifications from "../../../../../../interfaces/state/notifications/INotifications";
import INotification from "../../../../../../interfaces/state/notifications/INotification";
import INotificationsTab from "../../../../../../interfaces/state/ui/tabs/INotificationsTab";
import U from "../../../../../../global/gUtilities";
import notificationDetailsViews from "../partial/notificationDetailsViews";
import gNotificationCode from "../../../../../../global/code/gNotificationCode";
import notificationActions from "../../actions/notificationActions";
import IPaginationDetails from "../../../../../../interfaces/state/ui/payloads/IPaginationDetails";
import paginationViews from "../../../../../pagination/views/paginationViews";
import typeViews from "../partial/typeViews";
import { NotificationType } from "../../../../../../interfaces/enums/NotificationType";


const notificationsTabViews = {

    buildTabView: (
        notificationsTab: INotificationsTab,
        notifications: INotifications,
        treeKey: string | null | undefined): VNode => {

        const paginationDetails: IPaginationDetails = notifications.paginationDetails;

        let selectedKey: string = "";
        let selected: boolean = false;

        if (U.isNullOrWhiteSpace(notifications.selectedKey) === false) {

            selected = true;
            selectedKey = notifications.selectedKey;
        }

        const buildSelectedNotificationDetailsView = (): VNode | null => {

            if (U.isNullOrWhiteSpace(selectedKey) === true) {

                return null;
            }

            const notification: INotification | null = gNotificationCode.getNotification(
                notifications.values,
                notifications.selectedKey as string
            );

            if (notification) {

                return notificationDetailsViews.buildNotificationDetailsView(notification);
            }

            return null;
        };

        const buildNotificationRowView = (
            notification: INotification,
            selected: boolean): VNode => {

            let classNames: string = `${notification.type}`;
            classNames = selected === true ? `${classNames} selected` : classNames;

            let notificationType: string = notification.type;

            if (notificationType === NotificationType.Warning) {

                notificationType = "warn";
            }

            const view: VNode =

                h("tr",
                    {
                        key: `${notification.key}`,
                        class: classNames,
                        onClick: [
                            notificationActions.select,
                            (_event: any) => notification.key
                        ],
                        onMouseOver: [
                            gTooltipActions.showTooltip,
                            (_event: any) => "Click to select notification and view its details below"
                        ],
                        onMouseOut: gTooltipActions.clearTooltip
                    },
                    [
                        h("td", { class: "td-open" }, [
                            h("div", { class: "tick" }, "")
                        ]),
                        h("td", {}, `${notification.key}`),
                        h("td", {}, `${notification.title}`),
                        h("td", {}, `${notification.text}`),
                        h("td", {}, `${notification.created}`),
                        h("td", { class: "type" }, [
                            h("div", { class: "spot" }, ""),
                            h("span", {}, `${notificationType}`)
                        ])
                    ]);

            return view;
        };

        const buildNotificationRowViews = (): VNode[] => {

            const notificationsViews: VNode[] = [];
            let notificationsView: VNode;

            notifications.values.forEach((notification: INotification) => {

                notificationsView = buildNotificationRowView(
                    notification,
                    selected && notification.key === selectedKey
                );

                if (notificationsView) {
                    notificationsViews.push(notificationsView);
                }
            });

            return notificationsViews;
        };

        const buildPagination = (isBottom: boolean): VNode | null => {

            return paginationViews.buildView(
                isBottom,
                paginationDetails,
                notificationActions.showNotificationsPage,
                notifications);
        };

        const buildTopPagination = (): VNode | null => {

            return buildPagination(false);
        };

        const buildBottomPagination = (): VNode | null => {

            return buildPagination(true);
        };

        const buildNotificationTableView = (): VNode => {

            const tableView: VNode =

                h("div", { class: "results" }, [
                    h("table", {}, [
                        h("thead", {}, [
                            h("tr", {}, [
                                h("td", { class: "td-open" }, ""),
                                h("td", {}, "key"),
                                h("td", {}, "title"),
                                h("td", {}, "text"),
                                h("td", {}, "created"),
                                h("td", {}, "type")
                            ])
                        ]),
                        h("tbody", {}, buildNotificationRowViews())
                    ])
                ]);

            return tableView;
        };

        const notificationResultsView: VNode =

            h("div", { id: "notificationLensView" }, [
                h("div", { id: "notificationLens" }, [

                    h("div", { class: "icons" }, [
                        h("div", { class: "notification-icon" }, ""),
                    ]),
                    h("h3", {}, "Notifications"),

                    typeViews.buildTypeView(
                        notificationsTab,
                        treeKey),

                    buildTopPagination(),
                    buildNotificationTableView(),
                    buildBottomPagination(),
                    buildSelectedNotificationDetailsView(),
                    // buttonsViews.buildActionsView(searchCase)
                ])
            ]);

        return notificationResultsView;
    }
};

export default notificationsTabViews;


