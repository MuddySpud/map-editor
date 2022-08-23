import IState from "../../../../../interfaces/state/IState";
import gStateCode from "../../../../../global/code/gStateCode";
import IOptionJsonElement from "../../../../../interfaces/state/ui/payloads/IOptionJsonElement";
import IConcealedOptionJson from "../interfaces/IConcealedOptionJson";


const concealedOptionActions = {

    setScript: (
        state: IState,
        payload: IOptionJsonElement): IState => {

        if (!state
            || !payload.optionJson
            || !payload.element
            || !state.lens.nodeTab?.lensNode?.ui) {

            return state;
        }

        state.lens.nodeTab.lensNode.ui.raw = false;
        const concealedOptionJson: IConcealedOptionJson = payload.optionJson as IConcealedOptionJson;
        const textarea: HTMLTextAreaElement = payload.element as HTMLTextAreaElement;
        concealedOptionJson.script = `${textarea.value}`;

        return gStateCode.cloneState(state);
    },

    setComment: (
        state: IState,
        payload: IOptionJsonElement): IState => {

        if (!state
            || !payload.optionJson
            || !payload.element
            || !state.lens.nodeTab?.lensNode?.ui) {

            return state;
        }

        state.lens.nodeTab.lensNode.ui.raw = false;
        const concealedOptionJson: IConcealedOptionJson = payload.optionJson as IConcealedOptionJson;
        const textarea: HTMLTextAreaElement = payload.element as HTMLTextAreaElement;
        concealedOptionJson.comment = `${textarea.value}`;

        return gStateCode.cloneState(state);
    }
};

export default concealedOptionActions;
