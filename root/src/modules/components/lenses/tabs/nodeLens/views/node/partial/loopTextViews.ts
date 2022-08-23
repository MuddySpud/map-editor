import { h, VNode } from "hyperapp-local";

import ILensUI from "../../../../../../../interfaces/state/ui/UIs/ILensUI";
import INode from "../../../../../../../interfaces/state/tree/INode";
import NodeBaseElement from "../../../../../../../state/ui/payloads/NodeBaseElement";
import gHtmlActions from "../../../../../../../global/actions/gHtmlActions";
import IState from "../../../../../../../interfaces/state/IState";
import inputErrorViews from "../../../../../lens/views/inputErrorViews";
import INodeBaseElement from "../../../../../../../interfaces/state/ui/payloads/INodeBaseElement";
import looperActions from "../../../../../inputs/actions/looperActions";
import gLooperCode from "../../../../../../../global/code/gLooperCode";


const buildInputsView = (
    node: INode<ILensUI>,
    text: string,
    placeHolder: string,
    invalid: boolean,
    actionDelegate: (state: IState, payload: INodeBaseElement) => IState): VNode => {

    const view: VNode =

        h("div",
            {
                class: {
                    "textarea-wrapper": true,
                    "invalid": invalid
                }
            },
            [
                h("textarea",
                    {
                        id: "inputs",
                        value: `${text}`,
                        class: "edit",
                        textmode: "MultiLine",
                        placeholder: `${placeHolder}`,
                        onInput: [
                            actionDelegate,
                            (event: any) => {
                                return new NodeBaseElement(
                                    node,
                                    event.target
                                );
                            }
                        ],
                        onBlur: gHtmlActions.clearFocus
                    },
                    ""
                ),
            ]
        );

    return view;
};

const buildloopRepeatTextView = (lensNode: INode<ILensUI>): VNode => {

    const invalid: boolean = lensNode.looper.loopRepeatTextErrors.length > 0

    const view: VNode =

        h("div",
            {
                class: {
                    "loop-repeat": true,
                    "invalid": invalid
                }
            },
            [
                inputErrorViews.buildTitleErrorView(
                    "Repeat loop text",
                    lensNode.looper.loopRepeatTextErrors
                ),

                buildInputsView(
                    lensNode,
                    lensNode.looper.loopRepeatText,
                    `...enter the repeat loop text here...`,
                    invalid,
                    looperActions.setLoopRepeatText
                )
            ]
        );

    return view;
};

const buildloopHoleTextView = (lensNode: INode<ILensUI>): VNode => {

    const invalid: boolean = lensNode.looper.loopHoleTextErrors.length > 0
    const option: INode<ILensUI> | null = gLooperCode.getLoopHoleOption(lensNode);

    if(!option) {

        throw new Error("LoopHoleOption was null");
    }

    const view: VNode =

        h("div",
            {
                class: {
                    "loop-hole": true,
                    "invalid": invalid
                }
            },
            [
                inputErrorViews.buildTitleErrorView(
                    "End loop text",
                    lensNode.looper.loopHoleTextErrors
                ),

                buildInputsView(
                    lensNode,
                    option.option,
                    `...enter the loop end text here...`,
                    invalid,
                    looperActions.setLoopEndText
                )
            ]
        );

    return view;
};

const loopTextViews = {

    buildLoopTextView: (
        _state: IState,
        lensNode: INode<ILensUI>): VNode | null => {

        if (!lensNode.isRoot
            || !lensNode.looper.isLoopRoot) {

            return null;
        }

        const view: VNode =

            h("div", { id: "looperView" }, [

                buildloopRepeatTextView(lensNode),
                buildloopHoleTextView(lensNode)
            ]);

        return view;
    }
};

export default loopTextViews;


