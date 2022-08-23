import { h, VNode } from "hyperapp-local";

import nodeDetailsViews from "../../node/partial/nodeDetailsViews";
import optionsDetailsViews from "../../node/partial/optionsDetailsViews";
import INodeBase from "../../../../../../../interfaces/state/tree/INodeBase";
import INodeLoader from "../../../../../../../interfaces/state/tree/INodeLoader";
import headerControlViews from "../../../../../lens/views/headerControlViews";
import branchTaskActions from "../../../actions/branchTaskActions";


const branchOptionDetailsViews = {

    buildMoveDetailsMinimisedView: (optionLoader: INodeLoader): VNode[] => {

        if (!optionLoader.node) {

            return [];
        }

        const option: INodeBase = optionLoader.node;

        const detailsView: VNode[] = [

            h("h4", {}, "Option"),
            h("div", { class: "action-details minimised" }, [

                branchOptionDetailsViews.buildControlView(
                    optionLoader,
                    true),

                nodeDetailsViews.buildMinimisedOptionDetailsView(option),
            ])
        ];

        return detailsView;
    },

    buildMoveDetailsMaximisedView: (optionLoader: INodeLoader): VNode[] => {

        if (!optionLoader.node) {

            return [];
        }

        const option: INodeBase = optionLoader.node;

        const detailsView: VNode[] = [

            h("h4", {}, "Option"),
            h("div", { class: "action-details" }, [

                branchOptionDetailsViews.buildControlView(
                    optionLoader,
                    false),

                nodeDetailsViews.buildOptionDetailsView(option),
                ...optionsDetailsViews.buildOptionsDetailsView(option.nodes)
            ])
        ];

        return detailsView;
    },

    buildOptionDetailsView: (optionLoader: INodeLoader): VNode[] => {

        if (optionLoader.ui.minimise === true) {

            return branchOptionDetailsViews.buildMoveDetailsMinimisedView(optionLoader);
        }

        return branchOptionDetailsViews.buildMoveDetailsMaximisedView(optionLoader);
    },

    buildControlView: (
        optionLoader: INodeLoader,
        isMinimised: boolean): VNode => {

        let tooltip: string = " the branch option";

        if (isMinimised === false) {

            tooltip = `Minimise${tooltip}`;
        }
        else {
            tooltip = `Maximise${tooltip}`;
        }

        return headerControlViews.buildMinimiseDataView(
            tooltip,
            optionLoader,
            branchTaskActions.toggleMinimiseOptionLoader,
            isMinimised
        );
    }
};

export default branchOptionDetailsViews;


