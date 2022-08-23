import IState from "../../../../../interfaces/state/IState";
import gStateCode from "../../../../../global/code/gStateCode";
import INodeBaseElement from "../../../../../interfaces/state/ui/payloads/INodeBaseElement";
import ILensUI from "../../../../../interfaces/state/ui/UIs/ILensUI";
import INode from "../../../../../interfaces/state/tree/INode";
import ILinkDiscussionJson from "../interfaces/ILinkDiscussionJson";
import linkDiscussionCode from "../code/linkDiscussionCode";


const linkDiscussionActions = {

    setText: (
        state: IState,
        payload: INodeBaseElement): IState => {

        if (!state
            || !state.lens.nodeTab.lensNode
            || !payload.element) {

            return state;
        }

        const textarea: HTMLTextAreaElement = payload.element as HTMLTextAreaElement;

        if (state.lens.nodeTab.lensNode) {

            const lensNode: INode<ILensUI> = state.lens.nodeTab.lensNode
            lensNode.ui.raw = false;
            const linkDiscussionJson: ILinkDiscussionJson = state.lens.nodeTab.lensNode.ui.discussionJson as ILinkDiscussionJson;
            linkDiscussionJson.link = `${textarea.value}`;
            linkDiscussionCode.toJson(lensNode);
        }

        return gStateCode.cloneState(state);
    }
};

export default linkDiscussionActions;
