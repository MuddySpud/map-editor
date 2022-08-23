import { h, VNode } from "hyperapp-local";

import IState from "../../../../../../interfaces/state/IState";
import viewSettingsActions from "../../actions/viewSettingsActions";
import liveViews from "../partial/liveViews";
import gViewSettingsCode from "../../../../../../global/code/gViewSettingsCode";
import gTabCode from "../../../../../../global/code/gTabCode";

import '../../scss/index.scss';


const viewSettingsTabViews = {

    buildTabView(state: IState): VNode | null {

        if (!state.lens.viewSettingsTab.lensViewSettings) {

            return null;
        }

        gViewSettingsCode.validateTab(state);

        const buildButtonView = (): VNode => {

            const view: VNode =

                h("div", { class: "lens-actions" }, [
                    h("button",
                        {
                            type: "button",
                            class: "save",
                            disabled: gTabCode.canSave(state.lens.viewSettingsTab) === false,
                            onClick: viewSettingsActions.save
                        },
                        "Save"
                    ),
                    h("button",
                        {
                            type: "button",
                            class: "cancel",
                            onClick: viewSettingsActions.cancel
                        },
                        "Cancel"
                    )
                ]);

            return view;
        };

        const settingsView: VNode =

            h("div", { id: "viewSettingsView" }, [
                h("div", { id: "viewSettings" }, [
                    h("div", { class: "icons" }, [
                        h("div", { class: "views-icon" }, ""),
                    ]),
                    h("h3", {}, "Views"),

                    liveViews.buildMainView(state),
                    buildButtonView()
                ])
            ]);

        return settingsView;
    }
};

export default viewSettingsTabViews;

