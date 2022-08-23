import IState from "../../interfaces/state/IState";
import INode from "../../interfaces/state/tree/INode";
import IBranchUI from "../../interfaces/state/ui/UIs/IBranchUI";
import ILensUI from "../../interfaces/state/ui/UIs/ILensUI";
import gStateCode from "../code/gStateCode";
import INodeAlts from "../../interfaces/state/tree/INodeAlts";
import NodeAlts from "../../state/tree/NodeAlts";
import U from "../gUtilities";
import IKeyValuePair from "../../interfaces/state/tree/IKeyValuePair";
import KeyValuePair from "../../state/tree/KeyValuePair";


const gNodeAltsActions = {

    overWriteNodeAlts: (
        state: IState,
        response: any): IState => {

        if (!response?.jsonData) {

            return state;
        }

        state.lens.nodeTab.saveLock = false;

        const rawNodeAlts: any = response.jsonData;
        const lensNode: INode<ILensUI> = state.lens.nodeTab.lensNode as INode<ILensUI>;
        const selected: INode<IBranchUI> = state.branchesState.selected as INode<IBranchUI>;

        // Check we are loading alts into the right node
        if (!selected
            || selected.token !== rawNodeAlts.token
            || selected.key !== rawNodeAlts.nodeKey) {

            return state;
        }

        const nodeAlts: INodeAlts = new NodeAlts();
        const alts: Array<IKeyValuePair> = new Array<IKeyValuePair>();
        let alt: IKeyValuePair;

        if (rawNodeAlts.alts) {

            for (let i = 0; i < rawNodeAlts.alts.length; i++) {

                alt = new KeyValuePair(
                    gStateCode.getFreshKey(state),
                    rawNodeAlts.alts[i]
                );

                alts.push(alt);
            }
        }

        if (alts.length === 0) {

            alts.push(
                new KeyValuePair(
                    gStateCode.getFreshKey(state),
                    ""
                ));
        }

        nodeAlts.key = U.isNullOrWhiteSpace(rawNodeAlts.key) === true ? "-1" : rawNodeAlts.key;
        nodeAlts.r = U.isNullOrWhiteSpace(rawNodeAlts.key) === true ? "-1" : rawNodeAlts.r;
        nodeAlts.alts = alts;

        selected.case.alts = nodeAlts

        if (lensNode
            && lensNode.token === rawNodeAlts.token
            && lensNode.key === rawNodeAlts.nodeKey) {

            lensNode.case.alts = nodeAlts
        }

        return gStateCode.cloneState(state);
    }
};

export default gNodeAltsActions;
