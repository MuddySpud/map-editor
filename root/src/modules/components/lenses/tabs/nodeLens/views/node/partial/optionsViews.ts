import { h, VNode } from "hyperapp-local";

import optionViews from "./optionViews";
import IState from "../../../../../../../interfaces/state/IState";
import ILensUI from "../../../../../../../interfaces/state/ui/UIs/ILensUI";
import INode from "../../../../../../../interfaces/state/tree/INode";
import { NodeType } from "../../../../../../../interfaces/enums/NodeType";
import optionActions from "../../../actions/optionActions";
import gTooltipActions from "../../../../../../../global/actions/gTooltipActions";
// import pluginActions from "../../../actions/pluginActions";
// import StringEvent from "../../../../../../../state/ui/payloads/StringEvent";
// import buttonViews from "../../../../../lens/views/buttonViews";
// import CssClasses from "../../../../../../../state/constants/CssClasses";


// const buildImagesButtonView = (enabled: boolean): VNode | null => {

//     if (window.TreeSolve.discussionPlugins.runsInBackground()) {

//         // If inputs exist always display them
//         return null;
//     }

//     let iconClass: string;
//     let tooltip: string;

//     if (enabled === true) {

//         iconClass = "hide-slash-icon";
//         tooltip = "Disable using images in options";
//     }
//     else {
//         iconClass = "show-slash-icon";
//         tooltip = "Enable using images in options";
//     }

//     const controlsView: VNode =

//         h("a",
//             {
//                 class: `options-images`,
//                 onClick: [
//                     pluginActions.toggleEnableOptionPlugins
//                 ],
//                 onMouseOver: [
//                     gTooltipActions.showTooltipWithEvent,
//                     (event: any) => {
//                         return new StringEvent(
//                             tooltip,
//                             event
//                         );
//                     }
//                 ],
//                 onMouseOut: gTooltipActions.clearTooltip
//             },
//             [
//                 h("div", { class: "options-images-icon" }, ""),
//                 h("div", { class: `${iconClass}` }, "")
//             ]);

//     return controlsView;
// };

const optionsViews = {

    buildOptionsView: (
        state: IState,
        lensNode: INode<ILensUI>,
        optionsHeader: string,
        optionText: string,
        showAddRemove: boolean,
        _enableSelector: boolean,
        buttonsClassName: string,
        buildInnerOptionViewDelegate: (
            lensNode: INode<ILensUI>,
            option: INode<ILensUI>,
            optionText: string,
            tooltip: string) => VNode | null
    ): VNode | null => {

        if (lensNode.type === NodeType.Solution) {
            return null;
        }

        const options: Array<INode<ILensUI>> = lensNode.nodes as Array<INode<ILensUI>>;
        // const optionButtonClass: string = enableSelector === true ? CssClasses.yep : CssClasses.nope;
        const optionViewList: VNode[] = [];
        let optionView: VNode | null = null;

        options.forEach((option) => {

            optionView = optionViews.buildOptionView(
                state,
                lensNode,
                option,
                optionText,
                showAddRemove,
                buttonsClassName,
                buildInnerOptionViewDelegate
            );

            if (optionView) {

                optionViewList.push(optionView);
            }
        });

        const view: VNode =

            h("div",
                {
                    class: {
                        "options": true,
                        "zero-options": options.length === 0,
                        "p-hlntv": state.settings.highlightLensNodeInBranchUI === true
                    },
                },
                [
                    h("span", { class: "title" }, optionsHeader),

                    // buildImagesButtonView(enableSelector),

                    h("ul", { id: "optionsList" }, optionViewList),

                    optionsViews.buildAddOptionView(
                        optionText,
                        showAddRemove
                    )
                ]);

        return view;
    },

    buildAddOptionView: (
        optionText: string,
        showAddRemove: boolean): VNode | null => {

        if (!showAddRemove) {

            return null;
        }

        const addOptionView: VNode =

            h("div", { class: "add" }, [
                h("div",
                    {
                        class: "btn-add",
                        onClick: optionActions.addOption,
                        onMouseOver: [
                            gTooltipActions.showTooltip,
                            (_event: any) => `Add an ${optionText}`
                        ],
                        onMouseOut: gTooltipActions.clearTooltip
                    },
                    ""
                ),
            ]);

        return addOptionView;
    }
};

export default optionsViews;


