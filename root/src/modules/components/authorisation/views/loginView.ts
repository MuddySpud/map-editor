import { h, VNode } from "hyperapp-local";

import IState from "../../../interfaces/state/IState";
import backgroundView from "../../background/views/backgroundView";
import loadingView from "../../loading/views/loadingView";

import "../scss/login.scss";


const loginView = {

    buildView: (state: IState): VNode => {

        const view: VNode =

            h("div", { id: "loginView" }, [

                backgroundView.buildView(state),
                loadingView.buildView("Authenticating...")
            ]);


        return view;
    }
}

export default loginView;

