import { h, VNode } from "hyperapp-local";

import IState from "../../../../../../interfaces/state/IState";
import settingActions from "../../actions/settingActions";
import mainViews from "../partial/mainViews";
import gSettingsCode from "../../../../../../global/code/gSettingsCode";
import gTabCode from "../../../../../../global/code/gTabCode";

import '../../scss/index.scss';


const settingsTabViews = {

    buildTabView(state: IState): VNode | null {

        if (!state.lens.settingsTab.lensSettings) {

            return null;
        }

        gSettingsCode.validateTab(state);

        const buildButtonView = () => {

            const view: VNode =

                h("div", { class: "lens-actions" }, [
                    h("button",
                        {
                            type: "button",
                            class: "save",
                            disabled: gTabCode.canSave(state.lens.settingsTab) === false,
                            onClick: settingActions.save
                        },
                        "Save"
                    ),
                    h("button",
                        {
                            type: "button",
                            class: "cancel",
                            onClick: settingActions.cancel
                        },
                        "Cancel"
                    )
                ]);

            return view;
        };

        const settingsView: VNode =

            h("div", { id: "settingsView" }, [
                h("div", { id: "settings" }, [
                    h("div", { class: "icons" }, [
                        h("div", { class: "settings-icon" }, ""),
                    ]),
                    h("h3", {}, "Settings"),

                    mainViews.buildMainView(state),
                    buildButtonView()
                ])
            ]);

        return settingsView;
    }
};

export default settingsTabViews;


