import { h, VNode } from "hyperapp-local";
import gAuthenticationActions from "../../../global/http/gAuthenticationActions";

import IState from "../../../interfaces/state/IState";
import userMenuActions from "../actions/userMenuActions";

import "../scss/userMenu.scss";


const userMenuView = {

    buildView: (state: IState): VNode | null => {

        if (!state.user.showMenu) {
            return null;
        }

        const view: VNode =

            h("div", { id: "userMenuView" }, [
                h("div",
                    {
                        id: "overlay",
                        onClick: userMenuActions.close
                    },
                    ""
                ),
                h("div", { id: "userMenu" }, [
                    h("div", { class: "avatar", },
                        [
                            h("div", { class: "avatar-icon" }, ""),
                            h("span", { class: "user-name" }, state.user.name)
                        ]
                    ),
                    h("ul", {}, [
                        h("li", {}, [
                            h("a",
                                {
                                    class: "button user-settings",
                                    onClick: gAuthenticationActions.manageAccount
                                },
                                "Manage account"
                            ),
                        ]),
                        h("li", {}, [
                            h("a",
                                {
                                    class: "button user-logout",
                                    onClick: gAuthenticationActions.logout
                                },
                                "Logout"
                            ),
                        ]),
                    ]),
                ])
            ]);


        return view;
    }
}

export default userMenuView;

