import IState from "../../interfaces/state/IState";
import gStateCode from "../code/gStateCode";
import gErrorCode from "../code/gErrorCode";
import U from "../gUtilities";
import IHttpErrorPayload from "../../interfaces/state/effects/IHttpErrorPayload";
import HttpErrorPayload from "../../state/effects/HttpErrorPayload";
import IStateAnyArray from "../../interfaces/state/IStateAnyArray";
import gNotificationsEffects from "../effects/gNotificationsEffects";
import LensWarning from "../../state/ui/LensWarning";
import ITabSave from "../../interfaces/state/ui/tabs/ITabSave";


const gErrorActions = {

    reportHttpError: (
        state: IState,
        callID: string,
        token: string | null,
        requestUrl: string,
        requestBody: any,
        methodName: string,
        errorTitle: string,
        errorStack: string,
        errorDetails: any,
        status: number = -1,
        response: any = ""
    ): IStateAnyArray => {

        if (!state) {

            return state;
        }

        const errorMessage: string = `Url: ${requestUrl}
bodyJson: ${JSON.stringify(requestBody)}`;

        gErrorCode.addHttpErrorNotification(
            state,
            callID,
            token,
            methodName,
            errorTitle,
            errorMessage,
            errorStack,
            errorDetails,
            [],
            status,
            response
        );

        if (!U.isNullOrWhiteSpace(errorDetails.Instance)) { // C# property so capitalised

            const payload: IHttpErrorPayload = new HttpErrorPayload(
                requestUrl,
                requestBody,
                callID,
                "Http error",
                token
            );

            return [
                gStateCode.cloneState(state),
                gNotificationsEffects.saveHttpError(state, payload)
            ];
        }

        return gStateCode.cloneState(state);
    },

    reportSilentHttpError: (
        state: IState,
        callID: string,
        token: string | null,
        requestUrl: string,
        requestBody: any,
        methodName: string,
        errorTitle: string,
        errorStack: string,
        errorDetails: any,
        callChain: Array<string>,
        status: number = -1,
        response: any = "",
    ): IStateAnyArray => {

        if (!state) {

            return state;
        }

        const errorMessage: string = `Url: ${requestUrl}
bodyJson: ${JSON.stringify(requestBody)}`;

        gErrorCode.addHttpErrorNotification(
            state,
            callID,
            token,
            methodName,
            errorTitle,
            errorMessage,
            errorStack,
            errorDetails,
            callChain,
            status,
            response
        );

        if (!U.isNullOrWhiteSpace(errorDetails.Instance)) { // C# property so capitalised

            const payload: IHttpErrorPayload = new HttpErrorPayload(
                requestUrl,
                requestBody,
                callID,
                "Http error",
                token
            );

            return [
                gStateCode.cloneState(state),
                gNotificationsEffects.saveHttpError(state, payload)
            ];
        }

        return gStateCode.cloneState(state);
    },

    setLensWarning: (
        state: IState,
        tab: ITabSave,
        title: string,
        text: string = '',
    ): void => {

        if (!state) {

            return state;
        }

        state.lens.warning = new LensWarning(
            tab,
            title,
            text
        );
    }
};

export default gErrorActions;
