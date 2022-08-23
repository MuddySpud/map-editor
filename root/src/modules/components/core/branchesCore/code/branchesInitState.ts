import IState from "../../../../interfaces/state/IState";
import IStateAnyArray from "../../../../interfaces/state/IStateAnyArray";
import gInitEffects from "../../../../global/effects/gInitEffects";
import { DisplayType } from "../../../../interfaces/enums/DisplayType";
import gTreeEffects from "../../../../global/effects/gTreeEffects";
import { IHttpFetchItem } from "../../../../interfaces/http/IHttpFetchItem";


const prepareForInitialise = (state: IState): void => {

    state.displayType = DisplayType.Branches;
    state.loading = true;
};

const branchesInitState = {

    initialiseBranchesDisplay: (
        state: IState,
        treeKey: string): IStateAnyArray => {

        const props: IHttpFetchItem | undefined = branchesInitState.initialiseBranchesDisplayProps(
            state,
            treeKey
        );

        if (!props) {

            return state;
        }

        return [
            state,
            props
        ];
    },

    initialiseBranchesDisplayProps: (
        state: IState,
        treeKey: string): IHttpFetchItem | undefined => {

        prepareForInitialise(state);

        return gInitEffects.getBranchesInitData(
            state,
            treeKey
        );
    },

    initialiseBranchesDisplayAndShowTree: (
        state: IState,
        treeKey: string): IStateAnyArray => {

        const props: Array<IHttpFetchItem | undefined> = branchesInitState.initialiseBranchesDisplayAndShowTreeProps(
            state,
            treeKey
        );

        if (!props) {

            return state;
        }

        return [
            state,
            ...props
        ];
    },

    initialiseBranchesDisplayAndShowTreeProps: (
        state: IState,
        treeKey: string): Array<IHttpFetchItem | undefined> => {

        prepareForInitialise(state);
        state.treesState.selectedKey = treeKey;
        state.lens.treeTab.loadingKey = state.treesState.selectedKey;

        return [
            gInitEffects.getBranchesInitData(
                state,
                treeKey),
            gTreeEffects.getTreeAndShowTab(state)
        ];
    },

    initialiseFocusedBranchesDisplay: (
        state: IState,
        treeToken: string,
        nodeKey: string): IStateAnyArray => {

        const props: IHttpFetchItem | undefined = branchesInitState.initialiseFocusedBranchesDisplayProps(
            state,
            treeToken,
            nodeKey
        );

        if (!props) {

            return state;
        }

        return [
            state,
            props
        ];
    },

    initialiseFocusedBranchesDisplayProps: (
        state: IState,
        treeToken: string,
        nodeKey: string): IHttpFetchItem | undefined => {

        prepareForInitialise(state);

        return gInitEffects.getNodeInitData(
            state,
            treeToken,
            nodeKey
        );
    }
};

export default branchesInitState;

