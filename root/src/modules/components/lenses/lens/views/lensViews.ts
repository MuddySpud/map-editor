import { h, VNode } from "hyperapp-local";

import IState from "../../../../interfaces/state/IState";
import { TabType } from "../../../../interfaces/enums/TabType";
import IStageBehaviour from "../../../../interfaces/behaviours/IStageBehaviour";
import StageBehaviourElement from "../../../../state/ui/payloads/StageBehaviourElement";
import childLensSelector from "../code/childLensSelector";
import gSession from "../../../../global/gSession";
import headerControlViews from "./headerControlViews";
import lensActions from "../actions/lensActions";
import gTabCode from "../../../../global/code/gTabCode";
import tabViews from "./tabViews";
import ILens from "../../../../interfaces/state/ui/ILens";

import '../scss/index.scss';
import '../scss/search.scss';
import '../scss/tooltip.scss';


const buildOverlayView = (lens: ILens): VNode | null => {

    if (lens.overlayDelegate) {

        const overlayView: VNode = lens.overlayDelegate();
        lens.overlayDelegate = null;

        return overlayView;
    }

    return null;
};


const lensViews = {

    buildView: (state: IState): VNode | null => {

        if (!state.lens) {

            return null;
        }

        const lens: ILens = state.lens;
        const tabTypes: Array<TabType> = gTabCode.getTabs(state);

        if (tabTypes.length === 0
            && !lens.warning) {

            return null;
        }

        const buildTabHeaderView = (): VNode[] => {

            const tabHeaders: VNode[] = [];
            let tabHeader = null;

            tabTypes.forEach(tabType => {

                tabHeader = tabViews.buildTabHeaderView(
                    state,
                    tabType);

                tabHeaders.push(tabHeader);
            });

            return tabHeaders;
        };

        const buildTabBodyView = (): VNode | null => {

            if (lens.minimised === true) {

                return null;
            }

            const tabView: VNode =

                h("div", { id: "tabBox" }, [

                    tabViews.buildTabBodyView(
                        state,
                        lens.selectedTab)
                ]);

            return tabView;
        };

        const isMinimised: boolean = lens.minimised === true;
        let tooltip: string;

        if (isMinimised === false) {

            tooltip = "Minimise the lens without clearing the data";
        }
        else {
            tooltip = `Maximise the lens`;
        }

        const stageBehaviour: IStageBehaviour = childLensSelector.getStageBehaviour(state);
        const scrollTop: number = stageBehaviour.getScroll();
        const drawShadow: boolean = scrollTop > 0;
        gSession.setLensScrollTop(scrollTop);

        const tabBodyView: VNode | null = buildTabBodyView();
        const overlayView: VNode | null = buildOverlayView(lens);
        let isOverlay: boolean = overlayView != null;

        const lensView: VNode =

            h("div", { id: "lensView" }, [
                h("div",
                    {
                        id: "lens",
                        key: "lens",
                        class: {
                            min: isMinimised
                        }
                    },
                    [
                        h("div",
                            {
                                id: "headerShadow",
                                class:
                                {
                                    show: drawShadow
                                }
                            },
                            ""
                        ),
                        h("div", { id: "tabHeader", }, [

                            ...buildTabHeaderView(),

                            headerControlViews.buildLensControlView(
                                tooltip,
                                "Clear and close the lens",
                                lensActions.toggleMinimise,
                                lensActions.close,
                                isMinimised
                            )
                        ]),
                        h("div", { id: "tabBodyWrapper", }, [
                            h("div",
                                {
                                    id: "tabBody",
                                    class: {
                                        overlay: isOverlay
                                    },
                                    onScroll: [
                                        lensActions.cacheScrollPosition,
                                        (event: any) => {
                                            return new StageBehaviourElement(
                                                stageBehaviour,
                                                event.target
                                            );
                                        }
                                    ]
                                },
                                [
                                    tabBodyView
                                ]
                            ),

                            overlayView
                        ])
                    ]
                )
            ]);

        return lensView;
    }
};

export default lensViews;


