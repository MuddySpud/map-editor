import { h, VNode } from "hyperapp-local";
import gBotActions from "../../../../../../../global/actions/gBotActions";
import gTooltipActions from "../../../../../../../global/actions/gTooltipActions";
import IAlias from "../../../../../../../interfaces/state/bot/IAlias";


const aliasLensControlsViews = {

    buildRefreshLensBotAliasButtonView: (): VNode => {

        const controlsView: VNode =

            h("div",
                {
                    class: "refresh",
                    onClick: gBotActions.confirmRefreshLensBotAlias,
                    onMouseOver: [
                        gTooltipActions.showTooltip,
                        (_event: any) => "Refresh the edited bot alias with the selected alias from the alias-view"
                    ],
                    onMouseOut: gTooltipActions.clearTooltip
                },
                ""
            );

        return controlsView;
    },

    buildShowAliasHubButtonView: (alias: IAlias) => {

        const controlsView =

            h("div",
                {
                    class: "show-alias-hub",
                    onClick: [
                        gBotActions.showAliasHub,
                        (_event: any) => alias.key
                    ],
                onMouseOver: [
                        gTooltipActions.showTooltip,
                        (_event: any) => "Back to the bot alias hub"
                    ],
                    onMouseOut: gTooltipActions.clearTooltip
                },
                ""
            );

        return controlsView;
    },

    buildShowSelectedAliasView: (): VNode => {

        const controlsView: VNode =

            h("div",
                {
                    class: "show-selected",
                    onClick: gBotActions.showSelectedAlias,
                    onMouseOver: [
                        gTooltipActions.showTooltip,
                        (_event: any) => "Show the selected bot alias in bot-view"
                    ],
                    onMouseOut: gTooltipActions.clearTooltip
                },
                ""
            );

        return controlsView;
    },

    build_ShowSelected_ControlsView: (): VNode => {

        const controlsView: VNode =

            h("div", { class: "child-controls" }, [

                aliasLensControlsViews.buildShowSelectedAliasView(),
            ]);

        return controlsView;
    },

    build_Refresh_Show_Hub_ControlsView: (alias: IAlias): VNode => {

        const controlsView: VNode =

            h("div", { class: "child-controls" }, [

                aliasLensControlsViews.buildShowAliasHubButtonView(alias),
                aliasLensControlsViews.buildRefreshLensBotAliasButtonView(),
                aliasLensControlsViews.buildShowSelectedAliasView(),
            ]);

        return controlsView;
    },

    build_Refresh_Show_ControlsView: (): VNode => {

        const controlsView: VNode =

            h("div", { class: "child-controls" }, [
                
                aliasLensControlsViews.buildRefreshLensBotAliasButtonView(),
                aliasLensControlsViews.buildShowSelectedAliasView(),
            ]);

        return controlsView;
    }
};

export default aliasLensControlsViews;


