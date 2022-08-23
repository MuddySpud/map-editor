import { Children, h, VNode } from "hyperapp-local";

import branchesCoreView from "../../core/branchesCore/views/branchesCoreView";
import treesCoreView from "../../core/treesCore/views/treesCoreView";
import IState from "../../../interfaces/state/IState";
import loginView from "../../authorisation/views/loginView";
import userMenuView from "../../authorisation/views/userMenuView";
import projectCoreView from "../../core/projectCore/views/projectCoreView";
import U from "../../../global/gUtilities";
import subscriptionsCoreView from "../../core/treeSolveSubscriptionsCore/views/subscriptionsCoreView";

import "../scss/index.scss";
import botsCoreView from "../../core/botsCore/views/botsCoreView";

const initView = {

    buildView: (state: IState): VNode => {

        if (state.user
            && !state?.settings?.useVsCode
            && !state?.user?.authorised) {

            return loginView.buildView(state);
        }

        let innerView: Children[];

        if (U.isNullOrWhiteSpace(state.subscriptionState.subscriptionID) === true
            || state.subscriptionState.showSubscriptions === true) {

            innerView = [
                subscriptionsCoreView.buildView(state)
            ];
        }
        else {
            innerView = [

                branchesCoreView.buildView(state)
                ,
                treesCoreView.buildView(state)
                ,
                botsCoreView.buildView(state)
                ,
                projectCoreView.buildView(state)
                ,
                userMenuView.buildView(state)
            ];
        }

        const view: VNode = h("div", { id: "treeSolveAuthor" }, innerView);

        return view;
    }
}

export default initView;

