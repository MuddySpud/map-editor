import { h, VNode } from "hyperapp-local";

import branchViews from "../../../displays/branchesDisplay/views/branchViews";
import lensViews from "../../../lenses/lens/views/lensViews";
import IState from "../../../../interfaces/state/IState";
import menuViews from "../../../menu/views/menuViews";
import headerView from "../../../header/views/headerView";
import backgroundView from "../../../background/views/backgroundView";
import { DialogueAction } from "../../../../interfaces/enums/DialogueAction";
import buttonsView from "../../../core/coreButtons/views/buttonsView";
import { DisplayType } from "../../../../interfaces/enums/DisplayType";
import lightBoxViews from "../../../lightBox/views/lightBoxViews";
import warningViews from "../../../warning/views/warningViews";

import "../scss/index.scss";


const coreView = {

    buildView: (state: IState): VNode | null => {

        if (state.displayType !== DisplayType.Branches) {

            return null;
        }

        const blur: boolean = state.dialogue?.result === DialogueAction.None;

        const view: VNode =

            h("div", { id: "branchesCoreView" }, [
                h("div",
                    {
                        id: "branchesCore",
                        class: { filter: blur }
                    },
                    [
                        backgroundView.buildView(state)
                        ,
                        buttonsView.buildView(state)
                        ,
                        headerView.buildView(state)
                        ,
                        branchViews.buildView(state)
                        ,
                        lensViews.buildView(state)
                        ,
                        menuViews.buildView(state)
                        ,
                        window.TreeSolve.discussionPlugins.buildExpandedEditorView(state)
                        ,
                        warningViews.buildView(state)
                        ,
                        lightBoxViews.buildView(state)
                        ,
                    ]
                )
            ]);

        return view;
    }
};

export default coreView;


