import { h, VNode } from "hyperapp-local";

import INodeBase from "../../../../../../../interfaces/state/tree/INodeBase";
import { NodeType } from "../../../../../../../interfaces/enums/NodeType";
import tableViews from "../../../../../lens/views/tableViews";
import CssClasses from "../../../../../../../state/constants/CssClasses";


const optionsDetailsViews = {

    buildOptionDetailsView: (
        option: INodeBase | null,
        index: string): VNode | null => {

        if (!option
            || option.isHidden === true) {

            return null;
        }
        const view: VNode =

            h("div", { class: 'option' }, [
                h("div", { class: 'option-data' }, [

                    tableViews.build3ColumnIndexKeyValueRowView(
                        index,
                        "option",
                        option.option,
                        CssClasses.odd
                    ),

                    tableViews.build3ColumnKeyValueRowView(
                        "key",
                        option.key
                    ),

                    tableViews.build3ColumnKeyValueRowView(
                        "order",
                        `${option.order}`,
                        CssClasses.odd
                    ),

                    tableViews.build3ColumnKeyValueRowView(
                        "solution",
                        `${option.type === NodeType.Solution}`
                    )
                ])
            ]);

        return view;
    },

    buildOptionsDetailsView: (options: Array<INodeBase>): VNode[] => {

        if (!options) {

            return [];
        }

        const optionViewList: VNode[] = [];
        let optionView: VNode | null = null;
        let index: number = 0;

        options.forEach((option) => {

            optionView = optionsDetailsViews.buildOptionDetailsView(
                option,
                `${++index}`);

            if (optionView) {

                optionViewList.push(optionView);
            }
        });

        const header: string = optionViewList.length === 0 ? "no child options" : "child options";

        const view: VNode[] = [

            h("div", { class: "children" }, [
                h("h4", {}, `${header}`),

                ...optionViewList
            ])
        ];

        return view;
    }
};

export default optionsDetailsViews;


