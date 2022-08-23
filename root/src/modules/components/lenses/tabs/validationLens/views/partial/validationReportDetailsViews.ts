import { h, VNode } from "hyperapp-local";

import U from "../../../../../../global/gUtilities";
import IValidationCase from "../../../../../../interfaces/state/cases/IValidationCase";
import CssClasses from "../../../../../../state/constants/CssClasses";


const validationReportDetailsViews = {

    buildDetailsView: (validationCase: IValidationCase | null): VNode | null => {

        if (!validationCase) {

            return null;
        }

        const successTickClass: string = validationCase.success === true ? CssClasses.yep : CssClasses.nope;

        const view: VNode =

            h("div",
                {
                    class: 'validation-report'
                },
                [
                    h("div", { class: "row" }, [
                        h("div", { class: "key" }, "success"),
                        h("div", { class: "value" }, [
                            h("div", { class: successTickClass }, ""),
                        ]),
                    ]),
                    h("div", { class: "row" }, [
                        h("div", { class: "key" }, "tree key"),
                        h("div", { class: "value" }, `${validationCase.treeKey}`)
                    ]),
                    h("div", { class: "row" }, [
                        h("div", { class: "key" }, "tree name"),
                        h("div", { class: "value" }, `${validationCase.treeName}`)
                    ]),
                    h("div", { class: "row" }, [
                        h("div", { class: "key" }, "time taken"),
                        h("div", { class: "value" }, `${validationCase.timeTaken}`)
                    ]),
                    h("div", { class: "row" }, [
                        h("div", { class: "key" }, "log"),
                        h("div", { class: "value" }, `${U.joinByNewLine(validationCase.log)}`)
                    ]),
                ]
            );

        return view;
    }
};

export default validationReportDetailsViews;


