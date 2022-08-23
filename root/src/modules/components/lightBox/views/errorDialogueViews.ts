import { h, VNode } from "hyperapp-local";

import IState from "../../../interfaces/state/IState";
import dialogueActions from "../actions/dialogueActions";
import IDialogue from "../../../interfaces/state/ui/IDialogue";
import CssClasses from "../../../state/constants/CssClasses";
import U from "../../../global/gUtilities";


const errorDialogueViews = {

    buildErrorDialogueView: (state: IState): VNode => {

        const dialogue: IDialogue = state.dialogue as IDialogue;

        let copyView: VNode | null = null;
        const copyButtonViews: VNode[] = [];

        if (!U.isNullOrWhiteSpace(dialogue.link)) {

            copyButtonViews.push(

                h("button",
                    {
                        type: "button",
                        onClick: dialogueActions.openErrorLink
                    },
                    "Open error link"
                )
            );
        }

        if (!U.isNullOrWhiteSpace(dialogue.text)) {

            copyButtonViews.push(

                h("button",
                    {
                        type: "button",
                        onClick: dialogueActions.copyText
                    },
                    "Copy error text"
                )
            );
        }

        if (copyButtonViews.length > 0) {

            copyView = h("div", { class: "copy" }, copyButtonViews);
        }

        const view: VNode =

            h("div", { class: "error" }, [
                h("div", { class: "header" }, [
                    h("div", { class: "icon" }, "x")
                ]),
                h("div", { class: "title" }, [
                    h("label", {}, `${dialogue.title}`)
                ]),
                
                copyView,
                
                h("label", { class: "text" }, `${dialogue.text}`),
                h("div", { class: "buttons" }, [
                    h("button",
                        {
                            type: "button",
                            onClick: dialogueActions.acknowledgeError
                        },
                        "OK"
                    )
                ])
            ]);

        return view;
    },

    buildErrorAndActionDialogueView: (state: IState): VNode => {

        const dialogue: IDialogue = state.dialogue as IDialogue;

        const view: VNode =

            h("div", { class: "error" }, [
                h("div", { class: "header" }, [
                    h("div", { class: "icon" }, "x")
                ]),
                h("div", { class: "title" }, [
                    h("label", {}, `${dialogue.title}`)
                ]),
                h("div", { class: "text-wrapper" }, [
                    h("label", { class: "text" }, `${dialogue.text}`)
                ]),
                h("div", { class: "buttons" }, [
                    h("button",
                        {
                            type: "button",
                            class: "cancel",
                            onClick: dialogueActions.cancel
                        },
                        [
                            h("div", { class: CssClasses.nope }, ""),
                            h("span", {}, "Cancel")
                        ]
                    ),
                    h("button",
                        {
                            type: "button",
                            class: "confirm",
                            onClick: dialogueActions.confirm
                        },
                        [
                            h("div", { class: CssClasses.yep }, ""),
                            h("span", {}, "OK")
                        ]
                    )
                ])
            ]);

        return view;
    }
};

export default errorDialogueViews;


