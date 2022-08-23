import IState from "../../../../../interfaces/state/IState";
import gStateCode from "../../../../../global/code/gStateCode";
import IMdEditor from "../interfaces/IMdEditor";
import IQuizJson from "../interfaces/IQuizJson";
import quizCode from "../code/quizCode";


const mdEditorActions = {

    close: (state: IState): IState => {

        const mdEditor: IMdEditor | null = quizCode.tryGetMdEditor();

        if (!mdEditor
            || !mdEditor.editor) {

            return state;
        }

        mdEditor.showEditor = false;

        return gStateCode.cloneState(state);
    },

    done: (state: IState): IState => {

        if (state
            && state.lens.nodeTab.lensNode) {

            const mdEditor: IMdEditor | null = quizCode.tryGetMdEditor();

            if (mdEditor
                && mdEditor.editor) {

                const quiz: IQuizJson = state.lens.nodeTab.lensNode.ui.discussionJson as IQuizJson;

                if (quiz) {

                    quiz.question = mdEditor.editor.getMarkdown();
                    state.lens.nodeTab.lensNode.ui.raw = false;
                }

                mdEditor.showEditor = false;
            }
        }

        return gStateCode.cloneState(state);
    }
};

export default mdEditorActions;