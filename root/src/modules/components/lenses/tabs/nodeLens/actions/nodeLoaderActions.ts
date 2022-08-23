import IState from "../../../../../interfaces/state/IState";
import gStateCode from "../../../../../global/code/gStateCode";
import INodeBase from "../../../../../interfaces/state/tree/INodeBase";
import U from "../../../../../global/gUtilities";
import INodeBaseElement from "../../../../../interfaces/state/ui/payloads/INodeBaseElement";
import INodeLoaderElement from "../../../../../interfaces/state/ui/payloads/INodeLoaderElement";
import INodeLoader from "../../../../../interfaces/state/tree/INodeLoader";
import IStateAnyArray from "../../../../../interfaces/state/IStateAnyArray";
import gAutoCompleteEffects from "../../../../../global/effects/gAutoCompleteEffects";
import gNodeEffects from "../../../../../global/effects/gNodeEffects";
import { LoaderType } from "../../../../../interfaces/enums/LoaderType";
import gNodeLoaderCode from "../../../../../global/code/gNodeLoaderCode";


const nodeLoaderActions = {

    setNodeBasePayloadKey: (
        state: IState,
        payload: INodeBaseElement): IState => {

        if (!state
            || !payload) {
                
            return state;
        }

        const input: HTMLInputElement = payload.element as HTMLInputElement;
        const option: INodeBase = payload.node as INodeBase;

        if (U.isNumeric(input.value) === true) {
            option.key = input.value;
        }

        return gStateCode.cloneState(state);
    },

    setNodeLoaderPayloadKey: (
        state: IState,
        payload: INodeLoaderElement): IStateAnyArray => {

        if (!state
            || !payload
            || payload.type === LoaderType.None) {

            return state;
        }

        const input: HTMLInputElement = payload.element as HTMLInputElement;
        const key: string = input.value;

        const optionLoader: INodeLoader = payload.nodeLoader as INodeLoader;

        if (U.isNumeric(key) === true) {

            optionLoader.key = key;
            optionLoader.ui.raw = false;
            optionLoader.ui.recognised = false;
        }

        // TODO RPTM!!!!!!!!!!!
        // What happens if link to a key in the current tree that has not been loaded?
        // How is it validated? 
        // Don't want to make a call everytime a char is typed in either...
        if (optionLoader.token !== state.branchesState.tree.token) {

            if (optionLoader.token !== state.lens.validationResults.nodeKey.token
                || key !== state.lens.validationResults.nodeKey.key) {

                return [
                    gStateCode.cloneState(state),
                    gNodeEffects.validateNodeKey(
                        state,
                        optionLoader.token,
                        key
                    )
                ];
            }
        }

        return gStateCode.cloneState(state);
    },

    setNodeLoaderPayloadToken: (
        state: IState,
        payload: INodeLoaderElement): IStateAnyArray => {

        if (!state
            || !payload
            || payload.type === LoaderType.None) {

            return state;
        }

        const input: HTMLInputElement = payload.element as HTMLInputElement;
        const token: string = input.value;

        const nodeLoader: INodeLoader = payload.nodeLoader as INodeLoader;
        nodeLoader.token = token;
        nodeLoader.ui.raw = false;
        nodeLoader.ui.recognised = false;
        nodeLoader.ui.showTreeSelection = true;

        if (payload.type === LoaderType.Option
            || payload.type === LoaderType.Root) {

            gNodeLoaderCode.findAndResetBranchOptions(
                state,
                nodeLoader);
        }
        else if (payload.type === LoaderType.Target) {

            gNodeLoaderCode.findAndResetBranchTargets(
                state,
                nodeLoader);
        }

        const stateArray: IStateAnyArray = [

            gStateCode.cloneState(state)
        ];

        if (token !== state.lens.validationResults.treeToken.value) {

            stateArray.push(

                gAutoCompleteEffects.token(
                    state,
                    token
                )
            );
        }

        if (U.isPositiveNumeric(nodeLoader.key) === true) {

            stateArray.push(

                gNodeEffects.validateNodeKey(
                    state,
                    token,
                    nodeLoader.key
                )
            );
        }

        return stateArray;
    }
};

export default nodeLoaderActions;
