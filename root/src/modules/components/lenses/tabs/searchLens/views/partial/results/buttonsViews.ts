import { h, VNode } from "hyperapp-local";

import ISearchCase from "../../../../../../../interfaces/state/Search/ISearchCase";
import ISearchBrief from "../../../../../../../interfaces/state/Search/ISearchBrief";
import lensActions from "../../../../../lens/actions/lensActions";
import searchSelectors from "../../../code/searchSelectors";


const buttonsViews = {

    buildActionsView: (searchCase: ISearchCase): VNode | null => {

        const searchBrief: ISearchBrief = searchCase.brief as ISearchBrief;

        if (searchSelectors.hasSelectedResult(searchBrief) === false) {

            return null;
        }

        const view: VNode =

            h("div",
                {
                    class: {
                        "lens-actions": true
                    }
                },
                [
                    h("button",
                        {
                            type: "button",
                            class: "select",
                            onClick: [
                                searchCase.selectAction,
                                (_event: any) => searchCase
                            ]
                        },
                        "Select"
                    ),
                    h("button",
                        {
                            type: "button",
                            class: "cancel",
                            onClick: lensActions.clearAndCloseLens,
                        },
                        "Cancel"
                    )
                ]
            );

        return view;
    }
};

export default buttonsViews;


