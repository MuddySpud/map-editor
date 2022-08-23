import IState from "../../interfaces/state/IState";
import ILensUI from "../../interfaces/state/ui/UIs/ILensUI";
import INode from "../../interfaces/state/tree/INode";
import U from "../gUtilities";
import ISearchCaseValue from "../../interfaces/state/ui/ISearchCaseValue";
import ISearchBrief from "../../interfaces/state/Search/ISearchBrief";
import gNodeCode from "../code/gNodeCode";
import gSearchCode from "../code/gSearchCode";
import gSession from "../gSession";
import gStateCode from "../code/gStateCode";
import ISearchCase from "../../interfaces/state/Search/ISearchCase";
import INodeBase from "../../interfaces/state/tree/INodeBase";
import { ActionType } from "../../interfaces/enums/ActionType";
import gSocketCode from "../code/gSocketCode";
import LensUI from "../../state/ui/UIs/LensUI";
import gSubtreeCode from "../code/gSubtreeCode";
import gStageCode from "../code/gStageCode";
import IBoolElement from "../../interfaces/state/ui/payloads/IBoolElement";
import ISubtreeSys from "../../interfaces/state/tree/ISubtreeSys";
import ISubtreeUI from "../../interfaces/state/ui/UIs/ISubtreeUI";
import IStSocket from "../../interfaces/state/tree/IStSocket";
import gLinkCode from "../code/gLinkCode";


