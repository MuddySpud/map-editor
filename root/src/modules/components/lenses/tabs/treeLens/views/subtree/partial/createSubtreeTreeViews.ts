import { h, VNode } from "hyperapp-local";

import editTreeDetailsViews from "../../tree/partial/editTreeDetailsViews";
import ITreeSys from "../../../../../../../interfaces/state/tree/ITreeSys";

import '../../../scss/subtree.scss';


const createSubtreeTreeUIs = {

    buildInputView: (tree: ITreeSys): VNode | null => {

        if (!tree) {
            
            return null;
        }

        const view: VNode =

            h("div", {}, [

                editTreeDetailsViews.buildNameTitleErrorInputView(
                    tree,
                    "Name"
                ),

                editTreeDetailsViews.buildDescriptionTitleInputView(
                    tree,
                    "Description"
                ),

                editTreeDetailsViews.buildRootDiscussionTitleErrorInputView(
                    tree.root,
                    "Root discussion"
                ),

                editTreeDetailsViews.buildTagsTitleInputView(
                    tree,
                    "Tags"
                ),
            ]);

        return view;
    }
};

export default createSubtreeTreeUIs;


