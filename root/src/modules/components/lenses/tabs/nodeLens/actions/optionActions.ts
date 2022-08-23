import IState from "../../../../../interfaces/state/IState";
import INode from "../../../../../interfaces/state/tree/INode";
import ILensUI from "../../../../../interfaces/state/ui/UIs/ILensUI";
import gStateCode from "../../../../../global/code/gStateCode";
import INodeBaseElement from "../../../../../interfaces/state/ui/payloads/INodeBaseElement";
import INodeBase from "../../../../../interfaces/state/tree/INodeBase";
import { ActionType } from "../../../../../interfaces/enums/ActionType";
import gOptionCode from "../../../../../global/code/gOptionCode";
import gSession from "../../../../../global/gSession";
import U from "../../../../../global/gUtilities";


const optionActions = {

    showOptionButtons: (
        state: IState,
        option: INode<ILensUI>): IState => {

        option.ui.showOptionButtons = true;

        return gStateCode.cloneState(state);
    },

    hideOptionButtons: (
        state: IState,
        option: INode<ILensUI>): IState => {

        option.ui.showOptionButtons = false;

        return gStateCode.cloneState(state);
    },

    addOption: (state: IState): IState => {

        const newOption: INode<ILensUI> = gOptionCode.addOptionToLensNode(state);
        gSession.setFocusFilter(`#option_${newOption.key}`);

        if (state.lens.nodeTab.lensNode) {

            state.lens.nodeTab.lensNode.ui.raw = false;
        }

        return gStateCode.cloneState(state);
    },

    deleteOption: (
        state: IState,
        option: INode<ILensUI>): IState => {

        if (state.lens.nodeTab.lensNode) {

            state.lens.nodeTab.lensNode.ui.raw = false;
        }

        if (U.isNegativeNumeric(option.key) === true) {

            const lensNode: INode<ILensUI> = state.lens.nodeTab.lensNode as INode<ILensUI>;
            const options: Array<INodeBase> = lensNode.nodes;
            let index: number = -1;

            for (let i = 0; i < options.length; i++) {

                if (options[i].key === option.key) {
                    
                    index = i;
                }
            }

            if (index > 0) {

                options.splice(index, 1);
            }
        }
        else {
            option.action = ActionType.DeleteNode;
        }

        gOptionCode.setOptionOrders(state);

        return gStateCode.cloneState(state);
    },

    setOptionText: (
        state: IState,
        payload: INodeBaseElement): IState => {

        const textarea: HTMLTextAreaElement = payload.element as HTMLTextAreaElement;
        const option: INodeBase = payload.node;
        option.option = textarea.value;

        if (state.lens.nodeTab.lensNode) {

            state.lens.nodeTab.lensNode.ui.raw = false;
        }

        state.lens.nodeTab.enableSave = true;

        return gStateCode.cloneState(state);
    }
};

export default optionActions;
