import { h, VNode } from "hyperapp-local";

import IShape from "../../../../../../interfaces/state/tree/IShape";
import shapeActions from "../../actions/shapeActions";
import shapeViewActions from "../../actions/viewActions/shapeViewActions";
import gTooltipActions from "../../../../../../global/actions/gTooltipActions";
import StringEvent from "../../../../../../state/ui/payloads/StringEvent";


const shapeViews = {

    buildShapesView: (shape: IShape): VNode[] => {

        const shapesView: VNode[] = [];

        shape.subShapes.forEach((subShape: IShape) => {

            shapesView.push(shapeViews.buildShapeView(subShape));
        });

        return shapesView;
    },

    buildShapeView: (shape: IShape): VNode => {

        let buildShapeProperties = (): any => {

            const properties = {

                class: {
                    "shape": true,
                    "expanded": shape.ui.expanded === true
                },
                key: `${shape.id}`
            };

            return properties;
        };

        let buildChildren = (): VNode => {

            let children: VNode[] = [];
            let hidden: boolean = true;

            if (shape.ui.expanded === true) {

                hidden = false;

                children = shapeViews.buildShapesView(shape);
            }

            const properties = {

                class: {
                    "kids": true,
                    "hidden": hidden
                }
            };

            let childView: VNode =

                h("div", properties, [
                    h("div", { class: "shapes" }, children)
                ]);

            return childView;
        };

        let buildExpandButton = (shape: IShape): VNode | null => {

            if (!shape.subShapes
                || shape.subShapes.length === 0) {

                return null;
            }

            const view: VNode =

                h("div",
                    {
                        class: "shape-expand",
                        onClick: [
                            shapeActions.toggleExpandShape,
                            (_event: any) => shape
                        ],
                    },
                    ""
                );

            return view;
        };

        const shapeView: VNode =

            h("div", buildShapeProperties(), [

                buildExpandButton(shape),

                h("a",
                    {
                        onMouseEnter: [
                            shapeViewActions.onShapeMouseEnter,
                            (event: any) => event.target
                        ],
                        onMouseLeave: [
                            shapeViewActions.onShapeMouseLeave,
                            (event: any) => event.target
                        ]
                    },
                    [
                        h("div",
                            {
                                class: "open-subtree",
                                onClick: [
                                    shapeActions.openInNewTab,
                                    (_event: any) => shape
                                ],
                                onMouseOver: [
                                    gTooltipActions.showTooltipWithEvent,
                                    (event: any) => {
                                        return new StringEvent(
                                            "Show subtree in a new browser tab",
                                            event
                                        );
                                    }
                                ],
                                onMouseOut: gTooltipActions.clearTooltip
                            },
                            ""
                        ),
                        h("span", {}, shape.tree.token)
                    ]),

                buildChildren()
            ]);

        return shapeView;
    }

};

export default shapeViews;
