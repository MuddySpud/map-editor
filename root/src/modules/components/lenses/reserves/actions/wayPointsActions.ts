import IState from "../../../../interfaces/state/IState";
import gStateCode from "../../../../global/code/gStateCode";
import INodeBaseElement from "../../../../interfaces/state/ui/payloads/INodeBaseElement";
import INode from "../../../../interfaces/state/tree/INode";
import ILensUI from "../../../../interfaces/state/ui/UIs/ILensUI";


const wayPointsActions = {

    setDescription: (
        state: IState,
        payload: INodeBaseElement): IState => {

        if (!state
            || !state.lens.nodeTab.lensNode
            || !payload.element) {

            return state;
        }

        const textarea: HTMLTextAreaElement = payload.element as HTMLTextAreaElement;

        if (state.lens.nodeTab.lensNode) {

            const lensNode: INode<ILensUI> = state.lens.nodeTab.lensNode;

            if (lensNode.reserve.wayPoint) {

                lensNode.ui.raw = false;
                lensNode.reserve.wayPoint.description = `${textarea.value}`;
            }
        }

        return gStateCode.cloneState(state);
    },

    setTitle: (
        state: IState,
        payload: INodeBaseElement): IState => {

        if (!state
            || !state.lens.nodeTab.lensNode
            || !payload.element) {

            return state;
        }

        const textarea: HTMLTextAreaElement = payload.element as HTMLTextAreaElement;

        if (state.lens.nodeTab.lensNode) {

            const lensNode: INode<ILensUI> = state.lens.nodeTab.lensNode;

            if (lensNode.reserve.wayPoint) {

                lensNode.ui.raw = false;
                lensNode.reserve.wayPoint.title = `${textarea.value}`;
            }
        }

        return gStateCode.cloneState(state);
    }
};

export default wayPointsActions;


