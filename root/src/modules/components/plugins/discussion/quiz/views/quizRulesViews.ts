import { h, VNode } from "hyperapp-local";

import gTooltipActions from "../../../../../global/actions/gTooltipActions";
import StringEvent from "../../../../../state/ui/payloads/StringEvent";
import quizActions from "../actions/quizActions";
import CssClasses from "../../../../../state/constants/CssClasses";


const buildRuleButtonView = (
    ruleName: string,
    buttonText: string,
    selected: boolean): VNode => {

    let tooltip: string = "De-select to remove this quiz rule";
    let iconClass: string = CssClasses.nope;

    if (selected === true) {

        tooltip = "Select to enforce this quiz rule";
        iconClass = CssClasses.yep;
    }

    const view: VNode =

        h("div", { class: "rule" }, [
            h("button",
                {
                    type: "button",
                    class: "click-select",
                    onClick: [
                        quizActions.toggleRule,
                        (_event: any) => ruleName
                    ],
                    onMouseOver: [
                        gTooltipActions.showTooltipWithEvent,
                        (event: any) => {
                            return new StringEvent(
                                tooltip,
                                event
                            );
                        }
                    ],
                    onMouseOut: gTooltipActions.clearTooltip
                },
                [
                    h("div", { class: `${iconClass}` }, ""),
                    h("span", {}, `${buttonText}`)
                ]
            ),
        ]);

    return view;
};

const quizRulesViews = {

    buildRulesViews: (rules: Array<string>): VNode[] => {

        const correctToMoveNext = "correct-to-move-next";
        const showAnswersBeforeMoveNext = "show-answers-before-move-next";
    
        const discussionView: VNode[] = [
    
            h("h4", {}, "Quiz rules"),
            h("div", { class: "rules" }, [
    
                buildRuleButtonView(
                    correctToMoveNext,
                    "Quiz answer must be correct to move to next step",
                    rules.includes(correctToMoveNext),
                ),
    
                buildRuleButtonView(
                    showAnswersBeforeMoveNext,
                    "If incorrect show correct answer before moving to next step",
                    rules.includes(showAnswersBeforeMoveNext),
                )
            ])
        ];
    
        return discussionView;
    }    
};

export default quizRulesViews;


