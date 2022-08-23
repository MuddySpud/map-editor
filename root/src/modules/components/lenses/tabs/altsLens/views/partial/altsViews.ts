import { h, VNode } from "hyperapp-local";
import IState from "../../../../../../interfaces/state/IState";
import ILensUI from "../../../../../../interfaces/state/ui/UIs/ILensUI";
import INodeAlts from "../../../../../../interfaces/state/tree/INodeAlts";
import altViews from "./altViews";
import altsLensActions from "../../actions/altsLensActions";
// import U from "../../../../../../global/utilities";
import INode from "../../../../../../interfaces/state/tree/INode";


const altsViews = {

    buildAltsView: (state: IState): VNode => {

        const lensNode: INode<ILensUI> = state.lens.nodeTab.lensNode as INode<ILensUI>;
        const nodeAlts: INodeAlts = lensNode.case.alts as INodeAlts;

        const altViewList: VNode[] = [];
        let altView: VNode | null = null;
        let counter: number = 0;

        // if (nodeAlts.alts.length === 1
        //     && U.isNullOrWhiteSpace(nodeAlts.alts[0].value) === true) {
        // } // TODO what was supposed to happen here?

        nodeAlts.alts.forEach((alt) => {

            altView = altViews.buildAltView(
                alt,
                ++counter);

            if (altView) {

                altViewList.push(altView);
            }
        });

        const buildAddAltsView = (): VNode => {

            const addAltView: VNode =

                h("div", { class: "add" }, [
                    h("div",
                        {
                            class: "btn-add",
                            onClick: altsLensActions.addAlt
                        },
                        ""
                    ),
                ]);

            return addAltView;
        };

        const view: VNode =

            h("div", {}, [
                h("span", { class: "title" }, "Alternative phrasing"),
                h("ul", { id: "optionsList" }, altViewList),
                buildAddAltsView()
            ]);

        return view;
    }
};

export default altsViews;

