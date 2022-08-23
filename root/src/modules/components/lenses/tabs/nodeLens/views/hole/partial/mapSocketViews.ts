import { h, VNode, Children } from "hyperapp-local";

import ISocketTask from "../../../../../../../interfaces/state/tree/ISocketTask";
import mapSocketActions from "../../../actions/mapSocketActions";
import IStSocket from "../../../../../../../interfaces/state/tree/IStSocket";
import selectView from "../../../../../lens/views/selectView";
import gTooltipActions from "../../../../../../../global/actions/gTooltipActions";
import U from "../../../../../../../global/gUtilities";
import StSocketElement from "../../../../../../../state/ui/payloads/StSocketElement";
import gHtmlActions from "../../../../../../../global/actions/gHtmlActions";
import inputErrorViews from "../../../../../lens/views/inputErrorViews";
import ISocketLoaderUI from "../../../../../../../interfaces/state/ui/UIs/ISocketLoaderUI";
import ISocketLoader from "../../../../../../../interfaces/state/tree/ISocketLoader";
import buttonViews from "../../../../../lens/views/buttonViews";
import CssClasses from "../../../../../../../state/constants/CssClasses";
import IStageBehaviour from "../../../../../../../interfaces/behaviours/IStageBehaviour";
import StageBehaviour from "../../../../../../../behaviours/StageBehaviour";


