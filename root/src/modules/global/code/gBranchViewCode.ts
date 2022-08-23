import IState from "../../interfaces/state/IState";
import { ActionType } from "../../interfaces/enums/ActionType";
import gTreesStateCode from "./gTreesStateCode";


const gBranchViewCode = {

    getBranchViewFromStartRequestBody: (
        state: IState,
        nodeKey: string): { body: any, callID: string } => {

        const callID: string = gTreesStateCode.registerNodeDataRequest(
            'BranchView from start',
            state,
            state.branchesState.tree.key as string,
            ActionType.GetBranchViewFromStart,
            nodeKey
        );

        const body: any = {

            key: nodeKey,
            token: state.branchesState.tree.token,
            action: ActionType.GetBranchViewFromStart
        };

        return {
            body,
            callID
        };
    },

    getBranchViewFromMidRequestBody: (
        state: IState,
        nodeKey: string): { body: any, callID: string } => {

        const callID: string = gTreesStateCode.registerNodeDataRequest(
            'BranchView from mid',
            state,
            state.branchesState.tree.key as string,
            ActionType.GetBranchViewFromMid,
            nodeKey
        );

        const body: any = {

            key: nodeKey,
            token: state.branchesState.tree.token,
            action: ActionType.GetBranchViewFromMid
        };

        return {
            body,
            callID
        };
    },

    getBranchViewFromEndRequestBody: (
        state: IState,
        treeToken: string,
        nodeKey: string): { body: any, callID: string } => {

        const callID: string = gTreesStateCode.registerNodeDataRequest(
            'BranchView from end',
            state,
            state.branchesState.tree.key as string,
            ActionType.GetBranchViewFromEnd,
            nodeKey
        );

        const body: any = {

            key: nodeKey,
            token: treeToken,
            action: ActionType.GetBranchViewFromEnd
        };

        return {
            body,
            callID
        };
    }
};

export default gBranchViewCode;

