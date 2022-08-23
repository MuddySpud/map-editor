import { h, VNode } from "hyperapp-local";


const draftTitleViews = {

    buildHubTitleView: (): VNode[] => {

        const view: VNode[] = [

            h("div", { class: "icons" }, [
                h("div", { class: "draft-hub-icon" }, ""),
            ]),
            h("h3", {}, "Bot draft hub")
        ];

        return view;
    }
};

export default draftTitleViews;


