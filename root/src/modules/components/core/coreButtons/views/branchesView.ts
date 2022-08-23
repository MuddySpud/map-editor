import { h, VNode } from "hyperapp-local";

import IState from "../../../../interfaces/state/IState";
import avatarView from "./avatarView";
import buttonViews from "./buttonViews";

import "../scss/index.scss";


const branchesView = {

    buildView: (state: IState): VNode | null => {

        const view: VNode =

            h("div", { id: "buttonsView" }, [
                h("div", { id: "mainButtons" }, [

                    avatarView.buildView(state),
                    buttonViews.buildShowBotsButtonView(state),
                    buttonViews.buildShowTreesButtonView(state),
                    buttonViews.buildStashButtonView(state)
                ])
            ]);

        return view;
    },
};

export default branchesView;


