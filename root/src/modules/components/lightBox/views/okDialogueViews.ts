import { h, VNode } from "hyperapp-local";

import IState from "../../../interfaces/state/IState";
import dialogueActions from "../actions/dialogueActions";
import IDialogue from "../../../interfaces/state/ui/IDialogue";
import CssClasses from "../../../state/constants/CssClasses";


const okDialogueViews = {

    buildOKDialogueView: (state: IState): VNode => {

        const dialogue: IDialogue = state.dialogue as IDialogue;

        const view: VNode =

            h("div", { class: "confirm" }, [
                h("div", { class: "header" }, [
                    h("div", { class: "icon" }, "!")
                ]),
                h("div", { class: "title" }, [
                    h("label", {}, `${dialogue.title}`)
                ]),
                h("label", { class: "text" }, `${dialogue.text}`),
                h("div", { class: "buttons" }, [
                    h("button",
                        {
                            type: "button",
                            class: "confirm",
                            onClick: dialogueActions.ok
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

export default okDialogueViews;


