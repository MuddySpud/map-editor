import { h, VNode } from "hyperapp-local";

import optionsViews from "./optionsViews";
import IState from "../../../../interfaces/state/IState";
import IBranchUI from "../../../../interfaces/state/ui/UIs/IBranchUI";
import nodeActions from "../actions/nodeActions";
import IStash from "../../../../interfaces/state/tree/IStash";


const stashViews = {

    buildStashView: (state: IState): VNode | null => {

        if (!state.branchesState.stash.ui.showNode) {

            return null;
        }

        const stash: IStash<IBranchUI> = state.branchesState.stash;

        let buildStashProperties = (): any => {

            const properties: any = {
                class: {
                    "node": true,
                    "stash-root": true,
                    "empty": stash.nodes.length === 0,
                    "selected": stash.ui.selected === true,
                }
            };

            return properties;
        };

        const view: VNode =

            h("div",
                buildStashProperties(),
                [
                    h("a",
                        {
                            onClick: [
                                nodeActions.selectNode,
                                (_event: any) => stash
                            ]
                        },
                        [
                            h("div", { class: "stash-icon" }, ""),
                            h("span", {}, "Stash"),
                        ]
                    ),
                    h("div",
                        {
                            class: "options"
                        },
                        optionsViews.buildOptionsView(
                            state,
                            stash.nodes,
                            1
                        )
                    )
                ]);

        return view;
    }
};

export default stashViews;

