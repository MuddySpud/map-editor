import { h, VNode } from "hyperapp-local";

import IAlias from "../../../../../../../interfaces/state/bot/IAlias";
import aliasLensControlsViews from "../../alias/partial/aliasLensControlsViews";


const aliasTitleViews = {

    buildHubTitleView: (): VNode[] => {

        const view: VNode[] = [

            h("div", { class: "icons" }, [
                h("div", { class: "alias-hub-icon" }, ""),
            ]),
            h("h3", {}, "Bot alias hub")
        ];

        return view;
    },

    buildEditTitleView: (alias: IAlias): VNode[] => {

        const view: VNode[] = [

            aliasLensControlsViews.build_Refresh_Show_Hub_ControlsView(alias),

            h("div", { class: "icons" }, [
                h("div", { class: "bot-icon" }, ""),
            ]),
            h("h3", {}, "Edit bot alias"),
            h("div", { class: "sub-icons" }, [
                h("div", { class: "properties-icon" }, ""),
                h("div", { class: "edit-icon" }, "")
            ])
        ];

        return view;
    },

    buildCreateTitleView: (): VNode[] => {

        const view: VNode[] = [

            aliasLensControlsViews.build_Refresh_Show_ControlsView(),

            h("div", { class: "icons" }, [
                h("div", { class: "draft-icon" }, ""),
            ]),
            h("h3", {}, "Promote draft to alias"),
            h("div", { class: "sub-icons" }, [
                h("div", { class: "properties-icon" }, ""),
                h("div", { class: "create-icon" }, "")
            ])
        ];

        return view;
    }
};

export default aliasTitleViews;


