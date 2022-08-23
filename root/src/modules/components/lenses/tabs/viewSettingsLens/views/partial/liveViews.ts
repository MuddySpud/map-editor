import { h, VNode } from "hyperapp-local";

import IState from "../../../../../../interfaces/state/IState";
import gViewActions from "../../../../../../global/actions/gViewActions";


const liveViews = {

    buildMainView: (_state: IState): VNode => {

        const view: VNode =

            h("div", { class: "main" }, [
                h("button",
                    {
                        type: "button",
                        onClick: [
                            gViewActions.clearLive,
                            (_event: any) => "highlightLensNodeInBranchUI"
                        ]
                    },
                    [
                        h("span", {}, "Clear live view and re-load")
                    ]
                )
            ]);

        return view;
    }
};

export default liveViews;

