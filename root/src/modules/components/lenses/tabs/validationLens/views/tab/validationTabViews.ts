import { h, VNode } from "hyperapp-local";

import IValidationCase from "../../../../../../interfaces/state/cases/IValidationCase";
import treeLensControlsViews from "../../../treeLens/views/common/partial/treeLensControlsViews";
import validationErrorViews from "../partial/validationErrorViews";
import validationReportDetailsViews from "../partial/validationReportDetailsViews";
import circularReferenceReportDetailsViews from "../partial/circularReferenceReportDetailsViews";


const validationTabViews = {

    buildTabView: (validationCase: IValidationCase | null) : VNode=> {

        let iconClass: string = "validation-icon";

        if (validationCase) {

            validationCase.fresh = false;

            if (validationCase.success === false) {
                iconClass += " fail";
            }
        }

        const view: VNode =

            h("div", { id: "validationLensView" }, [
                h("div", { id: "validationLens" }, [

                    treeLensControlsViews.build_Refresh_Show_Hub_ControlsView(),

                    h("div", { class: "icons" }, [
                        h("div", { class: iconClass }, ""),
                    ]),
                    h("h3", {}, "Validation"),

                    validationReportDetailsViews.buildDetailsView(validationCase),
                    ...validationErrorViews.buildResultsView(validationCase),
                    ...circularReferenceReportDetailsViews.buildTableView(validationCase)
                ])
            ]);

        return view;
    }
};

export default validationTabViews;


