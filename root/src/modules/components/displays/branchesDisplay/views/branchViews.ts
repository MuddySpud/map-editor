import { h, VNode } from "hyperapp-local";

import rootViews from "./rootViews";
import IState from "../../../../interfaces/state/IState";
import gBranchTaskCode from "../../../../global/code/gBranchTaskCode";
import { FontSize } from "../../../../interfaces/enums/FontSize";
import stashViews from "./stashViews";
import IGlobalBranchFlags from "../../../../interfaces/state/ui/IGlobalBranchFlags";

import '../scss/index.scss';


const branchViews = {

    buildView: (state: IState): VNode => {

        const globalBranchFlags: IGlobalBranchFlags = gBranchTaskCode.getGlobalBranchFlags(state);

        const buildRootView = () => {

            let rootView: VNode | null;

            if (!state.loading) {

                rootView = rootViews.buildRootView(state);
            }
            else {
                rootView = null;
            }

            return rootView;
        };

        const buildTreeProperties = () => {

            const classes: any = {
                "tree": true,
                "p-hlntv": state.settings.highlightLensNodeInBranchUI === true,
                "global-branch-target": globalBranchFlags.target,
                "global-branch-option": globalBranchFlags.option,
                "global-branch-limit": globalBranchFlags.limit
            };

            if (state.settings.fontSize !== FontSize.Normal) {

                const className: string = `font-size-${state.settings.fontSize}`;
                classes[className] = true;
            }

            const properties = {
                id: "treeBranches",
                class: classes
            };

            return properties;
        };


        const branchesView: VNode =

            h("div", { id: "branchesView" }, [
                h("div",
                    {
                        id: "branches",
                        class: "container-data",
                        key: `${state.branchesState.tree.key}`
                    },
                    [
                        h("div", buildTreeProperties(), [
                            buildRootView(),
                            stashViews.buildStashView(state)
                        ])
                    ])
            ]);

        window.TreeSolve.screen.maxBranchDepth = state.branchesState.maxBranchDepth;

        return branchesView;
    }
};

export default branchViews;


