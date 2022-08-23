import { h, VNode, Children } from "hyperapp-local";

import ISubtreeSys from "../../../../../../../interfaces/state/tree/ISubtreeSys";
import U from "../../../../../../../global/gUtilities";
import { ActionType } from "../../../../../../../interfaces/enums/ActionType";
import IStSocket from "../../../../../../../interfaces/state/tree/IStSocket";
import selectView from "../../../../../lens/views/selectView";
import plugActions from "../../../actions/plugActions";
import CssClasses from "../../../../../../../state/constants/CssClasses";
import tableViews from "../../../../../lens/views/tableViews";
import OptionSocket from "../../../../../../../state/ui/payloads/OptionSocket";
import buttonViews from "../../../../../lens/views/buttonViews";
import gTooltipActions from "../../../../../../../global/actions/gTooltipActions";
import StringEvent from "../../../../../../../state/ui/payloads/StringEvent";
import ILensUI from "../../../../../../../interfaces/state/ui/UIs/ILensUI";
import INode from "../../../../../../../interfaces/state/tree/INode";


const socketSelectView = {

    buildSocketsView: (
        option: INode<ILensUI>,
        stSockets: Array<IStSocket>): VNode => {

        let view: VNode =

            h("div", { id: `${option.ui.htmlID}` }, [
                h("div", { class: "title-table" }, [
                    h("div", { class: "title-row" }, [
                        h("div", { class: "title-cell" }, [
                            h("span", { class: "title" }, `socket`),
                        ]),
                        h("div", { class: "id-cell" }, [
                            h("div", { class: "id" }, `${option.plug?.key ?? ''}`)
                        ])
                    ])
                ]),

                socketSelectView.buildSelectSocketsView(
                    option,
                    stSockets)
            ]);

        return view;
    },

    buildSelectSocketsView: (
        option: INode<ILensUI>,
        stSockets: Array<IStSocket>): VNode => {

        const optionViews: Children[] = [

            ...socketSelectView.buildSelectHeaderView()
        ];

        let optionView: Children[];

        const buttonText: string = U.isNullOrWhiteSpace(option.plug?.key) === false ?
            option.plug?.text ?? '' :
            "Choose a socket...";

        stSockets.forEach((stSocket: IStSocket) => {

            optionView = socketSelectView.buildSelectSocketUI(
                option,
                stSocket);

            optionViews.push(...optionView);
        });

        return selectView.buildSelectView(
            optionViews,
            buttonText,
            option.ui.showSockets,
            true,
            plugActions.showSockets,
            plugActions.hideSockets,
            plugActions.clearSocket,
            option
        );
    },

    buildSelectHeaderView: (): VNode[] => {

        const view = [

            h("div", { class: "select-header" }, [
                h("div", { class: "select-cell-tick" }, ""),
                h("div", { class: "select-cell" }, "socket key"),
                h("div", { class: "select-cell" }, "socket text"),
            ])
        ];

        return view;
    },

    buildSelectSocketUI: (
        option: INode<ILensUI>,
        stSocket: IStSocket): VNode[] => {

        const selected: boolean = option.plug === stSocket; // TODO RPTM!!!! This should be comparing keys not objects!!!!

        const view = [

            h("div",
                {
                    class: {
                        "select-row": true,
                        "selected": selected
                    },
                    onMouseDown: [
                        plugActions.selectSocket,
                        (_event: any) => {
                            return new OptionSocket(
                                option,
                                stSocket
                            );
                        }
                    ]
                },
                [
                    h("div", { class: "select-cell" }, [
                        h("div", { class: "tick" }, ""),
                    ]),
                    h("div", { class: "select-cell" }, stSocket.key),
                    h("div", { class: "select-cell" }, stSocket.text)
                ]
            )
        ];

        return view;
    }
};

const optionsView = {

    buildOptionsView: (
        lensNode: INode<ILensUI>,
        subtree: ISubtreeSys): VNode => {

        const buildNotes = (): VNode => {

            const view: VNode =

                h("ul", {}, [
                    h("li", { class: "notes" }, "Warnings can be ignored at this stage."),
                    h("li", { class: "notes" }, "They will need to be addressed before any tree that references this subtree can be published."),
                    h("li", { class: "notes" }, "Local to this subtree only."),
                    h("li", { class: "notes" }, "Errors in referenced subtrees are shown in a full validation or publish.")
                ]);

            return view;
        };


        const optionDetailViews: VNode[] = [];

        let optionDetailView: VNode | null;
        let index: number = 0;

        lensNode.nodes.forEach((option: INode<ILensUI>) => {

            optionDetailView = optionsView.buildOptionView(
                option,
                subtree.stSockets,
                ++index);

            if (optionDetailView) {

                optionDetailViews.push(optionDetailView);
            }
        });

        const view: VNode =

            h("div", { class: "exist-options-box" }, [

                buildNotes(),
                ...optionDetailViews
            ]);

        return view;
    },

    buildShadowIconView: (): VNode => {

        let tooltip: string = 'Existing socket link';
        let iconClass: string = 'socket-link-icon';

        const view: VNode =

            h("div", { class: "shadow-icon" }, [
                h("div",
                    {
                        class: `${iconClass}`,
                        onMouseOver: [
                            gTooltipActions.showTooltipWithEvent,
                            (event: any) => {
                                return new StringEvent(
                                    tooltip,
                                    event
                                );
                            }
                        ],
                        onMouseOut: gTooltipActions.clearTooltip
                    }, ""),
            ]);

        return view;
    },

    buildOptionView: (
        option: INode<ILensUI>,
        stSockets: Array<IStSocket>,
        index: number): VNode | null => {

        let chosen: boolean =
            option.action === ActionType.DeletePlug
            || option.plug !== null;

        let buttonText: string;
        let socketsView: VNode | null = null;

        if (option.action === ActionType.DeletePlug) {

            buttonText = "Delete option branch";
        }
        else {
            buttonText = "Link to socket";

            socketsView =

                h("div", { class: "socket-select" },

                    socketSelectView.buildSocketsView(
                        option,
                        stSockets)
                );
        }

        const view: VNode =

            h("div",
                {
                    class: {
                        "option-link": true,
                        "chosen": chosen
                    }
                },
                [
                    h("h4", {}, `Option ${index}`),
                    h("div", { class: "option-link-box" }, [

                        optionsView.buildShadowIconView(),

                        buttonViews.buildTypeDataButtonView(
                            buttonText,
                            "Select whether this option should be deleted or linked to a socket",
                            CssClasses.yep,
                            plugActions.toggleLinkToSocket,
                            option
                        ),

                        h("div", { class: "option-link-data" }, [

                            tableViews.build2ColumnKeyValueRowView(
                                "option",
                                option.option,
                                CssClasses.odd
                            ),

                            tableViews.build2ColumnKeyValueRowView(
                                "key",
                                option.key
                            )
                        ]),

                        socketsView
                    ])
                ]);

        return view;
    }
};

const plugViews = {

    buildDetailsView: (
        lensNode: INode<ILensUI>,
        subtree: ISubtreeSys): VNode => {

        const optionHeader: string = lensNode.nodes.length === 0 ? 'No existing options' : 'Existing options';

        const view: VNode =

            h("div", { class: "exist-options" }, [
                h("h4", {}, optionHeader),

                // buttonsViews.buildOpenSubtreeButtonView(
                //     subtree.tree.key as string,
                //     "Open the old subtree in a new tab"
                // ),

                optionsView.buildOptionsView(
                    lensNode,
                    subtree)
            ]);

        return view;
    }
};

export default plugViews;
