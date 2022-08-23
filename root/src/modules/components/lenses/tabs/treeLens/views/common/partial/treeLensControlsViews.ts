import { h } from "hyperapp-local";

import gTooltipActions from "../../../../../../../global/actions/gTooltipActions";
import treeActions from "../../../actions/treeActions";
import lensControlsViews from "../../../../../lens/views/lensControlsViews";


const treeLensControlsViews = {

    build_Refresh_Show_Hubs_ControlsView: () => {

        const controlsView =

            h("div", { class: "child-controls" }, [
                treeLensControlsViews.buildShowTreeHubButtonView(),
                treeLensControlsViews.buildShowSubtreeHubButtonView(),
                lensControlsViews.buildRefreshLensTreeButtonView(),
                lensControlsViews.buildShowSelectedTreeView(),
            ]);

        return controlsView;
    },

    build_Show_Hubs_ControlsView: () => {

        const controlsView =

            h("div", { class: "child-controls" }, [
                treeLensControlsViews.buildShowTreeHubButtonView(),
                treeLensControlsViews.buildShowSubtreeHubButtonView(),
                lensControlsViews.buildShowSelectedTreeView(),
            ]);

        return controlsView;
    },

    build_Refresh_Show_Hub_ControlsView: () => {

        const controlsView =

            h("div", { class: "child-controls" }, [
                treeLensControlsViews.buildShowTreeHubButtonView(),
                lensControlsViews.buildRefreshLensTreeButtonView(),
                lensControlsViews.buildShowSelectedTreeView(),
            ]);

        return controlsView;
    },

    build_Show_Hub_ControlsView: () => {

        const controlsView =

            h("div", { class: "child-controls" }, [
                treeLensControlsViews.buildShowTreeHubButtonView(),
                lensControlsViews.buildShowSelectedTreeView(),
            ]);

        return controlsView;
    },

    build_Refresh_Show_ControlsView: () => {

        const controlsView =

            h("div", { class: "child-controls" }, [
                lensControlsViews.buildRefreshLensTreeButtonView(),
                lensControlsViews.buildShowSelectedTreeView(),
            ]);

        return controlsView;
    },

    buildShowTreeHubButtonView: () => {

        const controlsView =

            h("div",
                {
                    class: "show-tree-hub",
                    onClick: treeActions.showTreeHub,
                    onMouseOver: [
                        gTooltipActions.showTooltip,
                        (_event: any) => "Back to the tree hub"
                    ],
                    onMouseOut: gTooltipActions.clearTooltip
                },
                ""
            );

        return controlsView;
    },

    buildShowSubtreeHubButtonView: () => {

        const controlsView =

            h("div",
                {
                    class: "show-subtree-hub",
                    onClick: treeActions.showSubtreeHub,
                    onMouseOver: [
                        gTooltipActions.showTooltip,
                        (_event: any) => "Back to the subtree hub"
                    ],
                    onMouseOut: gTooltipActions.clearTooltip
                },
                ""
            );

        return controlsView;
    }
};

export default treeLensControlsViews;


