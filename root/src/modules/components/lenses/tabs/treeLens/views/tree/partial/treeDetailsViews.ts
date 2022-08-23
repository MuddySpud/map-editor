import { h, VNode } from "hyperapp-local";

import ITreeBase from "../../../../../../../interfaces/state/tree/ITreeBase";
import ITreeSys from "../../../../../../../interfaces/state/tree/ITreeSys";
import ITreeStats from "../../../../../../../interfaces/state/tree/ITreeStats";
import INodeBase from "../../../../../../../interfaces/state/tree/INodeBase";
import CssClasses from "../../../../../../../state/constants/CssClasses";
import tableViews from "../../../../../lens/views/tableViews";


const treeDetailsViews = {

    buildNameView: (
        tree: ITreeBase,
        rowClass: string = ''): VNode => {

        return tableViews.build2ColumnKeyValueRowView(
            "name",
            tree.name,
            rowClass
        );
    },

    buildTitleView: (
        tree: ITreeBase,
        rowClass: string = ''): VNode => {

        return tableViews.build2ColumnKeyValueRowView(
            "title",
            tree.title,
            rowClass
        );
    },

    buildDescriptionView: (
        tree: ITreeBase,
        rowClass: string = ''): VNode => {

        return tableViews.build2ColumnKeyValueRowView(
            "description",
            tree.description,
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

    buildRootKeyView: (
        root: INodeBase,
        rowClass: string = ''): VNode => {

        return tableViews.build2ColumnKeyValueRowView(
            "key",
            root.discussion,
            rowClass
        );
    },

    buildTagsView: (
        tree: ITreeBase,
        rowClass: string = ''): VNode => {

        return tableViews.build2ColumnKeyValueRowView(
            "tags",
            tree.tags,
            rowClass
        );
    },

    buildCreatedView: (
        tree: ITreeBase,
        rowClass: string = ''): VNode => {

        return tableViews.build2ColumnKeyValueRowView(
            "created",
            `${tree.created}`,
            rowClass
        );
    },

    buildDeleteLockedView: (
        tree: ITreeSys,
        rowClass: string = ''): VNode => {

        const deleteLockClass: string = tree.deleteLock === true ? CssClasses.yep : CssClasses.nope;

        return tableViews.build2ColumnKeyIconRowView(
            "delete locked",
            deleteLockClass,
            rowClass
        );
    },

    buildKeyView: (
        tree: ITreeBase,
        rowClass: string = ''): VNode => {

        return tableViews.build2ColumnKeyValueRowView(
            "key",
            tree.key,
            rowClass
        );
    },

    buildTokenView: (
        tree: ITreeBase,
        rowClass: string = ''): VNode => {

        return tableViews.build2ColumnKeyValueRowView(
            "token",
            tree.token,
            rowClass
        );
    },

    buildOwnerView: (
        tree: ITreeBase,
        rowClass: string = ''): VNode => {

        return tableViews.build2ColumnKeyValueRowView(
            "owner",
            tree.owner,
            rowClass
        );
    },

    buildLastEditedView: (
        treeStats: ITreeStats,
        rowClass: string = ''): VNode => {

        return tableViews.build2ColumnKeyValueRowView(
            "last edited",
            `${treeStats.lastEdited}`,
            rowClass
        );
    },

    buildLastEditedByView: (
        treeStats: ITreeStats,
        rowClass: string = ''): VNode => {

        return tableViews.build2ColumnKeyValueRowView(
            "last edited by",
            treeStats.lastEditedBy,
            rowClass
        );
    },

    buildIsFlatView: (
        tree: ITreeSys,
        rowClass: string = ''): VNode => {

        const flatTickClass: string = tree.isFlat === true ? CssClasses.yep : CssClasses.nope;

        return tableViews.build2ColumnKeyIconRowView(
            "flat",
            flatTickClass,
            rowClass
        );
    },

    buildIsLoopView: (
        tree: ITreeSys,
        rowClass: string = ''): VNode | null => {

        if (tree.isFlat === true) {

            tree.isLoop = false;

            return null;
        }

        const loopTickClass: string = tree.isLoop === true ? CssClasses.yep : CssClasses.nope;

        return tableViews.build2ColumnKeyIconRowView(
            "loop",
            loopTickClass,
            rowClass
        );
    },

    buildDiscussionPluginsEnabledView: (
        tree: ITreeSys,
        rowClass: string = ''): VNode => {

        const allowDiscussionPluginsTickClass: string = tree.allowDiscussionPlugins === true ? CssClasses.yep : CssClasses.nope;

        return tableViews.build2ColumnKeyIconRowView(
            "discussion plugins enabled",
            allowDiscussionPluginsTickClass,
            rowClass
        );
    },

    buildOptionPluginsEnabledView: (
        tree: ITreeSys,
        rowClass: string = ''): VNode => {

        const allowOptionPluginsTickClass: string = tree.allowOptionPlugins === true ? CssClasses.yep : CssClasses.nope;

        return tableViews.build2ColumnKeyIconRowView(
            "option plugins enabled",
            allowOptionPluginsTickClass,
            rowClass
        );
    },

    buildDiscussionPluginAudioEnabledView: (
        tree: ITreeSys,
        rowClass: string = ''): VNode => {

        const allowDiscussionPluginAudioTickClass: string = tree.allowDiscussionPluginAudio === true ? CssClasses.yep : CssClasses.nope;

        return tableViews.build2ColumnKeyIconRowView(
            "discussion plugin audio enabled",
            allowDiscussionPluginAudioTickClass,
            rowClass
        );
    },

    buildIsBotView: (
        tree: ITreeSys,
        rowClass: string = ''): VNode => {

        const botTickClass: string = tree.isBot === true ? CssClasses.yep : CssClasses.nope;

        return tableViews.build2ColumnKeyIconRowView(
            "bot",
            botTickClass,
            rowClass
        );
    },

    buildIsSubtreeView: (
        tree: ITreeSys,
        rowClass: string = ''): VNode => {

        const subtreeTickClass: string = tree.isSubtree === true ? CssClasses.yep : CssClasses.nope;

        return tableViews.build2ColumnKeyIconRowView(
            "subtree",
            subtreeTickClass,
            rowClass
        );
    },

    buildNodesCountView: (
        treeStats: ITreeStats,
        rowClass: string = ''): VNode => {

        return tableViews.build2ColumnKeyValueRowView(
            "nodes",
            `${treeStats?.nodesCount}`,
            rowClass
        );
    },

    buildStashNodesCountView: (
        treeStats: ITreeStats,
        rowClass: string = ''): VNode => {

        return tableViews.build2ColumnKeyValueRowView(
            "stash nodes",
            `${treeStats?.stashNodeCount}`,
            rowClass
        );
    },

    buildAllNodesCountView: (
        treeStats: ITreeStats,
        rowClass: string = ''): VNode => {

        return tableViews.build2ColumnKeyValueRowView(
            "all nodes",
            `${treeStats?.allNodeCount}`,
            rowClass
        );
    },

    buildSolutionCountView: (
        treeStats: ITreeStats,
        rowClass: string = ''): VNode => {

        return tableViews.build2ColumnKeyValueRowView(
            "solutions",
            `${treeStats?.solutionCount}`,
            rowClass
        );
    },

    buildDiscussionsCountView: (
        treeStats: ITreeStats,
        rowClass: string = ''): VNode => {

        return tableViews.build2ColumnKeyValueRowView(
            "discussions",
            `${treeStats?.discussionCount}`,
            rowClass
        );
    },

    buildSubtreeLinksCountView: (
        treeStats: ITreeStats,
        rowClass: string = ''): VNode => {

        return tableViews.build2ColumnKeyValueRowView(
            "subtrees links",
            `${treeStats?.linkCount}`,
            rowClass
        );
    },

    buildDiscussionsWithNoOptionsCountView: (
        treeStats: ITreeStats,
        rowClass: string = ''): VNode => {

        return tableViews.build2ColumnKeyValueRowView(
            "missing options",
            `${treeStats?.discussionsWithNoOptions}`,
            rowClass
        );
    },

    buildMappedHolesCountView: (
        treeStats: ITreeStats,
        rowClass: string = ''): VNode => {

        return tableViews.build2ColumnKeyValueRowView(
            "mapped holes",
            `${treeStats?.mappedHoles}`,
            rowClass
        );
    },

    buildUnMappedHolesCountView: (
        treeStats: ITreeStats,
        rowClass: string = ''): VNode => {

        return tableViews.build2ColumnKeyValueRowView(
            "un-mapped holes",
            `${treeStats?.unMappedHoles}`,
            rowClass
        );
    },

    buildReferenceCountView: (
        treeStats: ITreeStats,
        rowClass: string = ''): VNode => {

        return tableViews.build2ColumnKeyValueRowView(
            "references",
            `${treeStats?.referenceCount}`,
            rowClass
        );
    },

    buildSizeView: (
        treeStats: ITreeStats,
        rowClass: string = ''): VNode => {

        // size is usually lower than actual, it only refers to node collection, not edges, sockets etc.

        const size: number | null = treeStats?.size;
        let nodeCollectionSize: string = '';

        if (size) {

            const kb = size / 8000; // Kilo bytes
            const mb = kb / 1000; // Mega bytes

            if (mb > 1) {

                nodeCollectionSize = `${Math.round(mb)} MB`;
            }
            else if (kb > 1) {

                nodeCollectionSize = `${Math.round(kb)} KB`;
            }
            else {

                nodeCollectionSize = `${Math.round(size / 8)} bytes`;
            }
        }

        return tableViews.build2ColumnKeyValueRowView(
            "size",
            `${nodeCollectionSize}`,
            rowClass
        );
    },

    buildTreeShortDetailsView: (tree: ITreeSys): VNode => {

        const view: VNode =

            h("div", { class: "tree" }, [

                treeDetailsViews.buildNameView(tree, CssClasses.odd),
                treeDetailsViews.buildDescriptionView(tree),
                treeDetailsViews.buildKeyView(tree, CssClasses.odd),
                treeDetailsViews.buildTitleView(tree),
                treeDetailsViews.buildTokenView(tree, CssClasses.odd),
                treeDetailsViews.buildTagsView(tree),
                treeDetailsViews.buildOwnerView(tree, CssClasses.odd),
                treeDetailsViews.buildCreatedView(tree)
            ]);

        return view;
    },

    buildTreeDetailsView: (tree: ITreeSys): VNode[] => {

        if (!tree) {

            return [];
        }

        const view: VNode[] = [

            treeDetailsViews.buildTreeShortDetailsView(tree),

            treeDetailsViews.buildTreePublishDetailsView(
                tree,
                CssClasses.even,
                CssClasses.odd
            ),
        ];

        return view;
    },

    buildTreeStatsView: (treeStats: ITreeStats): VNode[] => {

        const view: VNode[] = [

            h("div", { class: "stats" }, [

                treeDetailsViews.buildLastEditedView(treeStats, CssClasses.odd),
                treeDetailsViews.buildLastEditedByView(treeStats)
            ]),
        ];

        return view;
    },

    buildTreePublishDetailsView: (
        tree: ITreeSys,
        oddClass: string = CssClasses.odd,
        evenClass: string = CssClasses.even): VNode => {

        const view: VNode =

            h("div", { class: "tree" }, [

                treeDetailsViews.buildIsFlatView(tree, oddClass),
                treeDetailsViews.buildIsLoopView(tree, evenClass),
                treeDetailsViews.buildDiscussionPluginsEnabledView(tree, evenClass),
                treeDetailsViews.buildDiscussionPluginAudioEnabledView(tree, oddClass),
                treeDetailsViews.buildOptionPluginsEnabledView(tree, evenClass),
                treeDetailsViews.buildIsSubtreeView(tree, oddClass),
                treeDetailsViews.buildIsBotView(tree, evenClass)
            ]);

        return view;
    },

    buildTreeCountsView: (treeStats: ITreeStats): VNode[] => {

        const view: VNode[] = [

            h("div", { class: "stats" }, [

                treeDetailsViews.buildNodesCountView(treeStats, CssClasses.odd),
                treeDetailsViews.buildStashNodesCountView(treeStats),
                treeDetailsViews.buildAllNodesCountView(treeStats, CssClasses.odd),
                treeDetailsViews.buildSolutionCountView(treeStats),
                treeDetailsViews.buildDiscussionsCountView(treeStats, CssClasses.odd),
                treeDetailsViews.buildDiscussionsWithNoOptionsCountView(treeStats),
                treeDetailsViews.buildMappedHolesCountView(treeStats, CssClasses.odd),
                treeDetailsViews.buildUnMappedHolesCountView(treeStats),
                treeDetailsViews.buildSubtreeLinksCountView(treeStats, CssClasses.odd),
                treeDetailsViews.buildReferenceCountView(treeStats),
                treeDetailsViews.buildSizeView(treeStats, CssClasses.odd)
            ])
        ];

        return view;
    }
};

export default treeDetailsViews;


