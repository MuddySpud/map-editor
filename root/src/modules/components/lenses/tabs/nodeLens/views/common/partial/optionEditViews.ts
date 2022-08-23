import { h, VNode } from "hyperapp-local";

import INodeBase from "../../../../../../../interfaces/state/tree/INodeBase";
import NodeBaseElement from "../../../../../../../state/ui/payloads/NodeBaseElement";
import branchTaskActions from "../../../actions/branchTaskActions";
import inputErrorViews from "../../../../../lens/views/inputErrorViews";


const optionEditViews = {

    buildOptionView: (
        option: INodeBase | null,
        newOrder: number): VNode | null => {

        if (!option) {

            return null;
        }

        const view: VNode =

            h("div", { class: "new-values" }, [

                inputErrorViews.buildTitleErrorView(
                    'Option',
                    option.errors),

                ...optionEditViews.buildOptionInputView(
                    option,
                    newOrder)
            ]);

        return view;
    },

    buildOptionInputView: (
        option: INodeBase | null,
        newOrder: number): VNode[] => {

        if (!option) {

            return [];
        }

        const view: VNode[] = [

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
                            placeholder: `...enter the option text here...`,
                            draggable: "false",
                            onInput: [
                                branchTaskActions.setOptionText,
                                (event: any) => {
                                    return new NodeBaseElement(
                                        option,
                                        event.target,
                                    );
                                }
                            ]
                        },
                        ""
                    ),
                ]
            ),
            h("div", { class: "order-box" }, [
                h("span", { class: "title" }, "Insert at position"),
                h("div",
                    {
                        class: {
                            "input-wrapper": true,
                        }
                    },
                    [
                        h("input",
                            {
                                value: `${newOrder}`,
                                class: "edit",
                                type: "text",
                                placeholder: `...enter the position...`,
                                onInput: [
                                    branchTaskActions.setOrder,
                                    (event: any) => event.target
                                ]
                            },
                            ""
                        )
                    ]
                )
            ])
        ];

        return view;
    }
};

export default optionEditViews;


