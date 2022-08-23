import { h, VNode } from "hyperapp-local";

import ISpread from "../../../../../../interfaces/state/tree/ISpread";
import spreadActions from "../../actions/spreadActions";
import spreadViewActions from "../../actions/viewActions/spreadViewActions";
import gTooltipActions from "../../../../../../global/actions/gTooltipActions";
import StringEvent from "../../../../../../state/ui/payloads/StringEvent";


const spreadViews = {

    buildSpreadsView: (spread: ISpread): VNode[] => {

        const spreadsView: VNode[] = [];

        spread.subSpreads.forEach((subSpread: ISpread) => {

            spreadsView.push(spreadViews.buildSpreadView(subSpread));
        });

        return spreadsView;
    },

    buildSpreadView: (spread: ISpread): VNode => {

        let buildSpreadProperties = (): any => {

            const properties = {

                class: {
                    "spread": true,
                    "expanded": spread.ui.expanded === true
                },
                key: `${spread.id}`
            };

            return properties;
        };

        let buildChildren = (): VNode => {

            let children: VNode[] = [];
            let hidden: boolean = true;

            if (spread.ui.expanded === true) {

                hidden = false;

                children = spreadViews.buildSpreadsView(spread);
            }

            const properties = {

                class: {
                    "kids": true,
                    "hidden": hidden
                }
            };

            let childView =

                h("div", properties, [
                    h("div", { class: "spreads" }, children)
                ]);

            return childView;
        };

        let buildExpandButton = (spread: ISpread): VNode | null => {

            if (!spread.subSpreads
                || spread.subSpreads.length === 0) {

                return null;
            }

            const expandView: VNode =

                h("div",
                    {
                        class: "spread-expand",
                        onClick: [
                            spreadActions.toggleExpandSpread,
                            (_event: any) => spread
                        ],
                    },
                    ""
                );

            return expandView;
        };

        const spreadView: VNode =

            h("div", buildSpreadProperties(), [

                buildExpandButton(spread),

                h("a",
                    {
                        onMouseEnter: [
                            spreadViewActions.onSpreadMouseEnter,
                            (event: any) => event.target
                        ],
                        onMouseLeave: [
                            spreadViewActions.onSpreadMouseLeave,
                            (event: any) => event.target
                        ]
                    },
                    [
                        h("div",
                            {
                                class: "open-subtree",
                                onClick: [
                                    spreadActions.openInNewTab,
                                    (_event: any) => spread
                                ],
                                onMouseOver: [
                                    gTooltipActions.showTooltipWithEvent,
                                    (event: any) => {
                                        return new StringEvent(
                                            "Show subtree in a new browser tab",
                                            event
                                        );
                                    }
                                ],
                                onMouseOut: gTooltipActions.clearTooltip
                            },
                            ""
                        ),
                        h("span", {}, spread.tree.token)
                    ]),

                buildChildren()
            ]);

        return spreadView;
    }

};

export default spreadViews;
