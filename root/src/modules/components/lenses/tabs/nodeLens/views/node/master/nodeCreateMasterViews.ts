import { VNode } from "hyperapp-local";

import IState from "../../../../../../../interfaces/state/IState";
import ILensMasterView from "../../../../../../../interfaces/views/ILensMasterView";
import IStageBehaviour from "../../../../../../../interfaces/behaviours/IStageBehaviour";
import nodeCreateTabViews from "../tab/nodeCreateTabViews";
import INode from "../../../../../../../interfaces/state/tree/INode";
import ILensUI from "../../../../../../../interfaces/state/ui/UIs/ILensUI";
import stashNodeCreateTabViews from "../tab/stashNodeCreateTabViews";


class nodeCreateMasterViewsClass implements ILensMasterView {

    public getStageBehaviour(state: IState): IStageBehaviour {

        return state.lens.nodeTab.stageBehaviour;
    }

    public buildLensView(state: IState): VNode | null {

        const lensNode: INode<ILensUI> = state.lens.nodeTab.lensNode as INode<ILensUI>;

        if (lensNode.isVirtual === true) {

            alert("Cannot create a flat node!!!");
        }
        else if (lensNode.isStashRoot === true) {

            alert("Cannot create a stash root!!!");
        }
        else if (lensNode.isStash === true) {

            return stashNodeCreateTabViews.buildTabView(state);
        }

        return nodeCreateTabViews.buildTabView(state);
    }
}

const nodeCreateMasterViews = new nodeCreateMasterViewsClass();

export default nodeCreateMasterViews;


