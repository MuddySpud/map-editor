import { h, VNode } from "hyperapp-local";

import gHtmlActions from "../../../../../../global/actions/gHtmlActions";
import IKeyValuePair from "../../../../../../interfaces/state/tree/IKeyValuePair";
import altsLensActions from "../../actions/altsLensActions";
import KeyValuePairElement from "../../../../../../state/ui/payloads/KeyValuePairElement";


const altViews = {

    buildAltView: (
        alt: IKeyValuePair,
        counter: number): VNode => {

        const altView: VNode =

            h("li", { key: `${alt.key}` }, [
                h("div", { class: "order" }, [
                    h("span", {}, `${counter}`)
                ]),
                h("div",
                    {
                        class: "btn-delete",
                        onClick: [
                            altsLensActions.deleteAlt,
                            (_event: any) => alt
                        ],
                    },
                    ""
                ),
                h("div", { class: "textarea-wrapper" }, [
                    h("textarea",
                        {
                            id: `alt_${alt.key}`,
                            value: `${alt.value}`,
                            class: "edit",
                            textmode: "MultiLine",
                            placeholder: `...enter the alternative discussion text here...`,
                            onInput: [
                                altsLensActions.setAltText,
                                (event: any) => {
                                    return new KeyValuePairElement(
                                        alt,
                                        event.target,
                                    );
                                }
                            ],
                            onBlur: gHtmlActions.clearFocus
                        },
                        ""
                    )
                ])
            ]);

        return altView;
    }
};

export default altViews;

