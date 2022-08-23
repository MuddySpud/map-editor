import { h, VNode } from "hyperapp-local";

import ILensUI from "../../../../interfaces/state/ui/UIs/ILensUI";
import INode from "../../../../interfaces/state/tree/INode";
import NodeBaseElement from "../../../../state/ui/payloads/NodeBaseElement";
import inputsActions from "../actions/inputsActions";
import gHtmlActions from "../../../../global/actions/gHtmlActions";
import inputErrorViews from "../../../lenses/lens/views/inputErrorViews";
import IState from "../../../../interfaces/state/IState";
import U from "../../../../global/gUtilities";

import "../scss/index.scss";


const buildInputsView = (
    node: INode<ILensUI>,
    invalid: boolean): VNode => {

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
                        value: `${node.inputs ?? ""}`,
                        class: "edit",
                        textmode: "MultiLine",
                        placeholder: `...enter the inputs json here...`,
                        onInput: [
                            inputsActions.setInputsJson,
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

const inputsViews = {

    buildInputsView: (
        _state: IState,
        lensNode: INode<ILensUI>,
        forceDisplay: boolean = false): VNode | null => {

        if (!forceDisplay) {

            if (U.isNullOrWhiteSpace(lensNode.inputs)
                && !lensNode.ui.showBlankInputs) {

                return null;
            }

            if (window.TreeSolve.discussionPlugins.runsInBackground()) {

                return null;
            }
        }

        const invalid: boolean = lensNode.errors.length > 0;

        const view: VNode =

            h("div",
                {
                    id: "inputsView",
                    class: {
                        "invalid": invalid
                    }
                },
                [
                    inputErrorViews.buildTitleErrorView(
                        "Inputs json",
                        lensNode.errors),

                    buildInputsView(
                        lensNode,
                        invalid)
                ]
            );

        return view;
    }
};

export default inputsViews;


