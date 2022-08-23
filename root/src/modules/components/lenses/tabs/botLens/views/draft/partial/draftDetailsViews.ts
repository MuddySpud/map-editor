import { h, VNode } from "hyperapp-local";

import CssClasses from "../../../../../../../state/constants/CssClasses";
import tableViews from "../../../../../lens/views/tableViews";
import IDraft from "../../../../../../../interfaces/state/bot/IDraft";
import U from "../../../../../../../global/gUtilities";


const draftDetailsViews = {

    buildNameView: (
        draft: IDraft,
        rowClass: string = ''): VNode => {

        return tableViews.build2ColumnKeyValueRowView(
            "name",
            draft.name,
            rowClass
        );
    },

    buildTitleView: (
        draft: IDraft,
        rowClass: string = ''): VNode => {

        return tableViews.build2ColumnKeyValueRowView(
            "title",
            draft.title,
            rowClass
        );
    },

    buildDescriptionView: (
        draft: IDraft,
        rowClass: string = ''): VNode => {

        return tableViews.build2ColumnKeyValueRowView(
            "description",
            draft.description,
            rowClass
        );
    },

    buildTagsView: (
        draft: IDraft,
        rowClass: string = ''): VNode => {

        return tableViews.build2ColumnKeyValueRowView(
            "tags",
            U.joinByNewLine(draft.tags),
            rowClass
        );
    },

    buildCreatedView: (
        draft: IDraft,
        rowClass: string = ''): VNode => {

        return tableViews.build2ColumnKeyValueRowView(
            "created",
            `${draft.created}`,
            rowClass
        );
    },

    buildKeyView: (
        draft: IDraft,
        rowClass: string = ''): VNode => {

        return tableViews.build2ColumnKeyValueRowView(
            "key",
            draft.key,
            rowClass
        );
    },

    buildTreeKeyView: (
        draft: IDraft,
        rowClass: string = ''): VNode => {

        return tableViews.build2ColumnKeyValueRowView(
            "treeKey",
            draft.treeKey,
            rowClass
        );
    },

    buildJobKeyView: (
        draft: IDraft,
        rowClass: string = ''): VNode => {

        return tableViews.build2ColumnKeyValueRowView(
            "jobKey",
            draft.jobKey,
            rowClass
        );
    },

    buildRootDkIDView: (
        draft: IDraft,
        rowClass: string = ''): VNode => {

        return tableViews.build2ColumnKeyValueRowView(
            "rootDkID",
            draft.rootDkID,
            rowClass
        );
    },

    buildVersionView: (
        draft: IDraft,
        rowClass: string = ''): VNode => {

        return tableViews.build2ColumnKeyValueRowView(
            "version",
            draft.version,
            rowClass
        );
    },

    buildTokenView: (
        draft: IDraft,
        rowClass: string = ''): VNode => {

        return tableViews.build2ColumnKeyValueRowView(
            "token",
            draft.token,
            rowClass
        );
    },

    buildMaxDetailsView: (draft: IDraft): VNode[] => {

        if (!draft) {

            return [];
        }

        const view: VNode[] = [

            draftDetailsViews.buildDraftExtraDetailsView(
                draft,
                CssClasses.even,
                CssClasses.odd
            ),
        ];

        return view;
    },

    buildMinDetailsView: (draft: IDraft): VNode => {

        const view: VNode =

            h("div", { class: "detail" }, [
                h("div", { class: "bot" }, [

                    draftDetailsViews.buildKeyView(draft, CssClasses.odd),
                    draftDetailsViews.buildTitleView(draft),
                    draftDetailsViews.buildDescriptionView(draft, CssClasses.odd)
                ])
            ]);

        return view;
    },

    buildDraftExtraDetailsView: (
        draft: IDraft,
        oddClass: string = CssClasses.odd,
        evenClass: string = CssClasses.even): VNode => {

        const view: VNode =

            h("div", { class: "bot" }, [

                draftDetailsViews.buildKeyView(draft, CssClasses.odd),
                draftDetailsViews.buildTitleView(draft),
                draftDetailsViews.buildDescriptionView(draft, CssClasses.odd),
                draftDetailsViews.buildTreeKeyView(draft),
                draftDetailsViews.buildJobKeyView(draft, CssClasses.odd),
                draftDetailsViews.buildNameView(draft, oddClass),
                draftDetailsViews.buildRootDkIDView(draft, evenClass),
                draftDetailsViews.buildTagsView(draft, oddClass),
                draftDetailsViews.buildTokenView(draft, evenClass),
                draftDetailsViews.buildVersionView(draft, oddClass),
                draftDetailsViews.buildCreatedView(draft, evenClass)
            ]);

        return view;
    }
};

export default draftDetailsViews;


