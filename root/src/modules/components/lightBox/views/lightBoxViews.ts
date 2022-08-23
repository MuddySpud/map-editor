import { h, VNode } from "hyperapp-local";

import IState from "../../../interfaces/state/IState";
import lightboxActions from "../actions/lightboxActions";
import dialogueCode from "../code/dialogueCode";
import { DialogueAction } from "../../../interfaces/enums/DialogueAction";
import { DialogueType } from "../../../interfaces/enums/DialogueType";
import IDialogue from "../../../interfaces/state/ui/IDialogue";

import '../scss/index.scss';


const lightBoxViews = {

    buildView: (state: IState): VNode | null => {

        if (!state.dialogue
            || state.dialogue.result !== DialogueAction.None) {

            return null;
        }

        const buildControlView = (): VNode => {

            const error: boolean = (state.dialogue as IDialogue).type === DialogueType.Error;

            const controlView: VNode =

                h("div",
                    {
                        class: {
                            "controls-header": true,
                            "error-red": error
                        }
                    },
                    [
                        h("div",
                            {
                                class: "close",
                                onClick: lightboxActions.close
                            },
                            ""
                        )
                    ]);

            return controlView;
        };

        const view: VNode =

            h("div", { id: "lightBoxView" }, [
                h("div",
                    {
                        id: "overlay",
                        onClick: lightboxActions.close
                    },
                    ""
                ),
                h("div", { id: "lightBox" }, [

                    buildControlView(),

                    h("div",
                        {
                            class: "view",
                        },

                        dialogueCode.getDialogue(state)
                    )
                ])
            ]);

        return view;
    }
};

export default lightBoxViews;

