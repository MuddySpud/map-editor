import IState from "../../../../../interfaces/state/IState";
import ILensUI from "../../../../../interfaces/state/ui/UIs/ILensUI";
import gStateCode from "../../../../../global/code/gStateCode";
import INode from "../../../../../interfaces/state/tree/INode";
import ISearchCase from "../../../../../interfaces/state/Search/ISearchCase";
import { ActionType } from "../../../../../interfaces/enums/ActionType";
import U from "../../../../../global/gUtilities";
import gSocketCode from "../../../../../global/code/gSocketCode";
import IOptionSelect from "../../../../../interfaces/state/ui/payloads/IOptionSelect";
import { SelectCommands } from "../../../../../interfaces/enums/SelectCommands";
import INodeBase from "../../../../../interfaces/state/tree/INodeBase";
import ISubtreeSys from "../../../../../interfaces/state/tree/ISubtreeSys";
import gOptionCode from "../../../../../global/code/gOptionCode";
import IStSocket from "../../../../../interfaces/state/tree/IStSocket";
import ISubtreeSearchCase from "../../../../../interfaces/state/ui/payloads/ISubtreeSearchCase";


const subtreeActions = {

    editTree: (state: IState): IState => {

        if (!state
            || !state.lens.nodeTab.lensNode) {

            return state;
        }

        state.lens.nodeTab.lensNode.ui.forceSetTree = true;
        state.lens.nodeTab.lensNode.ui.forceSetSubtree = false;

        return gStateCode.cloneState(state);;
    },

    editSubtree: (state: IState): IState => {

        if (!state
            || !state.lens.nodeTab.lensNode) {

            return state;
        }

        state.lens.nodeTab.lensNode.ui.forceSetTree = false;
        state.lens.nodeTab.lensNode.ui.forceSetSubtree = true;

        return gStateCode.cloneState(state);;
    },

    viewSearchSubtrees: (state: IState): IState => {

        if (!state
            || !state.lens.nodeTab.lensNode) {

            return state;
        }

        state.lens.nodeTab.lensNode.ui.forceSetSelect = false;
        state.lens.nodeTab.lensNode.ui.forceSetLinks = false;
        state.lens.nodeTab.lensNode.ui.forceSetSearch = true;

        return gStateCode.cloneState(state);;
    },

    viewSelectSubtree: (state: IState): IState => {

        if (!state
            || !state.lens.nodeTab.lensNode) {

            return state;
        }

        state.lens.nodeTab.lensNode.ui.forceSetSearch = false;
        state.lens.nodeTab.lensNode.ui.forceSetLinks = false;
        state.lens.nodeTab.lensNode.ui.forceSetSelect = true;

        return gStateCode.cloneState(state);;
    },

    toggleMinimiseSubtreeSearchCase: (
        state: IState,
        subtreeSearchCase: ISubtreeSearchCase): IState => {

        if (!state
            || !subtreeSearchCase) {

            return state;
        }

        subtreeSearchCase.subtree.ui.minimise = subtreeSearchCase.subtree.ui.minimise === false;

        if (subtreeSearchCase.searchCase !== null
            && subtreeSearchCase.searchCase.brief !== null) {

            subtreeSearchCase.searchCase.brief.subtreeResults.selectedExpanded =
                subtreeSearchCase.searchCase.brief?.subtreeResults.selectedExpanded === false;
        }

        return gStateCode.cloneState(state);
    },

    linkAndPlugs: (
        state: IState,
        searchCase: ISearchCase): IState => {

        if (!state
            || !searchCase
            || !searchCase.brief
            || !state.lens.nodeTab.lensNode) {

            return state;
        }

        state.lens.nodeTab.stageBehaviour.nextStage(state);
        state.lens.nodeTab.stageBehaviour.resetMax();
        const lensNode: INode<ILensUI> = state.lens.nodeTab.lensNode as INode<ILensUI>;
        const selectedIndex: number = searchCase.brief.subtreeResults.selectedIndex;
        lensNode.link = searchCase.brief.subtreeResults.results[selectedIndex];
        lensNode.action = ActionType.CreateSubtreeLink;
        gSocketCode.loadSocketsIntoLensNode(state);

        if (U.isNullOrWhiteSpace(lensNode.discussion) === true) {

            lensNode.discussion = `${lensNode.link.tree.name}`;
        }

        return gStateCode.cloneState(state);
    },

    confirmPlugs: (state: IState): IState => {

        // This is called after all the existing sockets have had decisions made
        // The link button then becomes enabled
        // Clicking that button leads here
        if (!state
            || !state.lens.nodeTab.lensNode
            || !state.lens.nodeTab.lensNode.link) {

            return state;
        }

        state.lens.nodeTab.stageBehaviour.nextStage(state);
        state.lens.nodeTab.stageBehaviour.resetMax();
        const lensNode: INode<ILensUI> = state.lens.nodeTab.lensNode as INode<ILensUI>;
        const subtree = lensNode.link as ISubtreeSys;

        subtree.stSockets.forEach((stSocket: IStSocket) => {

            if (stSocket.ui.selected === false) {

                gSocketCode.addPlugToLensNode(
                    state,
                    stSocket);
            }
        });

        gOptionCode.setOptionOrders(state);
        gSocketCode.validateSockets(state);

        return gStateCode.cloneState(state);
    },

    createPlug: (
        state: IState,
        optionSelect: IOptionSelect): IState => {

        if (!state
            || !state.lens.nodeTab.lensNode
            || !state.lens.nodeTab.lensNode.link) {

            return state;
        }

        const lensNode: INode<ILensUI> = state.lens.nodeTab.lensNode as INode<ILensUI>;
        const option: INodeBase = optionSelect.option;
        const selectedIndex: number = optionSelect.select.selectedIndex;
        const selectedValue: string = optionSelect.select.options[selectedIndex].value;
        const stSockets: Array<IStSocket> = state.lens.nodeTab.lensNode.link.stSockets;

        if (option.plug) {
            // Remove current plug as it will be replaced
            option.plug.ui.selected = false;
            option.plug = null;
            option.isPlug = false;
        }

        if (selectedValue === `${SelectCommands.Select}`) {

            option.plug = null;
            option.isPlug = false;
            option.action = ActionType.None;
        }
        else if (selectedValue === `${SelectCommands.Delete}`) {

            option.plug = null;
            option.isPlug = false;
            option.action = ActionType.DeletePlug;
        }
        else {
            const stSocket: IStSocket | undefined = stSockets.find(n => n.key === selectedValue);
            option.action = ActionType.UpdatePlug;

            if (stSocket) {

                option.plug = stSocket;
                stSocket.ui.selected = true;
                option.isPlug = true;
            }
        }

        // Need to check if there are any more sockets available, otherwise mark the remaining as deleted.
        const unselectedSocket = stSockets.find(n => n.ui.selected === false);

        if (!unselectedSocket) {

            lensNode.nodes.forEach((option: INodeBase) => {

                if (!option.plug) {

                    option.action = ActionType.DeletePlug;
                }
            });
        }

        return gStateCode.cloneState(state);
    }
};

export default subtreeActions;


