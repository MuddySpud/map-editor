import { h, VNode } from "hyperapp-local";
import gBotActions from "../../../../global/actions/gBotActions";

import gTooltipActions from "../../../../global/actions/gTooltipActions";
import IDraft from "../../../../interfaces/state/bot/IDraft";
import StringEvent from "../../../../state/ui/payloads/StringEvent";
import botActions from "../actions/botActions";
import iconViews from "./iconViews";


const draftCellViews = {

    buildInfoCell: (): VNode => {

        const view: VNode =

            h("div", { class: "draft-cell narrow" }, [
                h("div", { class: "icon" }, [
                    h("div", { class: "info-icon" }, "")
                ])
            ]);

        return view;
    },

    buildTickCell: (selected: boolean): VNode => {

        const view: VNode =

            h("div", { class: "draft-cell" }, [
                h("div", { class: "icon" }, iconViews.buildTickIcon(selected))
            ]);

        return view;
    },

    buildBotCell: (draft: IDraft): VNode => {

        const view: VNode =

            h("div", { class: "draft-cell" }, [
                h("div",
                    {
                        class: {
                            icon: true,
                            button: true,
                            "on-quiet": true
                        },
                        onClick: [
                            gBotActions.showDraftHub,
                            (_event: any) => draft.key
                        ],
                        onMouseOver: [
                            gTooltipActions.showTooltipWithEvent,
                            (event: any) => {
                                return new StringEvent(
                                    "View in lens",
                                    event
                                );
                            }
                        ],
                        onMouseOut: gTooltipActions.clearTooltip
                    },

                    iconViews.buildDraftIcon()
                )
            ]);

        return view;
    },

    buildPromoteDraftCell: (draft: IDraft): VNode => {

        const view: VNode =

            h("div", { class: "draft-cell" }, [
                h("div",
                    {
                        class: {
                            icon: true,
                            button: true,
                            "on-quiet": true
                        },
                        onClick: [
                            botActions.promoteDraft,
                            (_event: any) => draft.key
                        ],
                        onMouseOver: [
                            gTooltipActions.showTooltipWithEvent,
                            (event: any) => {
                                return new StringEvent(
                                    "Edit draft",
                                    event
                                );
                            }
                        ],
                        onMouseOut: gTooltipActions.clearTooltip
                    },

                    iconViews.buildPromoteIcon()
                )
            ]);

        return view;
    },

    buildDeleteBotCell: (draft: IDraft): VNode => {

        let properties: any = {
            class: {
                icon: true,
                button: true,
                "on-quiet": true
            },
            onMouseOut: gTooltipActions.clearTooltip
        };

        let tooltip: string;

        properties.onClick = [
            botActions.deleteDraft,
            (_event: any) => draft.key
        ];

        tooltip = "Delete draft";

        properties.onMouseOver = [
            gTooltipActions.showTooltipWithEvent,
            (event: any) => {
                return new StringEvent(
                    tooltip,
                    event
                );
            }
        ];

        const view: VNode =

            h("div", { class: "draft-cell" }, [
                h("div",
                    properties,

                    iconViews.buildDeleteIcon()
                )
            ]);

        return view;
    },

    buildNameCell: (draft: IDraft): VNode => {

        const view: VNode =

            h("div", { class: "name" }, [
                h("span", {}, `${draft.title}`)
            ]);

        return view;
    }
};

export default draftCellViews;


