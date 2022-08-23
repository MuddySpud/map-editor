import { h, VNode } from "hyperapp-local";

import gTooltipActions from "../../../../../../../global/actions/gTooltipActions";
import IDraft from "../../../../../../../interfaces/state/bot/IDraft";
import StringEvent from "../../../../../../../state/ui/payloads/StringEvent";
import gBotActions from "../../../../../../../global/actions/gBotActions";


const draftButtonViews = {

    buildHubButtons: (draft: IDraft): VNode[] => {

        const controlsView: VNode[] = [

            h("div", { class: "spacer" }, [

                draftButtonViews.buildDraftPromoteButton(),
                draftButtonViews.buildDeleteDraftButton(draft)
            ])
        ];

        return controlsView;
    },

    buildDeleteDraftButton: (draft: IDraft): VNode => {

        let properties: any = {
            class: {
                "delete-draft": true
            },
            onMouseOut: gTooltipActions.clearTooltip
        };

        let tooltip: string;

        if (!draft.deleteLock) {

            properties.onClick = gBotActions.deleteDraft;
            tooltip = "Delete this bot draft";
        }
        else {
            properties.class.disabled = true;
            tooltip = `Delete bot draft is disabled. 
It has been referenced by a bot alias. Delete the bot alias first.`;
        }

        properties.onMouseOver = [
            gTooltipActions.showTooltipWithEvent,
            (event: any) => {
                return new StringEvent(
                    tooltip,
                    event
                );
            }
        ];

        const buttonView: VNode =

            h("a",
                properties,
                [
                    h("div", { class: "delete-icon" }, "")
                ]
            );

        return buttonView;
    },

    buildDraftPromoteButton: (): VNode => {

        const buttonView: VNode =

            h("a",
                {
                    class: "promote-draft",
                    onClick: gBotActions.promoteDraft,
                    onMouseOver: [
                        gTooltipActions.showTooltip,
                        (_event: any) => "Promote draft to alias"
                    ],
                    onMouseOut: gTooltipActions.clearTooltip
                },
                [
                    h("div", { class: "promote-icon" }, "")
                ]
            );

        return buttonView;
    }
};

export default draftButtonViews;


