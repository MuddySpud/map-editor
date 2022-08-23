import { h, VNode } from "hyperapp-local";

import IState from "../../../../interfaces/state/IState";
import { DisplayType } from "../../../../interfaces/enums/DisplayType";
import backgroundView from "../../../background/views/backgroundView";
import lensViews from "../../../lenses/lens/views/lensViews";
import menuViews from "../../../menu/views/menuViews";
import lightBoxViews from "../../../lightBox/views/lightBoxViews";
import treesViews from "../../../displays/treesDisplay/views/treesViews";
import headerView from "../../../header/views/headerView";
import buttonsView from "../../../core/coreButtons/views/buttonsView";
import warningViews from "../../../warning/views/warningViews";

import "../scss/index.scss";


const treesCoreView = {

    buildView: (state: IState): VNode | null => {

        if (state.displayType !== DisplayType.Trees) {
            
            return null;
        }

        const view: VNode =

            h("div", { id: "treesCoreView" }, [
                h("div",
                    {
                        id: "treeCore",
                        class: { filter: blur }
                    },
                    [
                        backgroundView.buildView(state)
                        ,
                        buttonsView.buildView(state)
                        ,
                        headerView.buildView(state)
                        ,
                        treesViews.buildView(state)
                        ,
                        lensViews.buildView(state)
                        ,
                        menuViews.buildView(state)
                        ,
                        warningViews.buildView(state)
                        ,
                        lightBoxViews.buildView(state)
                    ]
                )
            ]);

        return view;
    }
};

export default treesCoreView;


