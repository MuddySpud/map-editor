import { h, VNode } from "hyperapp-local";

import "../scss/spinner.scss";


const loadingView = {

    buildView: (text: string = "loading..."): VNode => {

        const view: VNode =

            h("div", { class: "loading" }, [
                h("div", { class: "icon" }, ""),
                h("span", { class: "load-text" }, `${text}`),
                h("div", { class: "tree-spinner" }, [
                    h("div", {}, ''),
                    h("div", {}, ''),
                    h("div", {}, ''),
                ])
            ]);

        return view;
    }
};

export default loadingView;


