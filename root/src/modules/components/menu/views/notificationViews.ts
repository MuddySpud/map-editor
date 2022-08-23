import { h, VNode } from "hyperapp-local";

import INotification from "../../../interfaces/state/notifications/INotification";
import notificationActions from "../actions/notificationActions";


const notificationViews = {

    buildNotificationView: (notification: INotification): VNode => {

        const classNames = `alert ${notification.type}`;

        const buildActionView = (): VNode => {

            const view: VNode =

                h("div", { class: "cell-actions" }, [
                    h("div",
                        {
                            class: "close",
                            onClick: [
                                notificationActions.close,
                                (_event: any) => notification
                            ]
                        },
                        ""
                    ),
                    h("div", { class: "row-icon" }),
                ]);

            return view;
        };

        const buildControlView = (): VNode => {

            const view: VNode =

                h("div", { class: "cell-controls" }, [
                    h("div",
                        {
                            class: "close",
                            onClick: [
                                notificationActions.close,
                                (_event: any) => notification
                            ]
                        },
                        ""
                    )
                ]);

            return view;
        };

        const notificationView: VNode =

            h("li",
                {
                    class: classNames,
                    key: `${notification.key}`
                },
                [
                    buildActionView(),

                    h("div", { class: "cell-title" }, [
                        h("span",
                            {
                                onClick: [
                                    notificationActions.open,
                                    (_event: any) => notification
                                ]
                            },
                            notification.title
                        ),
                    ]),

                    buildControlView(),
                ]
            );

        return notificationView;
    }
};

export default notificationViews;

