import { VNode } from "hyperapp-local";

import IState from "../../../../interfaces/state/IState";
import ILens from "../../../../interfaces/state/ui/ILens";
import { TabType } from "../../../../interfaces/enums/TabType";
import settingsMasterViews from "../../tabs/settingsLens/views/master/settingsMasterViews";
import viewSettingsMasterViews from "../../tabs/viewSettingsLens/views/master/viewSettingsMasterViews";
import altsMasterViews from "../../tabs/altsLens/views/masters/altsMasterViews";
import nodeLensViews from "../../tabs/nodeLens/views/nodeLensViews";
import treeMasterViews from "../../tabs/treeLens/views/treeMasterViews";
import filterLensViews from "../../tabs/filterLens/views/master/filterMasterViews";
import searchLensViews from "../../tabs/searchLens/views/master/searchMasterViews";
import notificationMasterViews from "../../tabs/notificationLens/views/master/notificationMasterViews";
import validationMasterViews from "../../tabs/validationLens/views/master/validationMasterViews";
import spreadLensViews from "../../tabs/spreadLens/views/master/spreadMasterViews";
import shapeMasterViews from "../../tabs/shapeLens/views/master/shapeMasterViews";
import historyMasterViews from "../../tabs/historyLens/views/master/historyMasterViews";
import tagMasterViews from "../../tabs/tagsLens/views/master/tagMasterViews";
import ILensMasterView from "../../../../interfaces/views/ILensMasterView";
import IStageBehaviour from "../../../../interfaces/behaviours/IStageBehaviour";
import botMasterViews from "../../tabs/botLens/views/botMasterViews";


const childLensSelector = {

    getChildLensView: (state: IState): VNode | null => {

        const lens: ILens = state.lens;
        const viewBuilder: ILensMasterView = childLensSelector.getViewBuilder(lens);

        return viewBuilder.buildLensView(state);
    },

    getStageBehaviour: (state: IState): IStageBehaviour => {

        const lens: ILens = state.lens;
        const viewBuilder: ILensMasterView = childLensSelector.getViewBuilder(lens);

        return viewBuilder.getStageBehaviour(state);
    },

    getViewBuilder: (lens: ILens): ILensMasterView => {

        const selectedTab: TabType = lens.selectedTab;

        if (selectedTab === TabType.Tree) {

            return treeMasterViews;
        }
        else if (selectedTab === TabType.Node) {

            return nodeLensViews;
        }
        else if (selectedTab === TabType.Bot) {

            return botMasterViews;
        }
        else if (selectedTab === TabType.Settings) {

            return settingsMasterViews;
        }
        else if (selectedTab === TabType.UserViews) {

            return viewSettingsMasterViews;
        }
        else if (selectedTab === TabType.Alts) {

            return altsMasterViews;
        }
        else if (selectedTab === TabType.Search) {

            return searchLensViews;
        }
        else if (selectedTab === TabType.Filter) {

            return filterLensViews;
        }
        else if (selectedTab === TabType.Validation) {

            return validationMasterViews;
        }
        else if (selectedTab === TabType.Spread) {

            return spreadLensViews;
        }
        else if (selectedTab === TabType.Shape) {

            return shapeMasterViews;
        }
        else if (selectedTab === TabType.History) {

            return historyMasterViews;
        }
        else if (selectedTab === TabType.Tags) {

            return tagMasterViews;
        }
        else if (selectedTab === TabType.Alerts) {

            return notificationMasterViews;
        }
        else if (lens.warning
            && lens.warning.tab.type === TabType.Filter) {

            return filterLensViews;
        }

        throw new Error(`The TabType has not been built yet.`)
    }
};

export default childLensSelector;