const gSubtreeActions = {

    refreshSubtree: (
        state: IState,
        response: any): IState => {

        if (!state
            || !response?.jsonData) {

            return state;
        }

        let subtreeUI: ISubtreeUI | null = null;

        if (state.lens.treeTab.lensSubtree) {

            subtreeUI = state.lens.treeTab.lensSubtree.ui;
        }

        const clonedState: IState = gSubtreeActions.loadSubtree(
            state,
            response.jsonData
        );

        if (subtreeUI
            && state.lens.treeTab.lensSubtree) {

            state.lens.treeTab.lensSubtree.ui = subtreeUI;
        }

        gSubtreeCode.loadLensSubtreeRaw(
            state,
            response.jsonData
        );

        return clonedState;
    },

    loadSubtree: (
        state: IState,
        response: any): IState => {

        if (!response?.jsonData) {

            return state;
        }

        gSubtreeCode.loadLensSubtreeRaw(
            state,
            response.jsonData
        );

        return gStateCode.cloneState(state);
    },

    toggleMinimiseSubtree: (
        state: IState,
        subtree: ISubtreeSys): IState => {

        if (!state
            || !subtree) {

            return state;
        }

        subtree.ui.minimise = subtree.ui.minimise === false;

        return gStateCode.cloneState(state);
    },

    toggleMinimiseStRoot: (
        state: IState,
        subtree: ISubtreeSys): IState => {

        if (!state
            || !subtree) {

            return state;
        }

        subtree.ui.minimiseStRoot = subtree.ui.minimiseStRoot === false;

        return gStateCode.cloneState(state);
    },

    toggleMinimiseStSockets: (
        state: IState,
        subtree: ISubtreeSys): IState => {

        if (!state
            || !subtree) {

            return state;
        }

        subtree.ui.minimiseStSockets = subtree.ui.minimiseStSockets === false;

        return gStateCode.cloneState(state);
    },

    toggleMinimiseStSocket: (
        state: IState,
        stSocket: IStSocket): IState => {

        if (!state
            || !stSocket) {

            return state;
        }

        stSocket.ui.minimise = stSocket.ui.minimise === false;

        return gStateCode.cloneState(state);
    },

    toggleMinimiseSocketHoles: (
        state: IState,
        stSocket: IStSocket): IState => {

        if (!state
            || !stSocket) {

            return state;
        }

        stSocket.ui.minimiseHoles = stSocket.ui.minimiseHoles === false;

        return gStateCode.cloneState(state);
    },

    toggleMinimiseSubtreeFlaws: (
        state: IState,
        subtree: ISubtreeSys): IState => {

        if (!state
            || !subtree) {

            return state;
        }

        subtree.ui.minimiseFlaws = subtree.ui.minimiseFlaws === false;

        return gStateCode.cloneState(state);
    },

    toggleMinimiseSubtreeCounts: (
        state: IState,
        subtree: ISubtreeSys): IState => {

        if (!state
            || !subtree) {

            return state;
        }

        subtree.ui.minimiseCounts = subtree.ui.minimiseCounts === false;

        return gStateCode.cloneState(state);
    },

    openSubtree: (state: IState): IState => {

        if (!state
            || !state.lens.nodeTab.lensNode) {

            return state;
        }

        const lensNode: INode<ILensUI> = state.lens.nodeTab.lensNode as INode<ILensUI>;

        if (!lensNode.link
            || !lensNode.link.tree
            || U.isNullOrWhiteSpace(lensNode.link.tree.key) === true) {

            return state;
        }

        return gSubtreeActions.openSubtreeWithKey(
            state,
            lensNode.link.tree.key as string
        );
    },

    openSubtreeWithSearchCase: (
        state: IState,
        searchCaseValue: ISearchCaseValue): IState => {

        if (!state
            || !state.lens.nodeTab.lensNode) {
            return state;
        }

        if (searchCaseValue.searchCase.brief) {

            const searchBrief: ISearchBrief = searchCaseValue.searchCase.brief as ISearchBrief;
            searchBrief.cancelSelect = true;
        }

        return gSubtreeActions.openSubtreeWithKey(
            state,
            searchCaseValue.value
        );
    },

    openSubtreeWithKey: (
        state: IState,
        treeKey: string): IState => {

        if (!state) {
            return state;
        }

        const url: string = gLinkCode.buildLink(
            state,
            `author/tree/${treeKey}`
        );
        
        window.open(url, "_blank");

        return state;
    },

    loadSockets: (
        state: IState,
        response: any): IState => {

        if (!response?.jsonData) {

            return state;
        }

        gSubtreeCode.loadSocketTaskSockets(
            state,
            response.jsonData
        );

        return gStateCode.cloneState(state);
    },

    startSubtreeSwap: (state: IState): IState => {

        if (!state
            || !state.lens.nodeTab.lensNode) {

            return state;
        }

        const lensNode: INode<ILensUI> = state.lens.nodeTab.lensNode as INode<ILensUI>;
        lensNode.ui.startingPoint = gNodeCode.cloneNodeAndParentAndOptions(lensNode);
        state.lens.nodeTab.stageBehaviour = gStageCode.buildSwapSubtreeLinkStages(lensNode);

        const brief: ISearchBrief = gSearchCode.buildSubtreeSearchBrief(
            state,
            gSubtreeActions.linkToSubtree);

        if (brief.searchTerms.length === 1
            && U.isNullOrWhiteSpace(brief.searchTerms[0].text) === true) {

            gSession.setFocusFilter(`#searchText_${brief.searchTerms[0].key}`);
        }

        return gStateCode.cloneState(state);
    },

    linkToSubtree: (
        state: IState,
        searchCase: ISearchCase): IState => {

        if (!state
            || !searchCase
            || !searchCase.brief
            || !state.lens.nodeTab.lensNode) {

            return state;
        }

        const newState: IState = state.lens.nodeTab.stageBehaviour.nextStage(state);
        state.lens.nodeTab.stageBehaviour.resetMax();
        const lensNode: INode<ILensUI> = state.lens.nodeTab.lensNode as INode<ILensUI>;
        state.lens.nodeTab.lensNode.ui.raw = false;
        const selectedIndex: number = searchCase.brief.subtreeResults.selectedIndex;
        lensNode.link = searchCase.brief.subtreeResults.results[selectedIndex];

        if (U.isNullOrWhiteSpace(lensNode.discussion) === true
            && lensNode.isSocket === false) {

            lensNode.discussion = `${lensNode.link.tree.name}`;
        }

        // Clone node options but leave the Plug blank
        const nodes: Array<INodeBase> = gNodeCode.cloneNodeOptionsForUI(
            LensUI,
            lensNode.ui.startingPoint as INodeBase,
            lensNode,
            false);

        lensNode.nodes = nodes as Array<INode<ILensUI>>;
        lensNode.action = ActionType.UpdateSubtreeLink;
        gSocketCode.clearAllLinkedSockets(lensNode);

        if (lensNode.nodes.length === 0) {
            // Skip linking sockets as there are no options and go straight to save.
            gSocketCode.loadSocketsIntoLensNode(state);
        }

        if (lensNode.link
            && lensNode.link.stSockets.length === 0) {
            // Need to mark all options for deletion.
            lensNode.nodes.forEach((option: INodeBase) => {

                option.action = ActionType.DeletePlug;
            });
        }

        return newState;
    },

    linkToNewSubtree: (
        state: IState,
        payload: IBoolElement): IState => {

        if (!state
            || payload.disabled !== false) {

            return state;
        }

        const newState: IState = state.lens.nodeTab.stageBehaviour.nextStage(state);
        state.lens.nodeTab.stageBehaviour.resetMax();
        const lensNode: INode<ILensUI> | null = state.lens.nodeTab.lensNode;

        if (!lensNode
            || !lensNode.link) {

            return state;
        }

        if (U.isNullOrWhiteSpace(lensNode.discussion) === true
            && lensNode.isSocket === false) {

            lensNode.discussion = `${lensNode.link.tree.name}`;
        }

        lensNode.action = ActionType.CreateSubtreeAndLink;
        gSocketCode.loadSocketsIntoLensNode(state);

        return newState;
    }
};

export default gSubtreeActions;


