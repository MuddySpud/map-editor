import { h, VNode } from "hyperapp-local";

import IState from "../../../../../../../interfaces/state/IState";
import ILensUI from "../../../../../../../interfaces/state/ui/UIs/ILensUI";
import INode from "../../../../../../../interfaces/state/tree/INode";
import gNodeCode from "../../../../../../../global/code/gNodeCode";
import searchViews from "../../../../searchLens/views/partial/search/searchViews";
import searchTermsViews from "../../../../searchLens/views/partial/search/searchTermsViews";
import ISearchCase from "../../../../../../../interfaces/state/Search/ISearchCase";
import ITabSave from "../../../../../../../interfaces/state/ui/tabs/ITabSave";
import IStageBehaviour from "../../../../../../../interfaces/behaviours/IStageBehaviour";


const subtreeSearchTabViews = {

    buildTabView: (
        state: IState,
        titleViewBuilderDelegate: (stageBehaviour: IStageBehaviour) => Array<VNode>): VNode | null => {

        const lensNode: INode<ILensUI> = state.lens.nodeTab.lensNode as INode<ILensUI>;

        if (!lensNode.link) {

            return null;
        }

        const stageBehaviour: IStageBehaviour = state.lens.nodeTab.stageBehaviour;
        const searchCase: ISearchCase = lensNode.ui.subtreeSearch;
        const tab: ITabSave = state.lens.nodeTab;
        gNodeCode.validateTab(state);

        const view: VNode =

            h("div", { id: "subtreeEditLensView" }, [
                h("div", { id: "subtreeEditLens" }, [

                    ...titleViewBuilderDelegate(stageBehaviour),

                    h("div", { id: "searchLensView" }, [
                        h("div", { id: "searchLens" }, [

                            searchTermsViews.buildSearchTermsView(
                                tab,
                                searchCase,
                                state.settings),

                            searchViews.buildAddSearchRowView(
                                tab,
                                searchCase),

                            searchViews.buildActionsView(
                                searchCase,
                                stageBehaviour),
                        ])
                    ])
                ])
            ]);

        return view;
    }
};

export default subtreeSearchTabViews;


