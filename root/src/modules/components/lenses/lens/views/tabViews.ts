import { h, VNode } from "hyperapp-local";

import { TabType } from "../../../../interfaces/enums/TabType";
import tabActions from "../actions/tabActions";
import tabsCode from "../code/tabsCode";
import IState from "../../../../interfaces/state/IState";
import childLensSelector from "../code/childLensSelector";
import ILens from "../../../../interfaces/state/ui/ILens";
import BoolString from "../../../../state/ui/payloads/BoolString";
import U from "../../../../global/gUtilities";
import TabTypeEvent from "../../../../state/ui/payloads/TabTypeEvent";
import gTooltipActions from "../../../../global/actions/gTooltipActions";
import StringEvent from "../../../../state/ui/payloads/StringEvent";


const tabViews = {

    buildTabHeaderView: (
        state: IState,
        tabType: TabType): VNode => {

        const lens: ILens = state.lens;
        const tabHeaderID = tabsCode.getTabHeaderID(tabType);
        const selected: boolean = lens.selectedTab === tabType;

        const result: BoolString = tabsCode.getTabFlash(
            state,
            tabType);

        let titleViews: VNode[] = [];

        const buildCloseTabButton = (buildIcon: boolean): VNode => {

            const buttonView: VNode =

                h("div", { class: "close-tab" }, [
                    buildCloseTabIcon(buildIcon)
                ]);

            return buttonView;
        };

        const buildCloseTabIcon = (buildIcon: boolean): VNode | null => {

            if (!buildIcon) {

                return null;
            }

            const iconView: VNode =

                h("div",
                    {
                        class: "close-icon",
                        onClick: [
                            tabActions.closeTab,
                            (event: any) => {

                                return new TabTypeEvent(
                                    tabType,
                                    event
                                );
                            }
                        ],
                        onMouseOver: [
                            gTooltipActions.showTooltipWithEvent,
                            (event: any) => {
                                return new StringEvent(
                                    `Close ${tabType} tab`,
                                    event
                                );
                            }
                        ],
                        onMouseOut: gTooltipActions.clearTooltip
                    },
                    ''
                );

            return iconView;
        };

        const buildTabProperties = () => {

            const properties: any =
            {
                id: tabHeaderID,
                class: {
                    "tab-button": true,
                    "selected": selected
                },
                onMouseOut: gTooltipActions.clearTooltip
            };

            if (selected === false) {

                properties.onClick = [
                    tabActions.showTab,
                    (_event: any) => tabType
                ];

                properties.onMouseOver = [
                    gTooltipActions.showTooltipWithEvent,
                    (event: any) => {
                        return new StringEvent(
                            `Show ${tabType} tab`,
                            event
                        );
                    }
                ];
            }

            return properties;
        };

        if (tabType === TabType.Alts) {

            titleViews = [
                
                h("span", {}, `${tabType}`),
            ];
        }
        else if (result.success === true) {

            let iconClasses = `${tabType}-icon animate-icon`;

            if (U.isNullOrWhiteSpace(result.classNames) === false) {

                iconClasses = `${iconClasses} ${result.classNames}`;
            }

            titleViews = [
                h("div", { class: iconClasses }),
                h("span", { class: 'animate-text' }, `${tabType}`),
                buildCloseTabButton(false)
            ];
        }
        else {

            titleViews = [
                h("span", {}, `${tabType}`),
                buildCloseTabButton(true)
            ];
        }

        const headerView: VNode = h("div", buildTabProperties(), titleViews);

        return headerView;
    },

    buildTabBodyView: (
        state: IState,
        tabType: TabType): VNode => {

        const tabID = tabsCode.getTabID(tabType);
        
        const bodyView: VNode =

            h("div",
                {
                    id: `${tabID}`
                },
                childLensSelector.getChildLensView(state)
            );

        return bodyView;
    }
};

export default tabViews;


