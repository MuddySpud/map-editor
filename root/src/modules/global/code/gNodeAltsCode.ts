import INodeAlts from "../../interfaces/state/tree/INodeAlts";
import NodeAlts from "../../state/tree/NodeAlts";
import IState from "../../interfaces/state/IState";
import IBranchUI from "../../interfaces/state/ui/UIs/IBranchUI";
import ILensUI from "../../interfaces/state/ui/UIs/ILensUI";
import INode from "../../interfaces/state/tree/INode";
import IKeyValuePair from "../../interfaces/state/tree/IKeyValuePair";
import { ActionType } from "../../interfaces/enums/ActionType";
import gTreesStateCode from "./gTreesStateCode";


const gNodeAltsCode = {

    getNodeAltsRequestBody: (
        state: IState,
        nodeKey: string): { body: any, callID: string } => {

        const callID: string = gTreesStateCode.registerNodeDataRequest(
            'Get node alts',
            state,
            state.branchesState.tree.key as string,
            ActionType.GetNodeAlts,
            nodeKey
        );

        const body: any = {

            key: nodeKey,
            token: state.branchesState.tree.token,
            action: ActionType.GetNodeAlts
        };

        return {
            body,
            callID
        };
    },

    cloneNodeAlts: (nodeAlts: INodeAlts | null): INodeAlts | null => {

        if (!nodeAlts) {
            return null;
        }

        const copy: INodeAlts = new NodeAlts();
        copy.key = nodeAlts.key;
        copy.r = nodeAlts.r;
        copy.alts = [...nodeAlts.alts];

        return copy;
    },

    isLensAltsDirty: (state: IState): boolean => {

        if (!state
            || !state.lens.nodeTab.lensNode
            || !state.lens.nodeTab.lensNode.case.alts) {

            return false;
        }

        // If lens stuff exists then selected must exist
        // If lens alts exists but selected alts doesn't then dirty
        if (!state.branchesState.selected
            || !state.branchesState.selected.case.alts) {

            return true;
        }

        const lensNode: INode<ILensUI> = state.lens.nodeTab.lensNode as INode<ILensUI>;
        const lensNodeAlts: INodeAlts = lensNode.case.alts as INodeAlts;
        const lensNodeALTs: Array<IKeyValuePair> = lensNodeAlts.alts as Array<IKeyValuePair>;

        const selectedNode: INode<IBranchUI> = state.branchesState.selected as INode<IBranchUI>;
        const selectedNodeAlts: INodeAlts = selectedNode.case.alts as INodeAlts;
        const selectedNodeALTs: Array<IKeyValuePair> = selectedNodeAlts.alts as Array<IKeyValuePair>;

        if (lensNodeALTs.length !== selectedNodeAlts.alts.length) {
            return true;
        }

        for (let i = 0; i < lensNodeALTs.length; i++) {

            if (lensNodeALTs[i].value !== selectedNodeALTs[i].value) {
                return true;
            }
        }

        return false;
    },
    
    validateTab: (state: IState): boolean => {

        const valid: boolean = gNodeAltsCode.isLensAltsDirty(state);
        state.lens.nodeTab.enableSave = valid;

        return valid;
    }
};

export default gNodeAltsCode;

