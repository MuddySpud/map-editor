import { h, VNode } from "hyperapp-local";

import gTooltipActions from "../../../../../../global/actions/gTooltipActions";
import StringEvent from "../../../../../../state/ui/payloads/StringEvent";
import notificationActions from "../../actions/notificationActions";
import U from "../../../../../../global/gUtilities";
import INotificationsTab from "../../../../../../interfaces/state/ui/tabs/INotificationsTab";
import buttonViews from "../../../../lens/views/buttonViews";
import CssClasses from "../../../../../../state/constants/CssClasses";


const typeViews = {

    buildTypeView: (
        notificationsTab: INotificationsTab,
        treeKey: string | null | undefined): VNode => {

        const buildLocalButton = (): VNode => {

            let buttonText: string = "Local session only";
            let tooltipText: string = "Click to switch to notifications from any session";
            let className: string = CssClasses.yep;

            if (notificationsTab.local === false) {

                tooltipText = "Click to switch to local session notifications only";
                className = CssClasses.nope;
            }

            return buttonViews.buildIconButton(
                buttonText,
                tooltipText,
                className,
                notificationActions.toggleLocal
            );
        };

        const buildTreesButton = (): VNode => {

            if (U.isPositiveNumeric(treeKey) === false) {

                // Then no tree is selected - so disable
                return buttonViews.buildDisabledButton(
                    "All trees",
                    "Select a hub tree from the trees view to restict notifications to the selected tree"
                );
            }

            let buttonText: string = "All trees";
            let tooltipText: string = "Click to switch to notifications from the hub tree only";
            let className: string = CssClasses.yep;

            if (notificationsTab.allTrees === false) {

                buttonText = "Hub tree only";
                tooltipText = "Click to switch to notifications for all trees";
            }

            return buttonViews.buildIconButton(
                buttonText,
                tooltipText,
                className,
                notificationActions.toggleTrees
            );
        };

        const buildUsersButton = (): VNode => {

            let buttonText: string = "All users";
            let tooltipText: string = "Click to switch to notifications from current user only";
            let className: string = CssClasses.yep;

            if (notificationsTab.allUsers === false) {

                tooltipText = "Click to switch to notifications from all users";
                // className = CssClasses.nope;
                buttonText = "Just me";
            }

            const buttonView: VNode =

                h("button",
                    {
                        id: "alertUsers",
                        type: "button",
                        onClick: notificationActions.toggleUsers,
                        onMouseOver: [
                            gTooltipActions.showTooltipWithEvent,
                            (event: any) => {
                                return new StringEvent(
                                    tooltipText,
                                    event
                                );
                            }
                        ],
                        onMouseOut: gTooltipActions.clearTooltip
                    },
                    [
                        h("div", { class: className }, ""),
                        h("span", {}, buttonText)
                    ]
                );

            return buttonView;
        };

        const buttons: VNode[] = [

            buildLocalButton()
        ];

        if (notificationsTab.local === false) {

            buttons.push(buildTreesButton());
            buttons.push(buildUsersButton());
        }

        const view: VNode =

            h("div", { class: "type" }, buttons);

        return view;
    }
};

export default typeViews;


