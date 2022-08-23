import { h, VNode } from "hyperapp-local";
import branchHubButtonViews from "../../common/partial/branchHubButtonViews";


const stashBranchHubButtonViews = {

    buildHubButtons: (): VNode => {

        const controlsView: VNode =

            h("div", { class: "spacer" }, [

                branchHubButtonViews.buildChangeOptionButtonView(),
            ]);

        return controlsView;
    },
};

export default stashBranchHubButtonViews;


