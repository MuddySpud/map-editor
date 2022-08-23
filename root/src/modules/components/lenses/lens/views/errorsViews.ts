import { h, VNode } from "hyperapp-local";

import U from "../../../../global/gUtilities";


const errorsViews = {

    buildErrorsViewIfErrors: (errors: string[]): VNode | null => {

        if (!errors
            || errors.length === 0) {

            return null;
        }

        return errorsViews.buildErrorsView(errors);
    },

    buildErrorsView: (errors: string[]): VNode => {

        let errorString: string = '';

        errors.forEach((error: string) => {

            errorString = `${errorString}${error}
`;
        });

        const errorsView =

            h("div", { class: "error" }, errorString);

        return errorsView;
    },

    buildErrorsTableView: (errors: string[]): VNode[] => {

        const errorViews: VNode[] = [];
        let errorView: VNode | null;
        let count: number = 0;

        errors.forEach((error: string) => {

            errorView = errorsViews.buildErrorRowView(
                error,
                ++count);

            if (errorView) {

                errorViews.push(errorView);
            }
        });

        return errorViews;
    },

    buildErrorRowView: (
        error: string,
        index: number): VNode | null => {

        if (U.isNullOrWhiteSpace(error)) {

            return null;
        }

        const errorView: VNode =

            h("div", { class: "error-row" }, [
                h("div", { class: "error-index" }, `${index}`),
                h("div", { class: "error-value" }, `${error}`)
            ]);

        return errorView;
    }
};

export default errorsViews;


