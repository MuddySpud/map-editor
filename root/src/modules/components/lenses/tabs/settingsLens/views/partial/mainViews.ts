import { h, VNode } from "hyperapp-local";

import IState from "../../../../../../interfaces/state/IState";
import settingActions from "../../actions/settingActions";
import ISettings from "../../../../../../interfaces/state/user/ISettings";
import testActions from "../../actions/testActions";
import CssClasses from "../../../../../../state/constants/CssClasses";


const mainViews = {

    buildMainView: (state: IState): VNode => {

        const lensSettings: ISettings = state.lens.settingsTab.lensSettings as ISettings;
        const highlightClass: string = lensSettings.highlightLensNodeInBranchUI ? CssClasses.yep : CssClasses.nope;
        const notificationClass: string = lensSettings.showAllNotifications ? CssClasses.yep : CssClasses.nope;

        const view: VNode =

            h("div", { class: "main" }, [
                h("button",
                    {
                        type: "button",
                        onClick: [
                            settingActions.toggle,
                            (_event: any) => "highlightLensNodeInBranchUI"
                        ]
                    },
                    [
                        h("div", { class: highlightClass }, ""),
                        h("span", {}, "Highlight edited node in tree")
                    ]
                ),
                h("button",
                    {
                        type: "button",
                        onClick: [
                            settingActions.toggle,
                            (_event: any) => "showAllNotifications"
                        ]
                    },
                    [
                        h("div", { class: notificationClass }, ""),
                        h("span", {}, "Show all notifications")
                    ]
                ),
                h("button",
                    {
                        type: "button",
                        onClick: [
                            testActions.toggleTests,
                            (_event: any) => "tempShowDialogue"
                        ]
                    },
                    [
                        h("div", { class: notificationClass }, ""),
                        h("span", {}, "Show dialogue")
                    ]
                ),
                h("div", { class: "drop-down" },
                    [
                        h("span", {}, "Repeat action poll time:"),
                        h("select",
                            {
                                onInput: [
                                    settingActions.setPollTime,
                                    (event: any) => event.target
                                ]
                            },
                            [
                                h("option",
                                    {
                                        value: "2000",
                                        selected: lensSettings.repeatActionPollingTime === 2000
                                    },
                                    "2 seconds"
                                ),
                                h("option",
                                    {
                                        value: "5000",
                                        selected: lensSettings.repeatActionPollingTime === 5000
                                    },
                                    "5 seconds"
                                ),
                                h("option",
                                    {
                                        value: "15000",
                                        selected: lensSettings.repeatActionPollingTime === 15000
                                    },
                                    "15 seconds"
                                ),
                                h("option",
                                    {
                                        value: "60000",
                                        selected: lensSettings.repeatActionPollingTime === 60000
                                    },
                                    "60 seconds"
                                )
                            ]
                        )
                    ]
                ),
                h("div", { class: "twin-button" },
                    [
                        h("span", {}, "Tree-view font size:"),
                        h("div", { class: "font-value" }, `${lensSettings.fontSize}`),
                        h("button",
                            {
                                type: "button",
                                class: "plus",
                                onClick: [
                                    settingActions.increaseFontSize,
                                    (_event: any) => "tempShowDialogue"
                                ]
                            },
                            ""
                        ),
                        h("button",
                            {
                                type: "button",
                                class: "minus",
                                onClick: [
                                    settingActions.decreaseFontSize,
                                    (_event: any) => "tempShowDialogue"
                                ]
                            },
                            ""
                        ),
                    ]
                )
            ]);

        return view;
    }
};

export default mainViews;

