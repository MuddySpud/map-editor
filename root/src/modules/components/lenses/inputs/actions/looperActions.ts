import IState from "../../../../interfaces/state/IState";
import gStateCode from "../../../../global/code/gStateCode";
import INodeBaseElement from "../../../../interfaces/state/ui/payloads/INodeBaseElement";
import INode from "../../../../interfaces/state/tree/INode";
import ILensUI from "../../../../interfaces/state/ui/UIs/ILensUI";
import gLooperCode from "../../../../global/code/gLooperCode";


const looperActions = {

    setLoopRepeatText: (
        state: IState,
        payload: INodeBaseElement): IState => {

        if (!state
            || !state.lens.nodeTab.lensNode
            || !payload.element) {

            return state;
        }

        const textarea: HTMLTextAreaElement = payload.element as HTMLTextAreaElement;
        const lensNode: INode<ILensUI> = state.lens.nodeTab.lensNode;
        lensNode.ui.raw = false;
        lensNode.looper.loopRepeatText = `${textarea.value}`;

        return gStateCode.cloneState(state);
    },

    setLoopEndText: (
        state: IState,
        payload: INodeBaseElement): IState => {

        if (!state
            || !state.lens.nodeTab.lensNode
            || !payload.element) {

            return state;
        }

        const textarea: HTMLTextAreaElement = payload.element as HTMLTextAreaElement;
        const lensNode: INode<ILensUI> = state.lens.nodeTab.lensNode;
        const option: INode<ILensUI> | null = gLooperCode.getLoopHoleOption(lensNode);

        if(option) {

            lensNode.ui.raw = false;
            option.option = textarea.value
        }

        return gStateCode.cloneState(state);
    }
};

export default looperActions;


