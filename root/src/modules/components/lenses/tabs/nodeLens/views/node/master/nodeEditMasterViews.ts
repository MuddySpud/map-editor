import { VNode } from "hyperapp-local";

import IState from "../../../../../../../interfaces/state/IState";
import ILensMasterView from "../../../../../../../interfaces/views/ILensMasterView";
import IStageBehaviour from "../../../../../../../interfaces/behaviours/IStageBehaviour";
import nodeEditTabViews from "../tab/nodeEditTabViews";
import INode from "../../../../../../../interfaces/state/tree/INode";
import ILensUI from "../../../../../../../interfaces/state/ui/UIs/ILensUI";
import stashNodeEditTabViews from "../tab/stashNodeEditTabViews";
import flatNodeEditTabViews from "../tab/flatNodeEditTabViews";
import stashRootEditTabViews from "../tab/stashRootEditTabViews";


class nodeEditMasterViewsClass implements ILensMasterView {

    public getStageBehaviour(state: IState): IStageBehaviour {

        return state.lens.nodeTab.stageBehaviour;
    }

    public buildLensView(state: IState): VNode | null {

        const lensNode: INode<ILensUI> = state.lens.nodeTab.lensNode as INode<ILensUI>;

        if (lensNode.isVirtual === true) {

            return flatNodeEditTabViews.buildTabView(state);
        }
        else if (lensNode.isStashRoot === true) {

            return stashRootEditTabViews.buildTabView(state);
        }
        else if (lensNode.isStash === true) {

            return stashNodeEditTabViews.buildTabView(state);
        }

        return nodeEditTabViews.buildTabView(state);
    }
}

const nodeEditMasterViews = new nodeEditMasterViewsClass();

export default nodeEditMasterViews;


