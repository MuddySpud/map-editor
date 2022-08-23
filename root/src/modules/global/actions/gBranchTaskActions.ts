import IState from "../../interfaces/state/IState";
import IStateAnyArray from "../../interfaces/state/IStateAnyArray";
import gStateCode from "../code/gStateCode";
import gNodeCode from "../code/gNodeCode";
import IBranchTask from "../../interfaces/state/tree/IBranchTask";
import { TabType } from "../../interfaces/enums/TabType";
import IStageBehaviour from "../../interfaces/behaviours/IStageBehaviour";
import gBranchesStateCode from "../code/gBranchesStateCode";
import gLensCode from "../code/gLensCode";
import gTabCode from "../code/gTabCode";
import { IHttpFetchItem } from "../../interfaces/http/IHttpFetchItem";


const gBranchTaskActions = {

    overwriteBranchTask: (
        state: IState,
        response: any): IState => {

        if (!state
            || !state.lens.nodeTab.lensBranchTask
            || !response?.jsonData) {

            return state;
        }

        const branchTask: IBranchTask = state.lens.nodeTab.lensBranchTask;

        if (response.jsonData.fromNode
            && branchTask.optionLoader.key === response.jsonData.fromNode.key
            && branchTask.optionLoader.token === response.jsonData.fromNode.token) {

            branchTask.optionLoader.node = gNodeCode.loadNode(response.jsonData.fromNode);

            if (branchTask.optionLoader.node) {

                branchTask.optionLoader.node.parent = gNodeCode.loadNode(response.jsonData.fromNode.parent);
            }
        }

        if (response.jsonData.toNode
            && branchTask.targetLoader.key === response.jsonData.toNode.key
            && branchTask.targetLoader.token === response.jsonData.toNode.token) {

            branchTask.targetLoader.node = gNodeCode.loadNode(response.jsonData.toNode);
        }

        return gStateCode.cloneState(state);
    },

    completeSelectionAndNext: (
        state: IState,
        httpFetchItem: IHttpFetchItem | undefined | null = null
    ): IStateAnyArray => {

        if (!state) {
            return state;
        }

        gTabCode.setSelectedTab(
            state,
            TabType.Node);

        gBranchesStateCode.clearLensNode(state);
        const stageBehaviour: IStageBehaviour = state.lens.nodeTab.stageBehaviour as IStageBehaviour;
        gLensCode.maximiseLens(state);

        const newState: IState = stageBehaviour.nextStage(state);

        if (httpFetchItem) {

            return [
                newState,
                httpFetchItem
            ];
        }

        return newState;
    },

    completeSelection: (state: IState): IState => {

        if (!state) {
            return gStateCode.cloneState(state);
        }

        gTabCode.setSelectedTab(
            state,
            TabType.Node);

        gBranchesStateCode.clearLensNode(state);
        gLensCode.maximiseLens(state);

        return gStateCode.cloneState(state);
    },

    showOption: (
        state: IState,
        key: string): IState => {

        if (!state) {

            return state;
        }

        gNodeCode.showNode(
            state,
            state.branchesState.tree.token as string,
            key,
            true
        );

        return gStateCode.cloneState(state);
    }
};

export default gBranchTaskActions;
