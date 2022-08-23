import { h, VNode } from "hyperapp-local";

import INodeBase from "../../../../../../../interfaces/state/tree/INodeBase";
import optionActions from "../../../actions/optionActions";
import NodeBaseElement from "../../../../../../../state/ui/payloads/NodeBaseElement";
import { ActionType } from "../../../../../../../interfaces/enums/ActionType";
import dragOptionsActions from "../../../actions/dragOptionsActions";
import gHtmlActions from "../../../../../../../global/actions/gHtmlActions";
import gTooltipActions from "../../../../../../../global/actions/gTooltipActions";
import ILensUI from "../../../../../../../interfaces/state/ui/UIs/ILensUI";
import inputErrorViews from "../../../../../lens/views/inputErrorViews";
import INode from "../../../../../../../interfaces/state/tree/INode";
import optionReserveViews from "../../../../../reserves/views/optionReserveViews";
import IState from "../../../../../../../interfaces/state/IState";


const buildRemoveOptionView = (
    option: INodeBase,
    showAddRemove: boolean,
    optionText: string): VNode | null => {

    if (!showAddRemove) {

        return null;
    }

    const removeOptionView: VNode =

        h("div",
            {
                class: "btn-delete",
                draggable: "false",
                onClick: [
                    optionActions.deleteOption,
                    option
                ],
                onMouseOver: [
                    gTooltipActions.showTooltip,
                    (_event: any) => `Delete ${optionText}`
                ],
                onMouseOut: gTooltipActions.clearTooltip
            },
            ""
        );

    return removeOptionView;
};

const buildOrderView = (
    option: INodeBase,
    draggedOver: boolean): VNode | null => {

    if (draggedOver) {

        return null;
    }

    return h("span", { class: "order" }, `${option.order}`);
};

const buildOptionInputView = (
    state: IState,
    lensNode: INode<ILensUI>,
    option: INode<ILensUI>,
    optionText: string,
    showAddRemove: boolean,
    draggedOver: boolean,
    tooltip: string,
    buttonsClassName: string,
    buildInnerOptionViewDelegate: (
        lensNode: INode<ILensUI>,
        option: INode<ILensUI>,
        optionText: string,
        tooltip: string) => VNode | null
): VNode | null => {

    const optionView: VNode =

        h("div",
            {
                class: "drag-background",
                draggable: "false",
                onMouseOver: [
                    optionActions.showOptionButtons,
                    (_event: any) => {
                        return option;
                    }
                ],
                onMouseLeave: [
                    optionActions.hideOptionButtons,
                    (_event: any) => {
                        return option;
                    }
                ]
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
                            (_event: any) => `Drag this handle onto another ${optionText} handle to change ${optionText} orders`
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
                        buildRemoveOptionView(
                            option,
                            showAddRemove,
                            optionText
                        ),

                        buildInnerOptionViewDelegate(
                            lensNode,
                            option,
                            optionText,
                            tooltip)]
                ),

                optionReserveViews.buildButtonsView(
                    state, 
                    lensNode,
                    option,
                    buttonsClassName
                ),

                optionReserveViews.buildView(
                    state,
                    option, 
                )
            ]
        );

    return optionView;
};

const optionViews = {

    buildOptionView: (
        state: IState,
        lensNode: INode<ILensUI>,
        option: INode<ILensUI>,
        optionText: string,
        showAddRemove: boolean,
        buttonsClassName: string,
        buildInnerOptionViewDelegate: (
            lensNode: INode<ILensUI>,
            option: INode<ILensUI>,
            optionText: string,
            tooltip: string) => VNode | null
    ): VNode | null => {

        if (option.action === ActionType.DeleteNode
            || option.isHidden === true) {

            return null;
        }

        const invalid = option.errors.length > 0;
        const draggedOver: boolean = lensNode.ui.draggedOverOrder === option.order;

        const tooltip: string = option.option.length === 0 ?
            `Enter the ${optionText} text...` :
            `Edit the ${optionText} text...`;

        const view: VNode =

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
                        option.errors
                    ),

                    buildOptionInputView(
                        state,
                        lensNode,
                        option,
                        optionText,
                        showAddRemove,
                        draggedOver,
                        tooltip,
                        buttonsClassName,
                        buildInnerOptionViewDelegate
                    )
                ]
            );

        return view;
    },

    buildInnerOptionView: (
        option: INodeBase,
        optionText: string,
        tooltip: string): VNode | null => {

        const view: VNode =

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
                            placeholder: `...enter the ${optionText} text here...`,
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
            );

        return view;
    }
};

export default optionViews;


