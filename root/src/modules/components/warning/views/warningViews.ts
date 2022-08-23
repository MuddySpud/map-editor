import { h, VNode } from "hyperapp-local";

import IState from "../../../interfaces/state/IState";
import ILensWarning from "../../../interfaces/state/ui/ILensWarning";
import warningActions from "../actions/warningActions";
import { DialogueAction } from "../../../interfaces/enums/DialogueAction";

import "../scss/warning.scss";


const warningViews = {

    buildView(state: IState): VNode | null {

        if (!state
            || !state.lens.warning
            || (state.dialogue
                && state.dialogue.result === DialogueAction.None)) {

            return null;
        }

        const warning: ILensWarning = state.lens.warning;

        const view: VNode =

            h("div", { id: "lensErrorView" }, [
                h("div", { class: "lens-error-overlay" }, [
                    h("div", { class: "lens-error-table" }, [
                        h("div", { class: "lens-error-row" }, [
                            h("div", { class: "lens-error-cell" }, [
                                h("div", { class: "icon" }, "!")
                            ]),
                        ]),
                        h("div", { class: "lens-error-row" }, [
                            h("div", { class: "lens-error-cell" }, [
                                h("h3", {}, `${warning.title}`),
                            ]),
                        ]),
                        h("div", { class: "lens-error-row" }, [
                            h("div", { class: "lens-error-cell" }, [
                                h("span", {}, `${warning.text}`)
                            ])
                        ]),
                        h("div", { class: "lens-error-row" }, [
                            h("div", { class: "lens-error-cell" }, [
                                h("button",
                                    {
                                        type: "button",
                                        class: "cancel",
                                        onClick: warningActions.closeTab
                                    },
                                    [
                                        h("span", {}, "Close")
                                    ]
                                ),
                                h("button",
                                    {
                                        type: "button",
                                        class: "cancel",
                                        onClick: warningActions.acknowledge
                                    },
                                    [
                                        h("span", {}, "Re-try")
                                    ]
                                )
                            ])
                        ])
                    ])
                ])
            ]);

        return view;
    }
};

export default warningViews;


