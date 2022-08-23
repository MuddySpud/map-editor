import IState from "../../interfaces/state/IState";
import { TabType } from "../../interfaces/enums/TabType";
import gLensCode from "./gLensCode";
import ITreeSys from "../../interfaces/state/tree/ITreeSys";
import IPaginationDetails from "../../interfaces/state/ui/payloads/IPaginationDetails";
import gTreesStateCode from "./gTreesStateCode";
import { ActionType } from "../../interfaces/enums/ActionType";
import HistoryCase from "../../state/cases/HistoryCase";
import IDeed from "../../interfaces/state/notifications/IDeed";
import IHistoryCase from "../../interfaces/state/cases/IHistoryCase";
import Deed from "../../state/notifications/Deed";
import gTabCode from "./gTabCode";


const gHistoryCode = {

    getDeed: (
        deeds: Array<IDeed>,
        selectedID: string): IDeed | null => {

        const deed: IDeed | undefined = deeds.find((deed: IDeed) => {
            return deed.id === selectedID;
        });

        if (deed) {
            return deed;
        }

        return null;
    },

    loadHistoryCase: (
        rawHistory: any[],
        historyCase: IHistoryCase): void => {

        if (!rawHistory
            || rawHistory.length === 0) {
            return;
        }

        historyCase.deeds = [];
        let deed: IDeed | null;

        rawHistory.forEach((value: any) => {

            deed = gHistoryCode.loadDeed(value);

            if (deed) {
                historyCase.deeds.push(deed);
            }
        });
    },

    loadDeed: (rawDeed: any): IDeed | null => {

        if (!rawDeed) {
            return null;
        }

        let deed: IDeed = new Deed();
        deed.id = rawDeed.id;
        deed.itemKey = rawDeed.itemKey;
        deed.itemToken = rawDeed.itemToken;
        deed.action = rawDeed.action;
        deed.created = rawDeed.created;
        deed.url = rawDeed.url;
        deed.body = rawDeed.body;

        return deed;
    },

    clearHistoryTab: (state: IState): void => {

        state.lens.historyTab.display = false;
        state.lens.historyTab.stageBehaviour.clear();
        state.lens.historyTab.historyCase = null;
    },

    showHistoryTab: (state: IState): void => {

        state.lens.historyTab.display = true;
        gLensCode.maximiseLens(state) === true;
    },

    showSelectedHistoryTab: (state: IState): void => {

        gHistoryCode.showHistoryTab(state);

        gTabCode.setSelectedTab(
            state,
            TabType.History);
    },

    getTreeHistoryRequestBody: (state: IState): { body: any, callID: string } => {

        if (!state.lens.historyTab.historyCase) {

            state.lens.historyTab.historyCase = new HistoryCase(state.settings.defaultDataBatchSize);
        }

        const lensTree: ITreeSys = state.lens.treeTab.lensTree as ITreeSys;
        const paginationDetails: IPaginationDetails = state.lens.historyTab.historyCase.paginationDetails;
        const treeKey = lensTree.key as string;

        const callID: string = gTreesStateCode.registerTreeDataRequest(
            'Get history',
            state,
            treeKey,
            ActionType.GetTreeHistory
        );

        const body: any = {

            start: paginationDetails.start,
            batchSize: paginationDetails.count,
            key: treeKey,
            action: ActionType.GetTreeHistory
        };

        return {
            body,
            callID
        };
    }
};

export default gHistoryCode;

