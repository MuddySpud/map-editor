import { h, VNode } from "hyperapp-local";
import IState from "../../../../interfaces/state/IState";
import headerControlViews from "./headerControlViews";
import CssClasses from "../../../../state/constants/CssClasses";


const overlayViews = {

    buildButtonOverlayView: (
        title: string,
        buttonText: string,
        closeTooltip: string,
        className: string,
        buttonAction: (state: IState) => IState,
        closeAction: (state: IState) => IState,
    ): VNode => {

        const view: VNode =

            h("div",
                {
                    id: "lensOverlay",
                    class: className,
                },
                [
                    h("div",
                        {
                            class: "overlay-back",
                            onClick: closeAction
                        },
                        ""
                    ),
                    h("div", { class: "dialogue" }, [

                        headerControlViews.buildCloseView(
                            closeTooltip,
                            closeAction),

                        h("div", { class: "header" }, [
                            h("div", { class: "icon" }, '')
                        ]),
                        h("div", { class: "title" }, [
                            h("label", {}, `${title}`)
                        ]),
                        h("button",
                            {
                                type: "button",
                                class: "cancel",
                                onClick: buttonAction
                            },
                            [
                                h("div", { class: CssClasses.nope }, ""),
                                h("span", {}, `${buttonText}`)
                            ]
                        )
                    ])
                ]
            );

        return view;
    }
};

export default overlayViews;


