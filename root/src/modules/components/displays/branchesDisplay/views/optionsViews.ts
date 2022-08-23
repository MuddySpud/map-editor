import { VNode } from "hyperapp-local";

import INode from "../../../../interfaces/state/tree/INode";
import IBranchUI from "../../../../interfaces/state/ui/UIs/IBranchUI";
import IState from "../../../../interfaces/state/IState";
import optionViews from "./optionViews";


const optionsViews = {

    buildOptionsView: (
        state: IState,
        nodes: Array<INode<IBranchUI>>,
        depth: number): VNode[] => {

        const optionsView: VNode[] = [];
        let optionView: VNode | null;

        nodes.forEach((option: INode<IBranchUI>) => {

            optionView = optionViews.buildOptionView(
                state,
                option,
                depth
            );

            if (optionView) {
                
                optionsView.push(optionView);
            }
        });

        return optionsView;
    }
};

export default optionsViews;
