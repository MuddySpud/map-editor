import { h, VNode } from "hyperapp-local";

import ISubtreeSys from "../../../../../../../interfaces/state/tree/ISubtreeSys";
import IStSocket from "../../../../../../../interfaces/state/tree/IStSocket";
import gHtmlActions from "../../../../../../../global/actions/gHtmlActions";
import gTooltipActions from "../../../../../../../global/actions/gTooltipActions";
import StSocketElement from "../../../../../../../state/ui/payloads/StSocketElement";
import StRootElement from "../../../../../../../state/ui/payloads/StRootElement";
import inputErrorViews from "../../../../../lens/views/inputErrorViews";
import IStRoot from "../../../../../../../interfaces/state/tree/IStRoot";
import IStRootElement from "../../../../../../../interfaces/state/ui/payloads/IStRootElement";
import IState from "../../../../../../../interfaces/state/IState";
import IStSocketElement from "../../../../../../../interfaces/state/ui/payloads/IStSocketElement";
import IStageBehaviour from "../../../../../../../interfaces/behaviours/IStageBehaviour";
import minMaxViews from "./minMaxViews";


const editSubtreeViews = {

    buildStSocketTextTitleInputView: (
        subtree: ISubtreeSys,
        stSocket: IStSocket,
        counter: number,
        setSocketTextActionDelegate: (
            state: IState,
            payload: IStSocketElement) => IState,
        deleteSocketActionDelegate: (
            state: IState,
            payload: IStSocketElement) => IState,
        behaviour: IStageBehaviour | null
    ): VNode => {

        const view: VNode =

            h("li", { key: `${stSocket.key}` }, [

                inputErrorViews.buildKeyErrorView(
                    stSocket.key,
                    stSocket.errors),

                h("div", { class: "border" }, [
                    h("div", { class: "order" }, [
                        h("span", {}, `${counter}`)
                    ]),
                    h("div",
                        {
                            class: "btn-delete",
                            onClick: [
                                deleteSocketActionDelegate,
                                (_event: any) => {
                                    return new StSocketElement(
                                        stSocket,
                                        subtree,
                                        null,
                                        behaviour,
                                        
                                    );
                                }
                            ],
                        },
                        ""
                    ),

                    editSubtreeViews.buildStSocketTextInputView(
                        stSocket,
                        setSocketTextActionDelegate,
                        behaviour
                    ),
                    minMaxViews.buildCollapsibleHolesView(stSocket, "Mapped holes")
                ])
            ]);

        return view;
    },

    buildStRootTextTitleInputView: (
        stRoot: IStRoot,
        setRootTextActionDelegate: (
            state: IState,
            payload: IStRootElement) => IState,
        behaviour: IStageBehaviour | null
    ): VNode => {

        const view: VNode =

            h("div", { class: "input-box i-stRoot bottom-divider" }, [

                inputErrorViews.buildKeyTitleErrorView(
                    "StRoot",
                    stRoot.key,
                    stRoot.errors),

                editSubtreeViews.buildStRootTextInputView(
                    stRoot,
                    setRootTextActionDelegate,
                    behaviour
                )
            ]);

        return view;
    },

    buildStSocketTextInputView: (
        stSocket: IStSocket,
        setSocketTextActionDelegate: (
            state: IState,
            payload: IStSocketElement) => IState,
        behaviour: IStageBehaviour | null
    ): VNode => {

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
                            key: `stSocket_${stSocket.key}`,
                            placeholder: `...enter socket text...`,
                            onInput: [
                                setSocketTextActionDelegate,
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

    buildStRootTextInputView: (
        stRoot: IStRoot,
        setRootTextActionDelegate: (
            state: IState,
            payload: IStRootElement) => IState,
        behaviour: IStageBehaviour | null
    ): VNode => {

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
                            value: `${stRoot.text}`,
                            class: "edit",
                            type: "text",
                            key: `stRoot_${stRoot.key}`,
                            placeholder: `...enter stRoot text...`,
                            onInput: [
                                setRootTextActionDelegate,
                                (event: any) => {
                                    return new StRootElement(
                                        stRoot,
                                        event.target,
                                        behaviour
                                    );
                                }
                            ],
                            onBlur: gHtmlActions.clearFocus,
                            onMouseOver: [
                                gTooltipActions.showTooltip,
                                (_event: any) => `Text is a short description of the stRoot to display in links.
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

    buildStSocketInputViews: (
        subtree: ISubtreeSys,
        setSocketTextActionDelegate: (
            state: IState,
            payload: IStSocketElement) => IState,
        addSocketActionDelegate: (
            state: IState,
            payload: IStSocketElement) => IState,
        deleteSocketActionDelegate: (
            state: IState,
            payload: IStSocketElement) => IState,
        behaviour: IStageBehaviour | null
    ): VNode => {

        const buildAddButtonView = () => {

            const view: VNode =

                h("div", { class: "add" }, [
                    h("div",
                        {
                            class: "btn-add",
                            onClick: [
                                addSocketActionDelegate,
                                (_event: any) => {
                                    return new StSocketElement(
                                        null,
                                        subtree,
                                        null,
                                        behaviour,
                                    );
                                }
                            ],

                        },
                        ""
                    ),
                ]);

            return view;
        };

        const buildSocketViews = (
            setSocketTextActionDelegate: (
                state: IState,
                payload: IStSocketElement) => IState,
            deleteSocketActionDelegate: (
                state: IState,
                payload: IStSocketElement) => IState,
            behaviour: IStageBehaviour | null
        ): VNode[] => {

            const socketViewList: VNode[] = [];
            let socketView: VNode | null = null;
            let counter: number = 0;

            subtree.stSockets.forEach((stSocket: IStSocket) => {

                socketView = editSubtreeViews.buildStSocketTextTitleInputView(
                    subtree,
                    stSocket,
                    ++counter,
                    setSocketTextActionDelegate,
                    deleteSocketActionDelegate,
                    behaviour
                );

                socketViewList.push(socketView);
            });

            return socketViewList;
        };

        const view: VNode =

            h("div", { class: "socket-edit" }, [
                h("span", { class: "title" }, "Sockets"),
                h("ul", { id: "socketsList" },

                    buildSocketViews(
                        setSocketTextActionDelegate,
                        deleteSocketActionDelegate,
                        behaviour)
                ),
                buildAddButtonView()
            ]);

        return view;
    },

    buildInputView: (
        subtree: ISubtreeSys,
        setRootTextActionDelegate: (
            state: IState,
            payload: IStRootElement) => IState,
        setSocketTextActionDelegate: (
            state: IState,
            payload: IStSocketElement) => IState,
        addSocketActionDelegate: (
            state: IState,
            payload: IStSocketElement) => IState,
        deleteSocketActionDelegate: (
            state: IState,
            payload: IStSocketElement) => IState,
        behaviour: IStageBehaviour | null = null
    ): VNode[] => {

        if (!subtree) {

            return [];
        }

        const view: VNode[] = [

            editSubtreeViews.buildStRootTextTitleInputView(
                subtree.stRoot,
                setRootTextActionDelegate,
                behaviour
            ),

            editSubtreeViews.buildStSocketInputViews(
                subtree,
                setSocketTextActionDelegate,
                addSocketActionDelegate,
                deleteSocketActionDelegate,
                behaviour)
        ];

        return view;
    }
};

export default editSubtreeViews;


