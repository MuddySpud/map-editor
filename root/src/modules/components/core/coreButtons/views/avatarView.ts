import { h, VNode } from "hyperapp-local";

import IState from "../../../../interfaces/state/IState";
import avatarActions from "../actions/avatarActions";
import gTooltipActions from "../../../../global/actions/gTooltipActions";

import "../scss/avatar.scss";


const avatarView = {

    buildView: (state: IState): VNode => {

        const view: VNode =

            h("a",
                {
                    class: "button avatar",
                    onClick: avatarActions.toggleUserMenu,
                    onMouseOver: [
                        gTooltipActions.showTooltip,
                        (_event: any) => "Show user menu"
                    ],
                    onMouseOut: gTooltipActions.clearTooltip
                },
                [
                    h("div", { class: "avatar-icon" }, ""),
                    h("span", { class: "user-name" }, state.user.name)
                ]
            );

        return view;
    }
}

export default avatarView;

