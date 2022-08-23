import { h, VNode } from "hyperapp-local";

import IState from "../../../../interfaces/state/IState";
import { DisplayType } from "../../../../interfaces/enums/DisplayType";
import backgroundView from "../../../background/views/backgroundView";
import lensViews from "../../../lenses/lens/views/lensViews";
import menuViews from "../../../menu/views/menuViews";
import lightBoxViews from "../../../lightBox/views/lightBoxViews";
import headerView from "../../../header/views/headerView";
import buttonsView from "../../../core/coreButtons/views/buttonsView";
import warningViews from "../../../warning/views/warningViews";
import projectViews from "../../../displays/projectDisplay/views/projectViews";


const projectCoreView = {

    buildView: (state: IState): VNode | null => {

        if (state.displayType !== DisplayType.Project) {
            
            return null;
        }

        const view: VNode =

            h("div", { id: "projectCoreView" }, [
                h("div",
                    {
                        id: "projectCore",
                        class: { filter: blur }
                    },
                    [
                        backgroundView.buildView(state)
                        ,
                        buttonsView.buildView(state)
                        ,
                        headerView.buildView(state)
                        ,
                        projectViews.buildView(state)
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

export default projectCoreView;


