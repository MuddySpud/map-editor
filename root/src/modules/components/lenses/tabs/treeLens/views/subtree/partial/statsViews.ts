import { h, VNode } from "hyperapp-local";

import ITreeStats from "../../../../../../../interfaces/state/tree/ITreeStats";
import tableViews from "../../../../../lens/views/tableViews";
import CssClasses from "../../../../../../../state/constants/CssClasses";


const statsViews = {

    buildSubtreeStatsView: (treeStats: ITreeStats | null): VNode[] => {

        const view: VNode[] = [

            h("h4", {}, "stats"),
            h("div", { class: "stats" }, [

                tableViews.build2ColumnKeyValueRowView(
                    'last edited',
                    `${treeStats?.lastEdited}`,
                    CssClasses.odd
                )
            ]),
            h("h4", {}, "counts"),
            h("div", { class: "stats" }, [

                tableViews.build2ColumnKeyValueRowView(
                    'references',
                    `${treeStats?.referenceCount}`,
                    CssClasses.odd
                )
            ])
        ];

        return view;
    }
};

export default statsViews;


