
import { gAuthenticatedHttp } from "../http/gAuthenticationHttp";

import IState from "../../interfaces/state/IState";
import IStateAnyArray from "../../interfaces/state/IStateAnyArray";
import IHttpEffect from "../../interfaces/state/effects/IHttpEffect";
import gStateCode from "../code/gStateCode";
import gErrorActions from "./gErrorActions";
import gTreesStateCode from "../code/gTreesStateCode";
import { ActionType } from "../../interfaces/enums/ActionType";
import gBlankAction from "./gBlankAction";
import gAjaxHeaderCode from "../http/gAjaxHeaderCode";


const postRequest = (
    state: IState,
    functionName: string,
    queuedEffects: Array<IHttpEffect>
): IStateAnyArray => {

    const effects: any[] = [];

    queuedEffects.forEach((httpEffect: IHttpEffect) => {

        if (httpEffect.getDataDelegate) {

            getDataAndEffect(
                state,
                httpEffect,
                functionName,
                effects,
                httpEffect.getDataDelegate
            );
        }
        else {
            getEffect(
                state,
                httpEffect,
                functionName,
                effects,
                httpEffect.requestBody
            );
        }
    });

    return [

        gStateCode.cloneState(state),
        ...effects
    ];
};

const getDataAndEffect = (
    state: IState,
    httpEffect: IHttpEffect,
    functionName: string,
    effects: Array<IHttpEffect>,
    getDataDelegate: (state: IState) => { body: any, callID: string, callChain: Array<string>, success: boolean }
): void => {

    const { body, callID, callChain, success }: { body: any, callID: string, callChain: Array<string>, success: boolean } = getDataDelegate(state);

    if (success === true) {

        const bodyJson: string = JSON.stringify(body);

        let headers = gAjaxHeaderCode.buildHeaders(
            state,
            callID,
            body.action
        );

        const url: string = `${httpEffect.url}`;

        const effect = gAuthenticatedHttp({
            url: url,
            options: {
                method: "POST",
                headers: headers,
                body: bodyJson
            },
            response: 'json',
            action: httpEffect.actionDelegate,
            error: (state: IState, errorDetails: any) => {

                return gErrorActions.reportSilentHttpError(
                    state,
                    callID,
                    httpEffect.token,
                    url,
                    body,
                    functionName,
                    "Error posting gRepeatActions data to the server",
                    errorDetails.stack,
                    errorDetails,
                    callChain
                );
            }
        });

        if (effect) {
            effects.push(effect);
        }
    }
};

const getEffect = (
    state: IState,
    httpEffect: IHttpEffect,
    functionName: string,
    effects: Array<IHttpEffect>,
    body: any
): void => {

    const bodyJson: string = JSON.stringify(body);
    const url: string = httpEffect.url;
    const callID: string = url.substring(url.lastIndexOf('/') + 1);

    let headers = gAjaxHeaderCode.buildHeaders(
        state,
        callID,
        body.action
    );

    const effect = gAuthenticatedHttp({
        url: url,
        options: {
            method: "POST",
            headers: headers,
            body: bodyJson
        },
        response: 'json',
        action: httpEffect.actionDelegate,
        error: (state: IState, errorDetails: any) => {

            return gErrorActions.reportHttpError(
                state,
                callID,
                httpEffect.token,
                url,
                body,
                functionName,
                "Error posting gRepeatActions data to the server",
                errorDetails.stack,
                errorDetails
            );
        }
    });

    effects.push(effect);
};

const gRepeatActions = {

    // a subscription returns an action
    // an action can return an array where the first object is the state and all subsequent ones 
    // are effects
    httpSilentRepeat: (state: IState): IStateAnyArray => {

        if (!state) {

            return state;
        }

        if (state.repeatEffects.shortIntervalHttp.length === 0) {
            // Must return altered state for the subscription not to get removed
            // return stateCode.cloneState(state);
            return state;
        }

        const shortRepeatHttpEffects: Array<IHttpEffect> = state.repeatEffects.shortIntervalHttp;
        state.repeatEffects.shortIntervalHttp = [];

        return postRequest(
            state,
            gRepeatActions.httpSilentRepeat.name,
            shortRepeatHttpEffects
        );
    },

    httpSilentReLoad: (state: IState): IStateAnyArray => {

        if (!state) {

            return state;
        }

        if (state.repeatEffects.reLoadPostHttp.length === 0) {
            // Must return altered state for the subscription not to get removed
            // return stateCode.cloneState(state);
            return state;
        }

        const reLoadHttpEffects: Array<IHttpEffect> = state.repeatEffects.reLoadPostHttp;
        state.repeatEffects.reLoadPostHttp = [];

        return postRequest(
            state,
            gRepeatActions.httpSilentReLoad.name,
            reLoadHttpEffects
        );
    },

    httpSilentReLoadImmediate: (state: IState): IStateAnyArray => {

        if (!state) {
            
            return state;
        }

        if (state.repeatEffects.reLoadPostHttpImmediate.length === 0) {
            // Must return altered state for the subscription not to get removed
            // return stateCode.cloneState(state);
            return state;
        }

        const reLoadHttpEffectsImmediate: Array<IHttpEffect> = state.repeatEffects.reLoadPostHttpImmediate;
        state.repeatEffects.reLoadPostHttpImmediate = [];

        return postRequest(
            state,
            gRepeatActions.httpSilentReLoadImmediate.name,
            reLoadHttpEffectsImmediate
        );
    },

    httpRecordState: (state: IState): IStateAnyArray => {

        if (!state
            || !state.record
            || !state.record.hasStateChanged()) {
            
            return state;
        }

        // If state has changed get the difference and save it to the database.
        // If this is the first time the state has been recorded save all of it to the database.
        // a video should consist of sections. The state is completely refreshed at the start of a section
        // Need to compare how fast it is to mosend back all the state vs comparing and sending...

        const callID: string = gTreesStateCode.registerTreeDataRequest(
            'Save tree',
            state,
            "",
            ActionType.RecordState
        );

        let body: any = {
            stateJson: state.record.getLastStateJson(),
            action: ActionType.RecordState
        };

        const bodyJson: string = JSON.stringify(body);

        let headers = gAjaxHeaderCode.buildHeaders(
            state,
            callID,
            ActionType.RecordState
        );

        const url: string = `${state.settings.apiUrl}/Record/Snapshot`;

        return gAuthenticatedHttp({
            url: url,
            options: {
                method: "POST",
                headers: headers,
                body: bodyJson
            },
            response: 'json',
            action: gBlankAction.responseAction,
            error: (state: IState, errorDetails: any) => {

                gErrorActions.setLensWarning(
                    state,
                    state.lens.treeTab,
                    `Record state failed`,
                );

                return gErrorActions.reportHttpError(
                    state,
                    callID,
                    state.branchesState.tree.token,
                    url,
                    body,
                    gRepeatActions.httpRecordState.name,
                    "Error sending record state data to the server",
                    errorDetails.stack,
                    errorDetails
                );
            }
        });
    }
};

export default gRepeatActions;

