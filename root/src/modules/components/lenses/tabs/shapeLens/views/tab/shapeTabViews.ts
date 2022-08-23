import { h, VNode } from "hyperapp-local";

import shapeViews from "../partial/shapeViews";
import IShape from "../../../../../../interfaces/state/tree/IShape";
import IshapeCase from "../../../../../../interfaces/state/cases/IShapeCase";
import treeLensControlsViews from "../../../treeLens/views/common/partial/treeLensControlsViews";


const shapeTabViews = {

    buildTabView: (shapeCase: IshapeCase | null): VNode => {

        if (shapeCase) {

            shapeCase.fresh = false;
        }

        const buildRootView = (rootShape: IShape | null | undefined): VNode | null => {

            if (!rootShape) {

                return null;
            }

            const view: VNode =

                h("div", { class: "root-shape" }, [
                    h("a", {}, [
                        h("span", {}, rootShape.tree.token),
                    ]),
                    h("div", { class: "kids" }, [
                        h("div", { class: "shapes" },

                            shapeViews.buildShapesView(rootShape)
                        )
                    ])
                ]);

            return view;
        };

        const shapeView: VNode =

            h("div", { id: "shapeLensView" }, [
                h("div", { id: "shapeLens" }, [

                    treeLensControlsViews.build_Refresh_Show_Hub_ControlsView(),

                    h("div", { class: "icons" }, [
                        h("div", { class: "shape-icon" }, ""),
                    ]),
                    h("h3", {}, "Shape"),

                    buildRootView(shapeCase?.shape)
                ])
            ]);

        return shapeView;
    }
};

export default shapeTabViews;


