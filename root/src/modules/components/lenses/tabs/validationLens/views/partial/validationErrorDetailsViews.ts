import { h, VNode } from "hyperapp-local";

import IValidationError from "../../../../../../interfaces/state/notifications/IValidationError";
import U from "../../../../../../global/gUtilities";



const validationErrorDetailsViews = {

    buildDetailsView: (error: IValidationError): VNode | null => {

        if (!error) {

            return null;
        }

        const view: VNode =

            h("div", { class: 'validation-error' }, [
                h("div", { class: "row" }, [
                    h("div", { class: "key" }, "id"),
                    h("div", { class: "value" }, `${error.id}`)
                ]),
                h("div", { class: "row" }, [
                    h("div", { class: "key" }, "error type"),
                    h("div", { class: "value" }, `${error.errorType}`)
                ]),
                h("div", { class: "row" }, [
                    h("div", { class: "key" }, "error message"),
                    h("div", { class: "value" }, `${error.message}`)
                ]),
                h("div", { class: "row" }, [
                    h("div", { class: "key" }, "document identifier"),
                    h("div", { class: "value" }, `${error.document.identifier}`)
                ]),
                h("div", { class: "row" }, [
                    h("div", { class: "key" }, "doc type"),
                    h("div", { class: "value" }, `${error.document.docType}`)
                ]),
                h("div", { class: "row" }, [
                    h("div", { class: "key" }, "document"),
                    h("div", { class: "value json-pretty" }, `${U.prettyPrintJsonFromString(error.document.json)}`)
                ])
            ]);

        return view;
    }
};

export default validationErrorDetailsViews;


