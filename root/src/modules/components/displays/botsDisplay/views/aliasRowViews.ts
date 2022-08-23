import { h, VNode } from "hyperapp-local";

import cellViews from "./aliasCellViews";
import U from "../../../../global/gUtilities";
import IBotsState from "../../../../interfaces/state/IBotsState";
import IAlias from "../../../../interfaces/state/bot/IAlias";


const aliasRowViews = {

    buildRowView: (
        alias: IAlias,
        selected: boolean): VNode => {

        const show: boolean = alias.ui.show === true;

        if (show) {

            alias.ui.show = false;
        }

        const view: VNode =

            h("div",
                {
                    key: `${alias.key}`,
                    class: {
                        "alias-row": true,
                        "selected": selected,
                        "scroll-show": show
                    }
                },
                [
                    // cellViews.buildBranchesCell(bot),
                    cellViews.buildTickCell(selected),
                    cellViews.buildBotCell(alias),

                    cellViews.buildNameCell(alias),

                    cellViews.buildEditBotCell(alias),
                    cellViews.buildDeleteBotCell(alias),
                    cellViews.buildInfoCell(),
                ]
            );

        return view;
    },

    buildRowViews: (
        botsState: IBotsState,
        aliases: Array<IAlias>
    ): VNode[] => {

        let selectedID: string = "";
        let selected: boolean = false;

        if (U.isNullOrWhiteSpace(botsState.selectedAliasKey) === false) {

            selected = true;
            selectedID = botsState.selectedAliasKey;
        }

        const rowViews: VNode[] = [];
        let rowView: VNode | null;

        aliases.forEach((alias: IAlias) => {

            rowView = aliasRowViews.buildRowView(
                alias,
                selected && alias.key === selectedID
            );

            if (rowView) {

                rowViews.push(rowView);
            }
        });

        return rowViews;
    },
};

export default aliasRowViews;


