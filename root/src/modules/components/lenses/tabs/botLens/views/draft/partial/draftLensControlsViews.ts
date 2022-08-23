import { h, VNode } from "hyperapp-local";
import gBotActions from "../../../../../../../global/actions/gBotActions";
import gTooltipActions from "../../../../../../../global/actions/gTooltipActions";


const draftLensControlsViews = {

    buildShowSelectedDraftView: (): VNode => {

        const controlsView: VNode =

            h("div",
                {
                    class: "show-selected",
                    onClick: gBotActions.showSelectedDraft,
                    onMouseOver: [
                        gTooltipActions.showTooltip,
                        (_event: any) => "Show the selected bot draft in bot-view"
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
                
                draftLensControlsViews.buildShowSelectedDraftView(),
            ]);

        return controlsView;
    }
};

export default draftLensControlsViews;


