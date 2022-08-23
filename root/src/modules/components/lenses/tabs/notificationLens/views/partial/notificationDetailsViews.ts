import { h, VNode } from "hyperapp-local";

import INotification from "../../../../../../interfaces/state/notifications/INotification";



const notificationDetailsViews = {

    buildNotificationDetailsView: (notification: INotification): VNode | null => {

        if (!notification) {

            return null;
        }

        const view: VNode =

            h("div",
                {
                    class: `alert ${notification.type}`
                },
                [
                    h("div",
                        {
                            class: "row"
                        },
                        [
                            h("div", { class: "key" }, "key"),
                            h("div", { class: "value" }, `${notification.key}`),
                        ]
                    ),
                    h("div",
                        {
                            class: "row"
                        },
                        [
                            h("div", { class: "key" }, "title"),
                            h("div", { class: "value" }, `${notification.title}`),
                        ]
                    ),
                    h("div",
                        {
                            class: "row"
                        },
                        [
                            h("div", { class: "key" }, "text"),
                            h("div", { class: "value" }, `${notification.text}`),
                        ]
                    ),
                    h("div",
                        {
                            class: "row"
                        },
                        [
                            h("div", { class: "key" }, "created"),
                            h("div", { class: "value" }, `${notification.created}`),
                        ]
                    ),
                    h("div",
                        {
                            class: "row"
                        },
                        [
                            h("div", { class: "key" }, [
                                h("span", {}, "type"),
                                h("div", { class: "spot" }, "")
                            ]),
                            h("div", { class: "value" }, `${notification.type}`),
                        ]
                    )
                ]
            );

        return view;
    }
}

export default notificationDetailsViews;


