import { VNode } from "hyperapp-local";

import IStRoot from "../../../../../../../interfaces/state/tree/IStRoot";
import IStSocket from "../../../../../../../interfaces/state/tree/IStSocket";
import INodeBase from "../../../../../../../interfaces/state/tree/INodeBase";
import tableViews from "../../../../../lens/views/tableViews";


const subtreeRowViews = {

    buildSocketTextView: (
        stSocket: IStSocket,
        rowClass: string = ''): VNode => {

        return tableViews.build2ColumnKeyValueRowView(
            "text",
            stSocket.text,
            rowClass
        );
    },

    buildSocketKeyView: (
        stSocket: IStSocket,
        rowClass: string = ''): VNode => {

        return tableViews.build2ColumnKeyValueRowView(
            "key",
            stSocket.key,
            rowClass
        );
    },

    buildSocketIndexTextView: (
        stSocket: IStSocket,
        index: number,
        rowClass: string = ''): VNode => {

        return tableViews.build3ColumnIndexKeyValueRowView(
            `${index}`,
            "text",
            stSocket.text,
            rowClass
        );
    },

    buildSocketIndexKeyView: (
        stSocket: IStSocket,
        rowClass: string = ''): VNode => {

        return tableViews.build3ColumnIndexKeyValueRowView(
            "",
            "key",
            stSocket.key,
            rowClass
        );
    },

    buildRootDiscussionView: (
        root: INodeBase,
        rowClass: string = ''): VNode => {

        return tableViews.build2ColumnKeyValueRowView(
            "discussion",
            root.discussion,
            rowClass
        );
    },

    buildRootTokenView: (
        root: INodeBase,
        rowClass: string = ''): VNode => {

        return tableViews.build2ColumnKeyValueRowView(
            "token",
            root.token,
            rowClass
        );
    },

    buildRootKeyView: (
        root: INodeBase,
        rowClass: string = ''): VNode => {

        return tableViews.build2ColumnKeyValueRowView(
            "key",
            root.key,
            rowClass
        );
    },

    buildStRootKeyView: (
        stRoot: IStRoot,
        rowClass: string = ''): VNode => {

        return tableViews.build2ColumnKeyValueRowView(
            "key",
            stRoot.key,
            rowClass
        );
    },

    buildStRootTextView: (
        stRoot: IStRoot,
        rowClass: string = ''): VNode => {

        return tableViews.build2ColumnKeyValueRowView(
            "text",
            stRoot.text,
            rowClass
        );
    }
};

export default subtreeRowViews;


