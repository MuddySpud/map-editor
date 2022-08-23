import { h, VNode } from "hyperapp-local";

import IState from "../../../interfaces/state/IState";
import menuActions from "../actions/menuActions";
import { TabType } from "../../../interfaces/enums/TabType";
import gTabCode from "../../../global/code/gTabCode";
import gTooltipActions from "../../../global/actions/gTooltipActions";
import notificationsViews from "./notificationsViews";
import INotification from "../../../interfaces/state/notifications/INotification";
import gNotificationCode from "../../../global/code/gNotificationCode";
import IValidationCase from "../../../interfaces/state/cases/IValidationCase";
import treeSelector from "../code/treeSelector";
import ITreeIcon from "../../../interfaces/state/tree/ITreeIcon";

import '../scss/index.scss';


const menuViews = {

    buildView: (state: IState): VNode => {

        const tabTypes: Array<TabType> = gTabCode.getTabs(state);
        const notifications: Array<INotification> = gNotificationCode.getStatusNotifications(state.notifications);
        const tree: ITreeIcon | null = treeSelector.getTree(state);

        const buildLogoView = (): VNode => {

            let iconClass: string = "";

            if (tree?.isSubtree === true) {

                iconClass = "subtree-icon";
            }
            else if (tree?.isFlat === true) {

                iconClass = "flat-tree-icon";
            }
            else if (tree?.isLoop === true) {

                iconClass = "loop-tree-icon";
            }
            else if (tree) {

                iconClass = "tree-icon";
            }

            iconClass = `logo ${iconClass}`;

            const view: VNode = h("div", { class: iconClass }, "");

            return view;
        };

        const buildStatusView = (): VNode | null => {

            if (notifications.length > 0) {

                return null;
            }

            const view: VNode =

                h("div", { class: "status" }, [
                    h("span", {}, state.status.tooltip)
                ]);

            return view;
        };

        const buildTitleView = (): VNode | null => {

            const view: VNode =

                h("div", { class: "menu-title" }, [
                    h("span", {}, `${tree?.name ?? ''}`)
                ]);

            return view;
        };

        const buildStatusBarView = (): VNode => {

            const view: VNode =

                h("div", { class: "status-bar" }, [

                    buildStatusView(),

                    notificationsViews.buildNotificationsView(
                        state,
                        notifications),
                ]);

            return view;
        };

        const buildButtonView = (): VNode => {

            const validationCase: IValidationCase | null = state.lens.validationsTab.validationCase;
            let validationClasses: string = "validations";

            if (validationCase
                && validationCase.fresh === true) {

                if (validationCase.success === true) {

                    validationClasses = `${validationClasses} pass`;
                }
                else {
                    validationClasses = `${validationClasses} fail`;
                }

            }

            let subscriptionMenuView: VNode | null = null;

            if (state.subscriptionState.subscriptions?.length > 0) {

                subscriptionMenuView =

                    h("a",
                        {
                            class: "subscriptions",
                            onClick: [
                                menuActions.toggleSubscriptions
                            ],
                            onMouseOver: [
                                gTooltipActions.showTooltip,
                                (_event: any) => "Show / hide the subscription selector"
                            ],
                            onMouseOut: gTooltipActions.clearTooltip
                        },
                        ""
                    );
            }

            const view: VNode =

                h("div", { class: "buttons" }, [
                    // h("a",
                    //     {
                    //         class: "hamburger",
                    //         onClick: [
                    //             menuActions.toggleMainMenu
                    //         ],
                    //         onMouseOver: [
                    //             gTooltipActions.showTooltip,
                    //             (_event: any) => "Show / hide the main menu"
                    //         ],
                    //         onMouseOut: gTooltipActions.clearTooltip
                    //     },
                    //     ""
                    // ),
                    h("a",
                        {
                            class: "notifications",
                            onClick: [
                                menuActions.toggleNotifications
                            ],
                            onMouseOver: [
                                gTooltipActions.showTooltip,
                                (_event: any) => "Show / hide the alerts tab"
                            ],
                            onMouseOut: gTooltipActions.clearTooltip
                        },
                        ""
                    ),
                    h("a",
                        {
                            class: "settings",
                            onClick: [
                                menuActions.toggleSettings
                            ],
                            onMouseOver: [
                                gTooltipActions.showTooltip,
                                (_event: any) => "Show / hide the manage settings tab"
                            ],
                            onMouseOut: gTooltipActions.clearTooltip
                        },
                        ""
                    ),
                    h("a",
                        {
                            class: "views",
                            onClick: [
                                menuActions.toggleViews
                            ],
                            onMouseOver: [
                                gTooltipActions.showTooltip,
                                (_event: any) => "Show / hide the manage views tab"
                            ],
                            onMouseOut: gTooltipActions.clearTooltip
                        },
                        ""
                    ),
                    h("a",
                        {
                            class: "search",
                            onClick: [
                                menuActions.toggleSearch
                            ],
                            onMouseOver: [
                                gTooltipActions.showTooltip,
                                (_event: any) => "Show / hide the search tab"
                            ],
                            onMouseOut: gTooltipActions.clearTooltip
                        },
                        ""
                    ),

                    subscriptionMenuView
                ]);

            return view;
        };

        const view: VNode =

            h("div", { id: "menuView" }, [
                h("div",
                    {
                        id: "menu",
                        key: "menu",
                        class: {
                            "lens-tabs": tabTypes.length > 0
                        }
                    },
                    [
                        buildButtonView(),
                        buildTitleView(),
                        buildLogoView(),
                        buildStatusBarView(),
                    ])
            ]);

        return view;
    }
};

export default menuViews;

