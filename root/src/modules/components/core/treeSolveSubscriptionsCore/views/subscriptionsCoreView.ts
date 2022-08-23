import { Children, h, VNode } from "hyperapp-local";

import U from "../../../../global/gUtilities";
import IState from "../../../../interfaces/state/IState";
import IStateAnyArray from "../../../../interfaces/state/IStateAnyArray";
import backgroundView from "../../../background/views/backgroundView";
import subscriptionCoreActions from "../actions/subscriptionCoreActions";

import "../scss/index.scss";


const buildInnerView = (
    state: IState,
    actionDelegate: (state: IState, subscriptionName: string) => IStateAnyArray): Children => {

    if (!state?.user?.authorised
        && !state?.settings?.useVsCode) {

        return null;
    }

    const subscriptionsView: VNode[] = [];
    let subscriptionView: VNode;

    state.subscriptionState.subscriptions.forEach((subscriptionName: string) => {

        if (U.isNullOrWhiteSpace(subscriptionName)) {
            return;
        }

        subscriptionView =

            h("ul", {}, [
                h("a",
                    {
                        onClick: [
                            actionDelegate,
                            (_event: any) => subscriptionName
                        ]
                    },
                    [
                        h("span", {}, `${subscriptionName}`)
                    ])
            ]);

        subscriptionsView.push(subscriptionView);
    });

    const view: VNode =

        h("div", { class: "subscriptions" }, [
            h("div", { class: "header" }, [
                h("div", { class: "icon" }, "!")
            ]),
            h("h2", {}, "Select a subscription"),
            h("ul", {}, subscriptionsView)
        ]);

    return view;
};

const buildInitialView = (state: IState): VNode => {

    const view: VNode =

        h("div", { id: "subscriptionsCoreView" }, [
            h("div", { id: "subscriptionsCore" }, [

                backgroundView.buildView(state),

                h("div", { class: "subscriptions-box" }, [

                    buildInnerView(
                        state,
                        subscriptionCoreActions.setSubscription,
                    )
                ])
            ])
        ]);

    return view;
};

const buildResetView = (state: IState): VNode => {

    const view: VNode =

        h("div", { id: "subscriptionsCoreView" }, [
            h("div", { id: "subscriptionsCore" }, [

                backgroundView.buildView(state),

                h("div", { class: "subscriptions-box" }, [

                    buildInnerView(
                        state,
                        subscriptionCoreActions.resetSubscription,
                    ),

                    h("div", { class: "buttons" }, [
                        h("button",
                            {
                                type: "button",
                                class: "cancel",
                                onClick: subscriptionCoreActions.cancel
                            },
                            [
                                h("span", {}, "Cancel")
                            ]
                        )
                    ])
                ])
            ])
        ]);

    return view;
};

const subscriptionsCoreView = {

    // This view should only be used on showing the editor for the first time.
    // If switching subscriptions once the editor has been loaded use another view
    // to control which screens load after the subscription has been loaded
    buildView: (state: IState): VNode => {

        if (U.isNullOrWhiteSpace(state.subscriptionState.subscriptionID) === true) {

            return buildInitialView(state);
        }

        return buildResetView(state);
    }
};

export default subscriptionsCoreView;


