import { Children } from "hyperapp-local";

import IState from "../../../../../interfaces/state/IState";
import ILensUI from "../../../../../interfaces/state/ui/UIs/ILensUI";
import INode from "../../../../../interfaces/state/tree/INode";
import inputsViews from "../../../../../components/lenses/inputs/views/inputsViews";


const concealedDiscussionViews = {

    buildDiscussionView: (
        state: IState,
        lensNode: INode<ILensUI>): Children[] => {

        const view: Children[] = [

            inputsViews.buildInputsView(
                state,
                lensNode,
                true
            )
        ];

        return view;
    }
};

export default concealedDiscussionViews;


