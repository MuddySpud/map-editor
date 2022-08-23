import { h, VNode } from "hyperapp-local";

import nodeDetailsViews from "../../node/partial/nodeDetailsViews";
import optionsDetailsViews from "../../node/partial/optionsDetailsViews";
import INodeBase from "../../../../../../../interfaces/state/tree/INodeBase";
import INodeLoader from "../../../../../../../interfaces/state/tree/INodeLoader";
import headerControlViews from "../../../../../../../components/lenses/lens/views/headerControlViews";
import branchTaskActions from "../../../actions/branchTaskActions";


const branchTargetDetailsViews = {

    buildOriginDetailsView: (parent: INodeBase | null | undefined): VNode[] => {

        if (!parent) {

            return [];
        }

        const detailsView: VNode[] = [

            h("h4", {}, "Origin"),
            h("div", { class: "action-details minimised" }, [

                nodeDetailsViews.buildMinimisedDiscussionDetailsView(parent),
            ])
        ];

        return detailsView;
    },

    buildTargetDetailsMinimisedView: (
        optionLoader: INodeLoader,
        type: string): VNode[] => {

        if (!optionLoader.node) {

            return [];
        }

        const option: INodeBase = optionLoader.node;

        const detailsView: VNode[] = [

            h("h4", {}, "Target"),
            h("div", { class: "action-details minimised" }, [

                branchTargetDetailsViews.buildControlView(
                    optionLoader,
                    true,
                    type),

                nodeDetailsViews.buildMinimisedDiscussionDetailsView(option),
            ])
        ];

        return detailsView;
    },

    buildTargetDetailsMaximisedView: (
        optionLoader: INodeLoader,
        type: string): VNode[] => {

        if (!optionLoader.node) {
            return [];
        }

        const option: INodeBase = optionLoader.node;

        const detailsView: VNode[] = [

            h("h4", {}, "Target"),
            h("div", { class: "action-details" }, [

                branchTargetDetailsViews.buildControlView(
                    optionLoader,
                    false,
                    type),

                nodeDetailsViews.buildDiscussionDetailsView(option),
                ...optionsDetailsViews.buildOptionsDetailsView(option.nodes)
            ])
        ];

        return detailsView;
    },

    buildTargetDetailsView: (targetLoader: INodeLoader): VNode[] => {

        if (targetLoader.ui.minimise === true) {

            return branchTargetDetailsViews.buildTargetDetailsMinimisedView(
                targetLoader,
                'option');
        }

        return branchTargetDetailsViews.buildTargetDetailsMaximisedView(
            targetLoader,
            'option');
    },

    buildControlView: (
        optionLoader: INodeLoader,
        isMinimised: boolean,
        type: string): VNode => {

        let tooltip: string = ` the branch ${type}`;

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

export default branchTargetDetailsViews;


