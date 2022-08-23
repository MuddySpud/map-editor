import { h, VNode } from "hyperapp-local";

import mdEditorActions from "../actions/mdEditorActions";
import CssClasses from "../../../../../state/constants/CssClasses";
import IMdEditor from "../interfaces/IMdEditor";
import markdownCode from "../code/markdownCode";

import '../scss/editor.scss';


const mdEditorViews = {

    buildView: (): VNode | null => {

        const mdEditor: IMdEditor | null = markdownCode.tryGetMdEditor();

        if (!mdEditor
            || !mdEditor.showEditor) {

            return null;
        }

        const buildControlView = (): VNode => {

            const controlView: VNode =

                h("div",
                    {
                        class: {
                            "controls-header": true,
                        }
                    },
                    [
                        h("div",
                            {
                                class: "close",
                                onClick: mdEditorActions.close
                            },
                            ""
                        )
                    ]);

            return controlView;
        };

        const view: VNode =

            h("div", { id: "mdEditorView" }, [
                h("div",
                    {
                        id: "overlay",
                        onClick: mdEditorActions.close
                    },
                    ""
                ),
                h("div", { id: "lightBox" }, [

                    buildControlView(),

                    h("div", { class: "view" }, [
                        h("div", { id: "mdEditor" }, ""),
                        h("div", { class: "buttons" }, [
                            h("button",
                                {
                                    type: "button",
                                    class: "cancel",
                                    onClick: mdEditorActions.close
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
                                    onClick: mdEditorActions.done
                                },
                                [
                                    h("div", { class: CssClasses.yep }, ""),
                                    h("span", {}, "Done")
                                ]
                            )
                        ])

                    ])
                ])
            ]);

        return view;
    }
};

export default mdEditorViews;

