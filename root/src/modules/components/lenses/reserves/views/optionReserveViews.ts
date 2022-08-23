import { h, VNode } from "hyperapp-local";

import IState from "../../../../interfaces/state/IState";
import ILensUI from "../../../../interfaces/state/ui/UIs/ILensUI";
import INode from "../../../../interfaces/state/tree/INode";
import optionBookmarkViews from "./optionBookmarkViews";

import "../scss/optionButtons.scss";


const optionReserveViews = {

    buildButtonsView: (
        state: IState,
        lensNode: INode<ILensUI>,
        option: INode<ILensUI>,
        className: string): VNode | null => {

        if (!option.ui.showOptionButtons
            && !option.ui.holdOptionButtons) {

            return null;
        }

        const view: VNode =

            h("div", { class: `option-buttons ${className}` }, [

                ...window.TreeSolve.optionsPlugins.buildOptionButtonsView(
                    state,
                    lensNode,
                    option
                ),

                optionBookmarkViews.buildButtonView(option),
            ]);

        return view;
    },

    buildView: (
        state: IState,
        option: INode<ILensUI>): VNode | null => {

        const view: VNode =

            h("div", { class: "option-reserves" }, [

                optionBookmarkViews.buildView(
                    state,
                    option
                )
            ]);

        return view;
    }
};

export default optionReserveViews;


