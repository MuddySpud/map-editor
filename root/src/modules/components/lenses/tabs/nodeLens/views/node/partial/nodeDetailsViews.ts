import { h, VNode } from "hyperapp-local";

import INodeBase from "../../../../../../../interfaces/state/tree/INodeBase";
import { NodeType } from "../../../../../../../interfaces/enums/NodeType";
import optionsDetailsViews from "./optionsDetailsViews";
import tableViews from "../../../../../lens/views/tableViews";
import CssClasses from "../../../../../../../state/constants/CssClasses";

const nodeDetailsViews = {

    buildNodeOptionRowView: (
        node: INodeBase | null,
        rowClass: string = ''): VNode | null => {

        if (!node) {

            return null;
        }

        return tableViews.build2ColumnKeyValueRowView(
            "option",
            node.option,
            rowClass
        );
    },

    buildNodeDiscussionRowView: (
        node: INodeBase | null,
        rowClass: string = ''): VNode | null => {

        if (!node) {

            return null;
        }

        return tableViews.build2ColumnKeyValueRowView(
            "discussion",
            node.discussion,
            rowClass
        );
    },

    buildNodeTokenRowView: (
        node: INodeBase | null,
        rowClass: string = ''): VNode | null => {

        if (!node) {

            return null;
        }

        return tableViews.build2ColumnKeyValueRowView(
            "token",
            node.token,
            rowClass
        );
    },

    buildNodeKeyRowView: (
        node: INodeBase | null,
        rowClass: string = ''): VNode | null => {

        if (!node) {

            return null;
        }

        return tableViews.build2ColumnKeyValueRowView(
            "key",
            node.key,
            rowClass
        );
    },

    buildNodeOrderRowView: (
        node: INodeBase | null,
        rowClass: string = ''): VNode | null => {

        if (!node) {

            return null;
        }

        return tableViews.build2ColumnKeyValueRowView(
            "order",
            `${node.order}`,
            rowClass
        );
    },

    buildNodeIsSolutionRowView: (
        node: INodeBase | null,
        rowClass: string = ''): VNode | null => {

        if (!node) {

            return null;
        }

        const iconClass: string = node.type === NodeType.Solution ? CssClasses.yep : CssClasses.nope;

        return tableViews.build2ColumnKeyIconRowView(
            "solution",
            iconClass,
            rowClass
        );
    },

    buildNodeIsRootRowView: (
        node: INodeBase | null,
        rowClass: string = ''): VNode | null => {

        if (!node) {

            return null;
        }

        const iconClass: string = node.isRoot === true ? CssClasses.yep : CssClasses.nope;

        return tableViews.build2ColumnKeyIconRowView(
            "root",
            iconClass,
            rowClass
        );
    },

    buildNodeIsLinkRowView: (
        node: INodeBase | null,
        rowClass: string = ''): VNode | null => {

        if (!node) {

            return null;
        }

        const iconClass: string = node.isLink === true ? CssClasses.yep : CssClasses.nope;

        return tableViews.build2ColumnKeyIconRowView(
            "link",
            iconClass,
            rowClass
        );
    },

    buildNodeIsSocketRowView: (
        node: INodeBase | null,
        rowClass: string = ''): VNode | null => {

        if (!node) {

            return null;
        }

        const iconClass: string = node.isSocket === true ? CssClasses.yep : CssClasses.nope;

        return tableViews.build2ColumnKeyIconRowView(
            "link",
            iconClass,
            rowClass
        );
    },

    buildNodeIsPlugRowView: (
        node: INodeBase | null,
        rowClass: string = ''): VNode | null => {

        if (!node) {

            return null;
        }

        const iconClass: string = node.isPlug === true ? CssClasses.yep : CssClasses.nope;

        return tableViews.build2ColumnKeyIconRowView(
            "socket link",
            iconClass,
            rowClass
        );
    },

    buildNodeIsEntryRowView: (
        node: INodeBase | null,
        rowClass: string = ''): VNode | null => {

        if (!node) {

            return null;
        }

        const iconClass: string = node.isEntry === true ? CssClasses.yep : CssClasses.nope;

        return tableViews.build2ColumnKeyIconRowView(
            "entry",
            iconClass,
            rowClass
        );
    },

    buildMinimisedDiscussionDetailsView: (node: INodeBase | null): VNode | null => {

        if (!node) {

            return null;
        }

        const nodeDetailsView: VNode =

            h("div", { class: "node" }, [

                nodeDetailsViews.buildNodeDiscussionRowView(node, CssClasses.odd),
                nodeDetailsViews.buildNodeTokenRowView(node),
                nodeDetailsViews.buildNodeKeyRowView(node, CssClasses.odd),
            ]);

        return nodeDetailsView;
    },

    buildDiscussionDetailsView: (node: INodeBase | null): VNode | null => {

        if (!node) {

            return null;
        }

        const nodeDetailsView: VNode =

            h("div", { class: "node" }, [

                nodeDetailsViews.buildNodeDiscussionRowView(node, CssClasses.odd),
                nodeDetailsViews.buildNodeTokenRowView(node),
                nodeDetailsViews.buildNodeKeyRowView(node, CssClasses.odd),
                nodeDetailsViews.buildNodeOrderRowView(node),
                nodeDetailsViews.buildNodeIsSolutionRowView(node, CssClasses.odd),
                nodeDetailsViews.buildNodeIsRootRowView(node),
                nodeDetailsViews.buildNodeIsLinkRowView(node, CssClasses.odd),
                nodeDetailsViews.buildNodeIsSocketRowView(node),
                nodeDetailsViews.buildNodeIsPlugRowView(node, CssClasses.odd),
                nodeDetailsViews.buildNodeIsEntryRowView(node),
            ]);

        return nodeDetailsView;
    },

    buildOptionDetailsView: (node: INodeBase | null): VNode | null => {

        if (!node) {

            return null;
        }

        const nodeDetailsView: VNode =

            h("div", { class: "node" }, [

                nodeDetailsViews.buildNodeOptionRowView(node, CssClasses.odd),
                nodeDetailsViews.buildNodeTokenRowView(node),
                nodeDetailsViews.buildNodeKeyRowView(node, CssClasses.odd),
                nodeDetailsViews.buildNodeOrderRowView(node),
                nodeDetailsViews.buildNodeDiscussionRowView(node, CssClasses.odd),
                nodeDetailsViews.buildNodeIsSolutionRowView(node),
                nodeDetailsViews.buildNodeIsRootRowView(node, CssClasses.odd),
                nodeDetailsViews.buildNodeIsLinkRowView(node),
                nodeDetailsViews.buildNodeIsSocketRowView(node, CssClasses.odd),
                nodeDetailsViews.buildNodeIsPlugRowView(node),
                nodeDetailsViews.buildNodeIsEntryRowView(node, CssClasses.odd)
            ]);

        return nodeDetailsView;
    },

    buildMinimisedOptionDetailsView: (node: INodeBase | null): VNode | null => {

        if (!node) {

            return null;
        }

        const nodeDetailsView: VNode =

            h("div", { class: "node" }, [

                nodeDetailsViews.buildNodeOptionRowView(node, CssClasses.odd),
                nodeDetailsViews.buildNodeTokenRowView(node),
                nodeDetailsViews.buildNodeKeyRowView(node, CssClasses.odd),
            ]);

        return nodeDetailsView;
    },

    buildNodeDetailsView: (node: INodeBase | null): VNode | null => {

        if (!node) {

            return null;
        }

        const nodeDetailsView: VNode =

            h("div", { class: "node" }, [

                nodeDetailsViews.buildNodeOptionRowView(node, CssClasses.odd),
                nodeDetailsViews.buildNodeDiscussionRowView(node),
                nodeDetailsViews.buildNodeTokenRowView(node, CssClasses.odd),
                nodeDetailsViews.buildNodeKeyRowView(node),
                nodeDetailsViews.buildNodeOrderRowView(node, CssClasses.odd),
                nodeDetailsViews.buildNodeIsSolutionRowView(node),
                nodeDetailsViews.buildNodeIsRootRowView(node, CssClasses.odd),
                nodeDetailsViews.buildNodeIsLinkRowView(node),
                nodeDetailsViews.buildNodeIsSocketRowView(node, CssClasses.odd),
                nodeDetailsViews.buildNodeIsPlugRowView(node),
                nodeDetailsViews.buildNodeIsEntryRowView(node, CssClasses.odd),
            ]);

        return nodeDetailsView;
    },

    buildParentNodeDetailsView: (parent: INodeBase | null): VNode[] => {

        if (!parent) {

            return [];
        }

        const parentDetailsView: VNode[] = [

            h("div", { class: "header" }, "parent"),
            h("div", { class: "parent" }, [

                nodeDetailsViews.buildNodeDiscussionRowView(parent),
                nodeDetailsViews.buildNodeKeyRowView(parent, CssClasses.odd),
                nodeDetailsViews.buildNodeIsPlugRowView(parent, CssClasses.odd),
            ])
        ];

        return parentDetailsView;
    },

    buildFullNodeDetailsView: (node: INodeBase): VNode => {

        const detailsView: VNode =

            h("div", { class: "detail" }, [
                nodeDetailsViews.buildNodeDetailsView(node),
                ...nodeDetailsViews.buildParentNodeDetailsView(node.parent),
                ...optionsDetailsViews.buildOptionsDetailsView(node.nodes)
            ]);

        return detailsView;
    }
};

export default nodeDetailsViews;


