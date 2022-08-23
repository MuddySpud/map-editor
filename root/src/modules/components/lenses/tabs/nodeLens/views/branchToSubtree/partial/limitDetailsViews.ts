import { h, VNode } from "hyperapp-local";

import IState from "../../../../../../../interfaces/state/IState";
import IBranchTreeTask from "../../../../../../../interfaces/state/tree/IBranchTreeTask";
import IHole from "../../../../../../../interfaces/state/tree/IHole";
import ISocketLoaderUI from "../../../../../../../interfaces/state/ui/UIs/ISocketLoaderUI";
import inputViews from "../../common/partial/inputViews";
import branchTreeTaskActions from "../../../actions/branchTreeTaskActions";
import IStSocket from "../../../../../../../interfaces/state/tree/IStSocket";
import tableViews from "../../../../../lens/views/tableViews";
import gNodeActions from "../../../../../../../global/actions/gNodeActions";
import selectNodeViews from "../../common/partial/selectNodeViews";
import CssClasses from "../../../../../../../state/constants/CssClasses";
import buttonViews from "../../../../../lens/views/buttonViews";


const limitDetailsViews = {

    buildLimitDetailsView: (
        state: IState,
        limit: IHole<ISocketLoaderUI>): VNode => {

        selectNodeViews.buildOverlayView(
            state,
            limit.ui.clickSelect,
            "Clear select option",
            "overlay-limit",
            "Click an option to select it as a boundary",
            branchTreeTaskActions.cancelLimitClickSelect,
            branchTreeTaskActions.cancelLimitForceSet
        );

        const detailsView: VNode =

            h("div", {}, [

                inputViews.buildLimitInputView(limit)
            ]);

        return detailsView;
    },

    buildStSocketsView: (branchTreeTask: IBranchTreeTask): VNode | null => {

        if (!branchTreeTask
            || branchTreeTask.subtreeLoader.subtree.stSockets.length === 0) {

            return null;
        }

        const socketViews: VNode[] = [];
        let socketView: VNode | null;
        let counter: number = 0;

        branchTreeTask.subtreeLoader.subtree.stSockets.forEach((stSocket: IStSocket) => {

            socketView = limitDetailsViews.buildStSocketUI(
                stSocket,
                ++counter);

            if (socketView) {

                socketViews.push(socketView);
            }
        });

        const view: VNode =

            h("div", { class: "stSockets" }, socketViews);

        return view;
    },

    buildStSocketUI: (
        stSocket: IStSocket,
        index: number): VNode | null => {

        if (!stSocket) {

            return null;
        }

        const holeViews: any[] = [];
        let holeView: any;
        let counter: number = 0;

        stSocket.holes.forEach((hole: IHole<ISocketLoaderUI>) => {

            holeView = limitDetailsViews.buildLimitView(
                stSocket,
                hole,
                `${++counter}`);

            holeViews.push(holeView);
        });

        const view: VNode =

            h("div", { class: "stSocket" }, [
                h("h4", {}, `StSocket ${index}`),
                h("div", { class: "stSocket-box" }, [
                    h("div", { class: "stSocket-summary" }, [

                        tableViews.build2ColumnKeyValueRowView(
                            'key',
                            stSocket.key,
                            CssClasses.odd
                        ),

                        tableViews.build2ColumnKeyValueRowView(
                            'text',
                            stSocket.text
                        ),
                    ]),
                    h("div", { class: "holes" }, [
                        h("h4", {}, `${stSocket.holes.length} boundary options`),

                        ...holeViews
                    ])
                ])
            ]);

        return view;
    },

    buildLimitView: (
        stSocket: IStSocket,
        limit: IHole<ISocketLoaderUI>,
        index: string): VNode | null => {

        if (!limit) {

            return null;
        }

        let optionText: string = limit.option;
        let optionClass: string = '';

        if (limit.ui.overrideOption === true) {

            optionText = stSocket.text;
            optionClass = `overriden`;
        }

        const view: VNode =

            h("div", { class: 'option' }, [

                buttonViews.buildOpenInBranchesViewButton(
                    limit,
                    "Show this hole in the tree-view",
                    "open-view",
                    gNodeActions.showOption),

                h("div", { class: 'option-data' }, [

                    tableViews.build3ColumnIndexKeyValueRowView(
                        index,
                        "key",
                        limit.key,
                        CssClasses.odd
                    ),

                    tableViews.build3ColumnKeyValueRowView(
                        "option (subtree)",
                        optionText,
                        `even ${optionClass}`
                    ),

                    tableViews.build3ColumnKeyValueRowView(
                        "discussion",
                        limit.discussion,
                        CssClasses.odd
                    )
                ])
            ]);

        return view;
    }
};

export default limitDetailsViews;


