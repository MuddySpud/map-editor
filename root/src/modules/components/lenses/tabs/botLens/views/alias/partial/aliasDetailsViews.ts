import { h, VNode } from "hyperapp-local";

import CssClasses from "../../../../../../../state/constants/CssClasses";
import tableViews from "../../../../../lens/views/tableViews";
import IAlias from "../../../../../../../interfaces/state/bot/IAlias";
import U from "../../../../../../../global/gUtilities";


const aliasDetailsViews = {

    buildTitleView: (
        alias: IAlias,
        rowClass: string = ''): VNode => {

        return tableViews.build2ColumnKeyValueRowView(
            "title",
            alias.title,
            rowClass
        );
    },

    buildNodeIsEnabledView: (
        alias: IAlias,
        rowClass: string = ''): VNode | null => {

        if (!alias) {

            return null;
        }

        const iconClass: string = alias.enabled === true ? CssClasses.yep : CssClasses.nope;

        return tableViews.build2ColumnKeyIconRowView(
            "enabled",
            iconClass,
            rowClass
        );
    },

    buildDescriptionView: (
        alias: IAlias,
        rowClass: string = ''): VNode => {

        return tableViews.build2ColumnKeyValueRowView(
            "description",
            alias.description,
            rowClass
        );
    },

    buildTagsView: (
        alias: IAlias,
        rowClass: string = ''): VNode => {

        return tableViews.build2ColumnKeyValueRowView(
            "tags",
            U.joinByNewLine(alias.tags),
            rowClass
        );
    },

    buildCreatedView: (
        alias: IAlias,
        rowClass: string = ''): VNode => {

        return tableViews.build2ColumnKeyValueRowView(
            "created",
            `${alias.created}`,
            rowClass
        );
    },

    buildKeyView: (
        alias: IAlias,
        rowClass: string = ''): VNode => {

        return tableViews.build2ColumnKeyValueRowView(
            "key",
            alias.key,
            rowClass
        );
    },

    buildRootDkIDView: (
        alias: IAlias,
        rowClass: string = ''): VNode => {

        return tableViews.build2ColumnKeyValueRowView(
            "rootDkID",
            alias.rootDkID,
            rowClass
        );
    },

    buildVersionView: (
        alias: IAlias,
        rowClass: string = ''): VNode => {

        return tableViews.build2ColumnKeyValueRowView(
            "version",
            alias.version,
            rowClass
        );
    },

    buildTokenView: (
        alias: IAlias,
        rowClass: string = ''): VNode => {

        return tableViews.build2ColumnKeyValueRowView(
            "token",
            alias.token,
            rowClass
        );
    },

    buildMaxDetailsView: (alias: IAlias): VNode[] => {

        if (!alias) {

            return [];
        }

        const view: VNode[] = [

            aliasDetailsViews.buildAliasExtraDetailsView(
                alias,
                CssClasses.even,
                CssClasses.odd
            ),
        ];

        return view;
    },

    buildMinDetailsView: (alias: IAlias): VNode => {

        const view: VNode =

            h("div", { class: "detail" }, [
                h("div", { class: "bot" }, [

                    aliasDetailsViews.buildKeyView(alias, CssClasses.odd),
                    aliasDetailsViews.buildTitleView(alias),
                    aliasDetailsViews.buildDescriptionView(alias, CssClasses.odd),
                    aliasDetailsViews.buildNodeIsEnabledView(alias)
                ])
            ]);

        return view;
    },

    buildAliasExtraDetailsView: (
        alias: IAlias,
        oddClass: string = CssClasses.odd,
        evenClass: string = CssClasses.even): VNode => {

        const view: VNode =

            h("div", { class: "bot" }, [

                aliasDetailsViews.buildKeyView(alias, oddClass),
                aliasDetailsViews.buildTitleView(alias, evenClass),
                aliasDetailsViews.buildDescriptionView(alias, oddClass),
                aliasDetailsViews.buildNodeIsEnabledView(alias, evenClass),
                aliasDetailsViews.buildRootDkIDView(alias, oddClass),
                aliasDetailsViews.buildTagsView(alias, evenClass),
                aliasDetailsViews.buildTokenView(alias, oddClass),
                aliasDetailsViews.buildVersionView(alias, evenClass),
                aliasDetailsViews.buildCreatedView(alias, oddClass)
            ]);

        return view;
    }
};

export default aliasDetailsViews;


