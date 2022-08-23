import IState from "../../../../../interfaces/state/IState";
import gStateCode from "../../../../../global/code/gStateCode";
import gSession from "../../../../../global/gSession";
import Filters from "../../../../../state/constants/Filters";
import IOptionSocket from "../../../../../interfaces/state/ui/payloads/IOptionSocket";
import { ActionType } from "../../../../../interfaces/enums/ActionType";
import ILensUI from "../../../../../interfaces/state/ui/UIs/ILensUI";
import INode from "../../../../../interfaces/state/tree/INode";


const plugActions = {

    editPlugs: (state: IState): IState => {

        if (!state
            || !state.lens.nodeTab.lensNode) {

            return state;
        }
        
        state.lens.nodeTab.lensNode.ui.forceSetSearch = false;
        state.lens.nodeTab.lensNode.ui.forceSetSelect = false;
        state.lens.nodeTab.lensNode.ui.forceSetLinks = true;

        return gStateCode.cloneState(state);;
    },

    showSockets: (
        state: IState,
        option: INode<ILensUI>): IState => {

        if (!state
            || !option) {

            return state;
        }

        option.ui.showSockets = true;
        gSession.setFocusFilter(`#${option.ui.htmlID}${Filters.part_socketsSelectFilter}`);

        return gStateCode.cloneState(state);
    },

    hideSockets: (
        state: IState,
        option: INode<ILensUI>): IState => {

        if (!state
            || !option) {

            return state;
        }

        option.ui.showSockets = false;
        gSession.removeFocusFilter(`#${option.ui.htmlID}${Filters.part_socketsSelectFilter}`);

        return gStateCode.cloneState(state);
    },

    selectSocket: (
        state: IState,
        optionSocket: IOptionSocket): IState => {

        if (!state
            || !optionSocket) {

            return state;
        }

        const option: INode<ILensUI> = optionSocket.option;

        if (option.plug) {

            option.plug.ui.selected = false;
        }

        option.plug = optionSocket.stSocket;
        option.isPlug = true;
        option.plug.ui.selected = true;
        option.ui.showSockets = false;

        return gStateCode.cloneState(state);
    },

    clearSocket: (
        state: IState,
        option: INode<ILensUI>): IState => {

        if (!state
            || !option) {

            return state;
        }

        if (option.plug) {

            option.plug.ui.selected = false;
            option.plug = null;
            option.isPlug = false;
        }

        return gStateCode.cloneState(state);
    },

    toggleLinkToSocket: (
        state: IState,
        option: INode<ILensUI>): IState => {

        if (!state
            || !option) {

            return state;
        }

        if (option.action === ActionType.DeletePlug) {

            option.action = ActionType.UpdatePlug;
        }
        else {
            option.action = ActionType.DeletePlug;
            option.plug = null;
            option.isPlug = false;
        }

        return gStateCode.cloneState(state);
    }
};

export default plugActions;


