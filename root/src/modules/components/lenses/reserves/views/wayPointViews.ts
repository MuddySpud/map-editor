import { h, VNode } from "hyperapp-local";

import ILensUI from "../../../../interfaces/state/ui/UIs/ILensUI";
import INode from "../../../../interfaces/state/tree/INode";
import NodeBaseElement from "../../../../state/ui/payloads/NodeBaseElement";
import wayPointsActions from "../actions/wayPointsActions";
import gHtmlActions from "../../../../global/actions/gHtmlActions";
import inputErrorViews from "../../lens/views/inputErrorViews";
import IState from "../../../../interfaces/state/IState";
import gTooltipActions from "../../../../global/actions/gTooltipActions";

import "../scss/waypoint.scss";


const buildDescriptionView = (
    node: INode<ILensUI>,
    invalid: boolean): VNode => {

    const view: VNode =

        h("div",
            {
                class: {
                    "textarea-wrapper": true,
                    "invalid": invalid
                }
            },
            [
                h("textarea",
                    {
                        id: "wayPointDescription",
                        value: `${node.reserve.wayPoint?.description ?? ""}`,
                        class: "edit",
                        textmode: "MultiLine",
                        placeholder: `...enter the description here...`,
                        onInput: [
                            wayPointsActions.setDescription,
                            (event: any) => {
                                return new NodeBaseElement(
                                    node,
                                    event.target
                                );
                            }
                        ],
                        onBlur: gHtmlActions.clearFocus,
                        onMouseOver: [
                            gTooltipActions.showTooltip,
                            (_event: any) => `Waypoint description - might be displayed to users`
                        ],
                        onMouseOut: gTooltipActions.clearTooltip
                    },
                    ""
                ),
            ]
        );

    return view;
};

const buildTitleView = (
    node: INode<ILensUI>,
    invalid: boolean): VNode => {

    const view: VNode =

        h("div",
            {
                class: {
                    "input-wrapper": true,
                    "invalid": invalid
                }
            },
            [
                h("input",
                    {
                        id: "wayPointTitle",
                        value: `${node.reserve.wayPoint?.title ?? ""}`,
                        class: "edit",
                        type: "text",
                        placeholder: `...enter the title...`,
                        autocomplete: "off",
                        onInput: [
                            wayPointsActions.setTitle,
                            (event: any) => {
                                return new NodeBaseElement(
                                    node,
                                    event.target
                                );
                            }
                        ],
                        onBlur: gHtmlActions.clearFocus,
                        onMouseOver: [
                            gTooltipActions.showTooltip,
                            (_event: any) => `Waypoint title - will be displayed to users`
                        ],
                        onMouseOut: gTooltipActions.clearTooltip
                    },
                    ""
                )
            ]);

    return view;
};


const wayPointViews = {

    buildWayPointView: (
        _state: IState,
        lensNode: INode<ILensUI>): VNode | null => {

        if (!lensNode.reserve.wayPoint) {

            return null;
        }

        const invalid: boolean = lensNode.reserve.wayPoint.errors.length > 0;

        const view: VNode =

            h("div", { id: "wayPointView" },
                [
                    h("h4", {}, "WayPoint"),
                    h("div", { class: "wayPoint" }, [

                        inputErrorViews.buildTitleErrorView(
                            "Title",
                            lensNode.reserve.wayPoint?.errors
                        ),

                        buildTitleView(
                            lensNode,
                            invalid
                        ),

                        h("h4", { class: "way-description" }, "Description"),
                        buildDescriptionView(
                            lensNode,
                            invalid
                        )
                    ])
                ]
            );

        return view;
    }
};

export default wayPointViews;


