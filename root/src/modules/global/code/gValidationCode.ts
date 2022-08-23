import IState from "../../interfaces/state/IState";
import ValidationCase from "../../state/cases/ValidationCase";
import IValidationCase from "../../interfaces/state/cases/IValidationCase";
import IValidationError from "../../interfaces/state/notifications/IValidationError";
import ValidationError from "../../state/notifications/ValidationError";
import { ValidationErrorType } from "../../interfaces/enums/ValidationErrorType";
import IValidationCircularRefResult from "../../interfaces/state/notifications/IValidationCircularRefResult";
import ValidationCircularRefResult from "../../state/notifications/ValidationCircularRefResult";
import U from "../gUtilities";
import { TabType } from "../../interfaces/enums/TabType";
import gLensCode from "./gLensCode";
import gTabCode from "./gTabCode";
import { DocType } from "../../interfaces/enums/DocType";
import IDocumentError from "../../interfaces/state/notifications/IDocumentError";
import DocumentError from "../../state/notifications/DocumentError";


const gValidationCode = {

    clearValidationsTab: (state: IState): void => {

        state.lens.validationsTab.display = false;
        state.lens.validationsTab.stageBehaviour.clear();
        state.lens.validationsTab.validationCase = null;
    },

    showValidationTab: (state: IState): void => {

        state.lens.validationsTab.display = true;
        gLensCode.maximiseLens(state) === true;
    },

    showSelectedValidationTab: (state: IState): void => {

        gValidationCode.showValidationTab(state);

        gTabCode.setSelectedTab(
            state,
            TabType.Validation);
    },

    getError: (
        validationErrors: Array<IValidationError>,
        errorID: number): IValidationError | null => {

        const error: IValidationError | undefined = validationErrors.find((error: IValidationError) => {

            return error.id === errorID;
        });

        if (error) {

            return error;
        }

        return null;
    },

    getCfReport: (
        reports: Array<IValidationCircularRefResult>,
        errorID: number): IValidationCircularRefResult | null => {

        const report: IValidationCircularRefResult | undefined = reports.find((report: IValidationCircularRefResult) => {
            return report.id === errorID;
        });

        if (report) {
            return report;
        }

        return null;
    },

    loadValidationResults: (
        state: IState,
        rawValidation: any): IValidationCase => {

        const validation: any = rawValidation.validation;
        const validationsCase: IValidationCase = new ValidationCase(state.settings.defaultDataBatchSize);

        validationsCase.success = validation.success;
        validationsCase.treeKey = validation.treeKey;
        validationsCase.treeName = validation.treeName;
        validationsCase.treeToken = validation.treeToken;
        validationsCase.timeTaken = validation.timetaken;
        validationsCase.circularRefResult = gValidationCode.loadCircularReferenceReport(validation.circularRefResults);
        validationsCase.circularRefPagination.totalItems = validationsCase.circularRefResult.length;
        validationsCase.log = validation.log;
        validationsCase.errors = gValidationCode.loadValidationErrors(validation.errors);
        validationsCase.errorsPagination.totalItems = validationsCase.errors.length;

        return validationsCase;
    },

    loadCircularReferenceReport: (circularRefResults: any[]): Array<IValidationCircularRefResult> => {

        if (!circularRefResults) {

            return [];
        }

        const circularRefReports: Array<IValidationCircularRefResult> = [];
        let circularRefReport: IValidationCircularRefResult;
        let counter: number = 0;

        circularRefResults.forEach((report: any) => {

            circularRefReport = new ValidationCircularRefResult(
                ++counter,
                report.success,
                U.splitByPipe(report.tokenChain)
            );

            circularRefReports.push(circularRefReport);
        });

        return circularRefReports;
    },

    loadValidationErrors: (errors: any[]): Array<IValidationError> => {

        if (!errors) {

            return [];
        }

        const getErrorType = (errorType: string): ValidationErrorType => {

            if (errorType === 'code') {

                return ValidationErrorType.Code;
            }
            else if (errorType === 'user') {

                return ValidationErrorType.User;
            }
            else {
                throw new Error(`Unknown ValidationErrorType: ${errorType}.`);
            }
        };

        const getDocumentError = (docError: any): IDocumentError => {

            return new DocumentError(
                docError.identifier,
                getDocType(docError.docType),
                docError.json
            );
        };

        const getDocType = (docType: string): DocType => {

            if (docType === 'node') {

                return DocType.Node;
            }
            else if (docType === 'edge') {

                return DocType.Edge;
            }
            else if (docType === 'tree') {

                return DocType.Tree;
            }
            else if (docType === 'subtree') {

                return DocType.Subtree;
            }
            else if (docType === 'stRoot') {

                return DocType.StRoot;
            }
            else if (docType === 'stRootEdge') {

                return DocType.StRootEdge;
            }
            else if (docType === 'stRootLink') {

                return DocType.StRootLink;
            }
            else if (docType === 'stSocket') {

                return DocType.StSocket;
            }
            else if (docType === 'stSocketEdge') {

                return DocType.StSocketEdge;
            }
            else if (docType === 'stSocketLink') {

                return DocType.StSocketLink;
            }
            else if (docType === 'stSocketHoleMapping') {

                return DocType.StSocketHoleMapping;
            }
            else {

                return DocType.NotCodedFor;
            }
        };

        const validationErrors: Array<IValidationError> = [];
        let validationError: IValidationError;
        let counter: number = 0;

        errors.forEach((error: any) => {

            validationError = new ValidationError(
                ++counter,
                error.message,
                getErrorType(error.errorType),
                getDocumentError(error.document),
            );

            validationErrors.push(validationError);
        });

        return validationErrors;
    }
};

export default gValidationCode;