const mapSocketViews = {

    buildOverrideView: (socketLoaderView: ISocketLoaderUI): VNode => {

        const overrideOptionClass: string = socketLoaderView.overrideOption === true ? CssClasses.yep : CssClasses.nope;

        return buttonViews.buildTypeButtonView(
            "Display socket text in place of option",
            "Select whether this prints the socket text instead of the hole option",
            overrideOptionClass,
            mapSocketActions.toggleOverrideOption
        );
    },

    buildTypeView: (socketLoaderView: ISocketLoaderUI): VNode => {

        const socketClass: string = socketLoaderView.optionIsSocket === true ? CssClasses.yep : CssClasses.nope;

        return buttonViews.buildTypeButtonView(
            "Map to a socket",
            "Select whether this option maps to a socket or not",
            socketClass,
            mapSocketActions.toggleMapToSocket
        );
    },

    buildLoadOptionTextButtonView: (): VNode => {

        return buttonViews.buildPressButtonView(
            "Copy option text into socket text",
            "Click to copy the option's text into the socket's text",
            mapSocketActions.copyOptionText
        );
    },

    buildNewSocketButtonView: (socketLoaderUI: ISocketLoaderUI): VNode => {

        const text: string = socketLoaderUI.newSocket === true ?
            "New socket" :
            "Existing socket";

        return buttonViews.buildTypeButtonView(
            text,
            "Select to create and map to a new socket",
            CssClasses.yep,
            mapSocketActions.toggleNewSocket
        );
    },

    buildMapSocketButtonViews: (
        socketTask: ISocketTask,
        stageBehaviour: IStageBehaviour): Children[] => {

        if (socketTask.ui.optionIsSocket === false) {

            return [];
        }

        const view: Children[] = [

            mapSocketViews.buildMapNewSocketButtonView(socketTask),
            mapSocketViews.buildOverrideView(socketTask.ui),

            ...mapSocketViews.buildSocketTaskEditViews(
                socketTask,
                stageBehaviour),
        ];

        return view;
    },

    buildMapNewSocketButtonView: (socketTask: ISocketTask): VNode | null => {

        if (!socketTask.ui.optionIsSocket
            || socketTask.lensSubtree.stSockets.length === 0) {

            return null;
        }

        return mapSocketViews.buildNewSocketButtonView(socketTask.ui);
    },


    buildSelectHeaderView: (): VNode[] => {

        const view = [

            h("div", { class: "select-header" }, [
                h("div", { class: "select-cell-tick" }, ""),
                h("div", { class: "select-cell" }, "key"),
                h("div", { class: "select-cell" }, "text"),
            ])
        ];

        return view;
    },

    buildSelectSocketUI: (stSocket: IStSocket): VNode[] => {

        const selected: boolean = stSocket.ui.selected === true;

        const view = [

            h("div",
                {
                    class: {
                        "select-row": true,
                        "selected": selected
                    },
                    onMouseDown: [
                        mapSocketActions.selectSocket,
                        (_event: any) => stSocket
                    ]
                },
                [
                    h("div", { class: "select-cell" }, [
                        h("div", { class: "tick" }, ""),
                    ]),
                    h("div", { class: "select-cell" }, stSocket.key),
                    h("div", { class: "select-cell" }, stSocket.text)
                ]
            )
        ];

        return view;
    },

    buildSelectSocketsView: (
        socketLoader: ISocketLoader,
        stSockets: Array<IStSocket>): VNode => {

        const optionViews: Children[] = [

            ...mapSocketViews.buildSelectHeaderView()
        ];

        let optionView: Children[];

        const buttonText: string = U.isNullOrWhiteSpace(socketLoader.selectedSocket?.key) === false ?
            socketLoader.selectedSocket?.text ?? '' :
            "Choose a socket...";

        stSockets.forEach((stSocket: IStSocket) => {

            optionView = mapSocketViews.buildSelectSocketUI(stSocket);
            optionViews.push(...optionView);
        });

        return selectView.buildSelectView(
            optionViews,
            buttonText,
            socketLoader.ui.showSockets,
            true,
            mapSocketActions.showSockets,
            mapSocketActions.hideSockets,
            mapSocketActions.clearSocket
        );
    },

    buildSocketsView: (
        socketLoader: ISocketLoader,
        stSockets: Array<IStSocket>): VNode[] => {

        if (socketLoader.ui.optionIsSocket === false) {
            return [];
        }

        let view: VNode[] = [

            h("div", { class: "title-table" }, [
                h("div", { class: "title-row" }, [
                    h("div", { class: "title-cell" }, [
                        h("span", { class: "title" }, `Socket text`),
                    ]),
                    h("div", { class: "id-cell" }, [
                        h("div", { class: "id" }, `${socketLoader.selectedSocket?.key ?? ''}`)
                    ])
                ])
            ]),

            mapSocketViews.buildSelectSocketsView(
                socketLoader,
                stSockets)
        ];

        return view;
    },

    buildStSocketTextInputView: (
        stSocket: IStSocket,
        behaviour: IStageBehaviour): VNode => {

        const view: VNode =

            h("div",
                {
                    class: {
                        "input-wrapper": true,
                    }
                },
                [
                    h("input",
                        {
                            value: `${stSocket.text}`,
                            class: "edit",
                            type: "text",
                            id: `stSocket_${stSocket.key}`,
                            placeholder: `...enter socket text...`,
                            onInput: [
                                mapSocketActions.setSocketText,
                                (event: any) => {
                                    return new StSocketElement(
                                        stSocket,
                                        null,
                                        event.target,
                                        behaviour
                                    );
                                }
                            ],
                            onBlur: gHtmlActions.clearFocus,
                            onMouseOver: [
                                gTooltipActions.showTooltip,
                                (_event: any) => `Text is a short description of the socket to display in links.
Helpful for flow authors, not visible to end users.`
                            ],
                            onMouseOut: gTooltipActions.clearTooltip
                        },
                        ""
                    )
                ]
            );

        return view;
    },

    buildNewSocketUI: (
        stSockets: Array<IStSocket>,
        behaviour: IStageBehaviour): VNode | null => {

        const stSocket: IStSocket | undefined = stSockets.find((stSocket: IStSocket) => {

            return U.isNegativeNumeric(stSocket.key) === true;
        });

        if (!stSocket) {

            return null;
        }

        const view =

            h("div", { class: "input-box bottom-divider" }, [

                inputErrorViews.buildKeyTitleErrorView(
                    "socket",
                    stSocket.key,
                    stSocket.errors),

                mapSocketViews.buildStSocketTextInputView(
                    stSocket,
                    behaviour)
            ]);

        return view;
    },

    buildSocketTaskEditViews: (
        socketTask: ISocketTask,
        behaviour: StageBehaviour): Children[] => {

        if (socketTask.ui.optionIsSocket === false) {

            return [];
        }
        else if (socketTask.ui.newSocket === true) {

            return [

                mapSocketViews.buildLoadOptionTextButtonView(),

                mapSocketViews.buildNewSocketUI(
                    socketTask.lensSubtree.stSockets,
                    behaviour)
            ];
        }

        return [

            ...mapSocketViews.buildSocketsView(
                socketTask,
                socketTask.lensSubtree.stSockets)
        ];
    }
};

export default mapSocketViews;


