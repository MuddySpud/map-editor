import { h, VNode } from "hyperapp-local";

import gBotActions from "../../../../../../../global/actions/gBotActions";
import gTooltipActions from "../../../../../../../global/actions/gTooltipActions";
import StringEvent from "../../../../../../../state/ui/payloads/StringEvent";


const aliasButtonViews = {

    buildHubButtons: (): VNode[] => {

        const controlsView: VNode[] = [

            h("div", { class: "spacer" }, [

                aliasButtonViews.buildEditAliasButton(),
                aliasButtonViews.buildDeleteAliasButton()
            ])
        ];

        return controlsView;
    },

    buildDeleteAliasButton: (): VNode => {

        const buttonView: VNode =

            h("a",
                {
                    class: {
                        "delete-alias": true
                    },
                    onClick: gBotActions.deleteAlias,
                    onMouseOut: gTooltipActions.clearTooltip,
                    onMouseOver: [
                        gTooltipActions.showTooltipWithEvent,
                        (event: any) => {
                            return new StringEvent(
                                "Delete this bot alias",
                                event
                            );
                        }
                    ]
                },
                [
                    h("div", { class: "delete-icon" }, "")
                ]
            );

        return buttonView;
    },

    buildEditAliasButton: (): VNode => {

        const buttonView: VNode =

            h("a",
                {
                    class: "edit-alias",
                    onClick: gBotActions.editAlias,
                    onMouseOver: [
                        gTooltipActions.showTooltip,
                        (_event: any) => "Edit this bot alias"
                    ],
                    onMouseOut: gTooltipActions.clearTooltip
                },
                [
                    h("div", { class: "edit-icon" }, "")
                ]
            );

        return buttonView;
    }
};

export default aliasButtonViews;


