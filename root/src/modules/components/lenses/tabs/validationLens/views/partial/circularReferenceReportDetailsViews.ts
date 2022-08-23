import { h, VNode } from "hyperapp-local";

import U from "../../../../../../global/gUtilities";
import IValidationCase from "../../../../../../interfaces/state/cases/IValidationCase";
import IValidationCircularRefResult from "../../../../../../interfaces/state/notifications/IValidationCircularRefResult";
import gValidationCode from "../../../../../../global/code/gValidationCode";
import validationActions from "../../actions/validationActions";
import gTooltipActions from "../../../../../../global/actions/gTooltipActions";
import IPaginationDetails from "../../../../../../interfaces/state/ui/payloads/IPaginationDetails";
import paginationViews from "../../../../../pagination/views/paginationViews";
import CssClasses from "../../../../../../state/constants/CssClasses";


const circularReferenceReportDetailsViews = {

    buildTableView: (validationCase: IValidationCase | null): VNode[] => {

        if (!validationCase
            || !validationCase.circularRefResult
            || validationCase.circularRefResult.length === 0) {

            return [];
        }

        let selected: boolean = false;
        const reports: Array<IValidationCircularRefResult> = validationCase.circularRefResult as Array<IValidationCircularRefResult>;
        const paginationDetails: IPaginationDetails = validationCase.circularRefPagination;

        if (validationCase
            && validationCase.selectedCfReportID) {

            selected = true;
        }

        const buildSelectedReportDetailsView = (): VNode[] => {

            if (!validationCase.selectedCfReportID) {

                return [];
            }

            const report: IValidationCircularRefResult | null = gValidationCode.getCfReport(
                reports,
                validationCase?.selectedCfReportID
            );

            if (!report) {

                return [];
            }

            const successTickClass: string = report.success === true ? CssClasses.yep : CssClasses.nope;

            const view: VNode[] = [

                h("h4", {}, `Selected circular reference report`),
                h("div", { class: "details" }, [
                    h("div", { class: 'validation-report' }, [
                        h("div", { class: "row" }, [
                            h("div", { class: "key" }, "success"),
                            h("div", { class: "value" }, [
                                h("div", { class: successTickClass }, ""),
                            ]),
                        ]),
                        h("div", { class: "row" }, [
                            h("div", { class: "key" }, "token chain"),
                            h("div", { class: "value" }, `${U.joinByNewLine(report.tokenChain)}`)
                        ]),
                    ])
                ])
            ];

            return view;
        };

        const buildReportRowView = (
            report: IValidationCircularRefResult,
            selected: boolean): VNode | null => {

            if (!report) {

                return null;
            }

            const successTickClass: string = report.success === true ? CssClasses.yep : CssClasses.nope;

            const view: VNode =

                h("tr",
                    {
                        key: `${report.id}`,
                        class: {
                            selected: selected
                        },
                        onClick: [
                            validationActions.selectCfReport,
                            (_event: any) => report.id
                        ],
                        onMouseOver: [
                            gTooltipActions.showTooltip,
                            (_event: any) => "Click to select circular ref report and view its details below"
                        ],
                        onMouseOut: gTooltipActions.clearTooltip
                    },
                    [
                        h("td", {}, `${report.id}`),
                        h("td", {}, [
                            h("div", { class: successTickClass }, "")
                        ]),
                        h("td", {}, `${U.joinByNewLine(report.tokenChain)}`),
                    ]
                );

            return view;
        };

        const buildReportRowViews = (): VNode[] => {

            const reportViews: VNode[] = [];
            let reportView: VNode | null;
            let report: IValidationCircularRefResult;
            const start: number = paginationDetails.start;
            let length: number = paginationDetails.count;
            length = length > reports.length ? reports.length : length;

            for (let i = start; i < length; i++) {

                report = reports[i];

                reportView = buildReportRowView(
                    report,
                    selected && report.id === validationCase.selectedCfReportID
                );

                if (reportView) {

                    reportViews.push(reportView);
                }
            }

            return reportViews;
        };

        const buildPagination = (isBottom: boolean): VNode | null => {

            return paginationViews.buildView(
                isBottom,
                paginationDetails,
                validationActions.showCircularRefPage,
                validationCase);
        };

        const buildTopPagination = (): VNode | null => {

            return buildPagination(false);
        };

        const buildBottomPagination = (): VNode | null => {

            return buildPagination(true);
        };

        const buildResultsView = (): VNode => {

            const resultsView: VNode =

                h("table", {}, [
                    h("thead", {}, [
                        h("tr", {}, [
                            h("td", {}, "id"),
                            h("td", {}, "success"),
                            h("td", {}, "token chain"),
                        ])
                    ]),
                    h("tbody", {}, buildReportRowViews())
                ]);

            return resultsView;
        };

        const tableView: VNode[] = [

            h("div", { class: "circular-ref-reports" }, [

                h("h4", {}, "Validation circular reference reports"),

                buildTopPagination(),
                buildResultsView(),
                buildBottomPagination(),
            ]),
            ...buildSelectedReportDetailsView()
        ];

        return tableView;
    }
};

export default circularReferenceReportDetailsViews;


