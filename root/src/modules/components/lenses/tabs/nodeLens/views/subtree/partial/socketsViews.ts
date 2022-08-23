import { h, VNode } from "hyperapp-local";

import INodeBase from "../../../../../../../interfaces/state/tree/INodeBase";
import socketViews from "./socketViews";
import IState from "../../../../../../../interfaces/state/IState";
import ILensUI from "../../../../../../../interfaces/state/ui/UIs/ILensUI";
import { ActionType } from "../../../../../../../interfaces/enums/ActionType";
import INode from "../../../../../../../interfaces/state/tree/INode";


const socketsViews = {

    buildSocketsView: (
        state: IState,
        options: Array<INodeBase>): VNode => {

        const optionViewList: VNode[] = [];
        const deletedOptionViewList: VNode[] = [];
        let deletedOptionView: VNode | null;
        let optionView: VNode | null;

        options.forEach((option) => {

            if (option.action === ActionType.DeletePlug) {

                deletedOptionView = socketViews.buildDeletedSocketUI(option);

                if (deletedOptionView) {

                    deletedOptionViewList.push(deletedOptionView);
                }
            }
            else {
                const lensNode: INode<ILensUI> = state.lens.nodeTab.lensNode as INode<ILensUI>;

                optionView = socketViews.buildSocketView(
                    lensNode.ui,
                    option
                );

                if (optionView) {

                    optionViewList.push(optionView);
                }
            }
        });

        let optionsView: VNode[];

        if (optionViewList.length === 0) {

            optionsView = [

                h("span", { class: "title" }, `This subtree has no outputs, and the branch will terminate.`)
            ];
        }
        else {
            optionsView = [

                h("span", { class: "title" }, `Sockets`),
                h("ul", { id: "optionsList" }, optionViewList)
            ];
        }

        let deletedOptionsView: VNode[];

        if (deletedOptionViewList.length > 0) {

            deletedOptionsView = [

                h("span", { class: "title deleted" }, 'Existing options that will be deleted - including any children'),
                h("ul", { id: "optionsList" }, deletedOptionViewList),
            ];
        }
        else {
            deletedOptionsView = [];
        }

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
                    ...optionsView,
                    ...deletedOptionsView,
                ]);

        return view;
    }
};

export default socketsViews;


