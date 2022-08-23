import { h, VNode } from "hyperapp-local";

import IDeed from "../../../../../../interfaces/state/notifications/IDeed";
import U from "../../../../../../global/gUtilities";



const historyDetailsViews = {

    buildDetailsView: (deed: IDeed): VNode | null => {

        if (!deed) {

            return null;
        }

        const view: VNode =

            h("div",
                {
                    class: 'deed'
                },
                [
                    h("div",
                        {
                            class: "row"
                        },
                        [
                            h("div", { class: "key" }, "id"),
                            h("div", { class: "value" }, `${deed.id}`),
                        ]
                    ),
                    h("div",
                        {
                            class: "row"
                        },
                        [
                            h("div", { class: "key" }, "item key"),
                            h("div", { class: "value" }, `${deed.itemKey}`),
                        ]
                    ),
                    h("div",
                        {
                            class: "row"
                        },
                        [
                            h("div", { class: "key" }, "item token"),
                            h("div", { class: "value" }, `${deed.itemToken}`),
                        ]
                    ),
                    h("div",
                        {
                            class: "row"
                        },
                        [
                            h("div", { class: "key" }, "action"),
                            h("div", { class: "value" }, `${deed.action.toString()}`),
                        ]
                    ),
                    h("div",
                        {
                            class: "row"
                        },
                        [
                            h("div", { class: "key" }, "url"),
                            h("div", { class: "value" }, `${deed.url}`),
                        ]
                    ),
                    h("div",
                        {
                            class: "row"
                        },
                        [
                            h("div", { class: "key" }, "created"),
                            h("div", { class: "value" }, `${deed.created}`),
                        ]
                    ),
                    h("div",
                        {
                            class: "row"
                        },
                        [
                            h("div", { class: "key" }, "body"),
                            h("div", { class: "value json-pretty" }, `${U.prettyPrintJsonFromString(deed.body)}`),
                        ]
                    ),
                ]
            );

        return view;
    }
}

export default historyDetailsViews;


