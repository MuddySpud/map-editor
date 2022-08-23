import { h, VNode } from "hyperapp-local";

import gTooltipActions from "../../../../global/actions/gTooltipActions";
import StringEvent from "../../../../state/ui/payloads/StringEvent";
import iconViews from "./iconViews";
import IAlias from "../../../../interfaces/state/bot/IAlias";
import gBotActions from "../../../../global/actions/gBotActions";
import botActions from "../actions/botActions";


const aliasCellViews = {

    buildInfoCell: (): VNode => {

        const view: VNode =

            h("div", { class: "alias-cell narrow" }, [
                h("div", { class: "icon" }, [
                    h("div", { class: "info-icon" }, "")
                ])
            ]);

        return view;
    },

    buildTickCell: (selected: boolean): VNode => {

        const view: VNode =

            h("div", { class: "alias-cell" }, [
                h("div", { class: "icon" }, iconViews.buildTickIcon(selected))
            ]);

        return view;
    },

    buildBotCell: (alias: IAlias): VNode => {

        const view: VNode =

            h("div", { class: "alias-cell" }, [
                h("div",
                    {
                        class: {
                            icon: true,
                            button: true,
                            "on-quiet": true
                        },
                        onClick: [
                            gBotActions.showAliasHub,
                            (_event: any) => alias.key
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

                    iconViews.buildAliasIcon()
                )
            ]);

        return view;
    },

    buildEditBotCell: (alias: IAlias): VNode => {

        const view: VNode =

            h("div", { class: "alias-cell" }, [
                h("div",
                    {
                        class: {
                            icon: true,
                            button: true,
                            "on-quiet": true
                        },
                        onClick: [
                            botActions.editAlias,
                            (_event: any) => alias.key
                        ],
                        onMouseOver: [
                            gTooltipActions.showTooltipWithEvent,
                            (event: any) => {
                                return new StringEvent(
                                    "Edit alias",
                                    event
                                );
                            }
                        ],
                        onMouseOut: gTooltipActions.clearTooltip
                    },

                    iconViews.buildEditIcon()
                )
            ]);

        return view;
    },

    buildDeleteBotCell: (alias: IAlias): VNode => {

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
            botActions.deleteAlias,
            (_event: any) => alias.key
        ];

        tooltip = "Delete alias";

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

            h("div", { class: "alias-cell" }, [
                h("div",
                    properties,

                    iconViews.buildDeleteIcon()
                )
            ]);

        return view;
    },

    buildNameCell: (alias: IAlias): VNode => {

        const view: VNode =

            h("div", { class: "name" }, [
                h("span", {}, `${alias.title}`)
            ]);

        return view;
    }
};

export default aliasCellViews;


