import ITabSave from "../../interfaces/state/ui/tabs/ITabSave";
import IState from "../../interfaces/state/IState";
import { TabType } from "../../interfaces/enums/TabType";
import gTreeCode from "./gTreeCode";
import INode from "../../interfaces/state/tree/INode";
import ILensUI from "../../interfaces/state/ui/UIs/ILensUI";
import { ActionType } from "../../interfaces/enums/ActionType";


const gTabCode = {

    getTabs: (state: IState): Array<TabType> => {

        let tabs: Array<TabType> = new Array<TabType>();

        if (state.lens.treeTab.display) {

            tabs.push(TabType.Tree);
        }

        if (state.lens.nodeTab.lensNode) {

            const lensNode: INode<ILensUI> = state.lens.nodeTab.lensNode as INode<ILensUI>;

            if (lensNode.action === ActionType.CreateNode
                || lensNode.action === ActionType.DeleteNode
                || lensNode.action === ActionType.UpdateNode
                || lensNode.action === ActionType.CreateSubtreeLink
                || lensNode.action === ActionType.CreateSubtreeAndLink
                || lensNode.action === ActionType.UpdateSubtreeLink) {

                tabs.push(TabType.Node);
            }

            if (lensNode.isEntry) {

                tabs.push(TabType.Alts);
            }
        }
        else if (state.lens.nodeTab.lensBranchTask) {

            tabs.push(TabType.Node);
        }
        else if (state.lens.nodeTab.lensBranchTreeTask) {

            tabs.push(TabType.Node);
        }
        else if (state.lens.nodeTab.lensSocketTask) {

            tabs.push(TabType.Node);
        }

        if (state.lens.botTab.display) {

            tabs.push(TabType.Bot);
        }

        if (state.lens.validationsTab.display) {

            tabs.push(TabType.Validation);
        }

        if (state.lens.spreadTab.display) {

            tabs.push(TabType.Spread);
        }

        if (state.lens.shapeTab.display) {

            tabs.push(TabType.Shape);
        }

        if (state.lens.tagsTab.display) {

            tabs.push(TabType.Tags);
        }

        if (state.lens.historyTab.display) {

            tabs.push(TabType.History);
        }

        if (state.lens.searchTab.lensSearch.brief) {

            tabs.push(TabType.Search);
        }

        if (state.lens.filterTab.liveSearch.brief) {

            tabs.push(TabType.Filter);
        }

        if (state.lens.viewSettingsTab.lensViewSettings) {

            tabs.push(TabType.UserViews);
        }

        if (state.lens.settingsTab.lensSettings) {

            tabs.push(TabType.Settings);
        }

        if (state.lens.notificationsTab.notificationsCase) {

            tabs.push(TabType.Alerts);
        }

        if (tabs.length === 0) {

            gTabCode.setSelectedTab(
                state,
                TabType.None);

            return tabs;
        }

        if (!tabs.includes(state.lens.selectedTab)) {

            gTabCode.setSelectedTab(
                state,
                tabs[0]);
        }

        return tabs;
    },

    canSave: (tab: ITabSave): boolean => {

        return tab.enableSave === true
            && tab.saveLock === false;
    },

    canDelete: (
        state: IState,
        tab: ITabSave): boolean => {

        if (tab.type === TabType.Node) {

            if (state.lens.nodeTab.lensNode?.isRoot === true){

                return false;
            }
            else if (state.lens.nodeTab.lensNode?.isStashRoot === true){

                return false;
            }
        }

        return true;
    },

    getTabSave: (
        state: IState,
        tabType: TabType): ITabSave | null => {

        if (tabType === TabType.Tree) {

            return state.lens.treeTab;
        }
        else if (tabType === TabType.Node) {

            return state.lens.nodeTab;
        }
        else if (tabType === TabType.Bot) {

            return state.lens.botTab;
        }
        else if (tabType === TabType.Settings) {

            return state.lens.settingsTab;
        }
        else if (tabType === TabType.UserViews) {

            return state.lens.viewSettingsTab;
        }
        else if (tabType === TabType.Search) {

            return state.lens.searchTab;
        }
        else if (tabType === TabType.Filter) {

            return state.lens.filterTab;
        }

        return null;
    },

    getSelectedTabSave: (state: IState): ITabSave | null => {

        const selectedTab: TabType = state.lens.selectedTab;

        return gTabCode.getTabSave(
            state,
            selectedTab
        );
    },

    setSelectedTab: (
        state: IState,
        tab: TabType): void => {

        if (tab === TabType.Tree) {

            gTreeCode.onSelectTreeTab(state);
        }

        state.lens.selectedTab = tab;
    }
};

export default gTabCode;

