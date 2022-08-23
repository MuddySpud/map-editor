import { h, VNode } from "hyperapp-local";

import U from "../../../../global/gUtilities";


const buildErrorView = (errorList: Array<string>): VNode | null => {

    if (errorList.length === 0) {
        
        return null;
    }

    let errors: string = U.joinByNewLine(errorList);
    const view: VNode = h("div", { class: "error" }, errors);

    return view;
};

const inputErrorViews = {

    buildTitleErrorView: (
        title: string,
        errorList: Array<string>): VNode => {

        const view: VNode =

            h("div", { class: "title-table" }, [
                h("div", { class: "title-row" }, [
                    h("div", { class: "title-cell" }, [
                        h("span", { class: "title" }, `${title}`),

                        buildErrorView(errorList)
                    ])
                ]),
            ]);

        return view;
    },

    buildErrorView: (errorList: Array<string>): VNode => {

        const view: VNode =

            h("div", { class: "title-table" }, [
                h("div", { class: "title-row" }, [
                    h("div", { class: "title-cell" }, [

                        buildErrorView(errorList)
                    ])
                ]),
            ]);

        return view;
    },

    buildKeyTitleErrorView: (
        title: string,
        key: string | null | undefined,
        errorList: Array<string>): VNode => {

        const view: VNode =

            h("div", { class: "title-table" }, [
                h("div", { class: "title-row" }, [
                    h("div", { class: "title-cell" }, [
                        h("span", { class: "title" }, `${title}`),

                        buildErrorView(errorList)
                    ]),
                    h("div", { class: "id-cell" }, [
                        h("div", { class: "id" }, `${key ?? ''}`),
                    ]),
                ]),
            ]);

        return view;
    },

    buildKeyTitleView: (
        title: string,
        key: string | null | undefined): VNode => {

        const view: VNode =

            h("div", { class: "title-table" }, [
                h("div", { class: "title-row" }, [
                    h("div", { class: "title-cell" }, [
                        h("span", { class: "title" }, `${title}`),
                    ]),
                    h("div", { class: "id-cell" }, [
                        h("div", { class: "id" }, `${key ?? ''}`),
                    ]),
                ]),
            ]);

        return view;
    },

    buildTitleView: (title: string): VNode => {

        const view: VNode =

            h("div", { class: "title-table" }, [
                h("div", { class: "title-row" }, [
                    h("div", { class: "title-cell" }, [
                        h("span", { class: "title" }, `${title}`),
                    ])
                ]),
            ]);

        return view;
    },

    buildKeyErrorView: (
        key: string | null | undefined,
        errorList: Array<string>): VNode => {

        const view: VNode =

            h("div", { class: "title-table" }, [
                h("div", { class: "title-row" }, [
                    h("div", { class: "title-cell" }, [

                        buildErrorView(errorList)
                    ]),
                    h("div", { class: "id-cell" }, [
                        h("div", { class: "id" }, `${key}`),
                    ]),
                ]),
            ]);

        return view;
    },

    buildKeyView: (key: string | null | undefined): VNode => {

        const view: VNode =

            h("div", { class: "title-table" }, [
                h("div", { class: "title-row" }, [
                    h("div", { class: "id-cell" }, [
                        h("div", { class: "id" }, `${key}`),
                    ]),
                ]),
            ]);

        return view;
    }
};

export default inputErrorViews;


