import IState from "../../interfaces/state/IState";
import gStateCode from "./gStateCode";
import { NotificationType } from "../../interfaces/enums/NotificationType";
import INotification from "../../interfaces/state/notifications/INotification";


const gErrorCode = {

    buildErrorMessage: (
        methodName: string,
        errorMessage: string,
        errorStack: string,
        errorDetails: any
    ): string => {

        const message: string = `ERROR in ${methodName}
${errorMessage}
errorStack: ${errorStack}
errorDetails: ${JSON.stringify(errorDetails)}
    `;

        return message;
    },

    addHttpErrorNotification: (
        state: IState,
        callID: string,
        token: string | null,
        methodName: string,
        errorTitle: string,
        errorMessage: string,
        errorStack: string,
        errorDetails: any,
        callChain: Array<string> = [],
        status: number = -1,
        response: any = ""
    ): INotification | null => {

        const message: string = gErrorCode.buildErrorMessage(
            methodName,
            errorMessage,
            errorStack,
            errorDetails
        );

        return gStateCode.addNotification(
            state,
            errorTitle,
            message,
            token,
            NotificationType.Error,
            null,
            errorDetails.Instance, // From C# - properties capitalised
            null,
            callID,
            callChain,
            status,
            response); 
    },

    addErrorNotification: (
        state: IState,
        token: string | null,
        methodName: string,
        errorTitle: string,
        errorMessage: string,
        errorStack: string,
        errorDetails: any
    ): string => {

        const message: string = gErrorCode.buildErrorMessage(
            methodName,
            errorMessage,
            errorStack,
            errorDetails
        );

        gStateCode.addNotification(
            state,
            errorTitle,
            message,
            token,
            NotificationType.Error,
            null,
            errorDetails.Instance); // From C# - properties capitalised

        return message;
    },
};

export default gErrorCode;

