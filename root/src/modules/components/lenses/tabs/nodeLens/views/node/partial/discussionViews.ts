import { Children, h, VNode } from "hyperapp-local";

import IState from "../../../../../../../interfaces/state/IState";
import IStateAnyArray from "../../../../../../../interfaces/state/IStateAnyArray";
import ILensUI from "../../../../../../../interfaces/state/ui/UIs/ILensUI";
import INode from "../../../../../../../interfaces/state/tree/INode";
import selectView from "../../../../../lens/views/selectView";
import IDiscussionPlugin from "../../../../../../../interfaces/plugins/IDiscussionPlugin";
import { DiscussionType } from "../../../../../../../interfaces/enums/DiscussionType";
import pluginActions from "../../../actions/pluginActions";
import { NodeType } from "../../../../../../../interfaces/enums/NodeType";
import gTooltipActions from "../../../../../../../global/actions/gTooltipActions";
import StringEvent from "../../../../../../../state/ui/payloads/StringEvent";

import "../../../scss/plugins.scss";


const buildSelectPluginView = (
    plugin: IDiscussionPlugin,
    node: INode<ILensUI>): VNode => {

    const selectedType: DiscussionType = node.bin?.discussion?.type ?? DiscussionType.Text;

    const view =

        h("div",
            {
                class: {
                    "select-row": true,
                    "selected": selectedType === plugin.type
                },
                onMouseDown: [
                    pluginActions.selectPlugin,
                    (_event: any) => plugin.type
                ]
            },
            [
                h("div", { class: "select-cell" }, [
                    h("div", { class: "tick" }, ""),
                ]),
                h("div", { class: "select-cell" }, `${plugin.name}`),
            ]
        );

    return view;
};

const buildDiscussionSelectView = (
    state: IState,
    node: INode<ILensUI>,
    buildInnerDiscussionViewDelegate: (
        state: IState,
        lensNode: INode<ILensUI>) => Children[]
): VNode[] => {

    let type: string = "Discussion";

    let properties: any = {
        id: "discussionView"
    };

    if (node.type === NodeType.Solution) {

        type = "Solution";
    }

    const discussionJsonType: DiscussionType | undefined | null = node.bin?.discussion?.type;

    if (discussionJsonType) {

        properties.class = `${discussionJsonType.toLowerCase()}`;
    }
    else {
        properties.class = "plain";
    }

    const view: VNode[] = [

        h("div",
            properties,
            [
                h("h4", {}, `${type}`),
                h("div", { class: "discussion" }, [

                    discussionViews.buildSelectDiscussionTypeView(
                        state,
                        node,
                    ),

                    ...buildInnerDiscussionViewDelegate(
                        state,
                        node
                    )
                ])
            ]
        )
    ];

    return view;
};

const discussionViews = {

    buildExpandEditorButtonView: (
        markdown: string,
        expandAction: (state: IState, text: string) => IStateAnyArray): VNode => {

        const controlsView: VNode =

            h("a",
                {
                    class: `expand-editor`,
                    onClick: [
                        expandAction,
                        (_event: any) => markdown
                    ],
                    onMouseOver: [
                        gTooltipActions.showTooltipWithEvent,
                        (event: any) => {
                            return new StringEvent(
                                "Edit in the full screen Markdown editor",
                                event
                            );
                        }
                    ],
                    onMouseOut: gTooltipActions.clearTooltip
                },
                ""
            );

        return controlsView;
    },

    buildDiscussionView: (
        state: IState,
        node: INode<ILensUI>,
        includeSelectView: boolean,
        buildInnerDiscussionViewDelegate: (
            state: IState,
            lensNode: INode<ILensUI>) => Children[]
    ): Children[] => {

        if (includeSelectView) {

            return buildDiscussionSelectView(
                state,
                node,
                buildInnerDiscussionViewDelegate
            );
        }
        else {

            return buildInnerDiscussionViewDelegate(
                state,
                node
            );
        }
    },

    buildSelectDiscussionTypeView: (
        state: IState,
        node: INode<ILensUI>): VNode | null => {

        if (!state.branchesState.tree.allowDiscussionPlugins) {

            return null;
        }

        const optionViews: Children[] = [

            h("div", { class: "select-header" }, [
                h("div", { class: "select-cell-tick" }, ""),
                h("div", { class: "select-cell" }, ""),
            ])
        ];

        let optionView: Children;

        window.TreeSolve.discussionPlugins.plugins.forEach((plugin: IDiscussionPlugin) => {

            optionView = buildSelectPluginView(
                plugin,
                node
            );

            optionViews.push(optionView);
        });

        const buttonText: string = window.TreeSolve.discussionPlugins.getPluginName(node.bin?.discussion?.type);

        const view: VNode =

            h("div", { class: "plugin-select" }, [
                h("h4", {}, 'Type'),

                selectView.buildSelectView(
                    optionViews,
                    buttonText,
                    node.ui.showDiscussionPlugins,
                    true,
                    pluginActions.showPlugins,
                    pluginActions.hidePlugins,
                    pluginActions.clearPlugins
                )
            ]);

        return view;
    }
};

export default discussionViews;


