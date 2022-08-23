import { h, VNode } from "hyperapp-local";

import ILensUI from "../../../../../../../interfaces/state/ui/UIs/ILensUI";
import INode from "../../../../../../../interfaces/state/tree/INode";
import { NodeType } from "../../../../../../../interfaces/enums/NodeType";
import nodeActions from "../../../actions/nodeActions";
import buttonViews from "../../../../../lens/views/buttonViews";
import CssClasses from "../../../../../../../state/constants/CssClasses";


const typeViews = {

    buildTypeView: (lensNode: INode<ILensUI>): VNode | null => {

        if (lensNode.isLink === true) {

            return null;
        }

        const solutionText: string = lensNode.type === NodeType.Solution ? "Solution" : "Discussion + options";
        const entryClass: string = lensNode.isEntry === true ? CssClasses.yep : CssClasses.nope;
        const wayPointClass: string = lensNode.reserve.wayPoint == null ? CssClasses.nope : CssClasses.yep;
        let selectSilent: VNode | null = null;

        if (lensNode.isRoot === true) {

            const filteredOptions: Array<INode<ILensUI>> = lensNode.nodes.filter((option: INode<ILensUI>) => {

                return !option.isHidden;
            });

            if (filteredOptions.length === 1) {
                
                const silentClass: string = lensNode.isSilentRoot === true ? CssClasses.yep : CssClasses.nope;

                selectSilent = buttonViews.buildTypeButtonView(
                    "Is silent",
                    "Select whether this root is silent",
                    silentClass,
                    nodeActions.toggleIsSilentRoot
                )
            }
        }

        const discussionView: VNode =

            h("div", { class: "type" }, [

                buttonViews.buildTypeButtonView(
                    solutionText,
                    "Select whether this node is a solution or a discussion",
                    CssClasses.yep,
                    nodeActions.toggleSolution
                ),

                buttonViews.buildTypeButtonView(
                    "Entry point",
                    "Select whether this node is an entry point",
                    entryClass,
                    nodeActions.toggleEntryPoint
                ),

                buttonViews.buildTypeButtonView(
                    "Waypoint",
                    "Select whether this node is a waypoint",
                    wayPointClass,
                    nodeActions.toggleWayPoint
                ),

                selectSilent
            ]);

        return discussionView;
    }
};

export default typeViews;


