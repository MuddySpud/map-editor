import { h, VNode } from "hyperapp-local";

import IState from "../../../interfaces/state/IState";

import '../scss/index.scss';


const recordPanelViews = {

    buildView: (_state: IState): VNode | null => {

        const view: VNode =

            h("div", { id: "recordPanel" }, "");

        return view;
    }
};

export default recordPanelViews;

