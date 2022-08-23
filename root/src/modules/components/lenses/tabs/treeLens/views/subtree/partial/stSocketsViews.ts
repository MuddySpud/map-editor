import { h, VNode } from "hyperapp-local";

import IStSocket from "../../../../../../../interfaces/state/tree/IStSocket";
import CssClasses from "../../../../../../../state/constants/CssClasses";
import subtreeRowViews from "./subtreeRowViews";


const stSocketsViews = {

    buildStSocketsDetailsView: (stSockets: Array<IStSocket>): VNode[] => {

        if (!stSockets
            || stSockets.length === 0) {

            return [];
        }

        const socketViews: VNode[] = [];
        let socketView: VNode | null;
        let index: number = 0;

        stSockets.forEach((stSocket) => {

            socketView = stSocketsViews.buildStSocketDetailsView(
                stSocket,
                ++index);

            if (socketView) {

                socketViews.push(socketView);
            }
        });

        const view: VNode[] = [

            h("h4", {}, "stSockets"),
            h("div", { class: "stSockets" }, [

                ...socketViews
            ])
        ];

        return view;
    },

    buildStSocketDetailsView: (
        stSocket: IStSocket,
        index: number): VNode | null => {

        if (!stSocket) {

            return null;
        }

        const view: VNode =

            h("div", { class: "socket" }, [
                h("div", { class: "socket-data" }, [

                    subtreeRowViews.buildSocketIndexTextView(stSocket, index, CssClasses.odd),
                    subtreeRowViews.buildSocketIndexKeyView(stSocket),
                ])
            ]);

        return view;
    },
};

export default stSocketsViews;


