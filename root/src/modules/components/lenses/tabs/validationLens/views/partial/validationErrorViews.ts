import { h, VNode } from "hyperapp-local";

import IValidationCase from "../../../../../../interfaces/state/cases/IValidationCase";
import gTooltipActions from "../../../../../../global/actions/gTooltipActions";
import IValidationError from "../../../../../../interfaces/state/notifications/IValidationError";
import gValidationCode from "../../../../../../global/code/gValidationCode";
import validationErrorDetailsViews from "./validationErrorDetailsViews";
import validationActions from "../../actions/validationActions";
import IPaginationDetails from "../../../../../../interfaces/state/ui/payloads/IPaginationDetails";
import paginationViews from "../../../../../pagination/views/paginationViews";


const validationErrorViews = {

    buildResultsView: (validationCase: IValidationCase | null): VNode[] => {

        if (!validationCase
            || !validationCase.errors
            || validationCase.errors.length === 0) {

            return [];
        }

        let selected: boolean = false;
        const validationErrors: Array<IValidationError> = validationCase.errors as Array<IValidationError>;
        const paginationDetails: IPaginationDetails = validationCase.errorsPagination;

        if (validationCase
            && validationCase.selectedErrorID) {

            selected = true;
        }

        const buildSelectedErrorDetailsView = (): VNode[] => {

            if (!validationCase.selectedErrorID) {

                return [];
            }

            const error: IValidationError | null = gValidationCode.getError(
                validationErrors,
                validationCase?.selectedErrorID
            );

            if (error) {

                const view: VNode[] = [

                    h("h4", {}, `Selected validation error`),
                    h("div", { class: "details" }, [
                        validationErrorDetailsViews.buildDetailsView(error)
                    ])
                ];

                return view;
            }

            return [];
        };

        const buildErrorRowView = (
            error: IValidationError,
            selected: boolean): VNode | null => {

            if (!error) {

                return null;
            }

            const view: VNode =

                h("tr",
                    {
                        key: `${error.id}`,
                        class: {
                            selected: selected
                        },
                        onClick: [
                            validationActions.selectError,
                            (_event: any) => error.id
                        ],
                        onMouseOver: [
                            gTooltipActions.showTooltip,
                            (_event: any) => "Click to select error and view its details below"
                        ],
                        onMouseOut: gTooltipActions.clearTooltip
                    },
                    [
                        h("td", { class: "td-open" }, [
                            h("div", { class: "tick" }, "")
                        ]),
                        h("td", {}, `${error.id}`),
                        h("td", {}, `${error.errorType}`),
                        h("td", {}, `${error.message}`),
                        h("td", {}, `${error.document.docType}`),
                    ]);

            return view;
        };

        const buildErrorRowViews = (): VNode[] => {

            const errorViews: VNode[] = [];
            let errorView: VNode | null;
            let error: IValidationError;
            const start: number = paginationDetails.start;
            let length: number = paginationDetails.count;
            length = length > validationErrors.length ? validationErrors.length : length;

            for (let i = start; i < length; i++) {

                error = validationErrors[i];

                errorView = buildErrorRowView(
                    error,
                    selected && error.id === validationCase.selectedErrorID
                );

                if (errorView) {

                    errorViews.push(errorView);
                }
            }

            return errorViews;
        };

        const buildPagination = (isBottom: boolean): VNode | null => {

            return paginationViews.buildView(
                isBottom,
                paginationDetails,
                validationActions.showValidationErrorsPage,
                validationCase);
        };

        const buildTopPagination = (): VNode | null => {

            return buildPagination(false);
        };

        const buildBottomPagination = (): VNode | null => {

            return buildPagination(true);
        };

        const buildErrorTableView = (): VNode => {

            const tableView: VNode =

                h("table", {}, [
                    h("thead", {}, [
                        h("tr", {}, [
                            h("td", { class: "td-open" }, ""),
                            h("td", {}, "id"),
                            h("td", {}, "type"),
                            h("td", {}, "error message"),
                            h("td", {}, "doc type"),
                        ])
                    ]),
                    h("tbody", {}, buildErrorRowViews())
                ]);

            return tableView;
        };

        const resultsView: VNode[] = [

            h("div", { class: "results" }, [
                h("h4", {}, "Validation errors"),

                buildTopPagination(),
                buildErrorTableView(),
                buildBottomPagination(),
            ]),

            ...buildSelectedErrorDetailsView(),
            // buttonsViews.buildActionsView(searchCase)
        ];

        return resultsView;
    }
};

export default validationErrorViews;


