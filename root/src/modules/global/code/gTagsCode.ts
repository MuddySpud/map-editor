import IState from "../../interfaces/state/IState";
import { TabType } from "../../interfaces/enums/TabType";
import gLensCode from "./gLensCode";
import gTreesStateCode from "./gTreesStateCode";
import { ActionType } from "../../interfaces/enums/ActionType";
import IPaginationDetails from "../../interfaces/state/ui/payloads/IPaginationDetails";
import ITreeSys from "../../interfaces/state/tree/ITreeSys";
import TagsCase from "../../state/cases/TagsCase";
import ITagsCase from "../../interfaces/state/cases/ITagsCase";
import gTreeCode from "./gTreeCode";
import gTabCode from "./gTabCode";


const gTagsCode = {

    getTree: (
        kin: Array<ITreeSys>,
        selectedKey: string): ITreeSys | null => {

        const tree: ITreeSys | undefined = kin.find((tree: ITreeSys) => {

            return tree.key === selectedKey;
        });

        if (tree) {

            return tree;
        }

        return null;
    },

    loadTagsCase: (
        rawKin: any[],
        tagsCase: ITagsCase): void => {

        if (!rawKin
            || rawKin.length === 0) {
            return;
        }

        tagsCase.kin = gTreeCode.loadTrees(rawKin);
    },

    clearTagsTab: (state: IState): void => {

        state.lens.tagsTab.display = false;
        state.lens.tagsTab.stageBehaviour.clear();
        state.lens.tagsTab.tagsCase = null;
    },

    showTagsTab: (state: IState): void => {

        state.lens.tagsTab.display = true;
        gLensCode.maximiseLens(state) === true;
    },

    showSelectedTagsTab: (state: IState): void => {

        gTagsCode.showTagsTab(state);

        gTabCode.setSelectedTab(
            state,
            TabType.Tags
        );
    },

    getLoadTreeTagsRequestBody: (state: IState): any => {

        if (!state.lens.tagsTab.tagsCase) {

            state.lens.tagsTab.tagsCase = new TagsCase(state.settings.defaultDataBatchSize);
        }

        const lensTree: ITreeSys = state.lens.treeTab.lensTree as ITreeSys;
        const paginationDetails: IPaginationDetails = state.lens.tagsTab.tagsCase.paginationDetails;
        const treeKey = lensTree.key as string;

        const callID: string = gTreesStateCode.registerTreeDataRequest(
            'Get tags',
            state,
            treeKey,
            ActionType.GetTreeKin
        );

        const body: any = {

            start: paginationDetails.start,
            batchSize: paginationDetails.count,
            key: treeKey,
            action: ActionType.GetTreeKin
        };

        return {
            body,
            callID
        };
    }
};

export default gTagsCode;

