import { h, VNode } from "hyperapp-local";
import lensControlsViews from "../../../../lens/views/lensControlsViews";
import filterActions from "../../actions/filterActions";


const filterTitleViews = {

    buildTitleView: (advanced: boolean): VNode[] => {

        const iconsView: VNode[] = [

            h("div", { class: "trees-icon" }, ""),
            h("div", { class: "filter-icon" }, ""),
        ];

        const subHeaderView: VNode[] = [];

        if (advanced === true) {

            // iconsView.push(

            //     h("div", { class: "star-icon" }, "")
            // );

            subHeaderView.push(

                h("div", { class: "sub-icons" }, [
                    h("div", { class: "properties-icon" }, ""),
                    h("div", { class: "filter-icon" }, ""),
                    h("div", { class: "star-icon" }, "")
                ])
            );
        }

        const view: VNode[] = [

            h("div", { class: "child-controls br-option" }, [

                lensControlsViews.buildResetButtonView(
                    'Reset filter',
                    filterActions.reset
                )
            ]),
            h("div", { class: "icon-group" }, iconsView),
            h("h3", {}, "Filter trees"),

            ...subHeaderView
        ];

        return view;
    }
};

export default filterTitleViews;


