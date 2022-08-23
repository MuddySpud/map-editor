import { h, VNode } from "hyperapp-local";

import IState from "../../../../interfaces/state/IState";
import IStateAnyArray from "../../../../interfaces/state/IStateAnyArray";
import IStageBehaviour from "../../../../interfaces/behaviours/IStageBehaviour";
import navigationViews from "../../lens/views/navigationViews";
import gNodeActions from "../../../../global/actions/gNodeActions";
import gSubtreeActions from "../../../../global/actions/gSubtreeActions";
import gTooltipActions from "../../../../global/actions/gTooltipActions";
import gBranchTaskActions from "../../../../global/actions/gBranchTaskActions";
import U from "../../../../global/gUtilities";
import StringEvent from "../../../../state/ui/payloads/StringEvent";
import TokenKey from "../../../../state/ui/payloads/TokenKey";
import gTreeActions from "../../../../global/actions/gTreeActions";


const lensControlsViews = {

    build_Refresh_Show_ControlsView: (): VNode => {

        const controlsView: VNode =

            h("div", { class: "child-controls" }, [
                lensControlsViews.buildRefreshLensNodeButtonView(),
                lensControlsViews.buildShowSelectedButtonView(),
            ]);

        return controlsView;
    },

    build_Refresh_Show_Swap_Open_ControlsView: (stageBehaviour: IStageBehaviour | null): VNode => {

        const controlsView: VNode =

            h("div", { class: "child-controls" }, [
                navigationViews.buildForwardButton(stageBehaviour),
                navigationViews.buildBackButton(stageBehaviour),
                lensControlsViews.buildRefreshLensNodeButtonView(),
                lensControlsViews.buildShowSelectedButtonView(),
                lensControlsViews.buildSwapSubtreeButtonView(),
                lensControlsViews.buildOpenSubtreeButtonView()
            ]);

        return controlsView;
    },

    build_Nav_Refresh_Show_ControlsView: (stageBehaviour: IStageBehaviour | null): VNode => {

        const controlsView: VNode =

            h("div", { class: "child-controls" }, [
                navigationViews.buildForwardButton(stageBehaviour),
                navigationViews.buildBackButton(stageBehaviour),
                lensControlsViews.buildRefreshLensNodeButtonView(),
                lensControlsViews.buildShowSelectedButtonView()
            ]);

        return controlsView;
    },

    build_Nav_Refresh_Show_O_T_ControlsView: (stageBehaviour: IStageBehaviour | null): VNode => {

        const controlsView: VNode =

            h("div", { class: "child-controls" }, [
                navigationViews.buildForwardButton(stageBehaviour),
                navigationViews.buildBackButton(stageBehaviour),
                lensControlsViews.buildRefreshLensNodeButtonView(),
                lensControlsViews.buildShowSelectedButtonView(),
                lensControlsViews.buildShowSelectedButtonView()
            ]);

        return controlsView;
    },

    build_Nav_Refresh_Show_Open_ControlsView: (stageBehaviour: IStageBehaviour | null): VNode => {

        const controlsView: VNode =

            h("div", { class: "child-controls" }, [
                navigationViews.buildForwardButton(stageBehaviour),
                navigationViews.buildBackButton(stageBehaviour),
                lensControlsViews.buildRefreshLensNodeButtonView(),
                lensControlsViews.buildShowSelectedButtonView(),
                lensControlsViews.buildOpenSubtreeButtonView()
            ]);

        return controlsView;
    },

    buildOpenSubtreeButtonView: (): VNode => {

        const controlsView: VNode =

            h("div",
                {
                    class: "open-subtree",
                    onClick: gSubtreeActions.openSubtree,
                    onMouseOver: [
                        gTooltipActions.showTooltip,
                        (_event: any) => "Open the subtree in a new tab"
                    ],
                    onMouseOut: gTooltipActions.clearTooltip
                },
                ""
            );

        return controlsView;
    },

    buildOpenNodeInNewTabButtonView: (
        token: string,
        key: string,
        className: string = ''
    ): VNode => {

        const controlsView: VNode =

            h("div",
                {
                    class: `open-subtree ${className}`,
                    onClick: [
                        gNodeActions.openNodeWithTokenKey,
                        (_event: any) => {
                            return new TokenKey(
                                token,
                                key
                            );
                        }
                    ],
                    onMouseOver: [
                        gTooltipActions.showTooltipWithEvent,
                        (event: any) => {
                            return new StringEvent(
                                "Show node location within its tree - in a new tab",
                                event
                            );
                        }
                    ],
                    onMouseOut: gTooltipActions.clearTooltip
                },
                ""
            );

        return controlsView;
    },

    buildResetButtonView: (
        tooltip: string,
        onClickAction: (state: IState) => IStateAnyArray): VNode => {

        const controlsView: VNode =

            h("div",
                {
                    class: "refresh",
                    onClick: onClickAction,
                    onMouseOver: [
                        gTooltipActions.showTooltip,
                        (_event: any) => tooltip
                    ],
                    onMouseOut: gTooltipActions.clearTooltip
                },
                ""
            );

        return controlsView;
    },

    buildClickSelectButtonView: (
        tooltip: string,
        onClickAction: (state: IState) => IState): VNode => {

        const controlsView: VNode =

            h("div",
                {
                    class: "click-selector",
                    onClick: onClickAction,
                    onMouseOver: [
                        gTooltipActions.showTooltip,
                        (_event: any) => tooltip
                    ],
                    onMouseOut: gTooltipActions.clearTooltip
                },
                ""
            );

        return controlsView;
    },

    buildRefreshLensTreeButtonView: (): VNode => {

        const controlsView: VNode =

            h("div",
                {
                    class: "refresh",
                    onClick: gTreeActions.confirmRefreshLensTree,
                    onMouseOver: [
                        gTooltipActions.showTooltip,
                        (_event: any) => "Refresh the edited node with the selected node from the tree-view"
                    ],
                    onMouseOut: gTooltipActions.clearTooltip
                },
                ""
            );

        return controlsView;
    },

    buildRefreshLensNodeButtonView: (): VNode => {

        const controlsView: VNode =

            h("div",
                {
                    class: "refresh",
                    onClick: gNodeActions.confirmRefreshLensNode,
                    onMouseOver: [
                        gTooltipActions.showTooltip,
                        (_event: any) => "Refresh the edited node with the selected node from the tree-view"
                    ],
                    onMouseOut: gTooltipActions.clearTooltip
                },
                ""
            );

        return controlsView;
    },

    buildShowSelectedButtonView: (): VNode => {

        const controlsView: VNode =

            h("div",
                {
                    class: "show-selected",
                    onClick: gNodeActions.showSelectedNode,
                    onMouseOver: [
                        gTooltipActions.showTooltip,
                        (_event: any) => "Show the selected node in branches-view"
                    ],
                    onMouseOut: gTooltipActions.clearTooltip
                },
                ""
            );

        return controlsView;
    },

    buildShowSelectedTreeView: (): VNode => {

        const controlsView: VNode =

            h("div",
                {
                    class: "show-selected",
                    onClick: gTreeActions.showSelectedTree,
                    onMouseOver: [
                        gTooltipActions.showTooltip,
                        (_event: any) => "Show the selected tree in tree-view"
                    ],
                    onMouseOut: gTooltipActions.clearTooltip
                },
                ""
            );

        return controlsView;
    },

    buildLocateButtonView: (
        key: string,
        tooltip: string,
        className: string = ''): VNode | null => {

        if (!U.isPositiveNumeric(key)) {

            return null;
        }

        const controlsView: VNode =

            h("div",
                {
                    class: `show-selected ${className}`,
                    onClick: [
                        gBranchTaskActions.showOption,
                        (_event: any) => key
                    ],
                    onMouseOver: [
                        gTooltipActions.showTooltip,
                        (_event: any) => tooltip
                    ],
                    onMouseOut: gTooltipActions.clearTooltip
                },
                ""
            );

        return controlsView;
    },

    buildSwapSubtreeButtonView: (): VNode => {

        const controlsView: VNode =

            h("div",
                {
                    class: "swap-subtree",
                    onClick: gSubtreeActions.startSubtreeSwap,
                    onMouseOver: [
                        gTooltipActions.showTooltip,
                        (_event: any) => "Swap this subtree for another"
                    ],
                    onMouseOut: gTooltipActions.clearTooltip
                },
                ""
            );

        return controlsView;
    }
};

export default lensControlsViews;


