import { h, VNode } from "hyperapp-local";

import INodeBase from "../../../../../../../interfaces/state/tree/INodeBase";
import optionActions from "../../../actions/optionActions";
import NodeBaseElement from "../../../../../../../state/ui/payloads/NodeBaseElement";
import dragOptionsActions from "../../../actions/dragOptionsActions";
import gHtmlActions from "../../../../../../../global/actions/gHtmlActions";
import gTooltipActions from "../../../../../../../global/actions/gTooltipActions";
import ILensUI from "../../../../../../../interfaces/state/ui/UIs/ILensUI";
import inputErrorViews from "../../../../../lens/views/inputErrorViews";
import tableViews from "../../../../../lens/views/tableViews";
import IStSocket from "../../../../../../../interfaces/state/tree/IStSocket";


const buildOrderView = (
    option: INodeBase,
    draggedOver: boolean): VNode | null => {

    if (draggedOver) {

        return null;
    }

    return h("span", { class: "order" }, `${option.order}`);
};

const buildSocketTextView = (socketText: string): VNode => {

    const view = 

    h("div", { class: "socket" }, [

        tableViews.build2ColumnKeyValueRowView(
            "socket text",
            socketText
        )
    ]);

    return view;
};

const socketViews = {

    buildSocketView: (
        lensView: ILensUI,
        option: INodeBase): VNode => {

        const invalid = option.errors.length > 0;
        const plug: IStSocket = option.plug as IStSocket;
        const socketText: string = !plug ? 'Plug is null...' : plug.text;
        const draggedOver: boolean = lensView.draggedOverOrder === option.order;

        const tooltip: string = option.option.length === 0 ?
            `Enter the option text...` :
            `Edit the option text...`;

        const optionView: VNode =

            h("li",
                {
                    key: `${option.key}`,
                    class: {
                        "drop-holder": true,
                        "invalid": invalid
                    }
                },
                [
                    inputErrorViews.buildKeyErrorView(
                        option.key,
                        option.errors),

                    socketViews.buildSocketInputView(
                        option,
                        socketText,
                        draggedOver,
                        tooltip)
                ]
            );

        return optionView;
    },

    buildSocketInputView: (
        option: INodeBase,
        socketText: string,
        draggedOver: boolean,
        tooltip: string): VNode => {

        const optionView: VNode =

            h("div",
                {
                    class: "drag-background",
                    draggable: "false"
                },
                [
                    h("div",
                        {
                            class: {
                                drag: true,
                                drop: true,
                                "dragged-over": draggedOver
                            },
                            draggable: "true",
                            onDragStart: [
                                dragOptionsActions.dragOptionStarted,
                                (event: any) => event
                            ],
                            onDragOver: [
                                dragOptionsActions.dragOptionOver,
                                (event: any) => event
                            ],
                            onDrop: [
                                dragOptionsActions.droppedOption,
                                (event: any) => event
                            ],
                            onMouseDown: [
                                dragOptionsActions.setDraggedDivFocus,
                                (event: any) => event
                            ],
                            onDragLeave: [
                                dragOptionsActions.dragOptionLeave,
                                (event: any) => {
                                    return event;
                                }
                            ],
                            onDragEnd: [
                                dragOptionsActions.dragOptionEnd,
                                (event: any) => {
                                    return event;
                                }
                            ],
                            onMouseOver: [
                                gTooltipActions.showTooltip,
                                (_event: any) => "Drag this handle onto another socket handle to change socket orders"
                            ],
                            onMouseOut: gTooltipActions.clearTooltip
                        },
                        [
                            buildOrderView(
                                option,
                                draggedOver
                            )
                        ]
                    ),
                    h("div",
                        {
                            class: "option-box",
                            draggable: "false"
                        },
                        [
                            h("div",
                                {
                                    class: "textarea-wrapper"
                                },
                                [
                                    h("textarea",
                                        {
                                            id: `option_${option.key}`,
                                            value: `${option.option}`,
                                            class: "edit",
                                            textmode: "MultiLine",
                                            placeholder: `...enter text here to help authors, it won't be seen by users...`,
                                            draggable: "false",
                                            onInput: [
                                                optionActions.setOptionText,
                                                (event: any) => {
                                                    return new NodeBaseElement(
                                                        option,
                                                        event.target,
                                                    );
                                                }
                                            ],
                                            onBlur: gHtmlActions.clearFocus,
                                            onMouseOver: [
                                                gTooltipActions.showTooltip,
                                                (_event: any) => tooltip
                                            ],
                                            onMouseOut: gTooltipActions.clearTooltip
                                        },
                                        ""
                                    ),
                                ]
                            ),
                            
                            buildSocketTextView(socketText)
                        ]
                    )
                ]
            );

        return optionView;
    },

    buildDeletedSocketUI: (option: INodeBase): VNode => {

        const optionView: VNode =

            h("li",
                {
                    key: `${option.key}`,
                    class: "deleted"
                },
                [
                    inputErrorViews.buildKeyView(option.key),

                    h("div", { class: "drag-background" }, [
                        h("div", { class: "option-box" }, [
                            h("div", { class: "textarea-wrapper" }, [
                                h("textarea",
                                    {
                                        id: `option_${option.key}`,
                                        value: `${option.option}`,
                                        class: "edit",
                                        textmode: "MultiLine"
                                    },
                                    ""
                                ),
                            ])
                        ])
                    ])
                ]
            );

        return optionView;
    }
};

export default socketViews;


