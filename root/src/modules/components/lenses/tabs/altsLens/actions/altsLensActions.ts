import IState from "../../../../../interfaces/state/IState";
import IStateAnyArray from "../../../../../interfaces/state/IStateAnyArray";
import IBranchUI from "../../../../../interfaces/state/ui/UIs/IBranchUI";
import ILensUI from "../../../../../interfaces/state/ui/UIs/ILensUI";
import gStateCode from "../../../../../global/code/gStateCode";
import altsLensEffects from "../effects/altsLensEffects";
import IKeyValuePair from "../../../../../interfaces/state/tree/IKeyValuePair";
import KeyValuePair from "../../../../../state/tree/KeyValuePair";
import INodeAlts from "../../../../../interfaces/state/tree/INodeAlts";
import IKeyValuePairElement from "../../../../../interfaces/state/ui/payloads/IKeyValuePairElement";
// import textareaCode from "../../../../code/html/textareaCode";
import gSession from "../../../../../global/gSession";
import U from "../../../../../global/gUtilities";
import INode from "../../../../../interfaces/state/tree/INode";
import NodeAlts from "../../../../../state/tree/NodeAlts";
import gNodeAltsCode from "../../../../../global/code/gNodeAltsCode";
import gTabCode from "../../../../../global/code/gTabCode";


const altsLensActions = {

    onSelected: (state: IState): IState => {

        if (!state
            || !state.lens.nodeTab.lensNode) {

            return state;
        }

        const lensNode: INode<ILensUI> = state.lens.nodeTab.lensNode as INode<ILensUI>;

        if (!lensNode.case.alts) {

            lensNode.case.alts = new NodeAlts();
        }

        const nodeAlts: INodeAlts = lensNode.case.alts as INodeAlts;

        if (nodeAlts.alts.length === 0) {

            nodeAlts.alts.push(new KeyValuePair(
                gStateCode.getFreshKey(state),
                ""));
        }

        if (nodeAlts.alts.length === 1
            && U.isNullOrWhiteSpace(nodeAlts.alts[0].value) === true) {

            gSession.setFocusFilter(`#alt_${nodeAlts.alts[0].key}`);
        }

        return gStateCode.cloneState(state);
    },

    save: (state: IState): IStateAnyArray => {

        if (!gTabCode.canSave(state.lens.nodeTab)) {

            gStateCode.cloneState(state);
        }

        state.lens.nodeTab.saveLock = true;

        return [
            gStateCode.cloneState(state),
            altsLensEffects.saveAlts(state)
        ];
    },

    cancel: (state: IState): IState => {

        if (!state
            || !state.lens.nodeTab.lensNode) {

            return state;
        }

        const selected: INode<IBranchUI> = state.branchesState.selected as INode<IBranchUI>;
        const lensNode: INode<ILensUI> = state.lens.nodeTab.lensNode as INode<ILensUI>;

        if (selected.key !== lensNode.key
            || selected.token !== lensNode.token) {
                
                throw new Error("Selected and lensNode don't match");
        }

        lensNode.case.alts = gNodeAltsCode.cloneNodeAlts(selected.case.alts);

        return gStateCode.cloneState(state);
    },

    addAlt: (state: IState): IState => {

        if (!state
            || !state.lens.nodeTab.lensNode
            || !state.lens.nodeTab.lensNode.case.alts) {

            return state;
        }

        const lensNode: INode<ILensUI> = state.lens.nodeTab.lensNode as INode<ILensUI>;
        const nodeAlts: INodeAlts = lensNode.case.alts as INodeAlts;

        const alt: IKeyValuePair = new KeyValuePair(
            gStateCode.getFreshKey(state),
            "");

        nodeAlts.alts.push(alt);
        gSession.setFocusFilter(`#alt_${alt.key}`);

        return gStateCode.cloneState(state);
    },

    deleteAlt: (
        state: IState,
        alt: IKeyValuePair): IState => {

        if (!state
            || !state.lens.nodeTab.lensNode
            || !state.lens.nodeTab.lensNode.case.alts) {

            return state;
        }

        const lensNode: INode<ILensUI> = state.lens.nodeTab.lensNode as INode<ILensUI>;
        const nodeAlts: INodeAlts = lensNode.case.alts as INodeAlts;
        const alts: Array<IKeyValuePair> = nodeAlts.alts;
        let index: number = -1;

        for (let i = 0; i < alts.length; i++) {

            if (alts[i].key === alt.key) {

                index = i;

                break;
            }
        }

        if (index > -1) {
            alts.splice(index, 1);
        }

        return gStateCode.cloneState(state);
    },

    setAltText: (
        state: IState,
        payload: IKeyValuePairElement): IState => {

        const textarea: HTMLTextAreaElement = payload.element as HTMLTextAreaElement;
        const alt: IKeyValuePair = payload.keyValuePair;
        alt.value = textarea.value;

        // textareaCode.setTextAreaHeight(textarea);

        return gStateCode.cloneState(state);
    },

    updateAlts: (
        state: IState,
        payload: IKeyValuePairElement): IState => {

        const textarea: HTMLTextAreaElement = payload.element as HTMLTextAreaElement;
        const alt: IKeyValuePair = payload.keyValuePair;
        alt.value = textarea.value;

        // textareaCode.setTextAreaHeight(textarea);

        return gStateCode.cloneState(state);
    }
}

export default altsLensActions;

