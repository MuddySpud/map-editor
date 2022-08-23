import { h, VNode } from "hyperapp-local";

import buttonViews from "../../../../../lens/views/buttonViews";
import CssClasses from "../../../../../../../state/constants/CssClasses";
import IAlias from "../../../../../../../interfaces/state/bot/IAlias";
import botActions from "../../../actions/botActions";


const typeViews = {

    buildTypeView: (alias: IAlias): VNode => {

        const discussionView: VNode =

            h("div", { class: "type" }, [

                typeViews.buildEnabledView(alias)
            ]);

        return discussionView;
    },

    buildEnabledView: (alias: IAlias): VNode => {

        let text: string = "Enable";
        let tooltip: string = `Click to enable the bot alias`;
        let className: string = CssClasses.nope;

        if (alias.enabled === true) {

            className = CssClasses.yep;
            tooltip = `Click to disable the bot alias`;
        }

        return buttonViews.buildTypeButtonView(
            text,
            tooltip,
            className,
            botActions.toggleAliasEnabled
        );
    }
};

export default typeViews;


