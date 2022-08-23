import { h, VNode } from "hyperapp-local";

import U from "../../../../global/gUtilities";
import IDraft from "../../../../interfaces/state/bot/IDraft";
import draftCellViews from "./draftCellViews";
import IBotsState from "../../../../interfaces/state/IBotsState";


const draftRowViews = {

    buildRowView: (
        draft: IDraft,
        selected: boolean): VNode => {

        const show: boolean = draft.ui.show === true;

        if (show) {

            draft.ui.show = false;
        }

        const view: VNode =

            h("div",
                {
                    key: `${draft.key}`,
                    class: {
                        "draft-row": true,
                        "selected": selected,
                        "scroll-show": show
                    }
                },
                [
                    // cellViews.buildBranchesCell(bot),
                    draftCellViews.buildTickCell(selected),
                    draftCellViews.buildBotCell(draft),

                    draftCellViews.buildNameCell(draft),

                    draftCellViews.buildPromoteDraftCell(draft),
                    draftCellViews.buildDeleteBotCell(draft),
                    draftCellViews.buildInfoCell(),
                ]
            );

        return view;
    },

    buildRowViews: (
        botsState: IBotsState,
        drafts: Array<IDraft>
    ): VNode[] => {

        let selectedID: string = "";
        let selected: boolean = false;

        if (U.isNullOrWhiteSpace(botsState.selectedDraftKey) === false) {

            selected = true;
            selectedID = botsState.selectedDraftKey;
        }

        const rowViews: VNode[] = [];
        let rowView: VNode | null;

        drafts.forEach((draft: IDraft) => {

            rowView = draftRowViews.buildRowView(
                draft,
                selected && draft.key === selectedID
            );

            if (rowView) {

                rowViews.push(rowView);
            }
        });

        return rowViews;
    },
};

export default draftRowViews;


