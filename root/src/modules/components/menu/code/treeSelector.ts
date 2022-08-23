import IState from "../../../interfaces/state/IState";
import { TabType } from "../../../interfaces/enums/TabType";
import ITreeIcon from "../../../interfaces/state/tree/ITreeIcon";
import TreeIcon from "../../../state/tree/TreeIcon";


const treeSelector = {

    getTree: (state: IState): ITreeIcon | null => {

        const selectedTab: TabType = state.lens.selectedTab;

        if (selectedTab === TabType.Tree) {

            return TreeIcon.buildTreeIconFromTreeSys(state.lens.treeTab.lensTree);;
        }
        else if (selectedTab === TabType.Node) {

            return TreeIcon.buildTreeIconFromTree(state.branchesState.tree);;
        }
        else if (selectedTab === TabType.Settings) {

            return null;
        }
        else if (selectedTab === TabType.UserViews) {

            return TreeIcon.buildTreeIconFromTreeSys(state.lens.treeTab.lensTree);;
        }
        else if (selectedTab === TabType.Alts) {

            return TreeIcon.buildTreeIconFromTree(state.branchesState.tree);;
        }
        else if (selectedTab === TabType.Search) {

            return TreeIcon.buildTreeIconFromTree(state.branchesState.tree);;
        }
        else if (selectedTab === TabType.Filter) {

            return TreeIcon.buildTreeIconFromTreeSys(state.lens.treeTab.lensTree);;
        }
        else if (selectedTab === TabType.Validation) {

            return TreeIcon.buildTreeIconFromTreeSys(state.lens.treeTab.lensTree);;
        }
        else if (selectedTab === TabType.Spread) {

            return TreeIcon.buildTreeIconFromTreeSys(state.lens.treeTab.lensTree);;
        }
        else if (selectedTab === TabType.Shape) {

            return TreeIcon.buildTreeIconFromTreeSys(state.lens.treeTab.lensTree);;
        }
        else if (selectedTab === TabType.History) {

            return TreeIcon.buildTreeIconFromTreeSys(state.lens.treeTab.lensTree);;
        }
        else if (selectedTab === TabType.Tags) {

            return TreeIcon.buildTreeIconFromTreeSys(state.lens.treeTab.lensTree);;
        }
        else if (selectedTab === TabType.Alerts) {

            return null;
        }

        return null;
    }
};

export default treeSelector;