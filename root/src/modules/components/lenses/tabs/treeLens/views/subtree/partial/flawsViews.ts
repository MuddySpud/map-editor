import { h, VNode } from "hyperapp-local";

import INodeBase from "../../../../../../../interfaces/state/tree/INodeBase";
import gNodeActions from "../../../../../../../global/actions/gNodeActions";
import tableViews from "../../../../../lens/views/tableViews";
import buttonViews from "../../../../../lens/views/buttonViews";
import CssClasses from "../../../../../../../state/constants/CssClasses";


const flawsViews = {

    buildFlawsView: (flaws: Array<INodeBase>): VNode | null => {

        if (!flaws
            || flaws.length === 0) {

            return null;
        }

        const flawViews: VNode[] = [];
        let flawView: VNode | null;
        let index: number = 0;

        flaws.forEach((flaw) => {

            flawView = flawsViews.buildFlawView(
                flaw,
                ++index);

            if (flawView) {

                flawViews.push(flawView);
            }
        });

        const view: VNode =

            h("div", { class: "flaws" }, [
                h("h4", {}, "Unmapped holes"),

                ...flawViews
            ]);

        return view;
    },

    buildFlawView: (
        flaw: INodeBase,
        index: number): VNode | null => {

        if (!flaw) {

            return null;
        }

        const view: VNode =

        h("div", { class: 'flaw' }, [

            buttonViews.buildOpenInBranchesViewButton(
                flaw,
                "Show this un-mapped hole in the tree-view",
                "open-view",
                gNodeActions.showAndSelectNode),

            h("div", { class: 'flaw-data' }, [

                tableViews.build3ColumnIndexKeyValueRowView(
                    `${index}`,
                    "key",
                    flaw.key,
                    CssClasses.odd
                ),

                tableViews.build3ColumnKeyValueRowView(
                    "option",
                    flaw.option,
                )
            ])
        ]);

        return view;
    },
};

export default flawsViews;


