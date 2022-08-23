import { h, VNode } from "hyperapp-local";

import concealedOptionActions from "../actions/concealedOptionActions";
import gHtmlActions from "../../../../../global/actions/gHtmlActions";
import gTooltipActions from "../../../../../global/actions/gTooltipActions";
import INode from "../../../../../interfaces/state/tree/INode";
import ILensUI from "../../../../../interfaces/state/ui/UIs/ILensUI";
import IConcealedOptionJson from "../interfaces/IConcealedOptionJson";
import OptionJsonElement from "../../../../../state/ui/payloads/OptionJsonElement";
import inputErrorViews from "../../../../../components/lenses/lens/views/inputErrorViews";

import "../scss/concealed.scss";


const buildScriptView = (concealedOptionJson: IConcealedOptionJson) => {

    const view: VNode =

        h("div",
            {
                class: "textarea-wrapper"
            },
            [
                h("textarea",
                    {
                        value: `${concealedOptionJson.script}`,
                        class: "edit",
                        textmode: "MultiLine",
                        placeholder: `...enter the expression script here...`,
                        draggable: "false",
                        onInput: [
                            concealedOptionActions.setScript,
                            (event: any) => {
                                return new OptionJsonElement(
                                    concealedOptionJson,
                                    event.target,
                                );
                            }
                        ],
                        onBlur: gHtmlActions.clearFocus,
                        onMouseOver: [
                            gTooltipActions.showTooltip,
                            (_event: any) => "An expression that returns a boolean"
                        ],
                        onMouseOut: gTooltipActions.clearTooltip
                    },
                    ""
                )
            ]
        );

    return view;
};

const buildCommentView = (concealedOptionJson: IConcealedOptionJson) => {

    const view: VNode =

        h("div",
            {
                class: "textarea-wrapper"
            },
            [
                h("textarea",
                    {
                        value: `${concealedOptionJson.comment}`,
                        class: "edit",
                        textmode: "MultiLine",
                        placeholder: `...enter any comments here...`,
                        draggable: "false",
                        onInput: [
                            concealedOptionActions.setComment,
                            (event: any) => {
                                return new OptionJsonElement(
                                    concealedOptionJson,
                                    event.target,
                                );
                            }
                        ],
                        onBlur: gHtmlActions.clearFocus,
                        onMouseOver: [
                            gTooltipActions.showTooltip,
                            (_event: any) => "Optional comment on the script expression"
                        ],
                        onMouseOut: gTooltipActions.clearTooltip
                    },
                    ""
                )
            ]
        );

    return view;
};

const concealedOptionViews = {

    buildInnerOptionView: (option: INode<ILensUI>): VNode | null => {

        if (!option?.ui?.optionJson) {

            return null;
        }

        const concealedOptionJson: IConcealedOptionJson = option.ui.optionJson as IConcealedOptionJson;

        const view: VNode =

            h("div", { class: "option-plugin" }, [
                h("div", { class: "concealed-script" }, [

                    inputErrorViews.buildTitleErrorView(
                        "Expression script",
                        [concealedOptionJson.error]),

                    buildScriptView(concealedOptionJson)
                ]),
                h("div", { class: "concealed-comment" }, [

                    inputErrorViews.buildTitleView("Comments"),
                    buildCommentView(concealedOptionJson)
                ])
            ]);

        return view;
    }
};

export default concealedOptionViews;


