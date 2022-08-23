import { h, VNode } from "hyperapp-local";


const tableViews = {

    build2ColumnKeyValueRowView: (
        key: string | null,
        value: string | null,
        rowClass: string = ''): VNode => {

        const detailsView: VNode =

            h("div", { class: `row ${rowClass}` }, [
                h("div", { class: "key" }, `${key ?? ''}`),
                h("div", { class: "value" }, `${value ?? ''}`)
            ]);

        return detailsView;
    },

    build2ColumnKeyValueViewRowView: (
        key: string | null,
        value: any,
        rowClass: string = ''): VNode => {

        const detailsView: VNode =

            h("div", { class: `row ${rowClass}` }, [
                h("div", { class: "key" }, `${key ?? ''}`),
                h("div", { class: "value" }, [value])
            ]);

        return detailsView;
    },

    build2ColumnKeyIconRowView: (
        key: string | null,
        iconClass: string,
        rowClass: string = ''): VNode => {

        const detailsView: VNode =

            h("div", { class: `row ${rowClass}` }, [
                h("div", { class: "key" }, `${key ?? ''}`),
                h("div", { class: "value" }, [
                    h("div", { class: `${iconClass}` }, ""),
                ])
            ]);

        return detailsView;
    },

    build2ColumnKeyValueTrRowView: (
        key: string | null,
        iconClass: string,
        rowClass: string = ''): VNode => {

        const detailsView: VNode =

            h("div", { class: `row ${rowClass}` }, [
                h("td", { class: "td-key" }, `${key ?? ''}`),
                h("div", { class: "td-value" }, [
                    h("div", { class: `${iconClass}` }, ""),
                ])
            ]);

        return detailsView;
    },

    build2ColumnKeyIconTrRowView: (
        key: string | null,
        value: string | null,
        rowClass: string = ''): VNode => {

        const detailsView: VNode =

            h("tr", { class: `row ${rowClass}` }, [
                h("td", { class: "td-key" }, `${key ?? ''}`),
                h("td", { class: "td-value" }, `${value ?? ''}`)
            ]);

        return detailsView;
    },

    build3ColumnKeyValueRowView: (
        key: string | null,
        value: string | null,
        rowClass: string = ''): VNode => {

        const detailsView: VNode =

            h("div", { class: `row ${rowClass}` }, [
                h("div", { class: "index" }, ''),
                h("div", { class: "key" }, `${key ?? ''}`),
                h("div", { class: "value" }, `${value ?? ''}`)
            ]);

        return detailsView;
    },

    build3ColumnKeyValueViewRowView: (
        key: string | null,
        value: any,
        rowClass: string = ''): VNode => {

        const detailsView: VNode =

            h("div", { class: `row ${rowClass}` }, [
                h("div", { class: "index" }, ''),
                h("div", { class: "key" }, `${key ?? ''}`),
                h("div", { class: "value" }, [value])
            ]);

        return detailsView;
    },


    build3ColumnKeyValueTrRowView: (
        key: string | null,
        value: string | null,
        rowClass: string = ''): VNode => {

        const detailsView: VNode =

            h("tr", { class: `row ${rowClass}` }, [
                h("td", { class: "td-index" }, ''),
                h("td", { class: "td-key" }, `${key ?? ''}`),
                h("td", { class: "td-value" }, `${value ?? ''}`)
            ]);

        return detailsView;
    },

    build3ColumnIndexKeyValueRowView: (
        index: string | null,
        key: string | null,
        value: string | null,
        rowClass: string = ''): VNode => {

        const detailsView: VNode =

            h("div", { class: `row ${rowClass}` }, [
                h("div", { class: "index" }, `${index ?? ''}`),
                h("div", { class: "key" }, `${key ?? ''}`),
                h("div", { class: "value" }, `${value ?? ''}`)
            ]);

        return detailsView;
    },

    build3ColumnIndexKeyValueTrRowView: (
        index: string | null,
        key: string | null,
        value: string | null,
        rowClass: string = ''): VNode => {

        const detailsView: VNode =

            h("tr", { class: `row ${rowClass}` }, [
                h("td", { class: "td-index" }, `${index ?? ''}`),
                h("td", { class: "td-key" }, `${key ?? ''}`),
                h("td", { class: "td-value" }, `${value ?? ''}`)
            ]);

        return detailsView;
    },

    build3ColumnTextTrRowView: (text: string | null): VNode => {

        return tableViews.build3ColumnKeyValueTrRowView(
            'text',
            text
        );
    },

    build3ColumnKeyTrRowView: (
        key: string | null,
        index: string = '',
        rowClass: string = ''): VNode => {

        return tableViews.build3ColumnIndexKeyValueTrRowView(
            index,
            'key',
            key,
            rowClass
        );
    }
};

export default tableViews;


