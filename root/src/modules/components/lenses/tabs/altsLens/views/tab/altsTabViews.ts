import { h, VNode } from "hyperapp-local";

import IState from "../../../../../../interfaces/state/IState";
import altsLensActions from "../../actions/altsLensActions";
import altsViews from "../partial/altsViews";
import lensButtonsViews from "../../../../lens/views/lensButtonsViews";
import gNodeAltsCode from "../../../../../../global/code/gNodeAltsCode";

import '../../scss/index.scss'


const altsTabViews = {

    buildTabView(state: IState): VNode | null {

        if (!state
            || !state.lens.nodeTab.lensNode
            || !state.lens.nodeTab.lensNode.case.alts) {
                
            return null;
        }

        gNodeAltsCode.validateTab(state);

        const view: VNode =

            h("div", { id: "altsView" }, [
                h("div", { id: "alts" }, [

                    altsViews.buildAltsView(state),

                    lensButtonsViews.buildSaveCancelActionView(
                        state.lens.nodeTab,
                        altsLensActions.save,
                        altsLensActions.cancel,
                        "Discard",
                        "Save the node alts",
                        "Save button disabled as the node alts state is either unchanged or invalid",
                        "Cancel the node alts changes"
                    )
                ])
            ]);

        return view;
    }
}

export default altsTabViews;

