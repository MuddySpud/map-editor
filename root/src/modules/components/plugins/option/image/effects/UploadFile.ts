// import progressBarCode from "../code/progressBarCode";

import gUtilities from "../../../../../global/gUtilities";
import IHttpAuthenticatedProps from "../../../../../interfaces/http/IHttpAuthenticatedProps";
import { IHttpFetchItem } from "../../../../../interfaces/http/IHttpFetchItem";


function fileUpload(
    dispatch: any,
    props: any) {

    const xhr = new XMLHttpRequest();

    xhr.open(
        props.requestType,
        props.url,
        true
    );

    xhr.addEventListener(
        "load",
        function (event: Event) {

            if (!xhr
                || gUtilities.isNullOrWhiteSpace(xhr.response)) {
                return;
            }

            if (xhr.status < 200
                || xhr.status >= 300) {

                requestAnimationFrame(() =>
                    dispatch(
                        props.error,
                        {
                            response: xhr.response,
                            status: xhr.status,
                            optionID: props.optionID,
                        }
                    ));
            }
            else {
                const response: any = JSON.parse(xhr.response);

                requestAnimationFrame(() =>
                    dispatch(
                        props.action,
                        {
                            response: response,
                            event: event,
                            optionID: props.optionID,
                            status: xhr.status
                        }
                    ));
            }
        },
        true
    );

    xhr.upload.addEventListener(
        "error",
        function (error: any) {

            requestAnimationFrame(() =>
                dispatch(
                    props.error,
                    {
                        response: xhr.response,
                        status: xhr.status,
                        optionID: props.optionID,
                        error
                    }
                ));
        },
        true
    );

    xhr.setRequestHeader('Authorization', props.bearerToken);
    xhr.setRequestHeader('CallID', props.callID);
    xhr.setRequestHeader('SubscriptionID', props.subscriptionID);
    xhr.setRequestHeader('Action', props.actionType);

    try {

        xhr.send(props.formData);
    }
    catch (e) {
        //e.name would be "NetworkError" if the server is offline.
        console.log(e);

        requestAnimationFrame(() =>
            dispatch(
                props.error,
                e
            ));
    }
}

export function UploadFile(props: IHttpAuthenticatedProps): IHttpFetchItem | undefined {

    return [
        fileUpload,
        props
    ]
}
