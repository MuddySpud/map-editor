import IState from "../../../../../interfaces/state/IState";
import gStateCode from "../../../../../global/code/gStateCode";
import INodeBaseElement from "../../../../../interfaces/state/ui/payloads/INodeBaseElement";
import { DiscussionType } from "../../../../../interfaces/enums/DiscussionType";
import IVideoUrlJson from "../interfaces/IVideoUrlJson";


const videoActions = {

    setDiscussionVideoUrl: (
        state: IState,
        payload: INodeBaseElement): IState => {

        if (state.lens.nodeTab.lensNode?.ui.discussionJson
            && state.lens.nodeTab.lensNode?.ui.discussionJson.type === DiscussionType.VideoUrlJson) {

            const input: HTMLInputElement = payload.element as HTMLInputElement;
            const videoUrlJson: IVideoUrlJson = state.lens.nodeTab.lensNode.ui.discussionJson as IVideoUrlJson;
            videoUrlJson.url = `${input.value}`;
            state.lens.nodeTab.lensNode.ui.raw = false;
        }

        return gStateCode.cloneState(state);
    }
};

export default videoActions;
