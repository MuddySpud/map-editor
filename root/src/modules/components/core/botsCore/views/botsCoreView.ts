import { h, VNode } from "hyperapp-local";

import IState from "../../../../interfaces/state/IState";
import { DisplayType } from "../../../../interfaces/enums/DisplayType";
import backgroundView from "../../../background/views/backgroundView";
import lensViews from "../../../lenses/lens/views/lensViews";
import menuViews from "../../../menu/views/menuViews";
import lightBoxViews from "../../../lightBox/views/lightBoxViews";
import botsViews from "../../../displays/botsDisplay/views/botsViews";
import headerView from "../../../header/views/headerView";
import buttonsView from "../../coreButtons/views/buttonsView";
import warningViews from "../../../warning/views/warningViews";

import "../scss/index.scss";


const botsCoreView = {

    buildView: (state: IState): VNode | null => {

        if (state.displayType !== DisplayType.Bots) {
            
            return null;
        }

        const view: VNode =

            h("div", { id: "botsCoreView" }, [
                h("div",
                    {
                        id: "botCore",
                        class: { filter: blur }
                    },
                    [
                        backgroundView.buildView(state)
                        ,
                        buttonsView.buildView(state)
                        ,
                        headerView.buildView(state)
                        ,
                        botsViews.buildView(state)
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

export default botsCoreView;


