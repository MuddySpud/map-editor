import { h, VNode } from "hyperapp-local";

import INodeBase from "../../../../../../../interfaces/state/tree/INodeBase";
import gNodeActions from "../../../../../../../global/actions/gNodeActions";
import tableViews from "../../../../../lens/views/tableViews";
import buttonViews from "../../../../../lens/views/buttonViews";


const holesViews = {

    buildStSocketHolesView: (holes: Array<INodeBase>): VNode[] => {

        if (!holes
            || holes.length === 0) {
            return [];
        }

        const holeViews: VNode[] = [];
        let holeView: VNode | null;
        let index: number = 0;

        holes.forEach((hole) => {

            holeView = holesViews.buildStSocketHoleView(
                hole,
                ++index);

            if (holeView) {

                holeViews.push(holeView);
            }
        });

        const view: VNode[] = [

            h("tr", { class: "stSocket-holes" }, [
                h("td", { colspan: "3" }, [
                    h("h4", {}, "holes"),
                ])
            ]),
            h("tr", { class: "stSocket-holes" }, [
                h("td", { colspan: "3" }, holeViews)
            ])
        ];

        return view;
    },

    buildStSocketHoleView: (
        hole: INodeBase,
        index: number): VNode | null => {

        if (!hole) {
            return null;
        }

        const view: VNode =

            h("table", { class: "stSocket-hole" }, [
                h("tbody", {}, [
                    h("tr", {}, [

                        buttonViews.buildOpenInBranchesViewButton(
                            hole,
                            "Show this hole in the tree-view",
                            "open-view",
                            gNodeActions.showAndSelectNode),

                        h("td", {}, [
                            h("table", { class: "stSocket-hole-values" }, [
                                h("tbody", {}, [

                                    tableViews.build3ColumnKeyTrRowView(
                                        hole.key,
                                        `${index}`),

                                    tableViews.build3ColumnTextTrRowView(hole.option),
                                ])
                            ])
                        ])
                    ])
                ])
            ]);

        return view;
    }
};

export default holesViews;


