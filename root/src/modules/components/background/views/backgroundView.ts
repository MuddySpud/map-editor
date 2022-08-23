import { h, VNode } from "hyperapp-local";

import IState from "../../../interfaces/state/IState";

import "../scss/index.scss";


const backgroundView = {

    buildView: (_state: IState): VNode => {

        const view: VNode = h("div", { id: "background" }, "");

        return view;
    }
};

export default backgroundView;


