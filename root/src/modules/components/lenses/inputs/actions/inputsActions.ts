import IState from "../../../../interfaces/state/IState";
import gStateCode from "../../../../global/code/gStateCode";
import INodeBaseElement from "../../../../interfaces/state/ui/payloads/INodeBaseElement";
import INode from "../../../../interfaces/state/tree/INode";
import ILensUI from "../../../../interfaces/state/ui/UIs/ILensUI";


const inputsActions = {

    setInputsJson: (
        state: IState,
        payload: INodeBaseElement): IState => {

        if (!state
            || !state.lens.nodeTab.lensNode
            || !payload.element) {

            return state;
        }

        const textarea: HTMLTextAreaElement = payload.element as HTMLTextAreaElement;
        const lensNode: INode<ILensUI> = state.lens.nodeTab.lensNode
        lensNode.ui.raw = false;
        lensNode.inputs = `${textarea.value}`;

        return gStateCode.cloneState(state);
    }
};

export default inputsActions;


