import { h, VNode } from "hyperapp-local";

import IState from "../../../../../../../interfaces/state/IState";
import ILensUI from "../../../../../../../interfaces/state/ui/UIs/ILensUI";
import INode from "../../../../../../../interfaces/state/tree/INode";
import gNodeCode from "../../../../../../../global/code/gNodeCode";
import ISearchCase from "../../../../../../../interfaces/state/Search/ISearchCase";
import subtreeResultsViews from "../../../../searchLens/views/partial/results/subtreeResultsViews";
import IStageBehaviour from "../../../../../../../interfaces/behaviours/IStageBehaviour";


const subtreeSelectTabViews = {

    buildTabView: (
        state: IState,
        titleViewBuilderDelegate: (stageBehaviour: IStageBehaviour) => Array<VNode>): VNode | null => {

        const lensNode: INode<ILensUI> = state.lens.nodeTab.lensNode as INode<ILensUI>;

        if (!lensNode.link) {

            return null;
        }

        const stageBehaviour: IStageBehaviour = state.lens.nodeTab.stageBehaviour;
        const searchCase: ISearchCase = lensNode.ui.subtreeSearch;
        gNodeCode.validateTab(state);

        const view: VNode =

            h("div", { id: "subtreeEditLensView" }, [
                h("div", { id: "subtreeEditLens" }, [

                    ...titleViewBuilderDelegate(stageBehaviour),
                    subtreeResultsViews.buildResultsView(searchCase)
                ])
            ]);

        return view;
    }
};

export default subtreeSelectTabViews;


