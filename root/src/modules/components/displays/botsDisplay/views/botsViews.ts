import { h, VNode } from "hyperapp-local";

import IState from "../../../../interfaces/state/IState";
import aliasesViews from "./aliasesViews";
import draftsViews from "./draftsViews";
import loadingView from "../../../loading/views/loadingView";

import '../scss/index.scss';


const botsViews = {

    buildView: (state: IState): VNode => {

        let innardsView: VNode;

        if (state.loading) {

            innardsView = loadingView.buildView("Loading bots...");
        }
        else {
            innardsView =

                h("div", { class: "bot-display" }, [

                    aliasesViews.buildView(state),
                    draftsViews.buildView(state)
                ]);
        }

        const view: VNode =

            h("div", { id: "botsView" }, [

                innardsView
            ]);

        return view;
    }
};

export default botsViews;


